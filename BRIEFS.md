# The briefs

Pick one (or get given one). They're all deliberately silly, and all deliberately shaped like
real GOV.UK services — because the shape is the thing you're learning.

**Before you write any code**, agree as a team:

1. Which **three or four questions** you'll ask. Not ten. Three or four.
2. What order they go in.
3. Which one you'll make **validate** for Level 3.

Every brief has a **tricky bit**. That's the interesting design problem — have a go at it once
the basic journey works.

> The suggested pages are a starting point, not a specification. If you think a question is
> unnecessary, cut it. Cutting questions is real design work.

---

## 1. Report a Pothole

**User need:** As a resident, I need to tell the council about a hole in the road, so that
somebody fills it in before it eats a cyclist.

**Pages:** Start → Where is it? → How big is it? → Anything nearby? → Your details →
Check answers → Confirmation

**Ask for:** street name (text) · size (radios: smaller than a dinner plate / bigger than a
dinner plate / you can no longer see the bottom) · what's nearby (checkboxes) · your email

**Tricky bit:** if they say "you can no longer see the bottom", reveal an extra question asking
whether the road is still passable. That's a **conditional reveal**.

**Stretch:** add a photo upload question · add a "we already know about this one" page for
duplicates.

---

## 2. Apply for a Cycling Licence

**User need:** As a cyclist, I need a licence to legally ride a bicycle, so I can stop being
chased by the Bicycle Enforcement Unit.

**Pages:** Start → Your name → Date of birth → What kind of bike? → Can you ring a bell? →
Check answers → Confirmation

**Ask for:** full name (text) · date of birth (date input) · bike type (radios: road / mountain
/ folding / penny-farthing) · bell competence (radios: yes / no / I use my voice)

**Tricky bit:** under-12s need a parent's details. Only ask for them if the date of birth says
so — and think about how you'd word that.

**Stretch:** issue a licence number on the confirmation page · add a "you're not eligible" page
for penny-farthings.

---

## 3. Register a Dragon

**User need:** As a dragon keeper, I need to register my dragon under the Dangerous Wild
Animals Act, so that my neighbours stop complaining.

**Pages:** Start → Dragon's name → Species → Wingspan → Fire risk assessment →
Check answers → Confirmation

**Ask for:** dragon name (text) · species (select: Welsh Green / Hungarian Horntail / Common
Garden Wyvern / Other) · wingspan in metres (text) · does it breathe fire (radios)

**Tricky bit:** if it breathes fire, reveal questions about fire safety measures. If the
wingspan is over 10 metres, they need a different licence entirely — show them a page saying so
instead of letting them continue.

**Stretch:** add a task list so the fire assessment is its own section · add a warning about
the penalties for an unregistered dragon.

---

## 4. Claim Lost Sock Allowance

**User need:** As someone whose washing machine has eaten a sock, I need to claim compensation,
so I can afford a replacement sock.

**Pages:** Start → How many socks? → Describe the sock → When did it vanish? →
Where were you? → Check answers → Confirmation

**Ask for:** number of socks (text, numbers only) · description (textarea with a character
count) · date last seen (date input) · location (radios: washing machine / tumble dryer /
behind the radiator / genuinely no idea)

**Tricky bit:** claims for more than 5 socks need a written explanation. Only show that
question when it's relevant, and write a good hint for it.

**Stretch:** calculate and show the payment amount on the confirmation page · add a page
explaining that odd socks are not eligible.

---

## 5. Apply for Permission to Time Travel

**User need:** As a time traveller, I need permission before departure, so that the timeline
remains intact.

**Pages:** Start → Destination date → Reason for travel → Will you meet yourself? →
Paradox declaration → Check answers → Confirmation

**Ask for:** destination date (date input) · reason (radios: tourism / research / correcting a
regret / other) · meeting yourself (radios) · paradox declaration (checkbox: "I confirm I will
not create a paradox")

**Tricky bit:** the paradox declaration is a single checkbox that **must** be ticked. A
required single checkbox is a genuinely fiddly validation case — get the error message right.

**Stretch:** block dates before 1900 with a proper error · add a warning-text component about
the consequences of paradox.

---

## 6. Report a Suspicious Seagull

**User need:** As a seaside resident, I need to report a seagull behaving badly, so the
authorities can have a word with it.

**Pages:** Start → Where was it? → What did it do? → How big was it? →
Your details → Check answers → Confirmation

**Ask for:** location (text) · behaviour (checkboxes: stole chips / stared menacingly /
attacked an ice cream / organised others) · size (radios: normal / large / concerning) ·
your name and email

**Tricky bit:** "organised others" is the serious one. If it's ticked, reveal a follow-up
asking how many gulls were involved, and consider showing a warning.

**Stretch:** add a "what happens next" that's genuinely reassuring · add a reference number
and an option to report another.

---

## 7. Register a Haunted Property

**User need:** As a homeowner, I need to declare that my house is haunted, so I comply with
disclosure requirements when I sell it.

**Pages:** Start → Property address → Type of haunting → How often? →
Is the ghost friendly? → Check answers → Confirmation

**Ask for:** address (textarea) · haunting type (checkboxes: cold spots / footsteps /
poltergeist / Victorian child / unexplained smell) · frequency (radios: nightly / weekly /
only in October) · friendliness (radios: friendly / indifferent / hostile)

**Tricky bit:** a hostile poltergeist needs an urgent referral. Detect that combination and
send them to a different confirmation page with different content.

**Stretch:** use a task list to split property details from haunting details · add an inset-text
note about the effect on property value.

---

## 8. Apply for a Trampoline Licence

**User need:** As a garden owner, I need a licence for my trampoline, so that the council knows
where the bouncing is happening.

**Pages:** Start → Your address → Trampoline size → How high will you bounce? →
Neighbour consent → Check answers → Confirmation

**Ask for:** address (textarea) · diameter in metres (text) · maximum bounce height (radios:
under 1m / 1–3m / above the fence) · neighbour consent (radios: yes / no / haven't asked)

**Tricky bit:** "above the fence" or "haven't asked" both mean they can't continue yet. Send
them somewhere sensible that explains what to do — and make sure they can get back.

**Stretch:** add a date input for when the trampoline will be installed · add a summary card
per neighbour if there's more than one.

---

## Writing the words

Half of building a GOV.UK service is the writing. A few rules that will make yours much better:

- **Say what the user does, not what the system does.** "Report a pothole", not
  "Pothole reporting system".
- **Error messages say what to do.** "Enter your date of birth", not "Invalid input".
- **Buttons say what happens.** "Continue", "Accept and send" — never "Submit" or "OK".
- **Ask one thing per page**, and make the question the `<h1>`.
- **Use hints to prevent errors before they happen**, not to apologise afterwards.
- **Short words.** "Help", not "assistance". "Buy", not "purchase".
