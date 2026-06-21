export type FileType = 'file' | 'dir';

export interface VNode {
  name: string;
  type: FileType;
  content?: string;
  children?: Map<string, VNode>;
  permissions: number;
  owner: string;
  group: string;
  size: number;
  modified: Date;
}

export interface ProcessEntry {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  mem: number;
  state: string;
  command: string;
}

export class VirtualFS {
  root: VNode;
  cwd: string[];
  currentUser: string;
  currentGroup: string;
  processes: ProcessEntry[];
  private pidCounter: number;

  constructor() {
    this.root = { name: '/', type: 'dir', permissions: 0o755, owner: 'root', group: 'root', size: 4096, modified: new Date(), children: new Map() };
    this.cwd = [];
    this.currentUser = 'student';
    this.currentGroup = 'student';
    this.processes = [];
    this.pidCounter = 1000;
    this.initFilesystem();
  }

  private initFilesystem() {
    this.mkdirp(['home', 'student']);
    this.mkdirp(['home', 'student', 'projects']);
    this.mkdirp(['home', 'student', 'logs']);
    this.mkdirp(['home', 'student', 'scripts']);
    this.mkdirp(['etc']);
    this.mkdirp(['etc', 'ssh']);
    this.mkdirp(['etc', 'network']);
    this.mkdirp(['var']);
    this.mkdirp(['var', 'log']);
    this.mkdirp(['var', 'log', 'auth']);
    this.mkdirp(['tmp']);
    this.mkdirp(['bin']);
    this.mkdirp(['usr', 'bin']);
    this.mkdirp(['usr', 'local', 'bin']);
    this.mkdirp(['proc']);
    this.mkdirp(['dev']);
    this.mkdirp(['opt']);

    this.writeFile(['etc', 'hostname'], 'cybercamp-lab\n', 0o644, 'root', 'root');
    this.writeFile(['etc', 'hosts'], '127.0.0.1\tlocalhost\n127.0.1.1\tcybercamp-lab\n192.168.1.100\tkali\n192.168.1.101\tmetasploitable\n', 0o644, 'root', 'root');
    this.writeFile(['etc', 'passwd'], 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nstudent:x:1000:1000:Student,,,:/home/student:/bin/bash\n', 0o644, 'root', 'root');
    this.writeFile(['etc', 'shadow'], 'root:$6$xyz:19726:0:99999:7:::\ndaemon:*:19726:0:99999:7:::\nstudent:$6$abc:19726:0:99999:7:::\n', 0o600, 'root', 'root');
    this.writeFile(['etc', 'ssh', 'sshd_config'], '# SSH server configuration\nPort 22\nPermitRootLogin no\nPasswordAuthentication yes\nPubkeyAuthentication yes\nAllowUsers student\n', 0o644, 'root', 'root');
    this.writeFile(['etc', 'network', 'interfaces'], '# Network interfaces\nauto lo\niface lo inet loopback\n\nauto eth0\niface eth0 inet static\n    address 192.168.1.100\n    netmask 255.255.255.0\n    gateway 192.168.1.1\n    dns-nameservers 8.8.8.8 8.8.4.4\n', 0o644, 'root', 'root');
    this.writeFile(['etc', 'resolv.conf'], 'nameserver 8.8.8.8\nnameserver 8.8.4.4\nsearch cybercamp.local\n', 0o644, 'root', 'root');

    this.writeFile(['var', 'log', 'auth', 'auth.log'], 'Jun 15 08:12:34 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:36 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:38 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:40 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:42 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:44 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:46 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:48 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:50 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:12:52 cybercamp sshd[1234]: Failed password for root from 10.0.0.5 port 54321 ssh2\nJun 15 08:13:00 cybercamp sshd[1234]: Connection closed by authenticating user root 10.0.0.5 port 54321 [preauth]\nJun 15 09:00:00 cybercamp CRON[1300]: pam_unix(cron:session): session opened for user root by (uid=0)\nJun 15 09:00:01 cybercamp CRON[1300]: pam_unix(cron:session): session closed for user root\nJun 15 10:30:00 cybercamp sshd[1400]: Accepted password for student from 192.168.1.50 port 34567 ssh2\nJun 15 10:30:00 cybercamp sshd[1400]: pam_unix(sshd:session): session opened for user student by (uid=0)\n', 0o640, 'root', 'adm');
    this.writeFile(['var', 'log', 'syslog'], 'Jun 15 08:00:00 cybercamp kernel: [    0.000000] Linux version 6.1.0-kali5-amd64\nJun 15 08:00:01 cybercamp kernel: [    0.123456] CPU: Intel Core i7-12700H (14 cores)\nJun 15 08:00:02 cybercamp systemd[1]: Starting systemd\nJun 15 08:00:05 cybercamp systemd[1]: Reached target Network\nJun 15 08:00:06 cybercamp sshd[1]: Server listening on 0.0.0.0 port 22.\nJun 15 10:30:01 cybercamp systemd[1]: Started session 3 of user student.\n', 0o640, 'root', 'adm');
    this.writeFile(['var', 'log', 'dmesg'], '[    0.000000] Linux version 6.1.0-kali5-amd64 (debian-kernel@lists.debian.org)\n[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.1.0-kali5-amd64 root=UUID=abc123 ro quiet\n[    0.123456] CPU0: Intel(R) Core(TM) i7-12700H @ 2.30GHz\n[    0.234567] Memory: 7982MB available\n[    0.345678] Kernel/User page tables isolation: enabled\n[    1.234567] eth0: link up, 1000Mbps, full-duplex\n', 0o640, 'root', 'adm');
    this.writeFile(['home', 'student', 'README.txt'], 'Welcome to CYBERCAMP-2026 Home Lab!\n\nThis is your personal security testing environment.\nUse this lab to practice commands, test exploits,\nand complete course exercises safely.\n\nDirectories:\n  /home/student/projects/  - Course project files\n  /home/student/logs/       - Security logs to analyze\n  /home/student/scripts/    - Bash/Python scripts\n  /var/log/                 - System logs for analysis\n  /etc/                     - System configuration\n\nHappy Hacking!\n', 0o644, 'student', 'student');

    this.writeFile(['home', 'student', 'projects', 'port_scan.sh'], '#!/bin/bash\n# Simple port scanner\nif [ -z "$1" ]; then\n  echo "Usage: $0 <target-ip>"\n  exit 1\nfi\necho "Scanning $1..."\nfor port in 22 80 443 3306 8080; do\n  timeout 1 bash -c "echo >/dev/tcp/$1/$port" 2>/dev/null &&\n    echo "Port $port is OPEN" ||\n    echo "Port $port is closed"\ndone\n', 0o755, 'student', 'student');
    this.writeFile(['home', 'student', 'scripts', 'log_analyzer.sh'], '#!/bin/bash\n# Analyze auth log for failed SSH attempts\nLOGFILE="/var/log/auth/auth.log"\nif [ ! -f "$LOGFILE" ]; then\n  echo "Error: $LOGFILE not found"\n  exit 1\nfi\necho "=== Failed SSH Login Analysis ===="\necho "IP Address        |  Attempts"\necho "------------------|----------"\ngrep "Failed password" "$LOGFILE" | awk \'{print $11}\' | sort | uniq -c | sort -nr | while read count ip; do\n  printf "%-18s | %s\n" "$ip" "$count"\ndone\n', 0o755, 'student', 'student');
    this.writeFile(['home', 'student', 'scripts', 'sys_info.sh'], '#!/bin/bash\necho "=== System Information ===="\necho "Hostname: $(hostname)"\necho "Kernel: $(uname -r)"\necho "Uptime: $(uptime -p)"\necho "Memory:"\nfree -h | grep Mem\necho "Disk:"\ndf -h / | tail -1\necho "Users:"\nwho\necho "Listening ports:"\nss -tlnp 2>/dev/null || netstat -tlnp\n', 0o755, 'student', 'student');

    this.writeFile(['home', 'student', 'logs', 'access.log'], '192.168.1.50 - - [15/Jun/2026:08:15:23 +0000] "GET /index.html HTTP/1.1" 200 1234\n192.168.1.50 - - [15/Jun/2026:08:15:24 +0000] "GET /images/logo.png HTTP/1.1" 200 5678\n10.0.0.5 - - [15/Jun/2026:08:16:00 +0000] "GET /wp-admin HTTP/1.1" 404 234\n10.0.0.5 - - [15/Jun/2026:08:16:01 +0000] "GET /wp-login.php HTTP/1.1" 200 8901\n10.0.0.5 - - [15/Jun/2026:08:16:02 +0000] "POST /wp-login.php HTTP/1.1" 200 8901\n10.0.0.5 - - [15/Jun/2026:08:16:03 +0000] "POST /wp-login.php HTTP/1.1" 200 3456\n10.0.0.5 - - [15/Jun/2026:08:16:04 +0000] "POST /wp-login.php HTTP/1.1" 200 3456\n192.168.1.100 - - [15/Jun/2026:09:00:00 +0000] "GET /index.html HTTP/1.1" 200 1234\n', 0o644, 'student', 'student');

    this.spawnProcess('systemd', 'root', 0.1, 0.5, '/sbin/init');
    this.spawnProcess('sshd', 'root', 0.0, 0.3, '/usr/sbin/sshd -D');
    this.spawnProcess('bash', 'student', 0.0, 0.1, '-bash');
    this.spawnProcess('cron', 'root', 0.0, 0.2, '/usr/sbin/cron -f');
    this.spawnProcess('rsyslogd', 'root', 0.0, 0.4, '/usr/sbin/rsyslogd -n');
  }

  private mkdirp(path: string[]) {
    let node = this.root;
    for (const part of path) {
      if (!node.children!.has(part)) {
        node.children!.set(part, { name: part, type: 'dir', permissions: 0o755, owner: 'root', group: 'root', size: 4096, modified: new Date(), children: new Map() });
      }
      node = node.children!.get(part)!;
    }
  }

  private resolve(path: string[]): { node?: VNode; parent?: VNode; name?: string } {
    const parts = this.normalizePath(path);
    let node = this.root;
    let parent: VNode | undefined;
    for (let i = 0; i < parts.length; i++) {
      if (node.type !== 'dir') return { node: undefined, parent, name: parts[i] };
      parent = node;
      const child = node.children!.get(parts[i]);
      if (!child) return { node: undefined, parent, name: parts[i] };
      node = child;
    }
    return { node, parent, name: parts[parts.length - 1] || '/' };
  }

  normalizePath(path: string[]): string[] {
    const parts: string[] = [];
    for (const p of path) {
      if (!p || p === '.') continue;
      if (p === '..') { if (parts.length > 0) parts.pop(); }
      else parts.push(p);
    }
    return parts;
  }

  parsePath(input: string | string[]): string[] {
    if (Array.isArray(input)) {
      return this.normalizePath(input);
    }
    if (!input || input === '~') return ['home', this.currentUser];
    if (input.startsWith('~/') || input === '~') return ['home', this.currentUser, ...input.slice(2).split('/').filter(Boolean)];
    if (input.startsWith('/')) return input.split('/').filter(Boolean);
    return [...this.cwd, ...input.split('/').filter(Boolean)];
  }

  getCwd(): string { return '/' + this.cwd.join('/'); }

  private checkPerm(node: VNode, write = false): boolean {
    if (this.currentUser === 'root') return true;
    const isOwner = node.owner === this.currentUser;
    if (isOwner) {
      const perm = write ? 0x2 : 0x4;
      return !!(node.permissions & (perm << 6));
    }
    const isGroup = node.group === this.currentGroup;
    if (isGroup) {
      const perm = write ? 0x2 : 0x4;
      return !!(node.permissions & (perm << 3));
    }
    const perm = write ? 0x2 : 0x4;
    return !!(node.permissions & perm);
  }

  readFile(path: string[]): string | null {
    const { node } = this.resolve(this.parsePath(path));
    if (!node || node.type !== 'file') return null;
    if (!this.checkPerm(node)) return null;
    return node.content || '';
  }

  writeFile(path: string[], content: string, perms = 0o644, owner = this.currentUser, group = this.currentGroup) {
    const parts = this.parsePath(path);
    const fileName = parts.pop()!;
    const { node: dir } = this.resolve(parts);
    if (!dir || dir.type !== 'dir') return;
    const existing = dir.children!.get(fileName);
    if (existing && existing.type === 'dir') return;
    const now = new Date();
    dir.children!.set(fileName, { name: fileName, type: 'file', content, permissions: perms, owner, group, size: content.length, modified: now });
  }

  ls(path: string[]): { name: string; type: FileType; perms: string; owner: string; group: string; size: number; modified: Date; mode: number }[] {
    const { node } = this.resolve(this.parsePath(path));
    if (!node || node.type !== 'dir') return [];
    const entries: { name: string; type: FileType; perms: string; owner: string; group: string; size: number; modified: Date; mode: number }[] = [];
    for (const [name, child] of node.children!) {
      entries.push({ name, type: child.type, perms: this.formatPerms(child.permissions, child.type), owner: child.owner, group: child.group, size: child.type === 'dir' ? 4096 : (child.content?.length || 0), modified: child.modified, mode: child.permissions });
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    return entries;
  }

  mkdir(path: string[]) {
    const parts = this.parsePath(path);
    const dirName = parts.pop()!;
    const { node: parent } = this.resolve(parts);
    if (!parent || parent.type !== 'dir') return 'mkdir: cannot create directory: No such file or directory';
    if (parent.children!.has(dirName)) return 'mkdir: cannot create directory: File exists';
    parent.children!.set(dirName, { name: dirName, type: 'dir', permissions: 0o755, owner: this.currentUser, group: this.currentGroup, size: 4096, modified: new Date(), children: new Map() });
    return '';
  }

  touch(path: string[]) {
    const parts = this.parsePath(path);
    const fileName = parts.pop()!;
    const { node: parent } = this.resolve(parts);
    if (!parent || parent.type !== 'dir') return 'touch: cannot touch: No such file or directory';
    const existing = parent.children!.get(fileName);
    if (existing && existing.type === 'dir') return 'touch: cannot touch: Is a directory';
    const now = new Date();
    if (existing) { existing.modified = now; }
    else { parent.children!.set(fileName, { name: fileName, type: 'file', content: '', permissions: 0o644, owner: this.currentUser, group: this.currentGroup, size: 0, modified: now }); }
    return '';
  }

  rm(path: string[], recursive = false) {
    const parts = this.parsePath(path);
    const fileName = parts.pop()!;
    const { node: parent } = this.resolve(parts);
    if (!parent || parent.type !== 'dir') return 'rm: cannot remove: No such file or directory';
    const target = parent.children!.get(fileName);
    if (!target) return 'rm: cannot remove: No such file or directory';
    if (target.type === 'dir' && !recursive) return 'rm: cannot remove: Is a directory';
    if (target.type === 'dir' && target.children!.size > 0 && !recursive) return 'rm: cannot remove: Directory not empty';
    parent.children!.delete(fileName);
    return '';
  }

  cp(src: string[], dest: string[]) {
    const srcParts = this.parsePath(src);
    const { node: srcNode } = this.resolve(srcParts);
    if (!srcNode) return 'cp: cannot stat: No such file or directory';
    const destParts = this.parsePath(dest);
    const destName = destParts.pop()!;
    const { node: destParent } = this.resolve(destParts);
    if (!destParent || destParent.type !== 'dir') return 'cp: cannot copy: No such file or directory';
    const now = new Date();
    if (srcNode.type === 'dir') {
      const newDir: VNode = { name: destName, type: 'dir', permissions: srcNode.permissions, owner: this.currentUser, group: this.currentGroup, size: 4096, modified: now, children: new Map() };
      this.copyTree(srcNode, newDir);
      destParent.children!.set(destName, newDir);
    } else {
      destParent.children!.set(destName, { name: destName, type: 'file', content: srcNode.content, permissions: srcNode.permissions, owner: this.currentUser, group: this.currentGroup, size: srcNode.content?.length || 0, modified: now });
    }
    return '';
  }

  private copyTree(src: VNode, dest: VNode) {
    if (src.type !== 'dir') return;
    for (const [name, child] of src.children!) {
      const now = new Date();
      if (child.type === 'dir') {
        const newDir: VNode = { name, type: 'dir', permissions: child.permissions, owner: this.currentUser, group: this.currentGroup, size: 4096, modified: now, children: new Map() };
        this.copyTree(child, newDir);
        dest.children!.set(name, newDir);
      } else {
        dest.children!.set(name, { name, type: 'file', content: child.content, permissions: child.permissions, owner: this.currentUser, group: this.currentGroup, size: child.content?.length || 0, modified: now });
      }
    }
  }

  mv(src: string[], dest: string[]) {
    const srcParts = this.parsePath(src);
    const srcName = srcParts.pop()!;
    const { node: srcParent } = this.resolve(srcParts);
    if (!srcParent) return 'mv: cannot move: No such file or directory';
    const srcNode = srcParent.children!.get(srcName);
    if (!srcNode) return 'mv: cannot move: No such file or directory';
    const destParts = this.parsePath(dest);
    const destName = destParts.pop()!;
    const { node: destParent } = this.resolve(destParts);
    if (!destParent || destParent.type !== 'dir') return 'mv: cannot move: No such file or directory';
    srcParent.children!.delete(srcName);
    destParent.children!.set(destName, srcNode);
    return '';
  }

  chmod(path: string[], mode: number) {
    const { node } = this.resolve(this.parsePath(path));
    if (!node) return 'chmod: cannot access: No such file or directory';
    node.permissions = mode;
    return '';
  }

  chown(path: string[], owner: string, group?: string) {
    const { node } = this.resolve(this.parsePath(path));
    if (!node) return 'chown: cannot access: No such file or directory';
    if (owner) node.owner = owner;
    if (group) node.group = group;
    return '';
  }

  grep(pattern: string, path: string[]): string {
    const content = this.readFile(path);
    if (!content) return '';
    try {
      const re = new RegExp(pattern, 'gm');
      const matches = content.match(re);
      if (!matches) return '';
      return content.split('\n').filter(l => re.test(l)).join('\n');
    } catch { return 'grep: Invalid pattern'; }
  }

  find(basePath: string[], name: string): string[] {
    const { node } = this.resolve(this.parsePath(basePath));
    if (!node || node.type !== 'dir') return [];
    const results: string[] = [];
    const walk = (n: VNode, path: string) => {
      if (n.name.includes(name)) results.push(`${path}/${n.name}`);
      if (n.type === 'dir') {
        for (const [, child] of n.children!) walk(child, `${path}/${n.name}`);
      }
    };
    walk(node, '');
    return results;
  }

  cat(path: string[]): string {
    return this.readFile(path) || '';
  }

  head(path: string[], n = 10): string {
    const content = this.readFile(path);
    if (!content) return '';
    return content.split('\n').slice(0, n).join('\n');
  }

  tail(path: string[], n = 10): string {
    const content = this.readFile(path);
    if (!content) return '';
    const lines = content.split('\n');
    return lines.slice(Math.max(0, lines.length - n)).join('\n');
  }

  wc(path: string[]): { lines: number; words: number; chars: number } | null {
    const content = this.readFile(path);
    if (content === null) return null;
    const lines = content.split('\n');
    const words = content.split(/\s+/).filter(Boolean).length;
    return { lines: lines.length, words, chars: content.length };
  }

  sort(path: string[], reverse = false): string {
    const content = this.readFile(path);
    if (!content) return '';
    const lines = content.split('\n').filter(l => l);
    lines.sort();
    if (reverse) lines.reverse();
    return lines.join('\n');
  }

  uniq(path: string[]): string {
    const content = this.readFile(path);
    if (!content) return '';
    const lines = content.split('\n').filter(l => l);
    return lines.filter((v, i, a) => i === 0 || v !== a[i - 1]).join('\n');
  }

  spawnProcess(name: string, user: string, cpu: number, mem: number, command: string): number {
    const pid = this.pidCounter++;
    this.processes.push({ pid, name, user, cpu, mem, state: 'S', command });
    return pid;
  }

  killProcess(pid: number): boolean {
    const idx = this.processes.findIndex(p => p.pid === pid);
    if (idx === -1) return false;
    this.processes.splice(idx, 1);
    return true;
  }

  who(): { user: string; tty: string; from: string; login: string }[] {
    return [
      { user: this.currentUser, tty: 'pts/0', from: '192.168.1.50', login: '10:30' },
      { user: 'root', tty: 'tty1', from: '', login: '08:00' },
    ];
  }

  private formatPerms(mode: number, type: FileType): string {
    const t = type === 'dir' ? 'd' : '-';
    const r = (mode & 0o400) ? 'r' : '-';
    const w = (mode & 0o200) ? 'w' : '-';
    const x = (mode & 0o100) ? 'x' : '-';
    const rr = (mode & 0o040) ? 'r' : '-';
    const ww = (mode & 0o020) ? 'w' : '-';
    const xx = (mode & 0o010) ? 'x' : '-';
    const rrr = (mode & 0o004) ? 'r' : '-';
    const www = (mode & 0o002) ? 'w' : '-';
    const xxx = (mode & 0o001) ? 'x' : '-';
    const suid = (mode & 0o4000) ? 's' : '';
    return `${t}${r}${w}${x}${rr}${ww}${xx}${rrr}${www}${xxx}${suid}`;
  }

  formatLsLong(entries: { name: string; type: FileType; perms: string; owner: string; group: string; size: number; modified: Date }[]): string {
    if (entries.length === 0) return '';
    const lines = entries.map(e => {
      const m = e.modified;
      const date = `${m.toString().slice(4, 7)} ${String(m.getDate()).padStart(2, '0')} ${String(m.getHours()).padStart(2, '0')}:${String(m.getMinutes()).padStart(2, '0')}`;
      return `${e.perms} ${e.owner.padEnd(8)} ${e.group.padEnd(8)} ${String(e.size).padStart(8)} ${date} ${e.name}`;
    });
    return lines.join('\n');
  }
}
