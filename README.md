# Sabir Ali Portfolio

Personal portfolio for Sabir Ali, a full-stack developer. The site presents experience, technical skills, selected projects, and a contact form in a responsive single-page layout.

## Tech Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- GSAP and ScrollTrigger for section animations
- Three.js for the hero and signature visuals
- Lenis for smooth scrolling
- Lucide React for icons
- EmailJS for contact form delivery

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install and run locally

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
src/
├── components/
│   ├── AboutSection/
│   ├── ApproachSection/
│   ├── Common/             # Shared navigation, UI, and ambient visuals
│   ├── ContactSection/
│   ├── ExperienceSection/
│   ├── Footer/
│   ├── HeroSection/
│   ├── LogoReveal/
│   ├── ProjectsSection/
│   └── SkillsSection/
├── hooks/
│   └── useReducedMotion.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

Portfolio content for experience, projects, skills, certifications, and education is maintained in [`data.ts`](data.ts). Shared TypeScript models are defined in [`types.ts`](types.ts). The page is composed from independent section components; reusable headings, tilt cards, and tooltips live in `src/components/Common/UI.tsx`.

The interface uses a black-and-silver design system with restrained red accents. A session-only cinematic intro waits for the hero portrait or a bounded fallback, offers a keyboard-accessible skip, and is bypassed for reduced-motion and direct section-link visits. Anchor navigation and browser history stay synchronized with Lenis, and the fixed navigation indicates the section in view. GSAP/ScrollTrigger choreograph section reveals, the experience timeline, the hero's scroll-driven camera, and the scroll progress indicator; Lenis is synchronized through the GSAP ticker. The hero 3D scene loads during idle time or after the first interaction, lowers its render cost on mobile, and stops rendering outside the viewport or while the tab is hidden. Decorative motion and pointer interactions defer to reduced-motion and fine-pointer preferences; the 3D scene falls back to a static mark when motion is reduced or WebGL is unavailable.

Portfolio photography and project previews are served as optimized WebP assets; the hero portrait is preloaded at high priority, while project previews load lazily.

## Contact Form

The contact form sends messages through EmailJS. The EmailJS service, template, and public key are configured in [`ContactSection.tsx`](src/components/ContactSection/ContactSection.tsx). Update those values when connecting the form to a different EmailJS account or template.

## Production Build

Run the following before deployment:

```bash
npm run lint
npm run build
```

The generated static files are written to `dist/` and can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting provider. Configure the host to serve `index.html` for the root path.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
