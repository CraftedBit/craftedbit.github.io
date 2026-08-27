import { chromium } from 'playwright';
const url = process.argv[2], w = parseInt(process.argv[3] || '375', 10);
const sels = process.argv.slice(4);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 780 } });
await p.goto(url, { waitUntil: 'networkidle' });
const out = await p.evaluate((sels) => sels.map(s => {
  const el = document.querySelector(s);
  if (!el) return { s, missing: true };
  const r = el.getBoundingClientRect(), c = getComputedStyle(el);
  return { s, left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
    display: c.display, flexDirection: c.flexDirection, alignItems: c.alignItems,
    justifyContent: c.justifyContent, maxWidth: c.maxWidth, minWidth: c.minWidth,
    padding: c.padding, margin: c.margin, flexBasis: c.flexBasis, gap: c.gap };
}), sels);
for (const o of out) {
  if (o.missing) { console.log(`  ${o.s}  MISSING`); continue; }
  console.log(`  ${o.s}`);
  console.log(`      box ${o.left}..${o.right} w=${o.width}`);
  console.log(`      display=${o.display} dir=${o.flexDirection} align=${o.alignItems} justify=${o.justifyContent} gap=${o.gap}`);
  console.log(`      max-width=${o.maxWidth} min-width=${o.minWidth} padding=${o.padding} margin=${o.margin}`);
}
await b.close();
