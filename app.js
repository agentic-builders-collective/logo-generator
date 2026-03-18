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
    custom:  { name: 'Custom',  colors: null }
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
  const MIN_RULE_LENGTH_PERCENT = 25;
  const MAX_RULE_LENGTH_PERCENT = 200;
  const SETTINGS_EXPORT_VERSION = 1;
  const ALIGN_VALUES = ['left', 'center', 'right'];
  const TAGLINE_TRANSFORM_VALUES = ['none', 'uppercase', 'lowercase'];
  const GRADIENT_DIRECTION_VALUES = ['vertical', 'horizontal', 'diagonal'];
  const ITALIC_MODE_VALUES = ['none', 'skew', 'block'];
  const RULE_STYLE_VALUES = ['┄', '─', '═', '━', '-', '=', '·', '•', '~', 'custom'];
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
  const exportSettingsBtn = document.getElementById('export-settings');
  const importSettingsBtn = document.getElementById('import-settings');
  const exportHtmlBtn = document.getElementById('export-html');
  const exportPngBtn = document.getElementById('export-png');
  const settingsImportInput = document.getElementById('settings-import-input');
  const exportScaleSlider = document.getElementById('export-scale');
  const exportScaleValue = document.getElementById('export-scale-value');
  const transparentBgCheckbox = document.getElementById('transparent-bg');
  const ruleStyleSelect = document.getElementById('rule-style');
  const ruleLengthSlider = document.getElementById('rule-length');
  const ruleLengthValue = document.getElementById('rule-length-value');
  const ruleLengthGroup = document.getElementById('rule-length-group');
  const ruleStyleGroup = document.getElementById('rule-style-group');
  const ruleCustomGroup = document.getElementById('rule-custom-group');
  const ruleCustomCharInput = document.getElementById('rule-custom-char');
  const customColorsGroup = document.getElementById('custom-colors-group');
  const customColor1Input = document.getElementById('custom-color-1');
  const customColor2Input = document.getElementById('custom-color-2');
  const paletteContainer = document.getElementById('palette-options');
  const directionSelect = document.getElementById('gradient-direction');
  const italicModeSelect = document.getElementById('italic-mode');
  const italicAmountGroup = document.getElementById('italic-amount-group');
  const italicSlider = document.getElementById('italic-slider');
  const italicValue = document.getElementById('italic-value');
  const italicLabel = document.getElementById('italic-label');
  const italicUnit = document.getElementById('italic-unit');

  function getDefaultState() {
    return {
      text: 'ABC',
      tagline: 'agentic builders collective',
      font: 'block',
      blockStyle: 'solid',
      textColor: '#ffffff',
      bgColor: '#000000',
      logoSize: 21,
      taglineSize: 16,
      taglineFont: 'mono',
      taglineSpacing: 4,
      taglineTransform: 'none',
      taglineSingleLine: true,
      lineHeight: 1.15,
      padding: 60,
      align: 'center',
      showRule: true,
      ruleStyle: '\u2504',
      ruleLengthPercent: 100,
      ruleCustomChar: '\u2500',
      showTagline: true,
      palette: 'sunset',
      gradientDirection: 'vertical',
      exportScale: 150,
      transparentBg: false,
      customColor1: '#ff6b6b',
      customColor2: '#4ecdc4',
      italicMode: 'none',
      italicAmount: 0
    };
  }

  // State
  let state = getDefaultState();

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

  function applyBlockItalic(grid, amount) {
    if (!amount || grid.length === 0) return grid;
    var totalRows = grid.length;
    var absAmount = Math.abs(amount);
    var leansRight = amount > 0;
    var spaceCell = { char: ' ', channel: 0 };
    var origCols = grid[0].length;
    var maxLen = origCols + absAmount;

    return grid.map(function(row, ri) {
      var shift;
      if (leansRight) {
        shift = Math.round(absAmount * (totalRows - 1 - ri) / (totalRows - 1));
      } else {
        shift = Math.round(absAmount * ri / (totalRows - 1));
      }
      var leading = [];
      for (var i = 0; i < shift; i++) leading.push(spaceCell);
      var combined = leading.concat(row);
      // Pad to uniform length so the grid stays rectangular
      while (combined.length < maxLen) combined.push(spaceCell);
      return combined;
    });
  }

  function buildGrid(text) {
    var fontOpt = FONT_OPTIONS[state.font];
    var grid;
    if (fontOpt.type === 'cfonts') {
      grid = buildCfontsGrid(text, state.font);
    } else {
      grid = buildPixelGrid(text, state.blockStyle);
    }
    // Store original content width before italic padding
    grid.contentCols = grid.length > 0 ? grid[0].length : 0;
    if (state.italicMode === 'block') {
      var contentCols = grid.contentCols;
      grid = applyBlockItalic(grid, state.italicAmount);
      grid.contentCols = contentCols;
    }
    return grid;
  }

  function gridToPlainText(grid) {
    return grid.map(function(row) {
      return row.map(function(c) { return c.char; }).join('');
    }).join('\n');
  }

  function gridToHtml(grid, paletteKey, direction, textColor) {
    if (grid.length === 0) return '';
    var palette = getResolvedPalette(paletteKey);
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

  function getRuleChar() {
    if (state.ruleStyle === 'custom') return state.ruleCustomChar || '\u2500';
    return state.ruleStyle || '\u2504';
  }

  function clampRuleLengthPercent(value) {
    if (!Number.isFinite(value)) return 100;
    return Math.max(MIN_RULE_LENGTH_PERCENT, Math.min(MAX_RULE_LENGTH_PERCENT, value));
  }

  function clampNumber(value, min, max, fallback) {
    if (!Number.isFinite(value)) return fallback;
    return Math.max(min, Math.min(max, value));
  }

  function isHexColor(value) {
    return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value);
  }

  function normaliseChoice(value, allowed, fallback) {
    return allowed.indexOf(value) !== -1 ? value : fallback;
  }

  function normaliseText(value, fallback, maxLength) {
    return typeof value === 'string' ? value.slice(0, maxLength) : fallback;
  }

  function normaliseState(saved) {
    var defaults = getDefaultState();
    var source = saved && typeof saved === 'object' ? saved : {};
    var rawLogoSize = Number.isFinite(source.logoSize) ? source.logoSize : source.fontSize;
    var rawRuleStyle = source.ruleStyle;
    var ruleCustomChar = normaliseText(source.ruleCustomChar, defaults.ruleCustomChar, 3) || defaults.ruleCustomChar;

    if (typeof rawRuleStyle === 'string' && RULE_STYLE_VALUES.indexOf(rawRuleStyle) === -1 && rawRuleStyle.length > 0 && rawRuleStyle.length <= 3) {
      ruleCustomChar = rawRuleStyle;
      rawRuleStyle = 'custom';
    }

    var italicMode = normaliseChoice(
      source.italicMode,
      ITALIC_MODE_VALUES,
      Number.isFinite(source.italic) && source.italic !== 0 ? 'skew' : defaults.italicMode
    );
    var rawItalicAmount = Number.isFinite(source.italicAmount) ? source.italicAmount : source.italic;
    var italicAmount = 0;

    if (italicMode === 'skew') {
      italicAmount = clampNumber(rawItalicAmount, -20, 20, defaults.italicAmount);
    } else if (italicMode === 'block') {
      italicAmount = clampNumber(rawItalicAmount, -6, 6, defaults.italicAmount);
    }

    return {
      text: normaliseText(source.text, defaults.text, MAX_TEXT_LENGTH),
      tagline: normaliseText(source.tagline, defaults.tagline, MAX_TAGLINE_LENGTH),
      font: source.font && FONT_OPTIONS[source.font] ? source.font : defaults.font,
      blockStyle: source.blockStyle && BLOCK_STYLES[source.blockStyle] ? source.blockStyle : defaults.blockStyle,
      textColor: isHexColor(source.textColor) ? source.textColor : defaults.textColor,
      bgColor: isHexColor(source.bgColor) ? source.bgColor : defaults.bgColor,
      logoSize: clampNumber(rawLogoSize, 6, 48, defaults.logoSize),
      taglineSize: clampNumber(source.taglineSize, 8, 36, defaults.taglineSize),
      taglineFont: source.taglineFont && TAGLINE_FONT_MAP[source.taglineFont] ? source.taglineFont : defaults.taglineFont,
      taglineSpacing: clampNumber(source.taglineSpacing, 0, 20, defaults.taglineSpacing),
      taglineTransform: normaliseChoice(source.taglineTransform, TAGLINE_TRANSFORM_VALUES, defaults.taglineTransform),
      taglineSingleLine: typeof source.taglineSingleLine === 'boolean' ? source.taglineSingleLine : defaults.taglineSingleLine,
      lineHeight: clampNumber(source.lineHeight, 0.8, 1.8, defaults.lineHeight),
      padding: clampNumber(source.padding, 20, 120, defaults.padding),
      align: normaliseChoice(source.align, ALIGN_VALUES, defaults.align),
      showRule: typeof source.showRule === 'boolean' ? source.showRule : defaults.showRule,
      ruleStyle: normaliseChoice(rawRuleStyle, RULE_STYLE_VALUES, defaults.ruleStyle),
      ruleLengthPercent: clampRuleLengthPercent(source.ruleLengthPercent),
      ruleCustomChar: ruleCustomChar,
      showTagline: typeof source.showTagline === 'boolean' ? source.showTagline : defaults.showTagline,
      palette: source.palette && GRADIENT_PALETTES[source.palette] ? source.palette : defaults.palette,
      gradientDirection: normaliseChoice(source.gradientDirection, GRADIENT_DIRECTION_VALUES, defaults.gradientDirection),
      exportScale: clampNumber(source.exportScale, 100, 300, defaults.exportScale),
      transparentBg: typeof source.transparentBg === 'boolean' ? source.transparentBg : defaults.transparentBg,
      customColor1: isHexColor(source.customColor1) ? source.customColor1 : defaults.customColor1,
      customColor2: isHexColor(source.customColor2) ? source.customColor2 : defaults.customColor2,
      italicMode: italicMode,
      italicAmount: italicAmount
    };
  }

  function getSettingsExportPayload() {
    return {
      app: 'abc-logo-generator',
      version: SETTINGS_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      settings: Object.assign({}, state)
    };
  }

  function extractImportedSettings(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid settings file');
    }
    if (payload.settings && typeof payload.settings === 'object') {
      return payload.settings;
    }
    return payload;
  }

  function applyImportedState(nextState) {
    state = normaliseState(nextState);
    buildPaletteSwatches();
    syncControls();
    render();
  }

  function getRuleRepeatCount(grid) {
    if (grid.length === 0) return 0;
    var baseWidth = grid.contentCols || grid[0].length;
    return Math.max(1, Math.round(baseWidth * state.ruleLengthPercent / 100));
  }

  function generateRule(grid) {
    if (grid.length === 0) return '';
    var width = getRuleRepeatCount(grid);
    var ch = getRuleChar();
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
    var palette = getResolvedPalette(paletteKey);
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
    var palette = getResolvedPalette(state.palette);
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

      state = normaliseState(JSON.parse(raw));
    } catch (error) { /* ignore */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function getCustomColors() {
    return [state.customColor1, state.customColor2];
  }

  function getResolvedPalette(key) {
    if (key === 'custom') return { name: 'Custom', colors: getCustomColors() };
    return GRADIENT_PALETTES[key];
  }

  function buildPaletteSwatches() {
    paletteContainer.innerHTML = '';
    for (var key in GRADIENT_PALETTES) {
      var btn = document.createElement('button');
      btn.className = 'palette-swatch';
      btn.dataset.palette = key;
      if (key === 'custom') {
        btn.title = 'Custom';
        btn.classList.add('palette-swatch-custom');
        btn.style.background = 'linear-gradient(135deg, ' + state.customColor1 + ', ' + state.customColor2 + ')';
        btn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2a1.5 1.5 0 0 0-1.5 1.5v.7a5 5 0 0 0-1.3.5l-.5-.5a1.5 1.5 0 1 0-2.1 2.1l.5.5a5 5 0 0 0-.5 1.3h-.7a1.5 1.5 0 0 0 0 3h.7a5 5 0 0 0 .5 1.3l-.5.5a1.5 1.5 0 1 0 2.1 2.1l.5-.5a5 5 0 0 0 1.3.5v.7a1.5 1.5 0 0 0 3 0v-.7a5 5 0 0 0 1.3-.5l.5.5a1.5 1.5 0 0 0 2.1-2.1l-.5-.5a5 5 0 0 0 .5-1.3h.7a1.5 1.5 0 0 0 0-3h-.7a5 5 0 0 0-.5-1.3l.5-.5a1.5 1.5 0 0 0-2.1-2.1l-.5.5a5 5 0 0 0-1.3-.5v-.7A1.5 1.5 0 0 0 8 2ZM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" fill="currentColor"/></svg>';
      } else {
        var palette = GRADIENT_PALETTES[key];
        btn.title = palette.name;
        if (palette.colors) {
          btn.style.background = 'linear-gradient(135deg, ' + palette.colors.join(', ') + ')';
        }
      }
      paletteContainer.appendChild(btn);
    }
  }

  function updateCustomSwatch() {
    var swatch = paletteContainer.querySelector('[data-palette="custom"]');
    if (swatch) {
      swatch.style.background = 'linear-gradient(135deg, ' + state.customColor1 + ', ' + state.customColor2 + ')';
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
    ruleStyleSelect.value = state.ruleStyle === 'custom' ? 'custom' : state.ruleStyle;
    if (state.ruleStyle !== 'custom' && !ruleStyleSelect.querySelector('option[value="' + state.ruleStyle + '"]')) {
      ruleStyleSelect.value = 'custom';
    }
    ruleLengthSlider.value = state.ruleLengthPercent;
    ruleLengthValue.textContent = state.ruleLengthPercent;
    ruleLengthGroup.style.display = state.showRule ? '' : 'none';
    ruleCustomCharInput.value = state.ruleCustomChar;
    ruleStyleSelect.style.display = state.showRule ? '' : 'none';
    ruleCustomCharInput.style.display = (state.showRule && state.ruleStyle === 'custom') ? '' : 'none';
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
    exportScaleSlider.value = state.exportScale;
    exportScaleValue.textContent = state.exportScale;
    transparentBgCheckbox.checked = state.transparentBg;
    italicModeSelect.value = state.italicMode;
    italicAmountGroup.style.display = state.italicMode !== 'none' ? '' : 'none';
    if (state.italicMode === 'skew') {
      italicSlider.min = -20; italicSlider.max = 20;
      italicLabel.textContent = 'Angle';
      italicUnit.textContent = '°';
    } else {
      italicSlider.min = -6; italicSlider.max = 6;
      italicLabel.textContent = 'Shift';
      italicUnit.textContent = ' chars';
    }
    italicSlider.value = state.italicAmount;
    italicValue.textContent = state.italicAmount;
    customColor1Input.value = state.customColor1;
    customColor2Input.value = state.customColor2;
    customColorsGroup.style.display = state.palette === 'custom' ? '' : 'none';
    textColorGroup.style.display = 'none';
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
      ruleLengthGroup.style.display = state.showRule ? '' : 'none';
      ruleStyleSelect.style.display = state.showRule ? '' : 'none';
      ruleCustomCharInput.style.display = (state.showRule && state.ruleStyle === 'custom') ? '' : 'none';
      saveState();
      render();
    });

    ruleStyleSelect.addEventListener('change', function(e) {
      state.ruleStyle = e.target.value;
      ruleCustomCharInput.style.display = state.ruleStyle === 'custom' ? '' : 'none';
      saveState();
      render();
    });

    ruleLengthSlider.addEventListener('input', function(e) {
      state.ruleLengthPercent = clampRuleLengthPercent(parseInt(e.target.value, 10));
      ruleLengthValue.textContent = state.ruleLengthPercent;
      saveState();
      render();
    });

    ruleCustomCharInput.addEventListener('input', function(e) {
      state.ruleCustomChar = e.target.value || '\u2500';
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
      customColorsGroup.style.display = state.palette === 'custom' ? '' : 'none';
      textColorGroup.style.display = 'none';
      saveState();
      render();
    });

    directionSelect.addEventListener('change', function(e) {
      state.gradientDirection = e.target.value;
      saveState();
      render();
    });

    customColor1Input.addEventListener('input', function(e) {
      state.customColor1 = e.target.value;
      updateCustomSwatch();
      saveState();
      render();
    });

    customColor2Input.addEventListener('input', function(e) {
      state.customColor2 = e.target.value;
      updateCustomSwatch();
      saveState();
      render();
    });

    exportScaleSlider.addEventListener('input', function(e) {
      state.exportScale = parseInt(e.target.value);
      exportScaleValue.textContent = state.exportScale;
      saveState();
    });

    transparentBgCheckbox.addEventListener('change', function(e) {
      state.transparentBg = e.target.checked;
      saveState();
    });

    italicModeSelect.addEventListener('change', function(e) {
      state.italicMode = e.target.value;
      state.italicAmount = 0;
      syncControls();
      saveState();
      render();
    });

    italicSlider.addEventListener('input', function(e) {
      state.italicAmount = parseInt(e.target.value);
      italicValue.textContent = state.italicAmount;
      saveState();
      render();
    });

    copyTextBtn.addEventListener('click', copyText);
    exportSettingsBtn.addEventListener('click', exportSettings);
    importSettingsBtn.addEventListener('click', function() {
      settingsImportInput.click();
    });
    settingsImportInput.addEventListener('change', importSettings);
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
    var skewDeg = state.italicMode === 'skew' ? state.italicAmount : 0;
    asciiOutput.style.transform = skewDeg ? 'skewX(' + skewDeg + 'deg)' : '';
    asciiOutput.style.display = 'inline-block';

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

  function exportSettings() {
    var payload = getSettingsExportPayload();
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var link = document.createElement('a');
    link.download = (state.text || 'logo') + '-settings.json';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('Settings exported.');
  }

  function importSettings(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(loadEvent) {
      try {
        var raw = String(loadEvent.target.result || '');
        var payload = JSON.parse(raw);
        applyImportedState(extractImportedSettings(payload));
        showToast('Settings imported.');
      } catch (error) {
        showToast('Unable to import settings.');
      } finally {
        settingsImportInput.value = '';
      }
    };
    reader.onerror = function() {
      settingsImportInput.value = '';
      showToast('Unable to import settings.');
    };
    reader.readAsText(file);
  }

  function exportHtml() {
    var grid = buildGrid(state.text);
    var hasText = grid.length > 0;
    var skewDeg = state.italicMode === 'skew' ? state.italicAmount : 0;
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

    var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + escapeHtml(state.text) + ' Logo</title>\n<style>\n  @import url(\'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@500;700&display=swap\');\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { background: ' + state.bgColor + '; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: \'JetBrains Mono\', \'Courier New\', monospace; }\n  .logo { text-align: ' + state.align + '; padding: ' + state.padding + 'px; }\n  .ascii { font-family: \'JetBrains Mono\', \'Courier New\', monospace; font-size: ' + state.logoSize + 'px; line-height: ' + state.lineHeight + '; font-weight: 800; white-space: pre; margin-bottom: 8px; display: inline-block;' + (skewDeg ? ' transform: skewX(' + skewDeg + 'deg);' : '') + ' }\n  .rule { font-family: \'JetBrains Mono\', \'Courier New\', monospace; font-size: ' + state.logoSize + 'px; white-space: pre; margin-bottom: 8px; opacity: 0.4; }\n  .tagline { font-family: ' + TAGLINE_FONT_MAP[state.taglineFont] + '; font-size: ' + state.taglineSize + 'px; font-weight: 400; letter-spacing: ' + state.taglineSpacing + 'px; word-spacing: 8px; text-transform: ' + state.taglineTransform + '; white-space: ' + (state.taglineSingleLine ? 'nowrap' : 'normal') + '; line-height: 1.6; }\n</style>\n</head>\n<body>\n<div class="logo">\n  <div class="ascii">' + asciiHtml + '</div>\n  ' + ruleHtml + '\n  ' + taglineHtml + '\n</div>\n</body>\n</html>';

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
    var palette = getResolvedPalette(state.palette);
    var colors = palette ? palette.colors : null;

    var scale = state.exportScale / 100 * 3;

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
      var ruleStr = state.showRule && hasText ? generateRule(grid) : '';
      var ruleWidth = ruleStr ? mctx.measureText(ruleStr).width : 0;
      var ruleHeight = state.showRule && hasText ? state.logoSize * scale * 1.6 : 0;

      var taglineHeight = (state.showTagline && state.tagline) ? state.taglineSize * scale * 1.8 : 0;

      var pad = state.padding * scale;
      // Extra width needed when skew shears the ASCII block horizontally
      var pngSkewDeg = state.italicMode === 'skew' ? state.italicAmount : 0;
      var skewExtra = pngSkewDeg ? Math.abs(Math.tan(pngSkewDeg * Math.PI / 180)) * asciiHeight : 0;
      var contentWidth = Math.max(asciiWidth + skewExtra, ruleWidth, taglineTotalWidth);
      var canvasWidth = contentWidth + pad * 2;
      var canvasHeight = asciiHeight + ruleHeight + taglineHeight + pad * 2;

      var canvas = document.createElement('canvas');
      canvas.width = Math.ceil(canvasWidth);
      canvas.height = Math.ceil(canvasHeight);
      var ctx = canvas.getContext('2d');

      // Background
      if (!state.transparentBg) {
        ctx.fillStyle = state.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

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
        var asciiX = alignOffset(asciiWidth + skewExtra);

        if (pngSkewDeg) {
          ctx.save();
          var skew = Math.tan(pngSkewDeg * Math.PI / 180);
          // Shear around the vertical centre of the ASCII block
          var asciiMidY = pad + asciiHeight / 2;
          // Offset so the sheared block stays centred in its allocation
          var shearShift = skew > 0 ? 0 : -skew * asciiHeight;
          ctx.transform(1, 0, skew, 1, -skew * asciiMidY + shearShift / 2, 0);
          asciiX += skewExtra / 2;
        }

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

        if (pngSkewDeg) {
          ctx.restore();
        }
      }

      var yOffset = pad + asciiHeight;

      // Draw rule
      if (state.showRule && hasText) {
        ctx.font = ruleFont;
        ctx.textBaseline = 'top';
        ctx.globalAlpha = 0.4;
        var ruleColor = getPaletteRuleColor();
        ctx.fillStyle = ruleColor;
        var ruleX = alignOffset(ruleWidth);
        ctx.fillText(ruleStr, ruleX, yOffset + ruleHeight * 0.15);
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
