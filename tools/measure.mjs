import { chromium } from 'playwright';
const url = process.argv[2] || 'https://craftedbit.github.io/';
const w = parseInt(process.argv[3] || '375', 10);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 780 }, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: 'networkidle' });
const r = await p.evaluate((vw) => {
  const doc = document.documentElement;
  const out = { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders: [] };
  for (const el of document.querySelectorAll('*')) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.right > vw + 1 || rect.left < -1) {
      const cs = getComputedStyle(el);
      out.offenders.push({
        sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width),
        overflowX: cs.overflowX, position: cs.position
      });
    }
  }
  return out;
}, w);
console.log(`viewport ${w}  scrollWidth=${r.scrollWidth}  clientWidth=${r.clientWidth}  overflow=${r.scrollWidth - r.clientWidth}px`);
console.log(`elements crossing the viewport edge: ${r.offenders.length}`);
for (const o of r.offenders.slice(0, 25)) {
  console.log(`  ${o.left}..${o.right} (w=${o.width}) ${o.position} ovx=${o.overflowX}  ${o.sel.slice(0, 80)}`);
}
await b.close();
