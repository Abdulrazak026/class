interface PlotSeries {
  type: 'line' | 'bar';
  x: any[];
  y: any[];
  label?: string;
  color?: string;
  marker?: string;
  linestyle?: string;
}

export function generateChart(series: PlotSeries[], title: string, xlabel: string, ylabel: string): string {
  if (series.length === 0) return '';

  const lines: string[] = [];
  if (title) lines.push(` ${title} `);
  lines.push('');

  for (const s of series) {
    if (!s.x || !s.y || s.x.length === 0 || s.y.length === 0) continue;
    if (s.type === 'bar') {
      const labelMax = Math.max(...s.x.map(v => String(v).length), 1);
      const maxVal = Math.max(...s.y.map(Number), 0);
      const barWidth = 30;
      for (let i = 0; i < s.x.length; i++) {
        const label = String(s.x[i]).padEnd(labelMax);
        const val = Number(s.y[i]) || 0;
        const barLen = maxVal > 0 ? Math.round((val / maxVal) * barWidth) : 0;
        const bar = '█'.repeat(barLen) + (barLen > 0 ? '' : '▏');
        lines.push(` ${label} | ${bar} ${val}`);
      }
    } else if (s.type === 'line') {
      const maxVal = Math.max(...s.y.map(Number), 0);
      const minVal = Math.min(...s.y.map(Number), 0);
      if (s.y.length === 0) continue;
      const range = maxVal - minVal || 1;
      const height = 8;
      const points = s.y.map((v, i) => ({
        x: String(s.x[i] ?? i),
        y: Number(v),
        row: Math.round(((Number(v) - minVal) / range) * (height - 1))
      }));

      for (let r = height - 1; r >= 0; r--) {
        const row = points.map(p => p.row === r ? '*' : ' ');
        const valAtRow = points.find(p => p.row === r);
        const label = valAtRow ? String(Math.round((minVal + (range * r) / (height - 1)) * 100) / 100).padStart(8) : '        ';
        lines.push(` ${label} |${row.join(' ')}`);
      }
      lines.push(` ${'        '.padStart(8)} ${'─'.repeat(Math.max(0, points.length * 2 - 1))}`);
      const xLabels = points.map(p => String(p.x).padEnd(3)).join(' ');
      lines.push(` ${'        '.padStart(8)} ${xLabels}`);
    }
    lines.push('');
  }

  if (xlabel || ylabel) {
    const parts: string[] = [];
    if (xlabel) parts.push(`X: ${xlabel}`);
    if (ylabel) parts.push(`Y: ${ylabel}`);
    lines.push(` ${parts.join(' | ')}`);
    lines.push('');
  }

  const labelSet = new Set(series.map(s => s.label).filter(Boolean));
  if (labelSet.size > 0) {
    lines.push(' Legend:');
    for (const s of series) {
      if (s.label) lines.push(`   ${s.label}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
