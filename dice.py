import collections
from random import randint


NUMBERS = ['%d' % i for i in range(10)]
AttackResult = collections.namedtuple('AttackResult', ['hit', 'crit', 'attack', 'damage', 'mean', 'd20'])


def d20():
	return randint(1, 20)


def read_number(line):
	if line == '' or line[0] not in NUMBERS:
		return (None, line)
	n = line[0]
	line = line[1:]
	x, line = read_number(line)
	if x is None:
		return int(n), line
	return int(n + '%d' % x), line


class DiceExpression():
	def __init__(self):
		self.parts = []

	def add(self, number=1, d=1):
		self.parts.append((number, d))

	def peek(self):
		if len(self.parts) == 0:
			self.add()
		return self.parts[-1]

	def modify_d(self, d):
		if len(self.parts) == 0:
			self.add()
		(n, _) = self.parts[-1]
		self.parts[-1] = (n, d)

	def modify_number(self, n):
		if len(self.parts) == 0:
			self.add()
		(_, d) = self.parts[-1]
		self.parts[-1] = (n, d)

	def __repr__(self):
		return str(self.parts)

	def mean(self, crit=False):
		result = 0
		for (n, d) in self.parts:
			result += int(n * (d + 1) / 2)
			if crit and d != 1:
				result += int(n * (d + 1) / 2)
		return result

	def sample(self, crit=False):
		result = 0
		for (n, d) in self.parts:
			for _ in range(n):
				result += randint(1, d)
			if crit and d != 1:
				for _ in range(n):
					result += randint(1, d)
		return result


class DiceParser():
	def __init__(self, line):
		self.line = line
		self.original = line
		self.expression = DiceExpression()

	def empty(self):
		return len(self.line) == 0

	def peek(self):
		return self.line[0]

	def pop(self):
		t = self.line[0]
		self.line = self.line[1:]
		return t

	def pop_number(self):
		(number, line) = read_number(self.line)
		self.line = line
		return number

	def parse(self):
		while not self.empty():
			token = self.peek()
			if token in NUMBERS:
				n = self.pop_number()
				(o, _) = self.expression.peek()
				if o == -1:
					n *= -1
				self.expression.modify_number(n)
			elif token in ['d', 'D']:
				self.pop()
				d = self.pop_number()
				self.expression.modify_d(d)
			elif token in ['+']:
				self.expression.add()
				self.pop()
			elif token in ['-']:
				self.expression.add(-1)
				self.pop()
			else:
				raise Exception('Unknown dice expression')


def parse_dice(oline):
	lines = oline.split(',')
	expressions = []
	for line in lines:
		line = line.strip()
		parser = DiceParser(line)
		parser.parse()
		expressions.append(parser.expression)
	return expressions


def calc(line):
	'''example: calc('6d6+d4, 3d8+2')'''
	expressions = parse_dice(line)
	samples = [expr.sample() for expr in expressions]
	means = [expr.mean() for expr in expressions]
	return (samples, means, expressions)


def attack(bonus, dice='1', count=1, crits=[20], AC=0, advantage=False, disadvantage=False):
	expressions = parse_dice(dice)
	results = []
	for c in range(count):
		d20s = []
		d = d20()
		d20s.append(d)
		hit = False
		crit = False
		if advantage and not disadvantage:
			x = d20()
			d20s.append(x)
			d = max(d, x)
		if disadvantage and not advantage:
			x = d20()
			d20s.append(x)
			d = min(d, x)
		if d in crits:
			crit = True
		d = d + bonus
		if d > AC or crit:
			hit = True
		samples = [expr.sample(crit) for expr in expressions]
		means = [expr.mean(crit) for expr in expressions]

		result = AttackResult(hit=hit, crit=crit, attack=d, damage=samples, mean=means, d20=d20s)
		results.append(result)
	return results


if __name__ == '__main__':
	print(calc('2d8'))
	print(calc('2d8, 16d6'))
	print(calc('130d4'))
	print(calc('d12'))
	print(calc('d12+d8'))
	print(calc('d12+4d8+3'))
	print(calc('2d8+5'))
	print(calc('9'))
	print(calc('6d6+d4, 3d8+2'))
