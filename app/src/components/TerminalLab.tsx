import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface TerminalLabProps {
  onCommand?: (cmd: string) => void;
}

export function TerminalLab({ onCommand }: TerminalLabProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      theme: {
        background: '#0d1117',
        foreground: '#c9d1d9',
        cursor: '#58a6ff',
        selectionBackground: '#264f78',
        black: '#484f58',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39d353',
        white: '#c9d1d9',
        brightBlack: '#6e7681',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d364',
        brightWhite: '#f0f6fc',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    termRef.current = term;

    // Check if we're on HTTPS (Vercel) or HTTP (local)
    const isHttps = window.location.protocol === 'https:';
    
    if (isHttps) {
      // On Vercel - can't connect to local WebSocket
      setError('Terminal only works locally');
      term.write('\r\n\x1b[33m=== Real Terminal Not Available ===\x1b[0m\r\n\r\n');
      term.write('\x1b[36mThe real terminal only works when running the site locally.\x1b[0m\r\n\r\n');
      term.write('\x1b[37mTo use the real terminal:\x1b[0m\r\n');
      term.write('\x1b[32m1. Open your WSL2 Ubuntu terminal\x1b[0m\r\n');
      term.write('\x1b[32m2. Or run the site locally: npm run dev\x1b[0m\r\n\r\n');
      term.write('\x1b[37mFor now, practice the commands shown in the exercises\x1b[0m\r\n');
      term.write('\x1b[37min your real WSL2 terminal.\x1b[0m\r\n\r\n');
    } else {
      // Local - try to connect to WebSocket
      const connectWs = () => {
        const wsUrl = `ws://${window.location.hostname}:4959`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setConnected(true);
          setError(null);
          term.write('\r\n\x1b[32mConnected to real terminal!\x1b[0m\r\n');
          term.write('\x1b[36mType commands just like in your WSL2 Ubuntu terminal.\x1b[0m\r\n\r\n');
        };

        ws.onmessage = (event) => {
          term.write(event.data);
        };

        ws.onclose = () => {
          setConnected(false);
          term.write('\r\n\x1b[31mDisconnected from terminal server.\x1b[0m\r\n');
        };

        ws.onerror = () => {
          setConnected(false);
          setError('Could not connect to terminal server');
          term.write('\r\n\x1b[31mCould not connect to terminal server.\x1b[0m\r\n');
          term.write('\x1b[33mMake sure the server is running: npm run dev\x1b[0m\r\n');
        };

        wsRef.current = ws;
      };

      connectWs();
    }

    // Handle user input
    term.onData((data) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(data);
      }
      if (onCommand && data === '\r') {
        const line = term.buffer.active.getLine(term.buffer.active.cursorY)?.translateToString(true) || '';
        onCommand(line.trim());
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      wsRef.current?.close();
      term.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-400 ml-2">
          {connected ? (
            <span className="text-green-400">Connected to WSL2 Ubuntu</span>
          ) : error ? (
            <span className="text-yellow-400">{error}</span>
          ) : (
            <span className="text-yellow-400">Connecting...</span>
          )}
        </span>
      </div>
      <div ref={terminalRef} className="flex-1" style={{ minHeight: '400px' }} />
    </div>
  );
}
