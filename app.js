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

  const MAX_TEXT_LENGTH = 12;
  const MAX_TAGLINE_LENGTH = 120;
  const STORAGE_KEY = 'abc-logo-generator:v3';

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
  const fontSizeSlider = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  const showRuleCheckbox = document.getElementById('show-rule');
  const showTaglineCheckbox = document.getElementById('show-tagline');
  const bgOptions = document.querySelectorAll('.bg-option');
  const copyTextBtn = document.getElementById('copy-text');
  const exportHtmlBtn = document.getElementById('export-html');
  const paletteContainer = document.getElementById('palette-options');
  const directionSelect = document.getElementById('gradient-direction');

  // State
  let state = {
    text: 'abc',
    tagline: 'agentic builders collective',
    font: 'block',
    blockStyle: 'solid',
    textColor: '#ffffff',
    bgColor: '#000000',
    fontSize: 14,
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
    return tagline.split('').map(function(c) { return c === ' ' ? '  ' : c + ' '; }).join('');
  }

  function generateTaglineHtml(tagline, paletteKey, direction, textColor) {
    var palette = GRADIENT_PALETTES[paletteKey];
    var colors = palette ? palette.colors : null;
    var expanded = tagline.split('').map(function(c) { return c === ' ' ? '  ' : c + ' '; }).join('');

    if (!colors) {
      return '<span style="color:' + textColor + '">' + escapeHtml(expanded) + '</span>';
    }

    var chars = expanded.split('');
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
        raw = localStorage.getItem('abc-logo-generator:v2') || localStorage.getItem('abc-logo-generator:v1');
      }
      if (!raw) return;

      var saved = JSON.parse(raw);
      state = {
        text: (saved.text || state.text).slice(0, MAX_TEXT_LENGTH),
        tagline: (saved.tagline || state.tagline).slice(0, MAX_TAGLINE_LENGTH),
        font: saved.font && FONT_OPTIONS[saved.font] ? saved.font : state.font,
        blockStyle: saved.blockStyle || state.blockStyle,
        textColor: saved.textColor || state.textColor,
        bgColor: saved.bgColor || state.bgColor,
        fontSize: Number.isFinite(saved.fontSize) ? saved.fontSize : state.fontSize,
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
    fontSizeSlider.value = state.fontSize;
    fontSizeValue.textContent = state.fontSize;
    showRuleCheckbox.checked = state.showRule;
    showTaglineCheckbox.checked = state.showTagline;
    directionSelect.value = state.gradientDirection;
    bgOptions.forEach(function(button) {
      button.classList.toggle('active', button.dataset.bg === state.bgColor);
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

    fontSizeSlider.addEventListener('input', function(e) {
      state.fontSize = parseInt(e.target.value);
      fontSizeValue.textContent = state.fontSize;
      saveState();
      render();
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
  }

  // --- Render ---

  function render() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;

    asciiOutput.innerHTML = gridToHtml(grid, state.palette, state.gradientDirection, state.textColor);

    if (state.showRule && hasText) {
      var ruleColor = getPaletteRuleColor();
      ruleOutput.textContent = generateRule(grid);
      ruleOutput.style.display = 'block';
      ruleOutput.style.color = ruleColor;
    } else {
      ruleOutput.style.display = 'none';
    }

    if (state.showTagline && state.tagline) {
      taglineOutput.innerHTML = generateTaglineHtml(state.tagline, state.palette, state.gradientDirection, state.textColor);
      taglineOutput.style.display = 'block';
    } else {
      taglineOutput.style.display = 'none';
    }

    logoPreview.style.background = state.bgColor;
    logoPreview.style.fontSize = state.fontSize + 'px';
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

    var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + escapeHtml(state.text) + ' Logo</title>\n<style>\n  @import url(\'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap\');\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { background: ' + state.bgColor + '; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: \'JetBrains Mono\', \'Courier New\', monospace; }\n  .logo { text-align: center; padding: 60px 40px; }\n  .ascii { font-size: ' + state.fontSize + 'px; line-height: 1.15; font-weight: 800; white-space: pre; margin-bottom: 8px; }\n  .rule { font-size: ' + state.fontSize + 'px; white-space: pre; margin-bottom: 8px; opacity: 0.4; }\n  .tagline { font-size: ' + state.fontSize + 'px; font-weight: 400; letter-spacing: 4px; white-space: pre; line-height: 1.6; }\n</style>\n</head>\n<body>\n<div class="logo">\n  <div class="ascii">' + asciiHtml + '</div>\n  ' + ruleHtml + '\n  ' + taglineHtml + '\n</div>\n</body>\n</html>';

    var blob = new Blob([html], { type: 'text/html' });
    var link = document.createElement('a');
    link.download = (state.text || 'logo') + '-logo.html';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('HTML exported.');
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
