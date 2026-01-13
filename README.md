Here’s a clean README.md for your portfolio website (minimal, dark vibe, explains what it does, how to run, and how to deploy). Copy/paste into a file named README.md in your portfolio repo.

# Portfolio — GitHub Projects Showcase

A minimal dark portfolio website built with **React + Vite + Tailwind**, that pulls my **public GitHub repositories** and displays them on the site.

Click any project to open a details modal where the **README.md** is rendered inside the website (including code blocks, lists, images, and links).

---

## ✨ Features

- Fetches public repos from GitHub (latest updated first)
- Search by repo name / description / language
- Filter by language
- Sort by: most recent / stars / name
- Hide forks toggle
- Project details modal:
  - shows repo metadata (stars, language, branch)
  - renders README.md on the website
  - fixes relative image and link paths from README
- Clean minimal dark UI

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- GitHub REST API
- react-markdown + remark-gfm (README rendering)
- react-syntax-highlighter (code blocks)

---

## 🚀 Getting Started

### 1) Clone
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2) Install dependencies
npm install

3) Configure your GitHub username (optional)

Create a .env file in the root:

VITE_GITHUB_USERNAME=huzefa897

4) Run locally
npm run dev


Vite will print the local URL (usually http://localhost:5173).

🔧 Scripts
npm run dev      # start development server
npm run build    # build for production
npm run preview  # preview the production build locally
