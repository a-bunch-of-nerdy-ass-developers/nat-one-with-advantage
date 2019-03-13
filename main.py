from bcmd import BetterCmd
import dice


class DndCmd(BetterCmd):
	def do_attack(self, args):
		args = args.split(" ")
		state = 0
		fighter = False
		advantage = False
		disadvantage = False
		count = 1
		bonus = 0
		AC = 0
		dice_e = '1'
		crits = [20]
		for arg in args:
			if state == 2:
				AC = int(arg)
			elif state == 1:
				state = 2
				dice_e = arg
			elif state == 0:
				if arg.startswith('+'):
					state = 1
					bonus = int(arg)
				elif arg[0] in ['f', 'a', 'd']:
					if 'f' in arg:
						fighter = True
					if 'a' in arg:
						advantage = True
					if 'd' in arg:
						disadvantage = True
				else:
					count = int(arg)
		if fighter:
			crits.append(19)
		results = dice.attack(bonus, dice=dice_e, count=count, crits=crits, AC=AC, advantage=advantage, disadvantage=disadvantage)
		total = None
		mean_d = None
		for result in results:
			d20 = ", ".join([str(d) for d in result.d20])
			attack = result.attack
			s = ", ".join(["%d" % s for s in result.damage])
			m = ", ".join(["%d" % s for s in result.mean])
			c = "CRIT" if result.crit else ""
			h = "HIT" if result.hit else ""
			if result.hit:
				if total is None:
					total = result.damage
					mean_d = result.mean
				else:
					total = [result.damage[i] + total[i] for i in range(len(result.damage))]
					mean_d = [result.mean[i] + mean_d[i] for i in range(len(result.damage))]

			print(d20 + ("\t%s" % c) + ("\t\tattack=%d" % attack) + ("\tdamage=%s" % s) + ("\t[m: %s]" % m) + "\t%s" % h)
		if AC != 0:
			print("===================================================================")
			s = ", ".join(["%d" % s for s in total])
			m = ", ".join(["%d" % s for s in mean_d])
			print("Total Damage: ", s)
			print("Mean Damage : ", m)

	def default(self, line):
		try:
			(sample, mean, _) = dice.calc(line)
			s = ", ".join(["%d" % s for s in sample])
			m = ", ".join(["%d" % s for s in mean])
			print(s + "   [mean: %s]" % m)
		except Exception:
			print("Unknown expression", line)


if __name__ == '__main__':
	prompt = DndCmd()
	prompt.prompt = '> '
	try:
		prompt.cmdloop()
	except KeyboardInterrupt:
		print()
		pass
