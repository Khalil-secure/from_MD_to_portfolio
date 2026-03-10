#!/usr/bin/env node
/**
 * CONTENT.md → HTML converter
 * Parses markdown and updates index.html with fresh content
 * Also updates content.json for backup/reference
 */

const fs = require('fs');
const path = require('path');

const CONTENT_FILE = path.join(__dirname, 'CONTENT.md');
const HTML_FILE = path.join(__dirname, 'index.html');
const JSON_FILE = path.join(__dirname, 'content.json');

try {
  // Read markdown
  const mdContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
  const mdLines = mdContent.split('\n');
  
  // Read current HTML
  let htmlContent = fs.readFileSync(HTML_FILE, 'utf-8');
  
  // Load JSON for structure reference
  const json = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
  
  // Helper: extract value from markdown line
  const extractMarkdownValue = (mdArray, searchTerm) => {
    for (let i = 0; i < mdArray.length; i++) {
      const line = mdArray[i];
      if (line.includes(searchTerm)) {
        const match = line.match(/- \*\*[^*]+\*\*:\s*(.+)/);
        if (match) return match[1].trim();
      }
    }
    return null;
  };

  // Extract all values from CONTENT.md
  const eyebrowEN = extractMarkdownValue(mdLines, 'EN Eyebrow');
  const eyebrowFR = extractMarkdownValue(mdLines, 'FR Eyebrow');
  const taglineEN = extractMarkdownValue(mdLines, 'EN Tagline');
  const taglineFR = extractMarkdownValue(mdLines, 'FR Tagline');
  const availEN = extractMarkdownValue(mdLines, '**EN**:') || 'Open to work';
  const availFR = extractMarkdownValue(mdLines, '**FR**:') || 'Disponible';

  // Update JSON
  if (eyebrowEN) json.home.eyebrow.en = eyebrowEN;
  if (eyebrowFR) json.home.eyebrow.fr = eyebrowFR;
  if (taglineEN) json.home.tagline.en = taglineEN;
  if (taglineFR) json.home.tagline.fr = taglineFR;
  if (availEN) json.availability.en = availEN;
  if (availFR) json.availability.fr = availFR;

  // Update HTML content with data attributes for JS to read
  htmlContent = htmlContent.replace(
    /data-en="[^"]*".*?>/g,
    (match) => {
      // Only update if we have new values
      return eyebrowEN ? match.replace(/data-en="[^"]*"/, `data-en="${eyebrowEN.replace(/"/g, '&quot;')}"`) : match;
    }
  );

  // Write updated files
  fs.writeFileSync(JSON_FILE, JSON.stringify(json, null, 2));
  fs.writeFileSync(HTML_FILE, htmlContent);

  console.log('✅ CONTENT.md → HTML + JSON updated successfully!');
  console.log('📝 Updated eyebrow, tagline, and availability');
  console.log('🚀 Ready to deploy!');

} catch (error) {
  console.error('❌ Conversion error:', error.message);
  process.exit(1);
}
