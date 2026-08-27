import { chromium } from 'playwright';
const [url, w, out, sel] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: 800 }, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: 'networkidle' });
if (sel) { await p.locator(sel).scrollIntoViewIfNeeded(); }
await p.waitForTimeout(2500);
await p.screenshot({ path: out });
await b.close();
