# Sabir Ali — Full-Stack Engineer

[![JavaScript](https://img.shields.io/badge/JavaScript-portfolio%20engineering-f7df1e?logo=javascript&logoColor=111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock&logoColor=111)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=threedotjs&logoColor=white)](https://threejs.org/)

I’m **Sabir Ali**, a Full-Stack Engineer focused on full-stack web development, scalable applications, clean architecture, and modern user experiences. My engineering priorities are **clean code, type safety, performance, scalability, and maintainability**.

My broader technology focus includes **JavaScript, TypeScript, React, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL**. This portfolio itself is built with React, TypeScript, and Vite; the technologies listed in my broader focus are not all dependencies of this application.

[GitHub](https://github.com/sabiralidev) · [LinkedIn](https://www.linkedin.com/in/sabiralidev/) · [DEV.to](https://dev.to/sabirsheikh) · [Email](mailto:sabirsheik12787@gmail.com)

## Contents

- [Portfolio overview](#portfolio-overview)
- [What to explore](#what-to-explore)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Motion, design, and performance](#motion-design-and-performance)
- [Contact form and configuration](#contact-form-and-configuration)
- [Getting started](#getting-started)
- [Build and deployment](#build-and-deployment)
- [Contact](#contact)

## Portfolio overview

This repository contains my personal portfolio: a responsive, single-page site for introducing my engineering background and making selected work, skills, experience, and contact details easy to explore. It is designed as a concise professional profile as well as a demonstration of a carefully composed front-end experience.

The visual system uses a dark, primarily monochrome palette, silver typography, fine borders, and restrained red accents. Content is organized into distinct sections with persistent navigation, clear hierarchy, and responsive layouts that adapt from mobile to desktop.

## What to explore

- **Hero:** Introduction, social links, project and contact calls to action, and a downloadable résumé.
- **About:** Engineering focus and a short professional overview.
- **Technical expertise:** Skill categories, education, and certifications.
- **Approach:** Four stated engineering principles covering architecture, performance, security, and maintainability.
- **Selected work:** Two project summaries with repository and live-site links.
- **Experience:** A data-driven career timeline.
- **Contact:** Email details and a form for sending a message.

## Technology stack

### Application

| Area | Technologies and libraries |
| --- | --- |
| UI | React 19, React DOM, TypeScript |
| Development and build | Vite 7, TypeScript project build (`tsc -b`) |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer, component-level utility classes, Inter and Geist Mono fonts from Google Fonts |
| Animation and scrolling | GSAP, ScrollTrigger, Lenis |
| 3D and graphics | Three.js, native Canvas 2D |
| Icons | Lucide React |
| Contact form | EmailJS browser SDK |

### Development tools

ESLint with TypeScript, React Hooks, and React Refresh plugins is used for linting. `react-router-dom` is present in `package.json`, but the current application uses in-page hash links rather than React Router.

## Architecture

The page is composed in `src/App.tsx`. Section content and its TypeScript models are maintained separately from presentation components, making it straightforward to update portfolio data without restructuring the page.

```text
.
├── index.html                         # Document shell, metadata, font links, portrait preload
├── data.ts                            # Experience, projects, skills, education, certifications
├── types.ts                           # Shared content interfaces
├── package.json                       # Dependencies and npm scripts
├── public/
│   ├── Sabir.png                      # Hero portrait
│   ├── Sabir Resume.pdf               # Downloadable résumé
│   ├── ecom.png                       # Project preview
│   ├── AIworldTech.png                # Project preview
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── main.tsx                       # React entry point
    ├── App.tsx                        # Page composition, navigation and scroll setup
    ├── index.css                      # Tailwind directives, global styles and motion rules
    ├── App.css                        # Legacy stylesheet (not imported by main.tsx)
    ├── hooks/
    │   └── useReducedMotion.ts
    └── components/
        ├── AboutSection/
        ├── ApproachSection/
        ├── Common/                    # Navigation, intro, progress, canvas, shared UI
        ├── ContactSection/
        ├── ExperienceSection/
        ├── Footer/
        ├── HeroSection/               # Hero and lazy-loaded Three.js scene
        ├── LogoReveal/                # Additional components not mounted by App.tsx
        ├── ProjectsSection/
        └── SkillsSection/
```

`App.tsx` mounts the shared navigation, progress indicators, ambient canvas, page sections, footer, and introductory loader. Reusable UI primitives such as `SectionHeading`, `TiltCard`, `MagneticLink`, and `Tooltip` are in `src/components/Common/UI.tsx`; the monogram is shared through `MonogramLogo.tsx`. `data.ts` supplies the content rendered by the skills, projects, and experience sections.

## Motion, design, and performance

- **GSAP and ScrollTrigger** animate the hero entrance, section reveals, project imagery, experience timeline, and scroll progress.
- **Lenis** provides smooth scrolling and is advanced through the GSAP ticker so scroll-triggered effects remain synchronized.
- The **Three.js hero scene** is lazy-loaded after idle time or a visitor interaction. Its render loop pauses when the scene leaves the viewport or the browser tab is hidden. It uses a static fallback when WebGL is unavailable.
- A lightweight **Canvas 2D particle layer** adds ambient background motion.
- **Reduced-motion preferences** disable or simplify animation, including the intro and 3D scene. Pointer-driven effects are intended for fine pointers.
- Layouts use responsive Tailwind breakpoints. Project preview images load lazily; the hero portrait is preloaded and given high fetch priority. Vite also defines separate build chunks for Three.js, GSAP, and Lenis.

## Contact form and configuration

The contact form validates name, email, and message fields in the browser and submits through `@emailjs/browser`. It also provides a copy-email action and submission feedback. Message delivery goes directly from the browser to EmailJS; this repository does not include a server-side contact API.

No environment variables are read by the current Vite application, so an `.env` file is not required for local development or building. The EmailJS service ID, template ID, and public key are currently configured in `src/components/ContactSection/ContactSection.tsx`. Review that file when connecting the form to a different EmailJS account or template.

## Getting started

### Prerequisites

- Node.js **20.19+** or **22.12+** (Vite 7 supported versions)
- npm

### Install and run locally

```bash
git clone https://github.com/sabirsheik/sabir-dev.git
cd sabir-dev
npm install
npm run dev
```

Vite prints the local development URL after startup (typically `http://localhost:5173`).

### Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check with `tsc -b` and create the production build |
| `npm run preview` | Serve the production build locally |

## Build and deployment

Create and inspect a production build locally:

```bash
npm run lint
npm run build
npm run preview
```

Vite writes the deployable static site to `dist/`. Publish that directory to a static hosting provider, serving the application from the site root. This repository does not include provider-specific deployment configuration or a declared production URL. The contact form also requires the configured EmailJS service to be available to the browser.

## Contact

- **GitHub:** [sabiralidev](https://github.com/sabiralidev)
- **LinkedIn:** [sabiralidev](https://www.linkedin.com/in/sabiralidev/)
- **DEV.to:** [sabirsheikh](https://dev.to/sabirsheikh)
- **Email:** [sabirsheik12787@gmail.com](mailto:sabirsheik12787@gmail.com)
