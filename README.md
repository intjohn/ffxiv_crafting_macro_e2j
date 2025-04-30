# FFXIV Crafting Macro Translate

This project is a simple web application that allows users to translate FFXIV crafting macro between English and Japanese using a predefined dictionary.

## Project Structure

```
ffxiv_crafting_macro_e2j
├── assets
│   └── translations.json   # Translation pairs with English term as the key and Japanese term as the value
├── public
│   ├── index.html          # HTML structure of the web page
│   └── styles.css          # CSS styles for the web page
├── src
│   └── app.js              # Main JavaScript logic for the application
├── package.json            # Configuration file for npm
├── README.md               # Documentation for the project
└── webpack.config.js       # Configuration for webpack on how to bundle Javascript files
```

## Features

- Translate FFXIV crafting macros between English and Japanese.

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
   npm install
   ```

4. Run a dev server:
   ```
   npm start
   ```

5. Open `http://localhost:8080/` in the browser.

## Usage

- Enter the macro texts in the upper text area.
- Select how the macro should be translate.
- Click the `Translate` button to see the translated text in the bottom text area.

## Translation Data Sources

- https://jp.finalfantasyxiv.com/crafting_gathering_guide/carpenter/
- https://na.finalfantasyxiv.com/crafting_gathering_guide/carpenter/

## License

This project is licensed under the MIT License.