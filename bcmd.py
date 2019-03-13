from cmd import Cmd


class BetterCmd(Cmd):
	def do_EOF(self, arg):
		print()
		return True

	def emptyline(self):
		pass

	def do_exit(self, arg):
		"""Exits the command line"""
		return True

	def do_help(self, arg):
		'List available commands with "help" or detailed help with "help cmd".'
		if arg:
			# XXX check arg syntax
			try:
				func = getattr(self, 'help_' + arg)
			except AttributeError:
				try:
					doc = getattr(self, 'do_' + arg).__doc__
					if doc:
						self.stdout.write("%s\n" % str(doc))
						return
				except AttributeError:
					pass
				self.stdout.write("%s\n" % str(self.nohelp % (arg,)))
				return
			func()
		else:
			names = self.get_names()
			cmds_doc = []
			cmds_undoc = []
			help = {}
			for name in names:
				if name[:5] == 'help_':
					help[name[5:]] = 1
			names.sort()
			# There can be duplicates if routines overridden
			prevname = ''
			for name in names:
				if name[:3] == 'do_' and name != 'do_EOF':
					if name == prevname:
						continue
					prevname = name
					cmd = name[3:]
					if cmd in help:
						cmds_doc.append(cmd)
						del help[cmd]
					elif getattr(self, name).__doc__:
						cmds_doc.append(cmd)
					else:
						cmds_undoc.append(cmd)
			self.stdout.write("%s\n" % str(self.doc_leader))
			self.print_topics(self.doc_header, cmds_doc, 15, 80)
			self.print_topics(self.misc_header, list(help.keys()), 15, 80)
			self.print_topics(self.undoc_header, cmds_undoc, 15, 80)

	def completenames(self, text, *ignored):
		dotext = 'do_' + text
		return [a[3:] for a in self.get_names() if a.startswith(dotext) and a != 'do_EOF']

	def completedefault(self, text, line, begidx, endidx):
		return []
