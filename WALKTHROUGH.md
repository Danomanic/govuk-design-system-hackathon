# The walkthrough

Five levels, roughly 90 minutes. **Everyone should finish Level 3.** Level 4 is there so the
fast teams don't run out of road.

Work down the levels in order. Each one ends with a checkpoint so you can tell whether you're
done without asking anyone.

> Every level has a **Track A** and a **Track B** section. Do the one for the track you picked
> in the [README](README.md) and ignore the other.

| | | |
|---|---|---|
| [Level 0](#level-0--get-it-running-10-minutes) | Get it running | 10 min |
| [Level 1](#level-1--make-it-yours-10-minutes) | Make it yours | 10 min |
| [Level 2](#level-2--add-a-question-25-minutes) | Add a question | 25 min |
| [Level 3](#level-3--errors-20-minutes) | Errors | 20 min |
| [Level 4](#level-4--stretch-the-rest-of-your-time) | Stretch | the rest |

**Keep `static/components.html` open in a second browser tab the whole time.** It's your
design system reference and it works offline.

---

## Level 0 — Get it running (10 minutes)

**Goal:** see the example service, *Register a rubber duck*, working in your browser, and
click all the way through it.

### Track A

1. Open the `static` folder.
2. Double-click **`index.html`**. It opens in your browser.
3. Click **Start now**, type a duck name, click **Continue**, then **Accept and send**.

### Track B

1. Open a terminal.
2. `cd` into the `app` folder of this project.
3. Run `node server.js`
4. Open <http://localhost:3000> in your browser and click through the journey.

> **"command not found: node"** — you don't have Node installed and you can't install it
> without internet. Switch to Track A; you'll lose nothing that matters today.
>
> **"EADDRINUSE"** — something is already using port 3000. Change `const PORT = 3000` near the
> top of `server.js` to `3001` and try again.

### ✅ Checkpoint

You've seen all four pages: start, question, check answers, and the green confirmation panel.

Now **read your brief** in [BRIEFS.md](BRIEFS.md) and, as a team, agree the **three or four
questions** your service will ask. Write them on paper. Do this before you touch any code —
it's the single biggest thing that decides whether you finish.

---

## Level 1 — Make it yours (10 minutes)

**Goal:** the example service is gone and yours is in its place. Same four pages, your words.

Don't add anything yet. Just change what's already there.

### Track A

Open each file in `static/` in a text editor. In every file you'll see fences like this:

```html
<!-- ====================== YOUR PAGE CONTENT STARTS HERE ===================== -->
```

**Only change things between the fences**, plus two other things:

- the `<title>` near the top of each file — make it `Your page name - Your service - GOV.UK`
- the service name in the header block, which appears as a link near the bottom of the
  `GOV.UK HEADER` section. It says `Register a rubber duck`. Change it in **every file**.

### Track B

Much less typing, because the header is written once.

1. Open `app/views/layout.njk` and change one line:
   ```
   {% set serviceName = "Register a rubber duck" %}
   ```
   Every page picks this up immediately.
2. Open each file in `app/views/` and change the `{% block pageTitle %}` and the content.

Refresh your browser. You don't need to restart the server for template changes.

### ✅ Checkpoint

Your service name is in the black bar on every page, the start page describes *your* service,
and no rubber ducks remain anywhere.

---

## Level 2 — Add a question (25 minutes)

**Goal:** a second question page, wired into the journey, showing up on Check your answers.

This is the core skill. Once you can add one page you can add ten.

Pick a question from your brief that suits **radios** — "How big is it?", "What kind of
licence?" — and copy the radios markup from `static/components.html`.

> **One question per page.** It's the GOV.UK house style. It makes each page obvious, and it
> makes errors far easier to handle. Resist the urge to build one big form.

### Track A

1. **Copy** `name.html` and rename the copy to something like `size.html`.
2. In `size.html`, replace the content between the fences with the **radios** markup from the
   component gallery. Change the question, and change the `name="..."` to something meaningful.
3. Update the `<title>`.
4. **Wire it into the journey** — this is the step people forget:
   - in `name.html`, change the Continue link's `href` to `size.html`
   - in `size.html`, change the Continue link's `href` to `check-answers.html`
   - in `size.html`, change the **Back** link's `href` to `name.html`
   - in `check-answers.html`, change the Back link's `href` to `size.html`
5. Add a row for the new answer to the summary list in `check-answers.html`. Copy an existing
   row, change the key, the value, and the Change link's `href`.

### Track B

1. **Copy** `app/views/name.njk` to `app/views/size.njk` and put the **radios** macro in it
   (the Nunjucks version is in the component gallery). Update the `pageTitle` too.
2. Open `app/routes.js` and copy the whole `/name` block — both the `router.get` and the
   `router.post`. Change:
   - the two paths from `/name` to `/size`
   - `name.njk` to `size.njk`
   - `answers.duckName` to `answers.size`
3. Point the previous page at it: in the `/name` POST, change `res.redirect('/check-answers')`
   to `res.redirect('/size')`.
4. Add a row to the summary list in `check-answers.njk`.
5. **Restart the server** (`Ctrl+C`, then `node server.js`). Changes to `routes.js` need a
   restart; changes to `.njk` files don't.

### ✅ Checkpoint

You can go start → question 1 → question 2 → check answers → confirmation, the Back links go
to the right places, and **both** answers appear on Check your answers.

Got time? Add a third question the same way. It'll be much faster now.

---

## Level 3 — Errors (20 minutes)

**Goal:** show a proper GOV.UK error. This is the part that separates a service that looks
right from one that *is* right.

A GOV.UK error is always **three things at once**:

1. an **error summary** box at the top of the page, above the `<h1>`, linking down to the field
2. a **red message on the field itself**, with a red bar down its left edge
3. the page `<title>` starting with **`Error: `** — screen reader users hear the title first,
   so without this they have no idea anything went wrong

Never do just one of the three.

### Track A

You have no server, so you can't really validate anything — you're going to **build the error
state by hand**, which is exactly what a designer does.

1. Look at **`static/name-error.html`**. That's the same page as `name.html`, in its error
   state. Compare the two files side by side and find the three differences listed above.
2. Now do the same to *your* question page: copy `size.html` to `size-error.html` and add all
   three things, copying from the component gallery's **Error summary** and **field in its
   error state** sections.
3. Write a **good error message**. GOV.UK style is to say what to do, not what went wrong:
   - ✅ "Select how big the pothole is"
   - ❌ "This field is required" · ❌ "Invalid input" · ❌ "Error!"
4. Link to it so you can show it in your demo — temporarily point Continue at
   `size-error.html`.

### Track B

Yours validates for real. `routes.js` already does this for the name question — copy the
pattern.

In your `router.post('/size', ...)`:

```js
const errors = []

if (!req.body.size) {
  errors.push({
    text: 'Select how big the pothole is',   // what the user reads
    href: '#size'                            // makes the summary link jump to the field
  })
}

if (errors.length > 0) {
  return res.status(422).render('size.njk', { errors })
}
```

Then in `size.njk`, do all three things — the existing `name.njk` shows each one, marked with
a numbered comment. Restart the server and submit the page empty.

### ✅ Checkpoint

Submitting your question with nothing filled in shows an error summary at the top **and** a red
message on the field, and the page title starts with `Error:`. Clicking the link in the summary
jumps focus to the field.

---

## Level 4 — Stretch (the rest of your time)

Pick whatever makes your service better. All the markup is in the component gallery.

**Make it more real**
- Add a **conditional reveal** — a follow-up question that only appears when a certain radio is
  chosen. There's an example in the gallery.
- Add a **date input**. Three separate boxes, never a date picker.
- Add **checkboxes** for a "select all that apply" question.
- Add a **character count** to a long free-text answer.

**Make it more complete**
- Replace your check-answers page with a **task list**, so the service can be done in chunks.
- Put a real **reference number** on the confirmation page and a proper *What happens next*.
- Write a genuinely good **start page**. Who's it for? What will they need? How long will it
  take?

**Make it better**
- **Do the whole journey with only the keyboard.** Tab, Shift+Tab, Enter, Space. Anything you
  can't reach or can't see focused is a bug.
- Read your questions out loud. Anything you stumble over is badly worded.
- Cut a question. Every question you remove makes the service better. What do you *actually*
  need?
- Check every page has a unique, meaningful `<title>`.

---

## Stuck?

**Nothing is styled — the page is plain black text on white.**
The CSS isn't loading. Track A: check the `<link>` at the top says
`../vendor/govuk/govuk-frontend.min.css`, and that you're opening the file from inside the
`static` folder. Track B: check the server is running and you're on `http://localhost:3000`,
not opening the file directly.

**Track B: "Cannot GET /whatever"**
There's no route for that page in `routes.js` yet, or you added one and didn't restart the
server.

**Track B: my change did nothing.**
Changes to `routes.js` and `server.js` need a restart (`Ctrl+C`, then `node server.js`).
Changes to `.njk` files just need a browser refresh.

**Track B: "unexpected token" or a template error page.**
Almost always a missing comma or an unclosed `}` in a macro call. Look at the line number, then
at the line *above* it.

**My radios/checkboxes don't do anything when clicked.**
They aren't inside a `<form>`, or two of them share the same `name`. Each group of radios needs
one shared `name`, different from every other group on the page.

**The conditional reveal doesn't hide and show.**
It needs JavaScript. Check the `<script>` tags at the bottom of the page are intact.
