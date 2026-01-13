# 🌌 Automated 3D Neural Portfolio

A fully automated, fork-and-deploy personal portfolio website that self-configures based on the GitHub account that hosts it.

## 🚀 Quick Start (Zero Config)

1.  **Fork** this repository.
2.  Go to **Settings > Pages**.
3.  Set the source to the `main` branch (or `gh-pages` if you prefer a build).
4.  **Done!** Your portfolio is live at `https://[your-username].github.io/portfolio/`.

## ✨ Features

- **GitHub Username Detection**: Automatically detects you as the owner.
- **Project Discovery**: Fetches all your public repositories and highlights those with GitHub Pages enabled.
- **Deterministic 3D Visuals**: Every project gets a unique, immersive 3D pattern generated from its name.
- **AI Tagline & Skills**: Inferred automatically from your repository data and languages.
- **Immersive Backgrounds**: Full-screen 3D starfield and geometric floats.

## 🛠️ Local Development

```bash
npm install
npm run dev
```

To see your own data locally, append your username to the URL:
`http://localhost:5173/?user=YOUR_USERNAME`

## 🎨 Technology Stack

- **React** + **Vite**
- **Three.js** (via @react-three/fiber & @react-three/drei)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Vanilla CSS** (Glassmorphic Design)
