// ASCII Logo Generator
(function() {
  'use strict';

  // 7x7 lowercase ASCII letter definitions
  const LETTER_PATTERNS = {
    a: [
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
      [0,0,0,0,0,1,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,1,0]
    ],
    b: [
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,1,1,1,1,0,0]
    ],
    c: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,0,0]
    ],
    d: [
      [0,0,0,0,0,1,0],
      [0,0,0,0,0,1,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,1,0]
    ],
    e: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,0,0],
      [0,1,1,1,1,1,0]
    ],
    f: [
      [0,0,1,1,1,1,0],
      [0,1,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0]
    ],
    g: [
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,1,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,0,0]
    ],
    h: [
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,0,0],
      [1,1,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0]
    ],
    i: [
      [0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,1,1,1,0,0,0]
    ],
    j: [
      [0,0,0,1,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [1,0,0,1,0,0,0],
      [0,1,1,0,0,0,0]
    ],
    k: [
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,1,0,0],
      [1,0,0,1,0,0,0],
      [1,1,1,0,0,0,0],
      [1,0,0,1,0,0,0],
      [1,0,0,0,1,0,0]
    ],
    l: [
      [0,1,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,1,1,1,0,0,0]
    ],
    m: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,1,0,1,1,0,0],
      [1,0,1,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0]
    ],
    n: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,1,1,1,0,0,0],
      [1,0,0,0,1,0,0],
      [1,0,0,0,1,0,0],
      [1,0,0,0,1,0,0],
      [1,0,0,0,1,0,0]
    ],
    o: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,0,0]
    ],
    p: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0]
    ],
    q: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,1,0,1,0],
      [0,1,1,1,1,1,0]
    ],
    r: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,1,1,1,0,0],
      [1,1,0,0,0,1,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0]
    ],
    s: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,0,0],
      [0,1,1,1,1,0,0],
      [0,0,0,0,0,1,0],
      [1,1,1,1,1,0,0]
    ],
    t: [
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [1,1,1,1,0,0,0],
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,1,0,0,0,0,0],
      [0,0,1,1,0,0,0]
    ],
    u: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,1,1,1,1,0]
    ],
    v: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,0,0,1,0,0],
      [0,0,1,1,0,0,0]
    ],
    w: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,0,1,0,1,0,0],
      [1,0,1,0,1,0,0],
      [0,1,0,0,1,0,0]
    ],
    x: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [0,1,0,0,1,0,0],
      [0,0,1,1,0,0,0],
      [0,1,0,0,1,0,0],
      [1,0,0,0,0,1,0]
    ],
    y: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,1,0],
      [0,1,0,0,1,0,0],
      [0,0,1,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,1,0,0,0,0]
    ],
    z: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0],
      [0,0,0,1,0,0,0],
      [0,0,1,0,0,0,0],
      [0,1,0,0,0,0,0],
      [1,1,1,1,1,1,0]
    ]
  };

  // Block characters for different styles
  const BLOCK_STYLES = {
    solid: { on: '█', off: ' ' },
    shade: { on: '▓', off: ' ' },
    medium: { on: '▒', off: ' ' },
    light: { on: '░', off: ' ' },
    outline: { on: '█', off: '░' }
  };

  const MAX_TEXT_LENGTH = 12;
  const MAX_TAGLINE_LENGTH = 120;
  const STORAGE_KEY = 'abc-logo-generator:v1';

  // DOM Elements
  const asciiOutput = document.getElementById('ascii-output');
  const ruleOutput = document.getElementById('rule-output');
  const taglineOutput = document.getElementById('tagline-output');
  const logoPreview = document.getElementById('logo-preview');

  const textInput = document.getElementById('logo-text');
  const taglineInput = document.getElementById('tagline-text');
  const blockStyleSelect = document.getElementById('block-style');
  const textColorInput = document.getElementById('text-color');
  const fontSizeSlider = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  const showRuleCheckbox = document.getElementById('show-rule');
  const showTaglineCheckbox = document.getElementById('show-tagline');
  const bgOptions = document.querySelectorAll('.bg-option');
  const copyTextBtn = document.getElementById('copy-text');
  const exportHtmlBtn = document.getElementById('export-html');

  // State
  let state = {
    text: 'abc',
    tagline: 'agentic builders collective',
    blockStyle: 'solid',
    textColor: '#ffffff',
    bgColor: '#000000',
    fontSize: 14,
    showRule: true,
    showTagline: true
  };

  function init() {
    loadState();
    syncControls();
    setupEventListeners();
    render();
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const saved = JSON.parse(raw);
      state = {
        text: sanitizeText(saved.text || state.text),
        tagline: sanitizeTagline(saved.tagline || state.tagline),
        blockStyle: saved.blockStyle || state.blockStyle,
        textColor: saved.textColor || state.textColor,
        bgColor: saved.bgColor || state.bgColor,
        fontSize: Number.isFinite(saved.fontSize) ? saved.fontSize : state.fontSize,
        showRule: typeof saved.showRule === 'boolean' ? saved.showRule : state.showRule,
        showTagline: typeof saved.showTagline === 'boolean' ? saved.showTagline : state.showTagline
      };
    } catch (error) {
      // Ignore malformed or blocked storage.
    }
  }

  function sanitizeText(value) {
    return (value || '')
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .slice(0, MAX_TEXT_LENGTH);
  }

  function sanitizeTagline(value) {
    return (value || '').slice(0, MAX_TAGLINE_LENGTH);
  }

  function syncControls() {
    textInput.value = state.text;
    taglineInput.value = state.tagline;
    blockStyleSelect.value = state.blockStyle;
    textColorInput.value = state.textColor;
    fontSizeSlider.value = state.fontSize;
    fontSizeValue.textContent = state.fontSize;
    showRuleCheckbox.checked = state.showRule;
    showTaglineCheckbox.checked = state.showTagline;
    bgOptions.forEach((button) => {
      button.classList.toggle('active', button.dataset.bg === state.bgColor);
    });
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Ignore storage failures so the app still works without persistence.
    }
  }

  function setupEventListeners() {
    textInput.addEventListener('input', (e) => {
      state.text = sanitizeText(e.target.value);
      textInput.value = state.text;
      saveState();
      render();
    });

    taglineInput.addEventListener('input', (e) => {
      state.tagline = sanitizeTagline(e.target.value);
      taglineInput.value = state.tagline;
      saveState();
      render();
    });

    blockStyleSelect.addEventListener('change', (e) => {
      state.blockStyle = e.target.value;
      saveState();
      render();
    });

    textColorInput.addEventListener('input', (e) => {
      state.textColor = e.target.value;
      saveState();
      render();
    });

    fontSizeSlider.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value);
      fontSizeValue.textContent = state.fontSize;
      saveState();
      render();
    });

    showRuleCheckbox.addEventListener('change', (e) => {
      state.showRule = e.target.checked;
      saveState();
      render();
    });

    showTaglineCheckbox.addEventListener('change', (e) => {
      state.showTagline = e.target.checked;
      saveState();
      render();
    });

    bgOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        bgOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.bgColor = btn.dataset.bg;
        saveState();
        render();
      });
    });

    copyTextBtn.addEventListener('click', copyText);
    exportHtmlBtn.addEventListener('click', exportHtml);
  }

  function generateAsciiArt(text, style) {
    const blocks = BLOCK_STYLES[style];
    const chars = text.split('').filter(c => LETTER_PATTERNS[c]);
    if (chars.length === 0) return '';

    const lines = [];
    const rows = 7;
    for (let row = 0; row < rows; row++) {
      let line = '';
      chars.forEach((char, charIndex) => {
        const pattern = LETTER_PATTERNS[char];
        line += pattern[row].map(bit => bit ? blocks.on : blocks.off).join('');
        if (charIndex < chars.length - 1) {
          line += '   '; // 3 spaces between letters
        }
      });
      lines.push(line);
    }
    return lines.join('\n');
  }

  function generateRule(text) {
    const chars = text.split('').filter(c => LETTER_PATTERNS[c]);
    if (chars.length === 0) {
      return '';
    }
    // Calculate width: 7 chars per letter + 3 spaces between
    const width = chars.length * 7 + (chars.length - 1) * 3;
    return '┄'.repeat(width);
  }

  function generateTagline(tagline) {
    // Space out each character
    return tagline.split('').map(c => c === ' ' ? '  ' : c + ' ').join('');
  }

  function render() {
    const hasText = state.text.length > 0;
    const ascii = generateAsciiArt(state.text, state.blockStyle);
    asciiOutput.textContent = ascii;
    asciiOutput.style.color = state.textColor;

    if (state.showRule && hasText) {
      ruleOutput.textContent = generateRule(state.text);
      ruleOutput.style.display = 'block';
      ruleOutput.style.color = state.textColor;
    } else {
      ruleOutput.style.display = 'none';
    }

    if (state.showTagline && state.tagline) {
      taglineOutput.textContent = generateTagline(state.tagline);
      taglineOutput.style.display = 'block';
      taglineOutput.style.color = state.textColor;
    } else {
      taglineOutput.style.display = 'none';
    }

    logoPreview.style.background = state.bgColor;
    logoPreview.style.fontSize = state.fontSize + 'px';

    saveState();
  }

  function copyText() {
    const fullText = buildExportText();

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      fallbackCopyText(fullText);
      return;
    }

    navigator.clipboard.writeText(fullText)
      .then(() => {
        showToast('Copied to clipboard.');
      })
      .catch(() => fallbackCopyText(fullText));
  }

  function buildExportText() {
    const hasText = state.text.length > 0;
    const ascii = generateAsciiArt(state.text, state.blockStyle);
    const rule = state.showRule && hasText ? '\n' + generateRule(state.text) : '';
    const tagline = state.showTagline && state.tagline ? '\n' + generateTagline(state.tagline) : '';
    return ascii + rule + tagline;
  }

  function fallbackCopyText(fullText) {
    const textarea = document.createElement('textarea');
    textarea.value = fullText;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const wasCopied = document.execCommand('copy');
      showToast(wasCopied ? 'Copied to clipboard.' : 'Unable to copy. Please copy manually.');
    } catch (error) {
      showToast('Unable to copy. Please copy manually.');
    }

    document.body.removeChild(textarea);
  }

  function exportHtml() {
    const ascii = generateAsciiArt(state.text, state.blockStyle);
    const hasText = state.text.length > 0;
    const ruleHtml = state.showRule && hasText ? `<div class="rule">${generateRule(state.text)}</div>` : '';
    const taglineHtml = state.showTagline && state.tagline ? `<div class="tagline">${generateTagline(state.tagline)}</div>` : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${state.text} Logo</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${state.bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  .logo {
    text-align: center;
    padding: 60px 40px;
  }

  .ascii {
    font-size: ${state.fontSize}px;
    line-height: 1.15;
    font-weight: 800;
    white-space: pre;
    color: ${state.textColor};
    margin-bottom: 8px;
  }

  .rule {
    color: ${state.textColor};
    font-size: ${state.fontSize}px;
    white-space: pre;
    margin-bottom: 8px;
    opacity: 0.4;
  }

  .tagline {
    color: ${state.textColor};
    font-size: ${state.fontSize}px;
    font-weight: 400;
    letter-spacing: 4px;
    white-space: pre;
    line-height: 1.6;
  }
</style>
</head>
<body>

<div class="logo">
  <div class="ascii">${ascii}</div>
  ${ruleHtml}
  ${taglineHtml}
</div>

</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.download = `${state.text || 'logo'}-logo.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);

    showToast('HTML exported.');
  }

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  init();
})();
