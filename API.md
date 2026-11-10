# Agent logo generation (v1)

## Recommendation and deployment boundary

The lightweight v1 is a **browser JavaScript API with optional WebMCP tools**, all
executing on the existing page. This generator is plain HTML, JavaScript and CSS,
rendered with bundled ASCII glyph data, DOM layout and Canvas 2D.
It is a Git submodule of the ABC Astro website; the website copies it unchanged to
`/logo-generator/` when building its static GitHub Pages / S3 output. There is no
existing application server, image-generation model, paid generation service or API key.

| Interface | Fit for this generator | Execution / deployment needs |
| --- | --- | --- |
| Browser JavaScript API (implemented) | Smallest working foundation; browser automation can call it without operating controls. Shares the existing export renderers. | Open the page in a normal or headless browser. No new runtime dependencies or server. This is **not** an HTTP endpoint or an auto-discovered MCP tool. |
| WebMCP (implemented, optional) | Advertises `generate_abc_logo` and `generate_logo` over the same API to browser agents. | Page must be open; compatible browser/agent required. Chrome currently documents an origin trial from Chrome 149 or a local testing flag. Feature-detected; unsupported browsers keep the UI and JavaScript API. No polyfill or server. |
| Local MCP over stdio (recommended if native agent tool discovery is needed) | Desktop/coding agents get named tools and input schemas. Can invoke the browser API through a headless browser without duplicating rendering. | A locally installed MCP process, browser runtime, client configuration and an MCP SDK. No public hosting required. |
| Direct HTTP API / remote MCP | Best when agents must call a URL without managing a browser. HTTP is simpler for ordinary scripts; remote MCP adds native tool discovery. | A new separately hosted browser-backed renderer, request limits, concurrency limits, timeouts and an abuse/auth policy. Static Pages/S3 cannot execute requests. Remote MCP uses Streamable HTTP. No hosting is provisioned by v1. |

WebMCP was selected because it keeps simple requests entirely client-side, with no
new dependencies, server, credentials or service setup. Local/remote MCP and HTTP
are not included. Add another transport only for a demonstrated client requirement.
Keep PNG rendering in the browser rather than rewriting Canvas/font layout in a
server library. Self-hosting the webfonts would be a separate step if fully offline,
reproducible image metrics are required.

