# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog called "Embedding One" (formerly "thinkspace") focused on machine learning, AI, and technical content. The site uses a custom Jekyll theme and is hosted on GitHub Pages.

## Essential Commands

### Development
```bash
bundle install          # Install Ruby dependencies
bundle exec jekyll serve # Start development server (usually http://localhost:4000)
bundle exec jekyll build # Build static site to _site/
```

### Admin Dashboard

**GitHub Pages Compatible (Recommended):**
- Access at `/admin-github/` on your live site
- Uses GitHub Personal Access Token for authentication
- No server setup required, works directly with GitHub API

**Local Development Version:**
```bash
npm install             # Install Node.js dependencies for admin dashboard
cp .env.example .env    # Set up environment variables (edit .env with your password)
npm start               # Start admin server (http://localhost:3001/admin.html)
npm run dev             # Start with auto-restart for development
```

### Build & Testing
```bash
./script/cibuild.sh     # CI build script (builds + runs HTML validation)
bundle exec htmlproofer ./_site --disable-external  # Validate HTML output
```

## Architecture

### Jekyll Structure
- `_config.yml` - Main site configuration (title, description, plugins, build settings)
- `_posts/` - Blog posts in Markdown with YAML frontmatter (YYYY-MM-DD-title.md format)
- `_layouts/` - HTML templates (default.html, post.html, page.html, compress.html)
- `_includes/` - Reusable HTML components (header, footer, nav, pagination, etc.)
- `assets/` - CSS (SCSS), images, JavaScript, and other static assets
- `_site/` - Generated static site output (excluded from git)

### Content Management
- Posts require YAML frontmatter with: `layout`, `title`, `description`, `keywords`, `tags`
- Images stored in `assets/images/`
- Custom CSS/SCSS in `assets/scss/` using Bourbon framework
- Font Awesome icons available via `assets/css/font-awesome.min.css`

### Specialized Content
- Resume files stored in `assets/` directory
- Blog supports tagging system and post sharing functionality

### Admin Dashboard
- **GitHub Pages version** (`/admin-github/`): Client-side interface using GitHub API
- **Local development version** (`/admin.html`): Node.js backend with file operations
- Full WYSIWYG editor using Quill.js for rich text editing
- GitHub Personal Access Token authentication (GitHub Pages) or environment variables (local)
- Automatic Jekyll frontmatter generation
- Direct integration with `_posts/` directory via GitHub API or local files

### Theme Details
- Custom "thinkspace" theme (v2.5.0) with minimalist design
- Uses Kramdown for Markdown processing and Rouge for syntax highlighting
- Bourbon SCSS framework for styling
- Jekyll plugins: sitemap generation, pagination, Bourbon integration