# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with **pure HTML/CSS/JavaScript** (no frameworks, no build tools). It is a minimal single-page link-in-bio. The project is actively used as a **learning vehicle** for web development fundamentals.

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
├── index.html      # 唯一页面：极简 link-in-bio（内联样式，无 JS）
├── images/         # avatar.jpg、favicon.svg（标签页图标）、apple-touch-icon.png（iOS 主屏图标）
├── llm/            # Learning documentation (gitignored)
└── CNAME           # GitHub Pages custom domain
```

## Architecture & Patterns

- **单页面、零依赖**：不加载外部字体（Google Fonts 在国内被墙），使用系统字体栈
- **CSS Variables**：颜色定义在 `:root`，深色模式通过 `@media (prefers-color-scheme: dark)` 覆盖，自动跟随系统
- **列表行结构**：`.list > li > a.row`，内含 `.row__name` / `.row__desc` / `.row__arrow`
- **Mobile-first**：单列、`max-width: 560px`

## Links on the Page

- `movie.guoyibo.top` — Movie Gallery（唯一保留的作品）
- 社交：X @PssBerg、小红书、抖音、bilibili

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
