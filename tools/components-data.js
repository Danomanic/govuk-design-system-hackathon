// Single source of truth: the njk snippet is BOTH rendered as the live example
// AND shown as the Nunjucks version, and its rendered output becomes the HTML
// snippet. So the gallery can never drift from what actually renders.
module.exports = [
  { id:'text-input', title:'Text input', group:'Asking questions',
    when:'A single line of text: a name, a reference number, a town.',
    njk:`{% from "govuk/components/input/macro.njk" import govukInput %}
{{ govukInput({
  label: { text: "What is the name of the road?", classes: "govuk-label--l", isPageHeading: true },
  hint: { text: "For example, Acacia Avenue" },
  id: "road-name",
  name: "roadName"
}) }}` },

  { id:'textarea', title:'Textarea', group:'Asking questions',
    when:'More than one line: a description, an explanation, an address.',
    njk:`{% from "govuk/components/textarea/macro.njk" import govukTextarea %}
{{ govukTextarea({
  label: { text: "Describe the problem", classes: "govuk-label--l", isPageHeading: true },
  hint: { text: "Include anything that would help us find it" },
  id: "description",
  name: "description",
  rows: 5
}) }}` },

  { id:'character-count', title:'Character count', group:'Asking questions', needsJs:true,
    when:'A textarea with a limit. The counter only appears when JavaScript runs.',
    njk:`{% from "govuk/components/character-count/macro.njk" import govukCharacterCount %}
{{ govukCharacterCount({
  label: { text: "Why do you need a licence?", classes: "govuk-label--l", isPageHeading: true },
  id: "reason",
  name: "reason",
  maxlength: 200,
  rows: 4
}) }}` },

  { id:'radios', title:'Radios', group:'Asking questions',
    when:'Pick ONE option from a short list. If there are more than about 6 options, use a select instead.',
    njk:`{% from "govuk/components/radios/macro.njk" import govukRadios %}
{{ govukRadios({
  name: "size",
  fieldset: {
    legend: { text: "How big is the pothole?", classes: "govuk-fieldset__legend--l", isPageHeading: true }
  },
  hint: { text: "Your best guess is fine" },
  items: [
    { value: "small", text: "Smaller than a dinner plate" },
    { value: "medium", text: "Bigger than a dinner plate" },
    { value: "huge", text: "You can no longer see the bottom" }
  ]
}) }}` },

  { id:'radios-conditional', title:'Radios with a conditional reveal', group:'Asking questions', needsJs:true,
    when:'Ask a follow-up question only when it is relevant. Needs JavaScript to hide and show.',
    njk:`{% from "govuk/components/radios/macro.njk" import govukRadios %}
{{ govukRadios({
  name: "injured",
  fieldset: {
    legend: { text: "Was anyone injured?", classes: "govuk-fieldset__legend--l", isPageHeading: true }
  },
  items: [
    {
      value: "yes",
      text: "Yes",
      conditional: {
        html: '<div class="govuk-form-group"><label class="govuk-label" for="injury-details">How many people?</label><input class="govuk-input govuk-input--width-3" id="injury-details" name="injuryDetails" type="text"></div>'
      }
    },
    { value: "no", text: "No" }
  ]
}) }}` },

  { id:'checkboxes', title:'Checkboxes', group:'Asking questions',
    when:'Pick ANY NUMBER of options, including none.',
    njk:`{% from "govuk/components/checkboxes/macro.njk" import govukCheckboxes %}
{{ govukCheckboxes({
  name: "hazards",
  fieldset: {
    legend: { text: "What is nearby?", classes: "govuk-fieldset__legend--l", isPageHeading: true }
  },
  hint: { text: "Select all that apply" },
  items: [
    { value: "school", text: "A school" },
    { value: "hospital", text: "A hospital" },
    { value: "duckpond", text: "A duck pond" }
  ]
}) }}` },

  { id:'select', title:'Select', group:'Asking questions',
    when:'A long list where the user already knows their answer, like a country. Radios are easier for short lists.',
    njk:`{% from "govuk/components/select/macro.njk" import govukSelect %}
{{ govukSelect({
  id: "council",
  name: "council",
  label: { text: "Which council area?", classes: "govuk-label--l", isPageHeading: true },
  items: [
    { value: "", text: "Choose a council" },
    { value: "ashby", text: "Ashby-de-la-Zouch" },
    { value: "barnsley", text: "Barnsley" },
    { value: "chipping", text: "Chipping Sodbury" }
  ]
}) }}` },

  { id:'date-input', title:'Date input', group:'Asking questions',
    when:'A date the user knows, like a date of birth. Three boxes, never a date picker.',
    njk:`{% from "govuk/components/date-input/macro.njk" import govukDateInput %}
{{ govukDateInput({
  id: "spotted",
  namePrefix: "spotted",
  fieldset: {
    legend: { text: "When did you spot it?", classes: "govuk-fieldset__legend--l", isPageHeading: true }
  },
  hint: { text: "For example, 27 3 2026" }
}) }}` },

  { id:'button', title:'Button', group:'Moving around',
    when:'One green button per page, and it should say what it does: "Continue", "Accept and send".',
    njk:`{% from "govuk/components/button/macro.njk" import govukButton %}
{{ govukButton({ text: "Continue" }) }}
{{ govukButton({ text: "Start now", href: "#", isStartButton: true }) }}
{{ govukButton({ text: "Cancel", classes: "govuk-button--secondary" }) }}
{{ govukButton({ text: "Delete", classes: "govuk-button--warning" }) }}` },

  { id:'back-link', title:'Back link', group:'Moving around',
    when:'Top left of every page except the first. Lets people undo a wrong turn.',
    njk:`{% from "govuk/components/back-link/macro.njk" import govukBackLink %}
{{ govukBackLink({ text: "Back", href: "#" }) }}` },

  { id:'error-summary', title:'Error summary', group:'Errors',
    when:'Goes at the TOP of the page, above the h1, whenever something is wrong. Each item links to the field.',
    njk:`{% from "govuk/components/error-summary/macro.njk" import govukErrorSummary %}
{{ govukErrorSummary({
  titleText: "There is a problem",
  errorList: [
    { text: "Enter the name of the road", href: "#road-name" },
    { text: "Select how big the pothole is", href: "#size" }
  ]
}) }}` },

  { id:'error-message', title:'A field in its error state', group:'Errors',
    when:'The red bar and message on the field itself. Always use it TOGETHER with an error summary, never alone.',
    njk:`{% from "govuk/components/input/macro.njk" import govukInput %}
{{ govukInput({
  label: { text: "What is your email address?", classes: "govuk-label--l", isPageHeading: true },
  id: "email",
  name: "email",
  errorMessage: { text: "Enter an email address in the correct format, like name@example.com" }
}) }}` },

  { id:'summary-list', title:'Summary list', group:'Confirming',
    when:'The "Check your answers" page. Every row needs a Change link.',
    njk:`{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}
{{ govukSummaryList({
  rows: [
    {
      key: { text: "Road name" },
      value: { text: "Acacia Avenue" },
      actions: { items: [ { href: "#", text: "Change", visuallyHiddenText: "road name" } ] }
    },
    {
      key: { text: "Size" },
      value: { text: "Bigger than a dinner plate" },
      actions: { items: [ { href: "#", text: "Change", visuallyHiddenText: "size" } ] }
    }
  ]
}) }}` },

  { id:'panel', title:'Confirmation panel', group:'Confirming',
    when:'The big green box on the last page. Give them a reference number they can quote.',
    njk:`{% from "govuk/components/panel/macro.njk" import govukPanel %}
{{ govukPanel({
  titleText: "Report submitted",
  html: "Your reference number<br><strong>HOLE-482913</strong>"
}) }}` },

  { id:'task-list', title:'Task list', group:'Confirming',
    when:'A longer service split into chunks that can be done in any order. A great stretch goal.',
    njk:`{% from "govuk/components/task-list/macro.njk" import govukTaskList %}
{{ govukTaskList({
  idPrefix: "report",
  items: [
    {
      title: { text: "Where is the pothole?" },
      href: "#",
      status: { text: "Completed" }
    },
    {
      title: { text: "How big is it?" },
      href: "#",
      status: { tag: { text: "Incomplete", classes: "govuk-tag--blue" } }
    },
    {
      title: { text: "Your contact details" },
      hint: { text: "Finish the earlier sections first" },
      status: { text: "Cannot start yet", classes: "govuk-task-list__status--cannot-start-yet" }
    }
  ]
}) }}` },

  { id:'inset-text', title:'Inset text', group:'Telling people things',
    when:'Draw the eye to something related to the page content, like a quote or a note.',
    njk:`{% from "govuk/components/inset-text/macro.njk" import govukInsetText %}
{{ govukInsetText({ text: "Potholes on motorways are handled by National Highways, not your council." }) }}` },

  { id:'warning-text', title:'Warning text', group:'Telling people things',
    when:'Consequences. Use it sparingly or people stop noticing it.',
    njk:`{% from "govuk/components/warning-text/macro.njk" import govukWarningText %}
{{ govukWarningText({ text: "Reporting a pothole that does not exist is an offence.", iconFallbackText: "Warning" }) }}` },

  { id:'notification-banner', title:'Notification banner', group:'Telling people things',
    when:'Tell someone something succeeded, or that they need to act. Not for errors on a form.',
    njk:`{% from "govuk/components/notification-banner/macro.njk" import govukNotificationBanner %}
{{ govukNotificationBanner({
  type: "success",
  text: "Your report has been sent to the council."
}) }}` },

  { id:'details', title:'Details', group:'Telling people things',
    when:'Hide an explanation that only some people need, so the page stays short.',
    njk:`{% from "govuk/components/details/macro.njk" import govukDetails %}
{{ govukDetails({
  summaryText: "What counts as a pothole?",
  text: "A hole in the road surface deeper than 40mm. Anything shallower is a defect."
}) }}` },

  { id:'tag', title:'Tag', group:'Telling people things',
    when:'Show the status of something in a list: Completed, Pending, Urgent.',
    njk:`{% from "govuk/components/tag/macro.njk" import govukTag %}
{{ govukTag({ text: "Completed" }) }}
{{ govukTag({ text: "Pending", classes: "govuk-tag--yellow" }) }}
{{ govukTag({ text: "Urgent", classes: "govuk-tag--red" }) }}` }
]
