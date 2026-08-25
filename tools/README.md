# tools — for whoever is running the hackathon

**Students: you don't need anything in here.** Edit the files in `static/` and `app/` directly.

The pages in `static/` are generated from the Nunjucks templates in `tools/templates/`, so that
their markup is guaranteed to match what the real GOV.UK components produce. If you want to
change the example service or the component gallery for next time, edit the templates here and
regenerate:

```
cd app && npm install        # only needed if node_modules is missing
cd ../tools
node build-static.js         # rebuilds static/index.html, name.html, etc.
node build-gallery.js        # rebuilds static/components.html
```

`components-data.js` is the list of components in the gallery. Each entry's `njk` snippet is the
single source of truth: it gets rendered to produce the live example, its output becomes the
copy-paste HTML, and the snippet itself is shown as the Nunjucks version. So the gallery can't
drift from what actually renders.

## Updating govuk-frontend

```
npm install govuk-frontend@latest
rm -rf vendor/govuk && cp -R node_modules/govuk-frontend/dist/govuk vendor/govuk
find vendor/govuk -name '*.map' -delete
sed -i '' 's|url(/assets/|url(assets/|g' vendor/govuk/govuk-frontend.min.css
```

That last `sed` is essential. The stock CSS points at an absolute `/assets/` path, which breaks
when a student opens `static/index.html` by double-clicking it. Making it relative is what lets
one vendored copy serve both tracks, over `file://` and over HTTP.

Then regenerate the static pages, because they embed the header and footer markup.
