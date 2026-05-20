import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { DEMO_PAGES, DEMO_BASE_URL, getPageForUrl } from '../utils/demoSiteData';

function parseHtmlToBlocks(html: string): { type: string; content: string; level?: number; tag?: string; attrs?: Record<string, string> }[] {
  const blocks: { type: string; content: string; level?: number; tag?: string; attrs?: Record<string, string> }[] = [];
  const tagRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>/g;
  const selfClosingRegex = /<(\w+)([^>]*)\/>/g;
  let lastIndex = 0;
  let match;

  const parseAttrs = (attrStr: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)\s*=\s*"([^"]*)"/g;
    let am;
    while ((am = attrRegex.exec(attrStr))) attrs[am[1]] = am[2];
    return attrs;
  };

  const extractText = (text: string): string => text.replace(/<[^>]*>/g, '').trim();

  while ((match = tagRegex.exec(html)) !== null) {
    const [, tag, attrStr, inner] = match;
    const attrs = parseAttrs(attrStr);

    if (tag === 'h1') blocks.push({ type: 'heading', content: extractText(inner), level: 1, tag, attrs });
    else if (tag === 'h2') blocks.push({ type: 'heading', content: extractText(inner), level: 2, tag, attrs });
    else if (tag === 'h3') blocks.push({ type: 'heading', content: extractText(inner), level: 3, tag, attrs });
    else if (tag === 'p') {
      const text = extractText(inner);
      if (text) blocks.push({ type: 'text', content: text, tag, attrs });
    }
    else if (tag === 'nav') {
      const links = extractText(inner);
      blocks.push({ type: 'nav', content: links, tag, attrs });
    }
    else if (tag === 'table') {
      const rows: string[][] = [];
      const headerCells: string[] = [];
      const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
      let rm;
      while ((rm = rowRegex.exec(inner)) !== null) {
        const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g;
        const cells: string[] = [];
        let cm;
        while ((cm = cellRegex.exec(rm[1])) !== null) cells.push(extractText(cm[1]));
        if (cells.length > 0) {
          const isHeader = rm[0].includes('<th');
          if (isHeader) headerCells.push(...cells);
          else rows.push(cells);
        }
      }
      if (headerCells.length > 0) blocks.push({ type: 'table-header', content: headerCells.join('|'), tag, attrs });
      for (const row of rows) blocks.push({ type: 'table-row', content: row.join('|'), tag, attrs });
    }
    else if (tag === 'article') {
      const articleText = extractText(inner);
      if (articleText) blocks.push({ type: 'article', content: articleText, tag, attrs });
    }
    else if (tag === 'div' && attrs.class) {
      const divText = extractText(inner);
      if (divText && attrs.class !== 'product-list') {
        blocks.push({ type: 'div', content: divText, tag, attrs });
      }
    }
    else if (tag === 'span') {
      const spanText = extractText(inner);
      if (spanText) blocks.push({ type: 'span', content: spanText, tag, attrs });
    }
    else if (tag === 'footer') {
      const footerText = extractText(inner);
      if (footerText) blocks.push({ type: 'footer', content: footerText, tag, attrs });
    }
  }

  return blocks;
}

function ProductCard({ html }: { html: string }) {
  const nameMatch = html.match(/<h3>(.*?)<\/h3>/);
  const catMatch = html.match(/<span class="category">(.*?)<\/span>/);
  const priceMatch = html.match(/<span class="price">(.*?)<\/span>/);
  const ratingMatch = html.match(/<span class="rating">(.*?)<\/span>/);
  const name = nameMatch?.[1] || '';
  const cat = catMatch?.[1] || '';
  const price = priceMatch?.[1] || '';
  const rating = ratingMatch?.[1] || '';

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-accent/40 transition-colors">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        <span className="text-[11px] text-gray-500">{cat}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-amber-600">&#9733; {rating}</span>
        <span className="text-sm font-bold text-accent">{price}</span>
      </div>
    </div>
  );
}

function ProductsPage({ html }: { html: string }) {
  const productRegex = /<div class="product"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  const products: string[] = [];
  let m;
  while ((m = productRegex.exec(html)) !== null) {
    products.push(m[1]);
  }

  return (
    <div className="space-y-2">
      {products.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Loading products...</p>
      ) : (
        products.map((p, i) => <ProductCard key={i} html={p} />)
      )}
    </div>
  );
}

