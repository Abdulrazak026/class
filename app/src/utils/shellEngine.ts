import { VirtualFS } from './virtualFS';

export interface ShellOutput {
  type: 'stdout' | 'stderr' | 'system';
  text: string;
}

export class ShellEngine {
  fs: VirtualFS;
  history: string[];
  lastExitCode: number;

  constructor() {
    this.fs = new VirtualFS();
    this.history = [];
    this.lastExitCode = 0;
  }

  getPrompt(): string {
    const user = this.fs.currentUser;
    const host = 'cybercamp';
    const cwd = this.fs.getCwd();
    const home = `/home/${user}`;
    const shortCwd = cwd === home ? '~' : cwd.replace(home, '~');
    return `${user}@${host}:${shortCwd}$`;
  }

  execute(input: string): ShellOutput[] {
    const trimmed = input.trim();
    if (!trimmed) return [];
    this.history.push(trimmed);

    if (trimmed === 'exit' || trimmed === 'logout') {
      return [{ type: 'system', text: 'Session ended. Close this terminal to continue the course.' }];
    }

    const pipeline = this.parsePipeline(trimmed);
    const allOutput: ShellOutput[] = [];

    for (const cmd of pipeline) {
      const result = this.executeSingle(cmd);
      for (const output of result) {
        if (output.type === 'stderr') {
          allOutput.push({ type: 'stderr', text: `bash: ${output.text}` });
        } else {
          allOutput.push(output);
        }
      }
    }

    return allOutput;
  }

  private parsePipeline(input: string): string[][] {
    const commands = input.split('|').map(s => s.trim()).filter(Boolean);
    return commands.map(cmd => this.tokenize(cmd));
  }

