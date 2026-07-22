# MD Owais Junodi — Portfolio

A from-scratch personal portfolio site. Plain HTML/CSS/JS — no build step, no
framework, no dependencies. Open `index.html` in a browser and it works.

## Why no build tool

You're coming from an infra/ops background, not frontend — this was built so
you can read every line, edit it directly, and deploy it anywhere (GitHub
Pages, S3 + CloudFront, Netlify, Vercel) without npm, Vite, or a bundler in
the way. If you later want to rebuild it in React as a learning project, this
version is a clean reference for the content and structure.

## Project structure

```
portfolio/
├── index.html              All page content and section markup
├── css/
│   └── style.css           Design tokens + all styles (organized by section)
├── js/
│   └── main.js             Nav toggle, scroll reveal, hero animation, form
├── assets/
│   └── resume-placeholder.md   Replace with your real résumé PDF
└── README.md                This file
```

## What's new in v2

- **Signature branding** — a script-font "MD Owais" signature (Great Vibes)
  in the navbar, the loading screen, the contact section, and the footer,
  with an "Art & Designed by MD Owais" credit line in the footer.
- **Loading screen** — a short boot-sequence animation before the site reveals.
- **GitHub Projects section** — pulled from your real profile at
  `github.com/Dark-Knight07` (the 6 repos GitHub lists as "Popular": Build-
  Your-Own-Alexa, Movie-App, Car-Showcase-, Modern-Website, Basic-Java-
  Programs, Hangman-Game), with real star counts and links.
- **Live Projects section** — built and styled, but left as an honest
  placeholder: **you didn't share your actual Vercel links**, so I didn't
  invent fake "live demo" apps for a recruiter to click. Send me the real
  project URLs (or the repos behind them) and I'll turn this into cards
  matching the GitHub section's style.
- **Cloud/DevOps visual identity** — floating tech badges in the hero
  (AWS, Linux, Docker, Terraform, Git, Kubernetes, Python, Azure, Java,
  Workspace), a rotating role line, an animated CI/CD pipeline (Commit →
  Build → Test → Deploy → Monitor), and a typing terminal window in the
  Skills section running realistic commands (`ssh`, `aws s3 ls`,
  `systemctl status`, `aws iam list-users`).
- **Honest, real stats** — 3.5+ years, 7 platforms administered daily,
  25+ public GitHub repos, 2 companies. No invented numbers.
- Scroll progress bar + scrollspy nav highlighting for extra polish.

I deliberately did **not** implement every single animation idea from your
list (Docker/Kubernetes-specific animations, server rack glow, API request/
response visualizers, etc.) — cramming all of them in would work against the
"premium, professional" goal rather than for it. The pipeline animation, the
terminal, and the floating tech badges cover the same ground tastefully. Say
the word if you want me to add any of the others back in individually.

## Before you publish — customization checklist

- [ ] **Résumé**: add your real PDF to `assets/` and update the download link
      in `index.html` (see the note inside `resume-placeholder.md`).
- [ ] **Live Projects**: send me your real Vercel URLs so I can fill in the
      `#live-projects` section properly — right now it's an honest empty state.
- [ ] **Contact links**: in the Contact section of `index.html`, replace:
  - `owais.junodi@example.com` → your real email (appears twice: the mailto
    link, and inside `js/main.js`'s form handler)
  - the LinkedIn `href="https://linkedin.com/in/"` → your real profile URL
  - GitHub is already correct: `github.com/Dark-Knight07`
- [ ] **Projects**: as your concept projects move from idea → in progress →
      live, update the `chip-concept` / `chip-progress` class and label on
      each `<article class="project-card">`. Add a real repo link once one
      exists — I've left them link-free since none are public yet.
- [ ] **Certifications**: once you pass your first certification, replace the
      empty-state block (`#certifications`) with a card. Keep the same visual
      language (mono label, issuing body, date, credential link) so it stays
      consistent as the section grows.
- [ ] **OG image**: add a real `og-image.png` (1200×630) and reference it in
      the `<meta property="og:image">` tag if you want a nice preview when
      the link is shared on LinkedIn/Slack.

## Local preview

No install needed — just open the file:

```bash
# macOS
open index.html

# Windows
start index.html

# Or serve it properly (recommended, avoids some browser file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying (three good free options)

**GitHub Pages** (simplest, matches your GitHub skills):
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Deploy from branch → main → /(root)**.

**AWS S3 + CloudFront** (good hands-on practice for your cloud goals):
1. Create an S3 bucket, enable static website hosting.
2. Upload `index.html`, `css/`, `js/`, `assets/`.
3. Put a CloudFront distribution in front of it for HTTPS + caching.
4. Point your domain's Route 53 record at the CloudFront distribution.

This deployment path is worth doing manually once, then worth automating —
it's a natural next step for the Terraform / IaC project already listed in
the Projects section.

**Netlify / Vercel** (fastest): drag the `portfolio` folder into
Netlify Drop, or connect the GitHub repo — both auto-deploy on every push.

## Design notes (for your own reference)

- **Palette**: deep navy background, indigo ("wire") as the primary accent for
  links/connections, amber ("signal") for status indicators — a nod to the
  identity/cloud systems you connect daily.
- **Type**: Space Grotesk for headings, Inter for body text, JetBrains Mono
  for labels, tags, and status badges — the mono face is deliberately used
  for anything that reads like system output (status, stack tags, timeline
  markers).
- **Hero graphic**: an SVG "topology" diagram with you as the center node and
  AWS / Entra ID / Google Workspace / Linux / Slack / Atlassian as connected
  nodes — literal, not decorative, since that's genuinely your daily job.
- **Certifications section** is deliberately shown as an honest empty state
  rather than padded out — it's built to expand as you complete each one.

## Accessibility & performance built in

- Skip-to-content link, visible focus states, semantic landmarks (`header`,
  `main`, `footer`, `nav`).
- All animation respects `prefers-reduced-motion`.
- No external JS frameworks — first paint is near-instant.
- Fonts loaded via `<link>` with `preconnect`; swap to self-hosted fonts later
  if you want zero external requests.
