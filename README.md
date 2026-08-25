# GOV.UK Design System mini-hackathon

Build a pretend government service in 90 minutes, using the real
[GOV.UK Design System](https://design-system.service.gov.uk/).

You'll get a brief like *"Report a Pothole"* or *"Apply for a Cycling Licence"*. Your job is
to turn it into something that looks and behaves like a genuine GOV.UK service.

**Everything you need is already in this folder.** There is nothing to download and no
internet required.

---

## Before you start: pick a track

There are two ways to do this hack. Both produce a real-looking GOV.UK service. Pick the one
that matches how comfortable you feel, and don't feel bad about picking Track A — the design
work is the point, not the plumbing.

### Track A — `static/` · no installing, no terminal

Plain HTML files. **Double-click `static/index.html`** and it opens in your browser. Edit the
files in any text editor, save, refresh.

Every page is a separate `.html` file. To add a page, you copy a file and change the words.
The buttons are links, so the journey clicks through properly, but nothing is actually
submitted anywhere — it's a very convincing paper prototype.

**Choose this if** you'd rather spend your 90 minutes on the service and the content than on
getting a server running.

### Track B — `app/` · a real Node server

Express and Nunjucks — genuinely how GOV.UK services are built. Forms really submit, answers
are really stored, and validation really runs.

```
cd app
node server.js
```

Then open <http://localhost:3000>. Press `Ctrl+C` to stop it.

You need **Node.js 20 or newer** already installed (`node --version` to check). The
dependencies are already in this repo, so `npm install` is *not* needed.

**Choose this if** you're comfortable with a terminal and want the real thing.

---

## The component gallery

**`static/components.html` is the most useful file in this repo.** Open it in your browser.

It has every component you're likely to need — text inputs, radios, checkboxes, date inputs,
error summaries, panels, task lists — with a live example and the code to copy for **both**
tracks.

Because the venue may not have internet, this page is your design system reference. Keep it
open in a second tab.

*Track B: it's also at <http://localhost:3000/static/components.html> while your server runs.*

---

## What's in here

| Path | What it is |
|---|---|
| `WALKTHROUGH.md` | **Start here.** Levels 0–4, with timings. |
| `BRIEFS.md` | The service briefs. Pick one. |
| `static/` | Track A — the no-install HTML version |
| `static/components.html` | The offline component gallery |
| `app/` | Track B — the Express version |
| `app/routes.js` | Track B: the file you actually change |
| `vendor/govuk/` | The GOV.UK Design System itself. Don't edit this. |
| `tools/` | How the `static/` pages were generated. Ignore it. |

Both tracks start life as the same throwaway example service, **Register a rubber duck**.
Your first job is to gut it and make it yours.

---

## Definition of done

You've built a credible GOV.UK service when all of these are true. Aim to tick every box —
it's much better to have five solid pages than twelve broken ones.

- [ ] Your service name appears in the black bar at the top of **every** page
- [ ] There's a **start page** that explains what the service does and who it's for
- [ ] There are at least **two question pages**, with **one question per page**
- [ ] At least one question **validates**: submitting it empty shows an error summary at the
      top of the page *and* a red message on the field itself
- [ ] There's a **"Check your answers"** page, with a Change link on every row
- [ ] There's a **confirmation page** with the big green panel and a reference number
- [ ] Every page has a sensible `<title>` (it's what screen readers announce first)
- [ ] You can complete the whole journey **using only the keyboard** — Tab, Shift+Tab, Enter,
      Space. No mouse.

## Your demo

Three minutes each, at the end.

- **Walk the journey.** Start page to confirmation, like a real user. Don't show us code.
- Say **which brief** you had and **one decision you made** — a component you picked, a
  question you cut, a piece of wording you argued about.
- Show us the **error state**. It's the bit everyone skips and the bit that's hardest to get
  right.
- Tell us **what you'd do next** if you had another hour.

---

## Notes

**This is a prototype, not a real service.** Don't put anything real in it, and don't publish
it anywhere that could be mistaken for GOV.UK.

**The GDS Transport typeface** included in `vendor/` is licensed for use on GOV.UK services
and prototypes. That's what this is, but don't lift the fonts out of here for other projects.

**Track B stores answers in a plain object shared by everyone hitting the server.** That is
deliberately the wrong thing to do, and `app/routes.js` explains why. It keeps the code short
enough to read in one sitting. A real service would use a session or a database.
