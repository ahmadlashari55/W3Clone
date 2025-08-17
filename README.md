
# Web School Clone (W3Schools‑style)

A lightweight, static learning site you can deploy to **GitHub Pages**. It includes:
- Landing page with dark mode, topic cards
- Tutorials (HTML, CSS, JS)
- Live editor (“Try It Yourself”)
- Quiz engine (JS basics demo)
- **1000+ item Feature Registry** (assets/features.json) with search/filter
- Simple login (demo, localStorage)

## Run Locally
Open `index.html` in your browser, or serve with any static server.

## Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/&lt;your-username&gt;/W3Clone.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Source: Deploy from a branch → main /root**

## Files
```
index.html
styles.css
app.js
tryit.html
quiz.html
tutorials/
  ├─ html.html
  ├─ css.html
  └─ js.html
assets/
  └─ features.json  (1000 features/functions)
```

## Customize
- Edit `assets/features.json` to track roadmap items.
- Add more tutorials under `tutorials/` and link from `index.html`.
- Extend the quiz with more questions or topics.
- Consider a real backend (Firebase/Supabase) for auth, progress, and certificates.
