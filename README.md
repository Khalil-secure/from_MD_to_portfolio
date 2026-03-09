# Khalil Ghiati - Portfolio

A modern, bilingual portfolio website showcasing AI infrastructure engineering expertise. Built with clean HTML/CSS/JavaScript and featuring dynamic content loading for easy maintenance.

![Portfolio Preview](https://via.placeholder.com/800x400/1e2127/4ade80?text=Khalil+Ghiati+-+Portfolio)

## ✨ Features

- **Bilingual Support**: English and French language toggle
- **Dynamic Content**: Content loaded from JSON file for easy editing
- **Live Browser Editing**: Press `Ctrl+E` to edit content directly in browser
- **Responsive Design**: Mobile-first approach with modern CSS
- **Dark Theme**: Professional dark color scheme
- **Interactive Elements**: Smooth animations and hover effects
- **GitHub Integration**: Live repository fetching
- **Live Demos**: Showcase projects with GIF walkthroughs
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Quick Start

### Option 1: View Online
Visit the live portfolio at: [(https://portfolio-khalil-secure.vercel.app/)]

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/khalil-secure/from_MD_to_portfolio.git
cd portfolio

# Open in browser
# Simply open index.html in your web browser
# Or use a local server:
python -m http.server 8000
# Visit: http://localhost:8000
```

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── loadContent.js      # Dynamic content loader
├── content.json        # Portfolio content data
├── CONTENT.md          # Content documentation
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## ✏️ Editing Content

### Method 1: Edit JSON Directly (Recommended)
1. Open `content.json` in any text editor
2. Modify the content under the appropriate sections
3. Save and refresh your browser

### Method 2: Live Browser Editing
1. Open your portfolio in a browser
2. Press `Ctrl+E` to toggle edit mode
3. Click on any highlighted text to edit it
4. Click "💾 Save Changes" button to save
5. Refresh the page to persist changes

### Method 3: Use Markdown Documentation
1. Edit `CONTENT.md` for a human-readable format
2. Copy changes to `content.json` when ready to deploy

### Editable Elements
- **Personal Info**: Availability status, logo
- **Home Section**: Eyebrow, tagline, description, stack label
- **Experience**: Section titles and subtitles
- **Projects**: Section titles, button labels, subtitles
- **Certifications**: Section titles and subtitles

**Note**: Browser edits are temporary until you refresh. For permanent changes, edit the JSON file directly.

### Content Sections

#### Personal Information
```json
{
  "personal": {
    "logo_text": "khalil",
    "logo_suffix": ".sec"
  },
  "availability": {
    "en": "open to work",
    "fr": "disponible"
  }
}
```

#### Home Section
- **Eyebrow**: Short title/role
- **Tagline**: Key skills summary
- **Description**: Full bio with highlights
- **Social Links**: GitHub, LinkedIn, Email, Resume

#### Experience Section
- **Jobs**: Company, period, role, location, achievements
- **Tags**: Technologies and skills used
- **Bilingual**: All content in EN/FR

#### Projects Section
- **GitHub Repos**: Auto-fetched from GitHub API
- **Live Demos**: Manual entries with GIFs and descriptions
- **Tech Stacks**: Technology badges for each project

#### Certifications Section
- **Credentials**: Degrees, certifications, courses
- **Status Badges**: Obtained, Certified, Completed, Active

## 🎨 Customization

### Colors
The design uses CSS custom properties (variables):
```css
:root {
  --bg: #1e2127;           /* Background */
  --surface: #2a2f38;      /* Cards/sections */
  --green: #4ade80;        /* Primary accent */
  --blue: #60a5fa;         /* Secondary accent */
  --text: #e8ecf0;         /* Primary text */
  --text2: #8c9aab;        /* Secondary text */
}
```

### Fonts
- **Primary**: Inter (sans-serif)
- **Headings**: Instrument Serif (serif)
- **Fallback**: System fonts

### Animations
- **Rise Animation**: Elements fade in from bottom
- **Hover Effects**: Subtle transforms and color changes
- **Loading Spinner**: Custom CSS animation

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Netlify
1. Drag & drop the project folder
2. Or connect GitHub repository
3. Set build command: (none needed - static site)

### GitHub Pages
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose main/master branch
4. Access at: `https://yourusername.github.io/portfolio/`

### Manual Hosting
Upload all files to any web server. No build process required.

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern layouts, animations, responsive design
- **Vanilla JavaScript**: Dynamic content loading, interactions
- **JSON**: Structured data storage
- **GitHub API**: Repository fetching
- **Font Awesome**: Icons (via CDN)
- **Google Fonts**: Typography

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Development

### Adding New Content
1. Update `content.json` with new data
2. Test locally by opening `index.html`
3. Ensure both EN and FR versions are updated
4. Commit and push changes

### Modifying Styles
- Edit CSS in `<style>` tag within `index.html`
- Use CSS custom properties for consistent theming
- Test responsiveness on different screen sizes

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding data to `content.json`
3. Update `loadContent.js` to populate the new section
4. Add navigation and styling

## 📊 Performance

- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2s
- **Total Bundle Size**: ~50KB (HTML + CSS + JS)
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and adapt for your own use

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: medkhalilghiati@gmail.com
- **LinkedIn**: [Mohamed Khalil Ghiati](https://www.linkedin.com/in/mohamed-ghiati-khalil/)
- **GitHub**: [@Khalil-secure](https://github.com/Khalil-secure)

---

**Built with ❤️ by Khalil Ghiati**