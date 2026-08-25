// ===========================================================================
//  server.js - the plumbing.
//
//  You almost certainly do NOT need to change anything in this file.
//  The interesting file is routes.js. Go there.
// ===========================================================================

const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const app = express()
const PORT = 3000

// --- Templates -------------------------------------------------------------
// Nunjucks is the templating language GOV.UK services use. We give it two
// places to look for templates:
//   1. our own views/ folder
//   2. the vendor/ folder, which contains the GOV.UK Design System
//
// Because vendor/ is a search path, `{% extends "govuk/template.njk" %}` works
// here exactly the way it does in a real government service.
nunjucks.configure(
  [path.join(__dirname, 'views'), path.join(__dirname, '..', 'vendor')],
  // noCache means you can edit a .njk file and just refresh the browser -
  // no restart needed. Slower, but this is a hackathon, not production.
  { autoescape: true, express: app, noCache: true }
)

// --- Static files ----------------------------------------------------------
// The compiled CSS/JS, and the fonts, icons and crest they reference.
app.use('/govuk', express.static(path.join(__dirname, '..', 'vendor', 'govuk')))
app.use('/assets', express.static(path.join(__dirname, '..', 'vendor', 'govuk', 'assets')))

// These two let you open the component gallery in your browser while the
// server is running:   http://localhost:3000/static/components.html
app.use('/vendor', express.static(path.join(__dirname, '..', 'vendor')))
app.use('/static', express.static(path.join(__dirname, '..', 'static')))

// --- Form data -------------------------------------------------------------
// Without this, req.body would be undefined when a form is submitted.
app.use(express.urlencoded({ extended: true }))

// --- Our pages -------------------------------------------------------------
app.use('/', routes)

// --- A friendly 404 --------------------------------------------------------
app.use((req, res) => {
  res.status(404).render('not-found.njk')
})

app.listen(PORT, () => {
  console.log('')
  console.log('  Your service is running.')
  console.log(`  Open this in your browser:  http://localhost:${PORT}`)
  console.log('')
  console.log('  Press Ctrl+C to stop it.')
  console.log('')
})
