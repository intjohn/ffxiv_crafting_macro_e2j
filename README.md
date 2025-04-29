# Text Translation Site

This project is a simple web application that allows users to translate FFXIV crafting macro between English and Japanese using a predefined dictionary.

## Project Structure

```
text-translation-site
├── public
│   ├── index.html       # HTML structure of the web page
│   └── styles.css       # CSS styles for the web page
├── src
│   ├── app.js           # Main JavaScript logic for the application
│   └── data
│       └── translations.csv # CSV file containing English and Japanese word pairs
├── package.json         # Configuration file for npm
└── README.md            # Documentation for the project
```

## Features

- Input text area for users to enter text for translation.
- Toggle switch to select translation direction (English to Japanese or vice versa).
- Output text area to display the translated results.
- Submit button to initiate the translation process.

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

4. Open the `public/index.html` file in a web browser to use the application.

## Usage

- Enter the text you want to translate in the input text area.
- Use the toggle to select the translation direction.
- Click the submit button to see the translated text in the output text area.

## Translation Data Sources

- https://jp.finalfantasyxiv.com/crafting_gathering_guide/carpenter/
- https://na.finalfantasyxiv.com/crafting_gathering_guide/carpenter/

## License

This project is licensed under the MIT License.