const fs = require('fs')
const path = require('path')
// nunjucks lives in app/node_modules, which is committed to this repo
const nunjucks = require(path.join(__dirname, '..', 'app', 'node_modules', 'nunjucks'))
const components = require('./components-data.js')

const REPO = path.join(__dirname, '..')

const env = nunjucks.configure([path.join(__dirname, 'templates'), path.join(REPO, 'vendor')], { autoescape: true })

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function tidy(s) {
  s = s.replace(/<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^<>"'])*?)>/g, (m, tag, attrs) => {
    if (!/\n/.test(m)) return m
    return `<${tag}${attrs.replace(/\s+/g, ' ').replace(/\s+$/, '')}>`
  })
  const out = []
  for (let line of s.split('\n')) {
    line = line.replace(/\s+$/, '')
    if (line.trim() === '') line = ''
    if (line === '' && (out.length === 0 || out[out.length - 1] === '')) continue
    out.push(line)
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

// group order, preserving first appearance
const groups = []
for (const c of components) if (!groups.includes(c.group)) groups.push(c.group)

let body = `
<div class="govuk-grid-row">
<div class="govuk-grid-column-two-thirds">
<h1 class="govuk-heading-xl" id="top">Component gallery</h1>
<p class="govuk-body-l">Every component you are likely to need, with the code to copy. This page works offline.</p>
<p class="govuk-body">Each component shows a live example, then the <strong>HTML</strong> to paste into a Track&nbsp;A page, then the <strong>Nunjucks</strong> to paste into a Track&nbsp;B template.</p>
<p class="govuk-body"><a class="govuk-link" href="index.html">Back to the example service</a></p>
</div>
</div>

<div class="govuk-grid-row">
<div class="govuk-grid-column-full">
<h2 class="govuk-heading-m">Contents</h2>
<div class="hack-contents">
`
for (const g of groups) {
  // each group is ONE grid item, so its heading stays with its list
  body += `<div>\n<h3 class="govuk-heading-s govuk-!-margin-bottom-1">${esc(g)}</h3>\n<ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-4">\n`
  for (const c of components.filter(x => x.group === g)) {
    body += `<li><a class="govuk-link" href="#${c.id}">${esc(c.title)}</a></li>\n`
  }
  body += `</ul>\n</div>\n`
}
body += `</div>\n</div>\n</div>\n`

for (const g of groups) {
  body += `\n<div class="govuk-grid-row">\n<div class="govuk-grid-column-full">\n<h2 class="govuk-heading-l hack-section">${esc(g)}</h2>\n</div>\n</div>\n`

  for (const c of components.filter(x => x.group === g)) {
    const rendered = tidy(env.renderString(c.njk, {}))
    // the copy-paste HTML is the rendered output minus nothing - it IS what renders
    const njkSnippet = c.njk.trim()

    body += `
<div class="govuk-grid-row" id="${c.id}">
<div class="govuk-grid-column-two-thirds">
<h3 class="govuk-heading-m">${esc(c.title)}</h3>
<p class="govuk-body">${esc(c.when)}</p>
${c.needsJs ? '<strong class="govuk-tag govuk-tag--yellow hack-js">Needs JavaScript</strong>' : ''}
<div class="hack-example">
${rendered}
</div>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">HTML &mdash; copy this into a Track A page</span></summary>
<div class="govuk-details__text"><pre class="hack-code"><code>${esc(rendered)}</code></pre></div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Nunjucks &mdash; copy this into a Track B template</span></summary>
<div class="govuk-details__text"><pre class="hack-code"><code>${esc(njkSnippet)}</code></pre></div>
</details>

<p class="govuk-body-s"><a class="govuk-link" href="#top">Back to contents</a></p>
</div>
</div>
`
  }
}

const html = env.render('components.njk', { body })
const out = tidy(html) + '\n'
fs.writeFileSync(path.join(REPO, 'static', 'components.html'), out)
console.log(`components.html  ${out.split('\n').length} lines, ${(out.length / 1024).toFixed(0)} KB, ${components.length} components`)
