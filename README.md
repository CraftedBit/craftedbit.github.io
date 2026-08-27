# craftedbit.github.io

My portfolio. Plain HTML, CSS and JavaScript, live at https://craftedbit.github.io

I write Angular and TypeScript at work and deliberately didn't use either here.
The site is a document. A framework would ship a lot of runtime to render text
that never changes, and with no build step GitHub Pages serves it straight from
`main` with nothing in between.

Run it with any static server:

```
python3 -m http.server 8080
```

`index.html` is the whole site, one page with anchored sections. `style.css`
holds everything with the media queries at the bottom. `script.js` does the nav,
the scroll spy, the typing effect on the heading and the contact form.

Icons are boxicons, the rotating heading is typed.js, the entrance animations
are ScrollReveal, all pulled from unpkg. The contact form posts to web3forms.

Still to do: pin the CDN dependencies, get a proper pipeline with preview
deploys so branches can be checked before they merge, and replace the project
cards with real writeups as those projects get finished.