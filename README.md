# FFXIV Crafting Macro Translate

This project is a simple web application that allows users to translate FFXIV crafting macro in 4 official languages of international version (EN/JP/FR/DE) into any of each other, a great stride breaking out the repository name.

## Features

- Translate FFXIV crafting macros between EN/JP/FR/DE.

## Usage

1. Visit the Github Page https://intjohn.github.io/ffxiv_crafting_macro_e2j/
2. Enter the macro texts in the upper text area.
3. Click the `Translate` button and get translated results in 4 language tabs below.

## Project Structure

```
ffxiv_crafting_macro_e2j/
├── assets/
│   └── crafterActions.json # Action names in 4 languages
├── src/
│   ├── component/          # React components
│   ├── muiBarrel/          # Barrel imports of MaterialUI
│   ├── util/               # Non-React component codes
│   └── app.js              # Main JavaScript logic for the application
├── test/                   # Testing codes, so far only data
├── tool/
│   └── actionCrawler.js    # Update assets from the FFXIV official site
├── index.html              # Main entry point of the application
├── package.json            # Configuration file for npm
└── README.md               # Documentation for the project
```

## Technique Stack

- React.js
- MaterialUI
- CSSModule
- Vite
- pnpm
- Github Action

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd ffxiv_crafting_macro_e2j
   ```

3. Install the required dependencies:
   ```
   pnpm i
   ```

4. Run a dev server:
   ```
   pnpm run dev
   ```
   Then open the prompted URL in the browser.

5. Alternatively run a production preview server:
   ```
   pnpm run preview
   ```

6. Build (default into `./dist` folder) for CI/CD purpose
   ```
   pnpm run build
   ```

## Translation Data Sources

- https://jp.finalfantasyxiv.com/crafting_gathering_guide/carpenter/
- https://na.finalfantasyxiv.com/crafting_gathering_guide/carpenter/
- https://fr.finalfantasyxiv.com/crafting_gathering_guide/carpenter/
- https://de.finalfantasyxiv.com/crafting_gathering_guide/carpenter/

## License

This project is licensed under the MIT License.