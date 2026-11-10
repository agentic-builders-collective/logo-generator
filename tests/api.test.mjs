import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { test } from 'node:test';

const exec = promisify(execFile);

test('agents generate ABC and custom logos without changing the editor', async () => {
  const server = createServer(async (req, res) => {
    const files = {
      '/': ['index.html', 'text/html'],
      '/app.js': ['app.js', 'text/javascript'],
      '/fonts.js': ['fonts.js', 'text/javascript'],
      '/styles.css': ['styles.css', 'text/css'],
    };
    const file = files[req.url];
    if (!file) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file[1]);
    res.end(await readFile(new URL('../' + file[0], import.meta.url)));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const session = 'logo-api-' + process.pid;
  let browserFlags = ['--no-webmcp'];
  const browser = (...args) => exec('agent-browser', ['--session', session, ...browserFlags, ...args], { maxBuffer: 1024 * 1024 });
  try {
    await browser('open', 'http://127.0.0.1:' + server.address().port);
    const { stdout } = await browser('eval', '(' + (async () => {
      function check(condition, message) { if (!condition) throw new Error(message); }
      check(!document.modelContext, 'fallback browser must not have WebMCP');
      const api = window.logoGenerator;
      check(!!api, 'window.logoGenerator must be available');
      const input = document.querySelector('#logo-text');
      input.value = 'USER';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const before = document.querySelector('#logo-preview').innerHTML;
      const saved = localStorage.getItem('abc-logo-generator:v4');
      const defaults = await api.generate({ format: 'text' });
      check(defaults.settings.text === 'ABC', 'ABC must be the easy default, independent of editor state');
      check(defaults.settings.tagline === 'agentic builders collective', 'ABC title');
      check(defaults.settings.ruleLengthPercent === 110, 'preserve ABC separator default');
      check(defaults.data.includes('█'), 'real ASCII output');
      check((await api.generate({ format: 'text' })).data === defaults.data, 'deterministic output');
      const options = api.getOptions();
      for (const font of Object.keys(options.fonts)) {
        const logo = await api.generate({ preset: 'custom', format: 'text', settings: { text: 'Ab', font, exportLogoOnly: true } });
        check(logo.data.trim().length > 0, font + ' must render');
        check(logo.settings.tagline === '', 'custom logos must not inherit ABC title');
        check(logo.data !== defaults.data, 'custom logo must differ from ABC');
      }
      const html = await api.generate({ format: 'html', settings: { tagline: '<script>bad</script>', ruleStyle: 'custom', ruleCustomChar: '<&>' } });
      check(html.data.startsWith('<!DOCTYPE html>'), 'full HTML document');
      check(!html.data.includes('<script>bad</script>'), 'escape title');
      check(html.data.includes('&lt;&amp;&gt;'), 'escape custom separator');
      const fixedHtml = await api.generate({ format: 'html', settings: { exportAspectRatio: '4:3' } });
      const dimensions = fixedHtml.data.match(/width: (\d+)px; height: (\d+)px/);
      check(dimensions && Math.abs(Number(dimensions[1]) / Number(dimensions[2]) - 4 / 3) < 0.01, 'fixed-ratio HTML measures requested logo, not editor');
      const recipe = await api.generate({ format: 'settings', settings: { palette: 'sunset' } });
      const payload = JSON.parse(recipe.data);
      check(payload.app === 'abc-logo-generator' && payload.version === 1, 'import-compatible settings envelope');
      check(payload.settings.palette === 'sunset', 'settings overrides');
      const roundTrip = await api.generate({ format: 'text', settings: payload.settings });
      check(roundTrip.settings.palette === 'sunset' && roundTrip.settings.text === 'ABC', 'settings round trip');
      const images = await Promise.all([
        api.generate({ settings: { exportAspectRatio: '1:1', transparentBg: true } }),
        api.generate({ preset: 'custom', settings: { text: 'XY', font: 'pixel', italicMode: 'block', italicAmount: 3, transparentBg: false, bgColor: '#ff0000', exportAspectRatio: '3:2', exportLogoOnly: true } }),
      ]);
      for (const [i, result] of images.entries()) {
        check(result.mimeType === 'image/png' && result.encoding === 'base64', 'PNG response contract');
        const img = new Image();
        img.src = 'data:image/png;base64,' + result.data;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
        const pixel = ctx.getImageData(0, 0, 1, 1).data;
        if (i === 0) {
          check(img.width === img.height, 'square export');
          check(pixel[3] === 0, 'transparent PNG');
          const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
          let visible = 0;
          for (let p = 3; p < pixels.length; p += 4) if (pixels[p] > 0) visible++;
          check(visible > 100, 'PNG must contain visible logo artwork, not an empty canvas');
        } else {
          check(Math.abs(img.width / img.height - 1.5) < 0.01, '3:2 export');
          check(pixel[0] === 255 && pixel[1] === 0 && pixel[2] === 0 && pixel[3] === 255, 'opaque red PNG');
        }
      }
      const oversized = { text: 'WWWWWWWWWWWW', font: 'block', logoSize: 48, exportScale: 300, exportPadding: 200, ruleLengthPercent: 200, exportAspectRatio: '1:1' };
      for (const settings of [oversized, { text: 'ABCDEFGHIJKL', font: 'tiny', logoSize: 48, exportScale: 300, exportPadding: 200, exportAspectRatio: '1:1', exportLogoOnly: true }]) {
        let message = '';
        try { await api.generate({ preset: 'custom', settings }); } catch (error) { message = error.message; }
        check(message.includes('PNG export exceeds'), 'oversized combined PNG dimensions must reject, never return empty image data');
      }
      const control = await api.generate({ preset: 'custom', settings: { ...oversized, logoSize: 12, exportScale: 100, exportPadding: 32, ruleLengthPercent: 100 } });
      const controlImage = new Image();
      controlImage.src = 'data:image/png;base64,' + control.data;
      await controlImage.decode();
      check(controlImage.width === controlImage.height && controlImage.width > 0, 'same logo at smaller settings produces a real square PNG');
      const serialize = HTMLCanvasElement.prototype.toDataURL;
      try {
        HTMLCanvasElement.prototype.toDataURL = () => 'data:,';
        let message = '';
        try { await api.generate(); } catch (error) { message = error.message; }
        check(message.includes('Unable to encode PNG'), 'browser encoder failure must reject instead of returning success');
      } finally {
        HTMLCanvasElement.prototype.toDataURL = serialize;
      }
      const invalid = [
        { preset: 'unknown' }, { format: 'svg' }, { settings: { logoSize: 999 } },
        { settings: { palette: '__proto__' } }, { settings: { mystery: true } },
        { settings: { text: 'NOTABC' } }, { preset: 'custom' },
        { preset: 'custom', settings: { text: '123', font: 'pixel' } },
      ];
      for (const request of invalid) {
        let rejected = false;
        try { await api.generate(request); } catch { rejected = true; }
        check(rejected, 'invalid request should reject: ' + JSON.stringify(request));
      }
      check(input.value === 'USER', 'editor controls unchanged');
      check(document.querySelector('#logo-preview').innerHTML === before, 'preview unchanged');
      check(localStorage.getItem('abc-logo-generator:v4') === saved, 'saved settings unchanged');
      return 'PASS: ABC default, all seven fonts, HTML escaping/aspect, settings round trip, PNG artwork/alpha/aspects, concurrent calls, validation, editor isolation';
    }).toString() + ')()');
    assert.match(stdout, /PASS: ABC default/);
    console.log(stdout.trim());
    await browser('close');
    browserFlags = ['--args', '--enable-features=WebMCP'];
    await browser('open', 'http://127.0.0.1:' + server.address().port);
    const webmcp = await browser('eval', '(' + (async () => {
      function check(condition, message) { if (!condition) throw new Error(message); }
      check(!!document.modelContext, 'native WebMCP must be enabled for this check');
      const tools = await document.modelContext.getTools();
      check(tools.length === 2, 'two simple generation tools must be discoverable');
      const abc = tools.find(tool => tool.name === 'generate_abc_logo');
      const custom = tools.find(tool => tool.name === 'generate_logo');
      check(abc && custom, 'ABC and custom tools');
      const saved = localStorage.getItem('abc-logo-generator:v4');
      const preview = document.querySelector('#logo-preview').innerHTML;
      const image = JSON.parse(await document.modelContext.executeTool(abc, {}));
      check(image.settings.text === 'ABC' && image.mimeType === 'image/png', 'empty ABC tool request generates PNG');
      check(image.encoding === 'base64' && image.data.startsWith('iVBOR'), 'real PNG bytes');
      check(image.data === (await window.logoGenerator.generate()).data, 'WebMCP uses the existing renderer unchanged');
      const text = JSON.parse(await document.modelContext.executeTool(custom, { text: 'BUILD', font: 'tiny', palette: 'sunset', format: 'text', exportLogoOnly: true }));
      check(text.settings.text === 'BUILD' && text.settings.tagline === '', 'custom text without ABC title');
      check(text.settings.font === 'tiny' && text.settings.palette === 'sunset', 'simple style options');
      check(text.mimeType === 'text/plain' && text.data.includes('▄'), 'custom ASCII output');
      for (const [tool, args] of [[custom, {}], [abc, { format: 'svg' }], [abc, { text: 'OTHER' }]]) {
        let rejected = false;
        try { await document.modelContext.executeTool(tool, args); } catch { rejected = true; }
        check(rejected, 'invalid tool arguments must reject');
      }
      check(document.querySelector('#logo-preview').innerHTML === preview, 'tool leaves editor unchanged');
      check(localStorage.getItem('abc-logo-generator:v4') === saved, 'tool does not persist settings');
      return 'PASS: native WebMCP discovery, no-argument ABC PNG, styled custom ASCII, schema rejection, no editor side effects';
    }).toString() + ')()');
    assert.match(webmcp.stdout, /PASS: native WebMCP/);
    console.log(webmcp.stdout.trim());
  } finally {
    await browser('close').catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});
