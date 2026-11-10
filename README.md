# ASCII Logo Generator

A small browser-based tool for creating ASCII logos with gradient colour palettes, adjustable separators, title styling, and export options.

## Run

Open `index.html` in a browser.

If you prefer serving it locally:

```sh
python3 -m http.server
```

Then open `http://localhost:8000`.

## Features

- Multiple ASCII logo styles, including pixel and `cfonts`-inspired presets
- Gradient palette controls and custom colours
- Solid and gradient background controls
- Adjustable separator and title styling
- Settings import/export
- Text, HTML, and PNG export

## Agent API

The loaded page exposes `window.logoGenerator.generate()` to return the default ABC
logo as PNG bytes (base64), without downloads or changes to saved editor settings.
Use `{ preset: 'custom', settings: { text: 'BUILD' } }` for another logo, or choose
`format: 'text'`, `'html'` or `'settings'`. `getOptions()` lists fonts, supported
characters, palettes and defaults.

Compatible browsers also discover two optional WebMCP tools: `generate_abc_logo`
(no required arguments) and `generate_logo` (requires `text`). Both accept simple
style/output options and run entirely client-side. Unsupported browsers keep the
normal UI and JavaScript API. No new dependencies or backend are required.

See [API.md](API.md) for inputs, output handling, browser automation, verification,
and the MCP / WebMCP / HTTP comparison. This is a browser JavaScript API with
optional WebMCP discovery, not a hosted HTTP endpoint or an MCP server.

## Credits

- Inspired by [oh-my-logo](https://github.com/shinshin86/oh-my-logo)
- ASCII font work references [cfonts](https://github.com/dominikwilkowski/cfonts)
- Built by the [Agentic Builders Collective](https://github.com/agentic-builders-collective) in Singapore

## Licence

MIT. See [LICENSE](LICENSE).