Sources checked for this comparison:
- [Chrome WebMCP availability and limitations](https://developer.chrome.com/docs/ai/webmcp)
- [WebMCP imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api)
- [WebMCP versus MCP](https://developer.chrome.com/docs/ai/webmcp/compare-mcp?hl=en)
- [MCP transports](https://modelcontextprotocol.io/specification/latest/basic/transports)

## Simple browser-agent tools

When `document.modelContext.registerTool` is available, the page registers:

- **`generate_abc_logo`**: no required arguments; `{}` generates the default ABC PNG.
- **`generate_logo`**: requires `text`, for example `{ "text": "BUILD", "font": "pixel" }`.

Both accept optional `format`, `font`, named `palette`, `tagline`,
`exportAspectRatio`, `transparentBg` and `exportLogoOnly`. Schemas list the allowed
choices and reject unknown arguments. Return values use the same response envelope
as the JavaScript API below: PNG base64 by default, or HTML, text or settings JSON.
Nothing is uploaded or automatically downloaded, and saved editor settings are not
changed. The full JavaScript API remains available for advanced settings.

This uses the current `document.modelContext` API and needs a secure context
(HTTPS, or localhost for development). In unsupported browsers, or if registration
is refused, normal generation and the JavaScript API remain usable. No origin trial
is provisioned; ordinary browsers may therefore use only the JavaScript API.

For local browser-agent verification with Chromium's WebMCP feature enabled:

```sh
agent-browser --session logos --args '--enable-features=WebMCP' open https://www.agenticbuilders.sg/logo-generator/
agent-browser --session logos --args '--enable-features=WebMCP' webmcp list generate_abc_logo --json
agent-browser --session logos --args '--enable-features=WebMCP' webmcp invoke generate_abc_logo --params '{}'
agent-browser --session logos --args '--enable-features=WebMCP' close
```

The revised page must be served first; these commands do not publish this local
implementation. Keep the same launch arguments on every command in a session.

## Easy ABC use case

In the generator page's JavaScript context:

```js
// Existing ABC design: ABC + "agentic builders collective", block font,
// ice gradient, -18° skew, separator, transparent PNG, 150% scale, 72px padding.
const logo = await window.logoGenerator.generate();

// Example variant for a slide or avatar:
const square = await window.logoGenerator.generate({
  preset: 'abc',
  format: 'png',
  settings: { palette: 'sunset', exportAspectRatio: '1:1', exportLogoOnly: true }
});
```

`abc` is the default preset and fixes the text to `ABC`. Title, style and layout
remain adjustable. Every request starts from the existing ABC defaults, **not** the
last person's editor/localStorage state. This is a convenience preset, not an
enforcement mechanism for approved brand variants.

## Other supported logos

```js
const custom = await window.logoGenerator.generate({
  preset: 'custom',
  format: 'html',
  settings: { text: 'BUILD', tagline: 'our next project', font: 'pixel', italicMode: 'none' }
});
const options = window.logoGenerator.getOptions();
```

`custom` requires nonempty supported text and defaults the title to empty, avoiding
an accidental ABC title. All existing fonts remain supported: `block`, `shade`,
`huge`, `slick`, `chrome`, `tiny`, `pixel`. These are ASCII-art font styles, not
arbitrary illustrations, vector logos, or AI image generation. Pixel supports a–z
(case-insensitive); other fonts support uppercase letters, digits and a font-specific
set of punctuation/spaces. `getOptions().fonts[font].characters` lists each exact
set. Unlike the UI, the agent API rejects unsupported characters instead of dropping
them silently. Maximum input lengths: text 12, title 120 UTF-16 code units.

## Request and response

`generate({ preset = 'abc', format = 'png', settings = {} })` returns a Promise:

```js
{
  version: 1,
  format: 'png',
  mimeType: 'image/png',
  encoding: 'base64',
  data: 'iVBOR...',
  settings: { /* complete effective settings, suitable for saving/reuse */ }
}
```

| Format | MIME type | Encoding and use |
| --- | --- | --- |
| `png` (default) | `image/png` | Base64 bytes, **without** a data-URL prefix; decode into a file, or prepend `data:image/png;base64,` for an image. Supports alpha transparency, padding, scale and aspect ratio. |
| `html` | `text/html` | UTF-8 full HTML document with inline styles and Google Fonts import. Retains the existing HTML export background behavior (not PNG transparency) and does not use PNG export scale. |
| `text` | `text/plain` | UTF-8 Unicode block/ASCII art and optional separator/title. No colours, pixel dimensions, background or visual skew; block italics do affect text. |
| `settings` | `application/json` | UTF-8 JSON in the existing `{app, version, settings}` import envelope. No generated timestamp, so a recipe is stable. Reuse its `settings` object in a request. |

No SVG, JPEG, hosted URLs, file writes, clipboard writes or download side effects.
Calls do not persist settings or leave the editor changed. Independent calls can
run with `Promise.all`. Invalid requests reject with an `Error`; unknown fields,
bad types, invalid choices, out-of-range numbers and unsupported characters are
rejected rather than silently normalized. Missing fields use preset defaults.

`getOptions()` returns fresh copies of defaults, presets, formats, fonts, palettes and
`pngLimits` (`maxDimension: 8192`, `maxPixels: 16777216`);
the response's `version` is the browser API contract version, not the separate
settings-file format version.

## Settings reference

The settings names are the existing JSON import/export contract. Use
`getOptions().defaults` for the exact ABC defaults and value types.

| Inputs | Supported values |
| --- | --- |
| `text`, `tagline` | Strings; 12 / 120 code units maximum |
| `font`, `palette` | Keys in `getOptions().fonts` / `.palettes`; `custom` palette uses the three custom colours |
| `blockStyle` | `solid`, `shade`, `medium`, `light`, `outline`; pixel only |
| `gradientDirection`, `bgGradientDirection` | `vertical`, `horizontal`, `diagonal` |
| `customColor1/2/3`, `textColor` | Six-digit `#rrggbb` strings; named palettes take precedence over text/custom colours |
| `bgMode` | `solid`, `gradient` |
| `bgColor`, `customBgColor`, `bgGradientColor1/2/3` | Six-digit `#rrggbb`; to use a custom solid background, set `bgUseCustom: true` and `customBgColor`; omit conflicting `bgColor` |
| `bgUseCustom`, `transparentBg` | Booleans; transparency is PNG-only. API palette selection does not automatically change the background; set it explicitly when needed |
| `logoSize`, `lineHeight` | 6–48; 0.8–1.8 |
| `align` | `left`, `center`, `right` |
| `taglineSize`, `taglineSpacing` | 8–36; 0–20 |
| `taglineFont` | `mono`, `firacode`, `spacemono`, `ibmplex`, `majormono`, `atkinson`, `sans`, `serif` |
| `taglineTransform` | `none`, `uppercase`, `lowercase` |
| `taglineSingleLine`, `showTagline`, `showRule`, `exportLogoOnly` | Booleans; logo-only suppresses both title and separator |
| `ruleStyle` | `┄`, `─`, `═`, `━`, `-`, `=`, `·`, `•`, `~`, `custom` |
| `ruleCustomChar`, `ruleLengthPercent` | Nonempty string up to 3 code units; 25–200 |
| `italicMode`, `italicAmount` | `none` (amount 0), `skew` (−20…20 degrees), `block` (−6…6 character columns). Set amount explicitly when switching modes |
| `exportScale`, `exportPadding` | 100–300 percent; 0–200 unscaled pixels |
| `exportAspectRatio` | `auto`, `1:1`, `4:3`, `3:2` |

PNG exports also have a **combined capacity limit**: at most **8192 pixels on either
side** and **16,777,216 pixels in total** (for example, 4096 × 4096). The renderer
checks the final rounded dimensions after scale, padding, skew, title, separator
and aspect ratio, before allocating the output canvas. Individually valid settings
can exceed this budget; the request then rejects rather than silently resizing or
returning an empty image. Reduce size, scale, padding or aspect ratio and retry.
Browser PNG encoding failures also reject, even below this budget. Manual PNG
exports use the same limits and report failures in the existing toast. Text, HTML
and settings exports are not subject to the PNG pixel budget.

PNG and HTML generation wait for webfonts. The existing app loads Google Fonts;
image metrics depend on their availability and the browser/OS fonts, and explicit
font-load failures reject the request. Plain text/settings do not need webfonts.
The API requires a loaded generator page; it cannot be imported into bare Node.js.

## Browser automation and verification

For an agent with a browser execution tool, open the generator and evaluate
`await window.logoGenerator.generate(...)` in that page. For example with
[agent-browser](https://github.com/vercel-labs/agent-browser):

```sh
agent-browser --session logos open https://www.agenticbuilders.sg/logo-generator/
agent-browser --session logos eval 'window.logoGenerator.generate({format:"text"})'
agent-browser --session logos close
```

These calls require the revised generator to be served; a local checkout does not
update the public site. This implementation is local until separately published.
For PNG files, parse the returned response and decode `data` as base64 in the
calling agent's filesystem tool rather than operating the download button.

The browser contract test requires Node and `agent-browser` with Chromium installed.
From the generator repository:

```sh
node --test tests/api.test.mjs
```

It starts a disposable local server/browser, tests the real public API and closes
both. With WebMCP disabled, it checks ABC defaults, all seven fonts, escaped HTML
and fixed-ratio layout, settings round trips, visible PNG artwork/alpha/aspects,
combined PNG capacity rejection, encoder failure, a smaller successful control,
simultaneous calls, errors and preservation of editor/localStorage state. It then
enables native WebMCP and checks tool discovery, default ABC PNG generation, styled
custom text, schema rejection and editor isolation. A Chromium version supporting
the current `document.modelContext` API is required for that second check. No
service configuration is changed.
