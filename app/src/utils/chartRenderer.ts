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
      const nums = s.y.map(Number).filter(v => !isNaN(v));
      const maxVal = nums.length > 0 ? Math.max(0, ...nums) : 0;
      const minVal = nums.length > 0 ? Math.min(0, ...nums) : 0;
      const range = maxVal - minVal || 1;
      const barWidth = 30;
      for (let i = 0; i < s.x.length; i++) {
        const label = String(s.x[i]).padEnd(labelMax);
        const val = Number(s.y[i]);
        if (isNaN(val)) { lines.push(` ${label} | NaN`); continue; }
        const barLen = Math.round(((val - minVal) / range) * barWidth);
        const bar = '█'.repeat(Math.max(0, barLen)) + (barLen > 0 ? '' : '▏');
        lines.push(` ${label} | ${bar} ${val}`);
      }
    } else if (s.type === 'line') {
      const nums = s.y.map(Number).filter(v => !isNaN(v));
      if (nums.length === 0) continue;
      const maxVal = Math.max(...nums, 0);
      const minVal = Math.min(...nums, 0);
      const range = maxVal - minVal || 1;
      const height = 8;
      const points = s.y.map((v, i) => ({
        x: String(s.x[i] ?? i),
        y: Number(v),
        row: !isNaN(Number(v)) ? Math.round(((Number(v) - minVal) / range) * (height - 1)) : -1
      }));

      for (let r = height - 1; r >= 0; r--) {
        const row = points.map(p => p.row === r ? '*' : ' ');
        const valAtRow = points.find(p => p.row === r);
        const label = valAtRow && valAtRow.row >= 0 ? String(Math.round((minVal + (range * r) / (height - 1)) * 100) / 100).padStart(8) : '        ';
        lines.push(` ${label} |${row.join(' ')}`);
      }
      lines.push(` ${'        '.padStart(8)} ${'─'.repeat(Math.max(0, points.filter(p => !isNaN(p.y)).length * 2 - 1))}`);
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
