export interface DemoSitePage {
  url: string;
  title: string;
  html: string;
}

const SHOP_PRODUCTS = `
<!DOCTYPE html>
<html><head><title>Shop - Products</title></head><body>
<header><h1>TechGadget Store</h1><nav><a href="/products">Products</a> | <a href="/customers">Customers</a> | <a href="/blog">Blog</a></nav></header>
<main>
<h2>Our Products</h2>
<div class="product-list">
<div class="product" data-id="101">
<h3>Wireless Mouse</h3>
<span class="category">Accessories</span>
<span class="price">$29.99</span>
<span class="rating">4.5</span>
</div>
<div class="product" data-id="102">
<h3>Bluetooth Speaker</h3>
<span class="category">Audio</span>
<span class="price">$49.99</span>
<span class="rating">4.2</span>
</div>
<div class="product" data-id="103">
<h3>USB-C Hub</h3>
<span class="category">Accessories</span>
<span class="price">$34.99</span>
<span class="rating">4.7</span>
</div>
<div class="product" data-id="104">
<h3>Mechanical Keyboard</h3>
<span class="category">Accessories</span>
<span class="price">$89.99</span>
<span class="rating">4.8</span>
</div>
<div class="product" data-id="105">
<h3>Webcam 1080p</h3>
<span class="category">Electronics</span>
<span class="price">$59.99</span>
<span class="rating">4.0</span>
</div>
<div class="product" data-id="106">
<h3>Noise-Cancelling Headphones</h3>
<span class="category">Audio</span>
<span class="price">$199.99</span>
<span class="rating">4.9</span>
</div>
</div>
</main>
<footer>&copy; 2026 TechGadget Store</footer>
</body></html>`;

const CUSTOMERS = `
<!DOCTYPE html>
<html><head><title>Shop - Customers</title></head><body>
<header><h1>TechGadget Store</h1><nav><a href="/products">Products</a> | <a href="/customers">Customers</a> | <a href="/blog">Blog</a></nav></header>
<main>
<h2>Customer Directory</h2>
<table class="customers">
<thead><tr><th>ID</th><th>Name</th><th>Email</th><th>City</th><th>Orders</th><th>Total Spent</th></tr></thead>
<tbody>
<tr><td>1</td><td>Alice Johnson</td><td>alice@email.com</td><td>New York</td><td>12</td><td>$1,450</td></tr>
<tr><td>2</td><td>Bob Smith</td><td>bob@email.com</td><td>Los Angeles</td><td>8</td><td>$890</td></tr>
<tr><td>3</td><td>Carol Williams</td><td>carol@email.com</td><td>Chicago</td><td>15</td><td>$2,100</td></tr>
<tr><td>4</td><td>David Brown</td><td>david@email.com</td><td>Houston</td><td>5</td><td>$420</td></tr>
<tr><td>5</td><td>Eve Davis</td><td>eve@email.com</td><td>Phoenix</td><td>20</td><td>$3,750</td></tr>
<tr><td>6</td><td>Frank Miller</td><td>frank@email.com</td><td>Seattle</td><td>3</td><td>$199</td></tr>
<tr><td>7</td><td>Grace Wilson</td><td>grace@email.com</td><td>Miami</td><td>10</td><td>$1,120</td></tr>
<tr><td>8</td><td>Henry Moore</td><td>henry@email.com</td><td>Denver</td><td>7</td><td>$675</td></tr>
</tbody>
</table>
</main>
<footer>&copy; 2026 TechGadget Store</footer>
</body></html>`;

const BLOG = `
<!DOCTYPE html>
<html><head><title>Shop - Blog</title></head><body>
<header><h1>TechGadget Store</h1><nav><a href="/products">Products</a> | <a href="/customers">Customers</a> | <a href="/blog">Blog</a></nav></header>
<main>
<h2>Tech Blog</h2>
<article class="post">
<h3>Top 10 Gadgets for 2026</h3>
<p class="meta">By Admin | March 15, 2026 | 5 min read</p>
<p>Technology is advancing faster than ever. Here are our top picks for must-have gadgets this year...</p>
</article>
<article class="post">
<h3>How to Set Up Your Home Office</h3>
<p class="meta">By Admin | March 10, 2026 | 8 min read</p>
<p>Working from home requires the right setup. We recommend a good chair, ample lighting, and quality peripherals...</p>
</article>
<article class="post">
<h3>USB-C vs Thunderbolt: What's the Difference?</h3>
<p class="meta">By Admin | March 5, 2026 | 6 min read</p>
<p>Both look the same, but they're not interchangeable. Here's what you need to know before buying...</p>
</article>
</main>
<footer>&copy; 2026 TechGadget Store</footer>
</body></html>`;

export const DEMO_PAGES: DemoSitePage[] = [
  { url: '/products', title: 'Products - TechGadget Store', html: SHOP_PRODUCTS },
  { url: '/customers', title: 'Customers - TechGadget Store', html: CUSTOMERS },
  { url: '/blog', title: 'Blog - TechGadget Store', html: BLOG },
];

export const DEMO_BASE_URL = 'http://demo-shop.local';

export function getHtmlForUrl(url: string): string | null {
  const path = url.replace(DEMO_BASE_URL, '');
  const page = DEMO_PAGES.find(p => p.url === path);
  return page ? page.html : null;
}

export function getPageForUrl(url: string): DemoSitePage | null {
  const path = url.replace(DEMO_BASE_URL, '');
  return DEMO_PAGES.find(p => p.url === path) || null;
}