  private tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inQuote: string | null = null;
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (inQuote) {
        if (ch === inQuote) { inQuote = null; }
        else { current += ch; }
      } else if (ch === '"' || ch === "'") {
        inQuote = ch;
      } else if (ch === ' ') {
        if (current) { tokens.push(current); current = ''; }
      } else {
        current += ch;
      }
    }
    if (current) tokens.push(current);
    return tokens;
  }

  private executeSingle(args: string[]): ShellOutput[] {
    if (args.length === 0) return [];
    const cmd = args[0].toLowerCase();
    const cmdArgs = args.slice(1);

    switch (cmd) {
      case 'clear': return [];
      case 'help': return this.cmdHelp(cmdArgs);
      case 'pwd': return this.cmdPwd();
      case 'ls': return this.cmdLs(cmdArgs);
      case 'cd': return this.cmdCd(cmdArgs);
      case 'cat': return this.cmdCat(cmdArgs);
      case 'echo': return this.cmdEcho(cmdArgs);
      case 'head': return this.cmdHead(cmdArgs);
      case 'tail': return this.cmdTail(cmdArgs);
      case 'whoami': return this.cmdWhoami();
      case 'id': return this.cmdId();
      case 'mkdir': return this.cmdMkdir(cmdArgs);
      case 'touch': return this.cmdTouch(cmdArgs);
      case 'rm': return this.cmdRm(cmdArgs);
      case 'cp': return this.cmdCp(cmdArgs);
      case 'mv': return this.cmdMv(cmdArgs);
      case 'chmod': return this.cmdChmod(cmdArgs);
      case 'chown': return this.cmdChown(cmdArgs);
      case 'grep': return this.cmdGrep(cmdArgs);
      case 'find': return this.cmdFind(cmdArgs);
      case 'wc': return this.cmdWc(cmdArgs);
      case 'sort': return this.cmdSort(cmdArgs);
      case 'uniq': return this.cmdUniq(cmdArgs);
      case 'ps': return this.cmdPs(cmdArgs);
      case 'kill': return this.cmdKill(cmdArgs);
      case 'who': return this.cmdWho();
      case 'ping': return this.cmdPing(cmdArgs);
      case 'hostname': return this.cmdHostname();
      case 'uname': return this.cmdUname(cmdArgs);
      case 'date': return this.cmdDate();
      case 'uptime': return this.cmdUptime();
      case 'free': return this.cmdFree(cmdArgs);
      case 'df': return this.cmdDf(cmdArgs);
      case 'sudo': return this.cmdSudo(cmdArgs);
      case 'su': return this.cmdSu(cmdArgs);
      default: return [{ type: 'stderr', text: `${cmd}: command not found` }];
    }
  }

  private output(text: string): ShellOutput[] { return [{ type: 'stdout', text }]; }

  private cmdHelp(_args: string[]): ShellOutput[] {
    return this.output(`Available commands:
  File Operations:  ls, cd, pwd, cat, echo, head, tail, touch, mkdir, rm, cp, mv, chmod, chown
  Text Processing:  grep, find, wc, sort, uniq
  Process Mgmt:    ps, kill
  System Info:     whoami, id, who, hostname, uname, date, uptime, free, df
  Network:         ping
  Access Control:  sudo, su
  Other:           clear, help, exit`);
  }

  private cmdPwd(): ShellOutput[] { return this.output(this.fs.getCwd()); }
  private cmdWhoami(): ShellOutput[] { return this.output(this.fs.currentUser); }

  private cmdId(): ShellOutput[] {
    const u = this.fs.currentUser;
    return this.output(`uid=1000(${u}) gid=1000(${u}) groups=1000(${u}),27(sudo)`);
  }

  private cmdHostname(): ShellOutput[] { return this.output('cybercamp-lab'); }

  private cmdDate(): ShellOutput[] {
    const now = new Date();
    return this.output(now.toString().slice(0, 24));
  }

  private cmdUptime(): ShellOutput[] {
    return this.output(' 10:30:00 up 2:30, 2 users, load average: 0.08, 0.03, 0.01');
  }

  private cmdFree(_args: string[]): ShellOutput[] {
    return this.output(`               total        used        free      shared  buff/cache   available
Mem:           7.8Gi       2.1Gi       4.2Gi       0.1Gi       1.5Gi       5.3Gi
Swap:          2.0Gi       0.0Gi       2.0Gi`);
  }

  private cmdDf(_args: string[]): ShellOutput[] {
    return this.output(`Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       49283072 8234567  41048505  17% /
tmpfs            4023456     456   4023000   1% /dev/shm`);
  }

  private cmdUname(args: string[]): ShellOutput[] {
    const flags = args.join(' ');
    if (flags.includes('a') || flags === '') return this.output('Linux cybercamp-lab 6.1.0-kali5-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.12-1kali2 (2023-02-23) x86_64 GNU/Linux');
    if (flags.includes('r')) return this.output('6.1.0-kali5-amd64');
    if (flags.includes('n')) return this.output('cybercamp-lab');
    if (flags.includes('m')) return this.output('x86_64');
    return this.output('Linux');
  }

  private cmdCd(args: string[]): ShellOutput[] {
    const target = args[0] || `/home/${this.fs.currentUser}`;
    const path = this.fs.parsePath(target);
    const { node } = this.fs.resolve(path);
    if (!node || node.type !== 'dir') return [{ type: 'stderr', text: `cd: ${target}: No such file or directory` }];
    this.fs.cwd = path;
    return [];
  }

  private cmdLs(args: string[]): ShellOutput[] {
    let showAll = false;
    let showLong = false;
    let target = '.';
    for (const arg of args) {
      if (arg === '-la' || arg === '-al') { showAll = true; showLong = true; }
      else if (arg === '-l') showLong = true;
      else if (arg === '-a') showAll = true;
      else if (!arg.startsWith('-')) target = arg;
    }
    const path = this.fs.parsePath(target);
    const entries = this.fs.ls(path);
    if (entries.length === 0) return [];
    let result: string;
    if (showLong) {
      const filtered = showAll ? entries : entries.filter(e => !e.name.startsWith('.'));
      result = this.fs.formatLsLong(filtered);
    } else {
      const filtered = showAll ? entries : entries.filter(e => !e.name.startsWith('.'));
      result = filtered.map(e => {
        if (e.type === 'dir') return `\x1b[34m${e.name}/\x1b[0m`;
        if (e.permissions[3] === 'x' || e.permissions[6] === 'x' || e.permissions[9] === 'x') return `\x1b[32m${e.name}*\x1b[0m`;
        return e.name;
      }).join('  ');
    }
    return this.output(result);
  }

  private cmdCat(args: string[]): ShellOutput[] {
    const results: string[] = [];
    for (const arg of args) {
      const path = this.fs.parsePath(arg);
      const content = this.fs.cat(path);
      if (content) results.push(content);
    }
    return results.length > 0 ? this.output(results.join('\n')) : [];
  }

  private cmdEcho(args: string[]): ShellOutput[] {
    const text = args.join(' ');
    const expanded = text.replace(/\$([A-Z_]+)/g, (match, varName) => {
      const vars: Record<string, string> = { USER: this.fs.currentUser, HOME: `/home/${this.fs.currentUser}`, SHELL: '/bin/bash', PWD: this.fs.getCwd(), HOSTNAME: 'cybercamp-lab' };
      return vars[varName] || match;
    });
    if (args.length > 1 && args[0] === '>>') {
      const content = args.slice(1, -1).join(' ');
      const path = this.fs.parsePath(args[args.length - 1]);
      const existing = this.fs.cat(path);
      this.fs.writeFile(path, (existing || '') + content + '\n');
      return [];
    }
    if (args.length > 1 && args[0] === '>') {
      const content = args.slice(1, -1).join(' ');
      const path = this.fs.parsePath(args[args.length - 1]);
      this.fs.writeFile(path, content + '\n');
      return [];
    }
    if (args.length >= 2 && args[args.length - 2] === '>') {
      const content = args.slice(0, -2).join(' ');
      const path = this.fs.parsePath(args[args.length - 1]);
      this.fs.writeFile(path, content + '\n');
      return [];
    }
    if (args.length >= 2 && args[args.length - 2] === '>>') {
      const content = args.slice(0, -2).join(' ');
      const path = this.fs.parsePath(args[args.length - 1]);
      const existing = this.fs.cat(path);
      this.fs.writeFile(path, (existing || '') + content + '\n');
      return [];
    }
    return this.output(expanded);
  }

  private cmdHead(args: string[]): ShellOutput[] {
    let n = 10;
    let target = '';
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-n' && i + 1 < args.length) { n = parseInt(args[i + 1], 10) || 10; i++; }
      else target = args[i];
    }
    if (!target) return [{ type: 'stderr', text: 'head: missing file operand' }];
    const path = this.fs.parsePath(target);
    const content = this.fs.head(path, n);
    return content ? this.output(content) : [{ type: 'stderr', text: `head: ${target}: No such file or directory` }];
  }

  private cmdTail(args: string[]): ShellOutput[] {
    let n = 10;
    let target = '';
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-n' && i + 1 < args.length) { n = parseInt(args[i + 1], 10) || 10; i++; }
      else target = args[i];
    }
    if (!target) return [{ type: 'stderr', text: 'tail: missing file operand' }];
    const path = this.fs.parsePath(target);
    const content = this.fs.tail(path, n);
    return content ? this.output(content) : [{ type: 'stderr', text: `tail: ${target}: No such file or directory` }];
  }

  private cmdMkdir(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'mkdir: missing operand' }];
    const results: string[] = [];
    for (const arg of args) {
      const path = this.fs.parsePath(arg);
      const err = this.fs.mkdir(path);
      if (err) results.push(err);
    }
    return results.length > 0 ? [{ type: 'stderr', text: results.join('\n') }] : [];
  }

  private cmdTouch(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'touch: missing operand' }];
    const results: string[] = [];
    for (const arg of args) {
      const path = this.fs.parsePath(arg);
      const err = this.fs.touch(path);
      if (err) results.push(err);
    }
    return results.length > 0 ? [{ type: 'stderr', text: results.join('\n') }] : [];
  }

  private cmdRm(args: string[]): ShellOutput[] {
    let recursive = false;
    const targets: string[] = [];
    for (const arg of args) {
      if (arg === '-r' || arg === '-rf' || arg === '-fr') recursive = true;
      else targets.push(arg);
    }
    if (targets.length === 0) return [{ type: 'stderr', text: 'rm: missing operand' }];
    const results: string[] = [];
    for (const arg of targets) {
      const path = this.fs.parsePath(arg);
      const err = this.fs.rm(path, recursive);
      if (err) results.push(err);
    }
    return results.length > 0 ? [{ type: 'stderr', text: results.join('\n') }] : [];
  }

  private cmdCp(args: string[]): ShellOutput[] {
    if (args.length < 2) return [{ type: 'stderr', text: 'cp: missing file operand' }];
    const src = this.fs.parsePath(args[0]);
    const dest = this.fs.parsePath(args[1]);
    const err = this.fs.cp(src, dest);
    return err ? [{ type: 'stderr', text: err }] : [];
  }

  private cmdMv(args: string[]): ShellOutput[] {
    if (args.length < 2) return [{ type: 'stderr', text: 'mv: missing file operand' }];
    const src = this.fs.parsePath(args[0]);
    const dest = this.fs.parsePath(args[1]);
    const err = this.fs.mv(src, dest);
    return err ? [{ type: 'stderr', text: err }] : [];
  }

  private cmdChmod(args: string[]): ShellOutput[] {
    if (args.length < 2) return [{ type: 'stderr', text: 'chmod: missing operand' }];
    const mode = parseInt(args[0], 8);
    if (isNaN(mode)) return [{ type: 'stderr', text: 'chmod: invalid mode' }];
    const results: string[] = [];
    for (let i = 1; i < args.length; i++) {
      const path = this.fs.parsePath(args[i]);
      const err = this.fs.chmod(path, mode);
      if (err) results.push(err);
    }
    return results.length > 0 ? [{ type: 'stderr', text: results.join('\n') }] : [];
  }

  private cmdChown(args: string[]): ShellOutput[] {
    if (args.length < 2) return [{ type: 'stderr', text: 'chown: missing operand' }];
    const parts = args[0].split(':');
    const owner = parts[0];
    const group = parts[1];
    const results: string[] = [];
    for (let i = 1; i < args.length; i++) {
      const path = this.fs.parsePath(args[i]);
      const err = this.fs.chown(path, owner, group);
      if (err) results.push(err);
    }
    return results.length > 0 ? [{ type: 'stderr', text: results.join('\n') }] : [];
  }

  private cmdGrep(args: string[]): ShellOutput[] {
    if (args.length < 2) return [{ type: 'stderr', text: 'grep: missing pattern or file' }];
    const pattern = args[0];
    const results: string[] = [];
    for (let i = 1; i < args.length; i++) {
      const path = this.fs.parsePath(args[i]);
      const content = this.fs.grep(pattern, path);
      if (content) results.push(content);
    }
    return results.length > 0 ? this.output(results.join('\n')) : [];
  }

  private cmdFind(args: string[]): ShellOutput[] {
    if (args.length < 3) return [];
    const base = this.fs.parsePath(args[0]);
    let name = '';
    for (let i = 1; i < args.length; i++) {
      if (args[i] === '-name' && i + 1 < args.length) name = args[i + 1];
    }
    if (!name) return [{ type: 'stderr', text: 'find: missing -name pattern' }];
    const pattern = name.replace(/\*/g, '');
    return this.output(this.fs.find(base, pattern).join('\n'));
  }

  private cmdWc(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'wc: missing operand' }];
    const results: string[] = [];
    let totalLines = 0, totalWords = 0, totalChars = 0;
    for (const arg of args) {
      const path = this.fs.parsePath(arg);
      const stats = this.fs.wc(path);
      if (stats) {
        results.push(`${stats.lines} ${stats.words} ${stats.chars} ${arg}`);
        totalLines += stats.lines; totalWords += stats.words; totalChars += stats.chars;
      }
    }
    if (args.length > 1) results.push(`${totalLines} ${totalWords} ${totalChars} total`);
    return this.output(results.join('\n'));
  }

  private cmdSort(args: string[]): ShellOutput[] {
    let reverse = false;
    let target = '';
    for (const arg of args) {
      if (arg === '-r') reverse = true;
      else target = arg;
    }
    if (!target) return [{ type: 'stderr', text: 'sort: missing operand' }];
    const path = this.fs.parsePath(target);
    return this.output(this.fs.sort(path, reverse));
  }

  private cmdUniq(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'uniq: missing operand' }];
    const path = this.fs.parsePath(args[0]);
    return this.output(this.fs.uniq(path));
  }

  private cmdPs(args: string[]): ShellOutput[] {
    const showAll = args.includes('aux') || args.includes('-ef') || args.includes('a');
    const header = '  PID TTY          TIME CMD';
    const processes = showAll ? this.fs.processes : this.fs.processes.filter(p => p.user === this.fs.currentUser);
    const lines = processes.map(p => {
      const pid = String(p.pid).padStart(5);
      const time = '00:00:01';
      return `${pid} ?        00:00:00 ${p.name}`;
    });
    return this.output([header, ...lines].join('\n'));
  }

  private cmdKill(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'kill: missing operand' }];
    for (const arg of args) {
      const pid = parseInt(arg, 10);
      if (isNaN(pid)) return [{ type: 'stderr', text: `kill: ${arg}: invalid signal number` }];
      if (!this.fs.killProcess(pid)) return [{ type: 'stderr', text: `kill: ${pid}: No such process` }];
    }
    return [];
  }

  private cmdWho(): ShellOutput[] {
    const users = this.fs.who();
    return this.output(users.map(u => `${u.user.padEnd(8)} ${u.tty.padEnd(8)} ${u.login.padEnd(8)} (${u.from})`).join('\n'));
  }

  private cmdPing(args: string[]): ShellOutput[] {
    const target = args[0] || '192.168.1.1';
    const count = args.includes('-c') && args.length > args.indexOf('-c') + 1 ? parseInt(args[args.indexOf('-c') + 1], 10) || 4 : 4;
    const lines: string[] = [`PING ${target} (${target}) 56(84) bytes of data.`];
    const ips: Record<string, string> = { 'google.com': '142.250.80.46', 'example.com': '93.184.216.34', 'localhost': '127.0.0.1', 'kali': '192.168.1.100', 'metasploitable': '192.168.1.101' };
    const resolvedIp = ips[target] || target;
    for (let i = 1; i <= Math.min(count, 4); i++) {
      const ms = (10 + Math.random() * 5).toFixed(1);
      lines.push(`64 bytes from ${resolvedIp}: icmp_seq=${i} ttl=64 time=${ms} ms`);
    }
    lines.push('', `--- ${target} ping statistics ---`);
    lines.push(`${Math.min(count, 4)} packets transmitted, ${Math.min(count, 4)} received, 0% packet loss, time ${(count * 500)}ms`);
    return this.output(lines.join('\n'));
  }

  private cmdSudo(args: string[]): ShellOutput[] {
    if (args.length === 0) return [{ type: 'stderr', text: 'sudo: missing command' }];
    if (this.fs.currentUser === 'root') return this.executeSingle(args);
    const prevUser = this.fs.currentUser;
    this.fs.currentUser = 'root';
    this.fs.currentGroup = 'root';
    const result = this.executeSingle(args);
    this.fs.currentUser = prevUser;
    this.fs.currentGroup = prevUser === 'student' ? 'student' : 'root';
    if (result.length === 0 || result[0].type === 'stderr') return result;
    return result;
  }

  private cmdSu(args: string[]): ShellOutput[] {
    const targetUser = args[0] || 'root';
    if (targetUser === 'root') {
      this.fs.currentUser = 'root';
      this.fs.currentGroup = 'root';
      return this.output(`root@cybercamp:${this.fs.getCwd()}# `);
    }
    if (this.fs.parsePath(['etc', 'passwd']).some(() => true)) {
      this.fs.currentUser = targetUser;
      this.fs.currentGroup = targetUser;
      return this.output(`${targetUser}@cybercamp:${this.fs.getCwd()}$ `);
    }
    return [{ type: 'stderr', text: `su: user ${targetUser} does not exist` }];
  }
}
