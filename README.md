# Stephanie C — Portfolio 

A personal portfolio built with plain **HTML, CSS, and JavaScript**, leveraging AI for the initial layout framework and customized by hand with tailored background patterns, smooth animations, precise styling, and personal content.

## How it's organised

Content and layout are kept apart. 
The page code reads those files and builds every card, timeline entry and detail page from them,
so nothing is written twice.

```
data/                      ← CONTENT: edit these
  profile.js               Name, intro, photo, stats, links, About this site, footer
  experiences.js           Jobs (timeline)
  skills.js                Skill cards
  projects.js              Project cards + full report for each
  education.js             Degree / certification cards + detail page for each
  blog.js                  Plans and blog posts + full text for each

index.html                 Home page layout (section order, background pictures)
project.html               One template for every project report   
education.html             One template for every education page 
post.html                  One template for every plan / post  

css/style.css              All styles (colours and fonts are variables at the top)
js/render.js               Builds the pages from data/ (no need to edit, unless you want to adjust the template)
js/main.js                 Animations and interactions (shimmer settings near the end)
js/icons.js                Icon set

assets/
  photo.jpg                Your portrait on the landing section
  about.jpg                Photo in "About this site"
  resume.pdf               Your résumé (keep the name)
  projects/*.jpg           Project screenshots, also the report cover [Optional]
  blog/*.jpg               Plan / post cover images (1200×630) [Optional]
  bg/*.jpg                 Background picture for each section 
  favicon.svg
```

## Common edits

- **Add a job:** in `data/experiences.js`, copy one `{ ... }` block and paste it at the top.
  Set `start: "YYYY-MM"` and `end: "YYYY-MM"` or `end: "present"`. The dates and the length
  ("2 yrs 8 mos") are calculated for you, and a current job's length updates every month.
- **Add a project:** in `data/projects.js`, copy a block, give it a new `id`, and add a screenshot
  to `assets/projects/`. Its report is at `project.html#<id>`.
- **Add a certification:** same idea in `data/education.js`.
- **Add a plan or post:** same idea in `data/blog.js`. Use `type: "plan"` or `type: "post"`.
- **Change a skill card's size:** in `data/skills.js`, set `size: "xl"`, `"wide"` or leave it out.
- **Text formatting:** text in data files can use simple HTML such as `<strong>`, `<em>` and `<code>`.
  Long texts are lists of paragraphs: `["First paragraph.", "Second paragraph."]`.
- **Pictures:** replace any file in `assets/` with your own and keep the same file name.
- **Colour shimmer:** change colours, speed and strength in `SHIMMER` near the end of `js/main.js`.
- **Colours and fonts:** CSS variables at the top of `css/style.css` (`--accent`, `--accent-2`, …).

## Development & Tech Stack

- **Tech Stack:** HTML5, CSS3, Vanilla JavaScript
- **AI Integration:** Used Claude AI to generate initial boilerplate components and UI layout scaffolding.
- **Manual Refinements:** Custom fine-tuning of background patterns, CSS animations, responsive sizing, and interactive features.