function CustomersPage({ html }: { html: string }) {
  const rows: string[][] = [];
  const headers: string[] = [];
  const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
  let rm;
  while ((rm = rowRegex.exec(html)) !== null) {
    const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g;
    const cells: string[] = [];
    let cm;
    while ((cm = cellRegex.exec(rm[1])) !== null) cells.push(cm[1].replace(/<[^>]*>/g, ''));
    if (cells.length > 0) {
      if (rm[0].includes('<th')) headers.push(...cells);
      else rows.push(cells);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((h, i) => <th key={i} className="px-3 py-2 font-semibold text-gray-700">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              {row.map((cell, j) => <td key={j} className="px-3 py-2 text-gray-600">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlogPage({ html }: { html: string }) {
  const articles: { title: string; meta: string; text: string }[] = [];
  const articleRegex = /<article[\s\S]*?<h3>(.*?)<\/h3>[\s\S]*?<p class="meta">(.*?)<\/p>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/article>/g;
  let m;
  while ((m = articleRegex.exec(html)) !== null) {
    articles.push({ title: m[1], meta: m[2].replace(/<[^>]*>/g, ''), text: m[3].replace(/<[^>]*>/g, '') });
  }

  return (
    <div className="space-y-4">
      {articles.map((a, i) => (
        <div key={i} className="p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="text-sm font-bold text-gray-900">{a.title}</h4>
          <p className="text-[11px] text-gray-400 mt-1">{a.meta}</p>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">{a.text}</p>
        </div>
      ))}
    </div>
  );
}

function renderPageContent(html: string, currentPath: string) {
  if (currentPath === '/products') return <ProductsPage html={html} />;
  if (currentPath === '/customers') return <CustomersPage html={html} />;
  if (currentPath === '/blog') return <BlogPage html={html} />;
  const blocks = parseHtmlToBlocks(html);
  return (
    <div className="space-y-2 text-sm text-gray-700">
      {blocks.filter(b => b.type !== 'nav' && b.type !== 'footer').map((b, i) => (
        <div key={i} className={b.type === 'heading' ? `text-${b.level === 1 ? 'xl' : b.level === 2 ? 'lg' : 'base'} font-bold text-gray-900` : ''}>
          {b.content}
        </div>
      ))}
    </div>
  );
}

export function DemoSite({ topicTitle, topicId }: { topicTitle?: string; topicId?: string }) {
  const [currentPath, setCurrentPath] = useState('/products');
  const currentPage = getPageForUrl(DEMO_BASE_URL + currentPath);

  const navLinks = DEMO_PAGES.map(p => ({ label: p.url.replace('/', '').charAt(0).toUpperCase() + p.url.slice(2), path: p.url }));

  const currentIdx = DEMO_PAGES.findIndex(p => p.url === currentPath);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-600" />
          <span className="text-sm font-semibold text-slate-800">Demo Site</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Practice</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPath('/products')}
            className="text-[10px] px-2 py-1 rounded text-slate-600 hover:text-slate-800 hover:bg-surface transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="flex items-center gap-1 px-3 pt-2">
          {['Products', 'Customers', 'Blog'].map((label, i) => {
            const path = ['/products', '/customers', '/blog'][i];
            return (
              <button key={label} onClick={() => setCurrentPath(path)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-t-lg transition-colors ${
                  currentPath === path ? 'bg-sky-50 text-sky-700 border border-b-0 border-border' : 'text-slate-500 hover:text-slate-700 hover:bg-gray-50'
                }`}>
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 px-3 pb-2">
          <button onClick={() => { const i = currentIdx - 1; if (i >= 0) setCurrentPath(DEMO_PAGES[i].url); }}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled={currentIdx <= 0}>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => { const i = currentIdx + 1; if (i < DEMO_PAGES.length) setCurrentPath(DEMO_PAGES[i].url); }}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled={currentIdx >= DEMO_PAGES.length - 1}>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-border rounded-md px-3 py-1.5 text-[11px] font-mono text-slate-600">
            <Globe className="w-3 h-3 text-sky-500 shrink-0" />
            <span className="truncate">{DEMO_BASE_URL}{currentPath}</span>
          </div>
          <button onClick={() => setCurrentPath('/products')}
            className="text-slate-400 hover:text-slate-600">
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50/80 min-h-[200px]">
        {currentPage && renderPageContent(currentPage.html, currentPath)}
      </div>

      <div className="px-4 py-2 bg-deeper/30 border-t border-border text-[10px] text-slate-500 flex items-center gap-4">
        <span>Try scraping this page with Python: <code className="font-mono bg-surface px-1 rounded">import requests</code></span>
        <span className="text-slate-400">|</span>
        <span><code className="font-mono bg-surface px-1 rounded">from bs4 import BeautifulSoup</code></span>
      </div>
    </motion.div>
  );
}
