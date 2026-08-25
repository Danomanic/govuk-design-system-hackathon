// ===========================================================================
//  routes.js - THIS IS THE FILE YOU CHANGE.
//
//  Every page in your service is described below. The pattern is always the
//  same, and once you've seen it once you can copy it forever:
//
//      router.get('/some-page', ...)   <- show a page
//      router.post('/some-page', ...)  <- handle the form on that page
//
//  The example service here is "Register a rubber duck". Your job is to
//  replace it with your own service. Start by changing the words, then add
//  a page of your own.
// ===========================================================================

const express = require('express')
const router = express.Router()

// ---------------------------------------------------------------------------
//  WHERE THE ANSWERS ARE KEPT
//
//  One plain object, shared by everybody who visits this server.
//
//  In a real service this would be WRONG: two different users would overwrite
//  each other's answers. Real services use a session or a database.
//
//  For a hackathon on your own laptop there is only ever one of you, so this
//  is the simplest thing that works, and it keeps the code short. Just know
//  that it is a shortcut, and that in a code review someone would rightly
//  pull you up on it.
// ---------------------------------------------------------------------------
const answers = {}


// === START PAGE ============================================================
// Every GOV.UK service begins with a start page that explains what the
// service is for and who can use it.

router.get('/', (req, res) => {
  res.render('start.njk')
})


// === QUESTION 1: What is your duck called? =================================
// GOV.UK services ask ONE thing per page. Resist the urge to put six
// questions on one screen - one question per page is the house style, and
// it makes validation much easier.

router.get('/name', (req, res) => {
  res.render('name.njk', { duckName: answers.duckName })
})

router.post('/name', (req, res) => {
  const duckName = (req.body.duckName || '').trim()

  // Collect up everything that's wrong with what they submitted.
  // An empty list means there were no problems.
  const errors = []

  if (duckName === '') {
    errors.push({
      text: 'Enter your duck’s name',   // what the user reads
      href: '#duckName'                 // makes the summary link jump to the field
    })
  }

  if (errors.length > 0) {
    // Show the SAME page again, with the errors, keeping what they typed so
    // they don't have to start over. 422 is the correct status code for
    // "you sent me something I can't accept".
    return res.status(422).render('name.njk', { errors, duckName })
  }

  // No errors - save the answer and move on.
  answers.duckName = duckName
  res.redirect('/check-answers')
})


// === CHECK YOUR ANSWERS ====================================================
// A required pattern on GOV.UK. Before anyone submits anything, they get to
// see everything they've told you, with a "Change" link next to each row.

router.get('/check-answers', (req, res) => {
  res.render('check-answers.njk', { answers })
})

router.post('/check-answers', (req, res) => {
  // This is where a real service would save to a database, send an email,
  // or call another system. We'll just invent a reference number.
  answers.reference = 'DUCK-' + Math.floor(100000 + Math.random() * 900000)
  res.redirect('/confirmation')
})


// === CONFIRMATION ==========================================================
// The big green panel. Tell them it worked, give them a reference, and say
// what happens next.

router.get('/confirmation', (req, res) => {
  res.render('confirmation.njk', { answers })
})


// ---------------------------------------------------------------------------
//  ADD YOUR OWN PAGE HERE
//
//  Copy the /name block above, then:
//    1. change the two '/name' paths to '/your-page'
//    2. change 'name.njk' to 'your-page.njk'
//    3. make a copy of views/name.njk called views/your-page.njk
//    4. point the previous page's form at '/your-page' so you can reach it
//    5. add a row for it in views/check-answers.njk
//
//  WALKTHROUGH.md Level 2 walks through this properly.
// ---------------------------------------------------------------------------

module.exports = router
