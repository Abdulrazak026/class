// Python executor stub - students should use real Python in WSL2
export interface PythonOutput {
  text: string;
  type: 'stdout' | 'stderr';
}

export function executePython(code: string): PythonOutput[] {
  return [{
    text: 'This is a simulated environment. For real Python practice:\n\n1. Open VS Code (installed in Week 5)\n2. Create a new file: File → New File → save as .py\n3. Open the integrated terminal: Ctrl+`\n4. Run with: python3 filename.py\n\nYour WSL2 Ubuntu terminal has Python 3 installed.',
    type: 'stdout'
  }];
}
