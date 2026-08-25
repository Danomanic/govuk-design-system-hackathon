const fs = require('fs')
const path = require('path')
// nunjucks lives in app/node_modules, which is committed to this repo
const nunjucks = require(path.join(__dirname, '..', 'app', 'node_modules', 'nunjucks'))

const REPO = path.join(__dirname, '..')

const env = nunjucks.configure(
  [path.join(__dirname, 'templates'), path.join(REPO, 'vendor')],
  { autoescape: true }
)

const pages = ['index', 'name', 'name-error', 'check-answers', 'confirmation']

function compactSvg(s) {
  return s.replace(/<svg\b[\s\S]*?<\/svg>/g, m =>
    m.replace(/\s+/g, ' ').replace(/\s*>\s*/g, '>').replace(/\s*<\s*/g, '<'))
}

function tidy(s) {
  s = compactSvg(s)
  // collapse opening tags that nunjucks spread over several lines
  s = s.replace(/<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^<>"'])*?)>/g, (m, tag, attrs) => {
    if (!/\n/.test(m)) return m
    const a = attrs.replace(/\s+/g, ' ').replace(/\s+$/, '')
    return `<${tag}${a}>`
  })
  const out = []
  for (let line of s.split('\n')) {
    line = line.replace(/\s+$/, '')
    if (line.trim() === '') line = ''
    if (line === '' && (out.length === 0 || out[out.length - 1] === '')) continue
    out.push(line)
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

const FENCE_HDR = `
<!-- ==========================================================================
     GOV.UK HEADER. You do not need to change anything in here, except the
     service name, which appears near the bottom of this block.
     ========================================================================== -->`

const FENCE_HDR_END = `<!-- ===================== END OF THE GOV.UK HEADER ====================== -->
`

const FENCE_FTR = `
<!-- ==========================================================================
     GOV.UK FOOTER. Nothing to change in here.
     ========================================================================== -->`

function fence(s) {
  s = s.replace('<header class="govuk-template__header">', FENCE_HDR + '\n<header class="govuk-template__header">')
  s = s.replace('</header>', '</header>\n' + FENCE_HDR_END)
  s = s.replace('<footer class="govuk-template__footer">', FENCE_FTR + '\n<footer class="govuk-template__footer">')
  s = s.replace(/(<main class="govuk-main-wrapper" id="main-content">)/,
    '$1\n\n<!-- ====================== YOUR PAGE CONTENT STARTS HERE ===================== -->')
  s = s.replace(/[ \t]*(<\/main>)/,
    '<!-- ======================= YOUR PAGE CONTENT ENDS HERE ====================== -->\n\n$1')
  return s
}

for (const p of pages) {
  const html = fence(tidy(env.render(p + '.njk', {})))
  fs.writeFileSync(path.join(REPO, 'static', p + '.html'), html)
  console.log(`${(p + '.html').padEnd(22)} ${String(html.split('\n').length).padStart(4)} lines`)
}
