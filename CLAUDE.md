# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with **pure HTML/CSS/JavaScript** (no frameworks, no build tools). It serves as a link-in-bio style hub connecting to various subdomains and social profiles. The project is actively used as a **learning vehicle** for web development fundamentals.

**Live Site:** https://guoyibo.top

## Development Setup

This is a static site with **no package.json** and **no build process**.

### Local Development
- Use VS Code's **Live Server** extension (configured to run on port 5501)
- Configuration: `.vscode/settings.json`
- Alternatively, open any HTML file directly in a browser

### Deployment
- **GitHub Pages** via the `main` branch
- Custom domain configured via `CNAME`: guoyibo.top
- Push to main branch to deploy

## File Structure

```
├── index.html              # Minimal link-in-bio hub (inline styles)
├── my-social-media.html    # X (Twitter) profile page
├── my-media.html           # Media platform aggregator (Douyin, Xiaohongshu, Bilibili)
├── script.js               # All JavaScript functionality
├── style.css               # Shared styles for my-social-media.html and my-media.html
├── images/                 # Static assets
├── llm/                    # Learning documentation (gitignored)
└── CNAME                   # GitHub Pages custom domain
```

**Important:** `index.html` is a standalone page with inline styles (dark theme only). The other two HTML pages (`my-social-media.html`, `my-media.html`) share `style.css` and `script.js` and support dark/light theme switching.

## Architecture & Patterns

### CSS Architecture
- **CSS Variables (Custom Properties):** Theme colors defined in `:root` and `body.dark-theme`
- **Mobile-First Responsive Design:** Media queries at `@media (max-width: 768px)`
- **Glassmorphism:** `backdrop-filter: blur()` effects on cards
- **BEM-like Naming:** Classes like `.me-card`, `.social-card__badge`, `.theme-toggle__icon`
- **4px Spacing Scale:** Consistent spacing using multiples of 4px

### JavaScript Organization
All code in `script.js` organized by feature with Chinese section comments:
- Mobile menu toggle (hamburger animation)
- Clipboard copy with fallback for older browsers
- Skill bar animation (Intersection Observer)
- Number counter animation with custom easing
- Contact button (show/hide email card)
- Theme toggle (localStorage persistence)
- Scroll reveal animations

### Key Technical Patterns

**Intersection Observer Pattern** (script.js:47-88, 215-237):
```javascript
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation
            observer.unobserve(entry.target); // Animate once
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });
```

**Clipboard Fallback** (script.js:13-41):
Modern `navigator.clipboard.writeText()` with `document.execCommand('copy')` fallback for older browsers.

**CSS Variable Theming** (style.css:4-61):
Define variables once, reference throughout. Dark theme overrides via `body.dark-theme` selector.

## Subdomain Architecture

The main site links to multiple project subdomains:
- `aa.guoyibo.top` — VibeSplit (AA split calculator)
- `movie.guoyibo.top` — Movie Gallery
- `game.guoyibo.top` — Game Gallery
- `santa-hat.guoyibo.top` — Santa Hat Generator
- `podcast.guoyibo.top` — Podcast Gallery
- `blog.guoyibo.top` — Berg's Blog
- `run.guoyibo.top` — Running Page

Each subdomain is a separate project/repository.

## Code Conventions

### Comments
- **Code comments are in Chinese** (学习者偏好)
- Section headers use format: `// ============================================\n// 功能名称\n// ============================================`

### Naming
- CSS classes: BEM-style or descriptive with hyphens
- JavaScript functions: camelCase
- IDs: PascalCase or descriptive

### Accessibility
- Semantic HTML5 elements
- ARIA attributes on interactive elements
- `aria-expanded` for menu state
- `aria-hidden` for decorative elements
- `focus-visible` outlines for keyboard navigation

## Learning Context

This repository includes an `/llm/` folder (gitignored) with learning documentation. The user is learning web development through practical implementation with these preferences:
- **Background:** C++, Python, Java/Spring experience
- **Learning Goal:** Build web applications using HTML/CSS/JS
- **Approach:** Project-driven, hands-on learning
- **Availability:** ~5 hours/day for learning

When implementing new features, consider:
1. Use vanilla JavaScript before suggesting frameworks
2. Explain the "why" behind implementation choices
3. Encourage understanding core web fundamentals
4. Chinese language explanations where helpful
