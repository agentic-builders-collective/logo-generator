// ASCII Logo Generator
(function() {
  'use strict';

  // 7×7 lowercase letter patterns (descender letters use 9 rows)
  const PIXEL_PATTERNS = {
    a: [[0,0,0,0,0,0,0],[0,1,1,1,1,0,0],[0,0,0,0,0,1,0],[0,1,1,1,1,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,1,0]],
    b: [[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,1,1,1,1,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,1,1,1,1,0,0]],
    c: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,1,1,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,0,0],[1,0,0,0,0,1,0],[0,1,1,1,1,0,0]],
    d: [[0,0,0,0,0,1,0],[0,0,0,0,0,1,0],[0,1,1,1,1,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,1,0]],
    e: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,1,1,0,0],[1,0,0,0,0,1,0],[1,1,1,1,1,0,0],[1,0,0,0,0,0,0],[0,1,1,1,1,1,0]],
    f: [[0,0,1,1,1,1,0],[0,1,0,0,0,0,0],[1,0,0,0,0,0,0],[1,1,1,1,1,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0]],
    g: [[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,1,0],[0,0,0,0,1,0,0],[0,1,1,1,0,0,0]],
    h: [[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,1,1,1,0,0],[1,1,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0]],
    i: [[0,0,1,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,1,1,1,0,0,0]],
    j: [[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,1,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[1,0,0,1,0,0,0],[0,1,1,0,0,0,0]],
    k: [[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,1,0,0],[1,0,0,1,0,0,0],[1,1,1,0,0,0,0],[1,0,0,1,0,0,0],[1,0,0,0,1,0,0]],
    l: [[0,1,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[0,1,1,1,0,0,0]],
    m: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,0,1,1,0,0],[1,0,1,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0]],
    n: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0],[1,0,0,0,1,0,0],[1,0,0,0,1,0,0],[1,0,0,0,1,0,0],[1,0,0,0,1,0,0]],
    o: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,1,1,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,0,0]],
    p: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,1,1,1,1,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
    q: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,1,0],[0,0,0,0,0,1,0],[0,0,0,0,0,0,0]],
    r: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,1,1,1,0,0],[1,1,0,0,0,1,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0]],
    s: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[1,0,0,0,0,0,0],[0,1,1,1,1,0,0],[0,0,0,0,0,1,0],[1,1,1,1,1,0,0]],
    t: [[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[1,1,1,1,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,1,0,0,0]],
    u: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,1,1,1,1,0]],
    v: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,0,0,1,0,0],[0,0,1,1,0,0,0]],
    w: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[1,0,1,0,1,0,0],[1,0,1,0,1,0,0],[0,1,0,0,1,0,0]],
    x: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,1,0],[0,1,0,0,1,0,0],[0,0,1,1,0,0,0],[0,1,0,0,1,0,0],[1,0,0,0,0,1,0]],
    y: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,1,0,0,1,0,0],[0,0,1,1,0,0,0],[0,0,0,1,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0]],
    z: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,0],[0,0,0,1,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0],[1,1,1,1,1,1,0]]
  };

  const PIXEL_GRID_ROWS = 9;

  const BLOCK_STYLES = {
    solid:   { on: '\u2588', off: ' ' },
    shade:   { on: '\u2593', off: ' ' },
    medium:  { on: '\u2592', off: ' ' },
    light:   { on: '\u2591', off: ' ' },
    outline: { on: '\u2588', off: '\u2591' }
  };

  const GRADIENT_PALETTES = {
    sunset:  { name: 'Sunset',  colors: ['#ff9966', '#ff5e62'] },
    ocean:   { name: 'Ocean',   colors: ['#667eea', '#764ba2'] },
    fire:    { name: 'Fire',    colors: ['#ff0844', '#ffb199'] },
    matrix:  { name: 'Matrix',  colors: ['#00ff41', '#008f11'] },
    nebula:  { name: 'Nebula',  colors: ['#654ea3', '#eaafc8'] },
    gold:    { name: 'Gold',    colors: ['#f7971e', '#ffd200'] },
    forest:  { name: 'Forest',  colors: ['#134e5e', '#71b280'] },
    mint:    { name: 'Mint',    colors: ['#00d2ff', '#3a7bd5'] },
    ice:     { name: 'Ice',     colors: ['#e0eafc', '#cfdef3'] },
    coral:   { name: 'Coral',   colors: ['#ff9a9e', '#fad0c4'] },
    aurora:  { name: 'Aurora',  colors: ['#a8ff78', '#78ffd6'] },
    mono:    { name: 'Mono',    colors: null }
  };

  const FONT_OPTIONS = {
    block:  { name: 'Block',  type: 'cfonts' },
    shade:  { name: 'Shade',  type: 'cfonts' },
    huge:   { name: 'Huge',   type: 'cfonts' },
    slick:  { name: 'Slick',  type: 'cfonts' },
    chrome: { name: 'Chrome', type: 'cfonts' },
    tiny:   { name: 'Tiny',   type: 'cfonts' },
    pixel:  { name: 'Pixel',  type: 'pixel' }
  };

  const TAGLINE_FONT_MAP = {
    mono: "'JetBrains Mono', 'Courier New', monospace",
    firacode: "'Fira Code', 'JetBrains Mono', monospace",
    spacemono: "'Space Mono', 'Courier New', monospace",
    ibmplex: "'IBM Plex Mono', 'Courier New', monospace",
    majormono: "'Major Mono Display', monospace",
    atkinson: "'Atkinson Hyperlegible Mono', monospace",
    sans: "'Space Grotesk', -apple-system, sans-serif",
    serif: "Georgia, 'Times New Roman', serif"
  };

  const MAX_TEXT_LENGTH = 12;
  const MAX_TAGLINE_LENGTH = 120;
  const STORAGE_KEY = 'abc-logo-generator:v4';

  // DOM Elements
  const asciiOutput = document.getElementById('ascii-output');
  const ruleOutput = document.getElementById('rule-output');
  const taglineOutput = document.getElementById('tagline-output');
  const logoPreview = document.getElementById('logo-preview');

  const textInput = document.getElementById('logo-text');
  const taglineInput = document.getElementById('tagline-text');
  const fontSelect = document.getElementById('font-select');
  const blockStyleSelect = document.getElementById('block-style');
  const blockStyleGroup = document.getElementById('block-style-group');
  const textColorInput = document.getElementById('text-color');
  const textColorGroup = document.getElementById('text-color-group');
  const logoSizeSlider = document.getElementById('logo-size');
  const logoSizeValue = document.getElementById('logo-size-value');
  const lineHeightSlider = document.getElementById('line-height');
  const lineHeightValue = document.getElementById('line-height-value');
  const taglineSizeSlider = document.getElementById('tagline-size');
  const taglineSizeValue = document.getElementById('tagline-size-value');
  const taglineFontSelect = document.getElementById('tagline-font');
  const taglineSpacingSlider = document.getElementById('tagline-spacing');
  const taglineSpacingValue = document.getElementById('tagline-spacing-value');
  const taglineCaseSelect = document.getElementById('tagline-case');
  const taglineSingleLineCheckbox = document.getElementById('tagline-single-line');
  const paddingSlider = document.getElementById('padding-size');
  const paddingValue = document.getElementById('padding-value');
  const alignOptions = document.querySelectorAll('.align-option');
  const showRuleCheckbox = document.getElementById('show-rule');
  const showTaglineCheckbox = document.getElementById('show-tagline');
  const bgOptions = document.querySelectorAll('.bg-option');
  const copyTextBtn = document.getElementById('copy-text');
  const exportHtmlBtn = document.getElementById('export-html');
  const exportPngBtn = document.getElementById('export-png');
  const paletteContainer = document.getElementById('palette-options');
  const directionSelect = document.getElementById('gradient-direction');

  // State
  let state = {
    text: 'ABC',
    tagline: 'agentic builders collective',
    font: 'block',
    blockStyle: 'solid',
    textColor: '#ffffff',
    bgColor: '#000000',
    logoSize: 14,
    taglineSize: 14,
    taglineFont: 'mono',
    taglineSpacing: 4,
    taglineTransform: 'none',
    taglineSingleLine: true,
    lineHeight: 1.15,
    padding: 60,
    align: 'center',
    showRule: true,
    showTagline: true,
    palette: 'sunset',
    gradientDirection: 'vertical'
  };

  // --- Colour utilities ---

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function lerpColor(c1, c2, t) {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);
    return rgbToHex(
      Math.round(r1 + (r2 - r1) * t),
      Math.round(g1 + (g2 - g1) * t),
      Math.round(b1 + (b2 - b1) * t)
    );
  }

  function dimColor(hex, factor) {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(Math.round(r * factor), Math.round(g * factor), Math.round(b * factor));
  }

  function getGradientColor(colors, t) {
    if (!colors || colors.length === 0) return '#ffffff';
    if (colors.length === 1) return colors[0];
    t = Math.max(0, Math.min(1, t));
    const segment = t * (colors.length - 1);
    const i = Math.min(Math.floor(segment), colors.length - 2);
    return lerpColor(colors[i], colors[i + 1], segment - i);
  }

  function getGradientPosition(row, col, totalRows, totalCols, direction) {
    const r = totalRows > 1 ? row / (totalRows - 1) : 0;
    const c = totalCols > 1 ? col / (totalCols - 1) : 0;
    switch (direction) {
      case 'horizontal': return c;
      case 'diagonal':   return (r + c) / 2;
      default:           return r;
    }
  }

  // --- cfonts parsing ---

  function parseCfontsLine(line) {
    const segments = [];
    let pos = 0;
    while (pos < line.length) {
      const tagMatch = line.substring(pos).match(/^<c(\d)>/);
      if (tagMatch) {
        const channel = parseInt(tagMatch[1]);
        pos += tagMatch[0].length;
        const endTag = '</c' + channel + '>';
        const endPos = line.indexOf(endTag, pos);
        if (endPos === -1) break;
        const text = line.substring(pos, endPos);
        for (let i = 0; i < text.length; i++) {
          segments.push({ char: text[i], channel: channel });
        }
        pos = endPos + endTag.length;
      } else {
        segments.push({ char: line[pos], channel: 0 });
        pos++;
      }
    }
    return segments;
  }

  function buildCfontsGrid(text, fontName) {
    const font = CFONTS_DATA[fontName];
    if (!font) return [];
    const chars = text.toUpperCase().split('').filter(function(c) { return font.chars[c]; });
    if (chars.length === 0) return [];

    const grid = [];
    for (let row = 0; row < font.lines; row++) {
      var line = [];
      chars.forEach(function(char, charIndex) {
        var rowStr = font.chars[char][row];
        var segments = parseCfontsLine(rowStr);
        line = line.concat(segments);
        if (charIndex < chars.length - 1) {
          var lsStr = font.letterspace[row];
          var lsSegments = parseCfontsLine(lsStr);
          line = line.concat(lsSegments);
        }
      });
      grid.push(line);
    }
    return grid;
  }

  // --- Pixel font utilities ---

  function getPixelPattern(char) {
    const p = PIXEL_PATTERNS[char];
    if (!p) return null;
    if (p.length >= PIXEL_GRID_ROWS) return p;
    const padded = p.slice();
    while (padded.length < PIXEL_GRID_ROWS) padded.push([0,0,0,0,0,0,0]);
    return padded;
  }

  function buildPixelGrid(text, style) {
    const blocks = BLOCK_STYLES[style];
    const chars = text.toLowerCase().split('').filter(function(c) { return PIXEL_PATTERNS[c]; });
    if (chars.length === 0) return [];

    var grid = [];
    for (var row = 0; row < PIXEL_GRID_ROWS; row++) {
      var line = [];
      chars.forEach(function(char, charIndex) {
        var pattern = getPixelPattern(char);
        pattern[row].forEach(function(bit) {
          line.push({ char: bit ? blocks.on : blocks.off, channel: bit ? 1 : 0 });
        });
        if (charIndex < chars.length - 1) {
          line.push({ char: ' ', channel: 0 });
          line.push({ char: ' ', channel: 0 });
          line.push({ char: ' ', channel: 0 });
        }
      });
      grid.push(line);
    }
    return grid;
  }

  // --- Unified rendering ---

  function buildGrid(text) {
    var fontOpt = FONT_OPTIONS[state.font];
    if (fontOpt.type === 'cfonts') {
      return buildCfontsGrid(text, state.font);
    }
    return buildPixelGrid(text, state.blockStyle);
  }

  function gridToPlainText(grid) {
    return grid.map(function(row) {
      return row.map(function(c) { return c.char; }).join('');
    }).join('\n');
  }

  function gridToHtml(grid, paletteKey, direction, textColor) {
    if (grid.length === 0) return '';
    var palette = GRADIENT_PALETTES[paletteKey];
    var colors = palette ? palette.colors : null;
    var totalRows = grid.length;
    var totalCols = Math.max.apply(null, grid.map(function(r) { return r.length; }));

    return grid.map(function(row, ri) {
      return row.map(function(cell, ci) {
        if (cell.channel === 0) return escapeHtml(cell.char);

        var color;
        if (colors) {
          var t = getGradientPosition(ri, ci, totalRows, totalCols, direction);
          var baseColor = getGradientColor(colors, t);
          color = cell.channel === 1 ? baseColor : dimColor(baseColor, 0.4);
        } else {
          color = cell.channel === 1 ? textColor : dimColor(textColor, 0.4);
        }
        return '<span style="color:' + color + '">' + escapeHtml(cell.char) + '</span>';
      }).join('');
    }).join('\n');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // --- Rule and tagline ---

  function generateRule(grid) {
    if (grid.length === 0) return '';
    var width = grid[0].length;
    var ch = '\u2504';
    var rule = '';
    for (var i = 0; i < width; i++) rule += ch;
    return rule;
  }

  function generateTaglinePlain(tagline) {
    // Approximate the CSS letter-spacing visually in plain text
    var spacing = state.taglineSpacing;
    var transform = state.taglineTransform;
    var text = tagline;
    if (transform === 'uppercase') text = text.toUpperCase();
    else if (transform === 'lowercase') text = text.toLowerCase();

    if (spacing >= 2) {
      return text.split('').map(function(c) {
        return c === ' ' ? '  ' : c + ' ';
      }).join('');
    }
    return text;
  }

  function generateTaglineHtml(tagline, paletteKey, direction, textColor) {
    var palette = GRADIENT_PALETTES[paletteKey];
    var colors = palette ? palette.colors : null;

    if (!colors) {
      return '<span style="color:' + textColor + '">' + escapeHtml(tagline) + '</span>';
    }

    var chars = tagline.split('');
    var totalCols = chars.length;
    return chars.map(function(c, ci) {
      if (c === ' ') return ' ';
      var t = totalCols > 1 ? ci / (totalCols - 1) : 0;
      var color = getGradientColor(colors, t);
      return '<span style="color:' + color + '">' + escapeHtml(c) + '</span>';
    }).join('');
  }

  function getPaletteRuleColor() {
    var palette = GRADIENT_PALETTES[state.palette];
    if (!palette || !palette.colors) return state.textColor;
    return getGradientColor(palette.colors, 0.5);
  }

  // --- Init ---

  function init() {
    loadState();
    buildPaletteSwatches();
    syncControls();
    setupEventListeners();
    render();
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Try legacy keys
        raw = localStorage.getItem('abc-logo-generator:v3') || localStorage.getItem('abc-logo-generator:v2') || localStorage.getItem('abc-logo-generator:v1');
      }
      if (!raw) return;

      var saved = JSON.parse(raw);

      // Legacy migration: map fontSize to logoSize
      var logoSize = Number.isFinite(saved.logoSize) ? saved.logoSize : (Number.isFinite(saved.fontSize) ? saved.fontSize : state.logoSize);

      state = {
        text: (saved.text || state.text).slice(0, MAX_TEXT_LENGTH),
        tagline: (saved.tagline || state.tagline).slice(0, MAX_TAGLINE_LENGTH),
        font: saved.font && FONT_OPTIONS[saved.font] ? saved.font : state.font,
        blockStyle: saved.blockStyle || state.blockStyle,
        textColor: saved.textColor || state.textColor,
        bgColor: saved.bgColor || state.bgColor,
        logoSize: logoSize,
        taglineSize: Number.isFinite(saved.taglineSize) ? saved.taglineSize : state.taglineSize,
        taglineFont: saved.taglineFont && TAGLINE_FONT_MAP[saved.taglineFont] ? saved.taglineFont : state.taglineFont,
        taglineSpacing: Number.isFinite(saved.taglineSpacing) ? saved.taglineSpacing : state.taglineSpacing,
        taglineTransform: ['none', 'uppercase', 'lowercase'].indexOf(saved.taglineTransform) !== -1 ? saved.taglineTransform : state.taglineTransform,
        taglineSingleLine: typeof saved.taglineSingleLine === 'boolean' ? saved.taglineSingleLine : state.taglineSingleLine,
        lineHeight: Number.isFinite(saved.lineHeight) ? saved.lineHeight : state.lineHeight,
        padding: Number.isFinite(saved.padding) ? saved.padding : state.padding,
        align: ['left', 'center', 'right'].indexOf(saved.align) !== -1 ? saved.align : state.align,
        showRule: typeof saved.showRule === 'boolean' ? saved.showRule : state.showRule,
        showTagline: typeof saved.showTagline === 'boolean' ? saved.showTagline : state.showTagline,
        palette: saved.palette && GRADIENT_PALETTES[saved.palette] ? saved.palette : state.palette,
        gradientDirection: saved.gradientDirection || state.gradientDirection
      };
    } catch (error) { /* ignore */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function buildPaletteSwatches() {
    paletteContainer.innerHTML = '';
    for (var key in GRADIENT_PALETTES) {
      var palette = GRADIENT_PALETTES[key];
      var btn = document.createElement('button');
      btn.className = 'palette-swatch';
      btn.dataset.palette = key;
      btn.title = palette.name;
      if (palette.colors) {
        btn.style.background = 'linear-gradient(135deg, ' + palette.colors.join(', ') + ')';
      } else {
        btn.style.background = '#ffffff';
      }
      paletteContainer.appendChild(btn);
    }
  }

  function syncControls() {
    textInput.value = state.text;
    taglineInput.value = state.tagline;
    fontSelect.value = state.font;
    blockStyleSelect.value = state.blockStyle;
    textColorInput.value = state.textColor;
    logoSizeSlider.value = state.logoSize;
    logoSizeValue.textContent = state.logoSize;
    lineHeightSlider.value = state.lineHeight;
    lineHeightValue.textContent = state.lineHeight;
    taglineSizeSlider.value = state.taglineSize;
    taglineSizeValue.textContent = state.taglineSize;
    taglineFontSelect.value = state.taglineFont;
    taglineSpacingSlider.value = state.taglineSpacing;
    taglineSpacingValue.textContent = state.taglineSpacing;
    taglineCaseSelect.value = state.taglineTransform;
    taglineSingleLineCheckbox.checked = state.taglineSingleLine;
    paddingSlider.value = state.padding;
    paddingValue.textContent = state.padding;
    showRuleCheckbox.checked = state.showRule;
    showTaglineCheckbox.checked = state.showTagline;
    directionSelect.value = state.gradientDirection;
    bgOptions.forEach(function(button) {
      button.classList.toggle('active', button.dataset.bg === state.bgColor);
    });
    alignOptions.forEach(function(button) {
      button.classList.toggle('active', button.dataset.align === state.align);
    });
    paletteContainer.querySelectorAll('.palette-swatch').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.palette === state.palette);
    });
    textColorGroup.style.display = state.palette === 'mono' ? '' : 'none';
    blockStyleGroup.style.display = FONT_OPTIONS[state.font].type === 'pixel' ? '' : 'none';
  }

  function setupEventListeners() {
    textInput.addEventListener('input', function(e) {
      state.text = e.target.value.slice(0, MAX_TEXT_LENGTH);
      textInput.value = state.text;
      saveState();
      render();
    });

    taglineInput.addEventListener('input', function(e) {
      state.tagline = e.target.value.slice(0, MAX_TAGLINE_LENGTH);
      taglineInput.value = state.tagline;
      saveState();
      render();
    });

    fontSelect.addEventListener('change', function(e) {
      state.font = e.target.value;
      blockStyleGroup.style.display = FONT_OPTIONS[state.font].type === 'pixel' ? '' : 'none';
      saveState();
      render();
    });

    blockStyleSelect.addEventListener('change', function(e) {
      state.blockStyle = e.target.value;
      saveState();
      render();
    });

    textColorInput.addEventListener('input', function(e) {
      state.textColor = e.target.value;
      saveState();
      render();
    });

    logoSizeSlider.addEventListener('input', function(e) {
      state.logoSize = parseInt(e.target.value);
      logoSizeValue.textContent = state.logoSize;
      saveState();
      render();
    });

    lineHeightSlider.addEventListener('input', function(e) {
      state.lineHeight = parseFloat(e.target.value);
      lineHeightValue.textContent = state.lineHeight;
      saveState();
      render();
    });

    taglineSizeSlider.addEventListener('input', function(e) {
      state.taglineSize = parseInt(e.target.value);
      taglineSizeValue.textContent = state.taglineSize;
      saveState();
      render();
    });

    taglineFontSelect.addEventListener('change', function(e) {
      state.taglineFont = e.target.value;
      saveState();
      render();
    });

    taglineSpacingSlider.addEventListener('input', function(e) {
      state.taglineSpacing = parseInt(e.target.value);
      taglineSpacingValue.textContent = state.taglineSpacing;
      saveState();
      render();
    });

    taglineCaseSelect.addEventListener('change', function(e) {
      state.taglineTransform = e.target.value;
      saveState();
      render();
    });

    taglineSingleLineCheckbox.addEventListener('change', function(e) {
      state.taglineSingleLine = e.target.checked;
      saveState();
      render();
    });

    paddingSlider.addEventListener('input', function(e) {
      state.padding = parseInt(e.target.value);
      paddingValue.textContent = state.padding;
      saveState();
      render();
    });

    alignOptions.forEach(function(btn) {
      btn.addEventListener('click', function() {
        alignOptions.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.align = btn.dataset.align;
        saveState();
        render();
      });
    });

    showRuleCheckbox.addEventListener('change', function(e) {
      state.showRule = e.target.checked;
      saveState();
      render();
    });

    showTaglineCheckbox.addEventListener('change', function(e) {
      state.showTagline = e.target.checked;
      saveState();
      render();
    });

    bgOptions.forEach(function(btn) {
      btn.addEventListener('click', function() {
        bgOptions.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.bgColor = btn.dataset.bg;
        saveState();
        render();
      });
    });

    paletteContainer.addEventListener('click', function(e) {
      var swatch = e.target.closest('.palette-swatch');
      if (!swatch) return;
      state.palette = swatch.dataset.palette;
      paletteContainer.querySelectorAll('.palette-swatch').forEach(function(b) { b.classList.remove('active'); });
      swatch.classList.add('active');
      textColorGroup.style.display = state.palette === 'mono' ? '' : 'none';
      saveState();
      render();
    });

    directionSelect.addEventListener('change', function(e) {
      state.gradientDirection = e.target.value;
      saveState();
      render();
    });

    copyTextBtn.addEventListener('click', copyText);
    exportHtmlBtn.addEventListener('click', exportHtml);
    exportPngBtn.addEventListener('click', exportPng);
  }

  // --- Render ---

  function render() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;

    asciiOutput.innerHTML = gridToHtml(grid, state.palette, state.gradientDirection, state.textColor);
    asciiOutput.style.fontSize = state.logoSize + 'px';
    asciiOutput.style.lineHeight = String(state.lineHeight);

    if (state.showRule && hasText) {
      var ruleColor = getPaletteRuleColor();
      ruleOutput.textContent = generateRule(grid);
      ruleOutput.style.display = 'block';
      ruleOutput.style.color = ruleColor;
      ruleOutput.style.fontSize = state.logoSize + 'px';
    } else {
      ruleOutput.style.display = 'none';
    }

    if (state.showTagline && state.tagline) {
      taglineOutput.innerHTML = generateTaglineHtml(state.tagline, state.palette, state.gradientDirection, state.textColor);
      taglineOutput.style.display = 'block';
      taglineOutput.style.fontSize = state.taglineSize + 'px';
      taglineOutput.style.fontFamily = TAGLINE_FONT_MAP[state.taglineFont];
      taglineOutput.style.letterSpacing = state.taglineSpacing + 'px';
      taglineOutput.style.wordSpacing = '8px';
      taglineOutput.style.textTransform = state.taglineTransform;
      taglineOutput.style.whiteSpace = state.taglineSingleLine ? 'nowrap' : 'normal';
    } else {
      taglineOutput.style.display = 'none';
    }

    logoPreview.style.background = state.bgColor;
    logoPreview.style.padding = state.padding + 'px';
    logoPreview.style.textAlign = state.align;
    saveState();
  }

  // --- Export ---

  function copyText() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;
    var ascii = gridToPlainText(grid);
    var rule = state.showRule && hasText ? '\n' + generateRule(grid) : '';
    var tagline = state.showTagline && state.tagline ? '\n' + generateTaglinePlain(state.tagline) : '';
    var fullText = ascii + rule + tagline;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText)
        .then(function() { showToast('Copied to clipboard.'); })
        .catch(function() { fallbackCopy(fullText); });
    } else {
      fallbackCopy(fullText);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      var ok = document.execCommand('copy');
      showToast(ok ? 'Copied to clipboard.' : 'Unable to copy.');
    } catch (e) {
      showToast('Unable to copy.');
    }
    document.body.removeChild(ta);
  }

  function exportHtml() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;
    var asciiHtml = gridToHtml(grid, state.palette, state.gradientDirection, state.textColor);
    var ruleColor = getPaletteRuleColor();
    var ruleHtml = state.showRule && hasText
      ? '<div class="rule" style="color:' + ruleColor + '">' + generateRule(grid) + '</div>'
      : '';
    var taglineHtml = state.showTagline && state.tagline
      ? '<div class="tagline">' + generateTaglineHtml(state.tagline, state.palette, state.gradientDirection, state.textColor) + '</div>'
      : '';

    var taglineFontImport = '';
    if (state.taglineFont === 'mono' || state.taglineFont === 'sans') {
      // Both JetBrains Mono and Space Grotesk already in the main import
    }

    var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + escapeHtml(state.text) + ' Logo</title>\n<style>\n  @import url(\'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@500;700&display=swap\');\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { background: ' + state.bgColor + '; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: \'JetBrains Mono\', \'Courier New\', monospace; }\n  .logo { text-align: ' + state.align + '; padding: ' + state.padding + 'px; }\n  .ascii { font-family: \'JetBrains Mono\', \'Courier New\', monospace; font-size: ' + state.logoSize + 'px; line-height: ' + state.lineHeight + '; font-weight: 800; white-space: pre; margin-bottom: 8px; }\n  .rule { font-family: \'JetBrains Mono\', \'Courier New\', monospace; font-size: ' + state.logoSize + 'px; white-space: pre; margin-bottom: 8px; opacity: 0.4; }\n  .tagline { font-family: ' + TAGLINE_FONT_MAP[state.taglineFont] + '; font-size: ' + state.taglineSize + 'px; font-weight: 400; letter-spacing: ' + state.taglineSpacing + 'px; word-spacing: 8px; text-transform: ' + state.taglineTransform + '; white-space: ' + (state.taglineSingleLine ? 'nowrap' : 'normal') + '; line-height: 1.6; }\n</style>\n</head>\n<body>\n<div class="logo">\n  <div class="ascii">' + asciiHtml + '</div>\n  ' + ruleHtml + '\n  ' + taglineHtml + '\n</div>\n</body>\n</html>';

    var blob = new Blob([html], { type: 'text/html' });
    var link = document.createElement('a');
    link.download = (state.text || 'logo') + '-logo.html';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('HTML exported.');
  }

  // --- PNG Export ---

  function exportPng() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;
    var palette = GRADIENT_PALETTES[state.palette];
    var colors = palette ? palette.colors : null;

    var scale = 3;

    document.fonts.ready.then(function() {
      // Measure dimensions
      var asciiFont = 'bold ' + (state.logoSize * scale) + 'px "JetBrains Mono", monospace';
      var taglineFontCss = (state.taglineSize * scale) + 'px ' + TAGLINE_FONT_MAP[state.taglineFont];
      var ruleFont = (state.logoSize * scale) + 'px "JetBrains Mono", monospace';

      var measureCanvas = document.createElement('canvas');
      var mctx = measureCanvas.getContext('2d');

      // Measure character widths for ascii
      mctx.font = asciiFont;
      var asciiCharWidth = mctx.measureText('\u2588').width;
      var asciiLineHeight = state.logoSize * scale * state.lineHeight;

      // Measure tagline
      mctx.font = taglineFontCss;
      var taglineText = state.tagline;
      if (state.taglineTransform === 'uppercase') taglineText = taglineText.toUpperCase();
      else if (state.taglineTransform === 'lowercase') taglineText = taglineText.toLowerCase();

      // Compute total tagline width including letter-spacing
      var taglineChars = taglineText.split('');
      var taglineCharWidths = [];
      var taglineTotalWidth = 0;
      taglineChars.forEach(function(c) {
        var w = mctx.measureText(c).width;
        taglineCharWidths.push(w);
        taglineTotalWidth += w + state.taglineSpacing * scale;
      });
      // Remove trailing letter-spacing
      if (taglineChars.length > 0) taglineTotalWidth -= state.taglineSpacing * scale;
      // Account for word-spacing
      taglineChars.forEach(function(c, i) {
        if (c === ' ') {
          taglineTotalWidth += 8 * scale; // extra word-spacing
        }
      });

      var gridCols = hasText ? Math.max.apply(null, grid.map(function(r) { return r.length; })) : 0;
      var asciiWidth = gridCols * asciiCharWidth;
      var asciiHeight = hasText ? grid.length * asciiLineHeight : 0;

      // Rule
      mctx.font = ruleFont;
      var ruleCharWidth = mctx.measureText('\u2504').width;
      var ruleWidth = hasText ? grid[0].length * ruleCharWidth : 0;
      var ruleHeight = state.showRule && hasText ? state.logoSize * scale * 1.6 : 0;

      var taglineHeight = (state.showTagline && state.tagline) ? state.taglineSize * scale * 1.8 : 0;

      var pad = state.padding * scale;
      var contentWidth = Math.max(asciiWidth, ruleWidth, taglineTotalWidth);
      var canvasWidth = contentWidth + pad * 2;
      var canvasHeight = asciiHeight + ruleHeight + taglineHeight + pad * 2;

      var canvas = document.createElement('canvas');
      canvas.width = Math.ceil(canvasWidth);
      canvas.height = Math.ceil(canvasHeight);
      var ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = state.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Alignment offset helper
      function alignOffset(itemWidth) {
        if (state.align === 'left') return pad;
        if (state.align === 'right') return canvasWidth - pad - itemWidth;
        return (canvasWidth - itemWidth) / 2;
      }

      // Draw ASCII grid
      if (hasText) {
        ctx.font = asciiFont;
        ctx.textBaseline = 'top';
        var totalRows = grid.length;
        var totalCols = gridCols;
        var asciiX = alignOffset(asciiWidth);

        grid.forEach(function(row, ri) {
          row.forEach(function(cell, ci) {
            if (cell.char === ' ' && cell.channel === 0) return;
            var color;
            if (cell.channel === 0) {
              color = 'transparent';
              return;
            }
            if (colors) {
              var t = getGradientPosition(ri, ci, totalRows, totalCols, state.gradientDirection);
              var baseColor = getGradientColor(colors, t);
              color = cell.channel === 1 ? baseColor : dimColor(baseColor, 0.4);
            } else {
              color = cell.channel === 1 ? state.textColor : dimColor(state.textColor, 0.4);
            }
            ctx.fillStyle = color;
            ctx.fillText(cell.char, asciiX + ci * asciiCharWidth, pad + ri * asciiLineHeight);
          });
        });
      }

      var yOffset = pad + asciiHeight;

      // Draw rule
      if (state.showRule && hasText) {
        ctx.font = ruleFont;
        ctx.textBaseline = 'top';
        ctx.globalAlpha = 0.4;
        var ruleColor = getPaletteRuleColor();
        ctx.fillStyle = ruleColor;
        var ruleStr = generateRule(grid);
        var ruleX = alignOffset(ruleWidth);
        for (var ri = 0; ri < ruleStr.length; ri++) {
          ctx.fillText(ruleStr[ri], ruleX + ri * ruleCharWidth, yOffset + ruleHeight * 0.15);
        }
        ctx.globalAlpha = 1.0;
        yOffset += ruleHeight;
      }

      // Draw tagline
      if (state.showTagline && state.tagline) {
        ctx.font = taglineFontCss;
        ctx.textBaseline = 'top';
        var tagX = alignOffset(taglineTotalWidth);
        var curX = tagX;

        taglineChars.forEach(function(c, ci) {
          if (c === ' ') {
            curX += taglineCharWidths[ci] + state.taglineSpacing * scale + 8 * scale;
            return;
          }
          var color;
          if (colors) {
            var t = taglineChars.length > 1 ? ci / (taglineChars.length - 1) : 0;
            color = getGradientColor(colors, t);
          } else {
            color = state.textColor;
          }
          ctx.fillStyle = color;
          ctx.fillText(c, curX, yOffset + taglineHeight * 0.15);
          curX += taglineCharWidths[ci] + state.taglineSpacing * scale;
        });
      }

      canvas.toBlob(function(blob) {
        var link = document.createElement('a');
        link.download = (state.text || 'logo') + '-logo.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        showToast('PNG exported.');
      }, 'image/png');
    });
  }

  function showToast(message) {
    var toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2000);
  }

  init();
})();
