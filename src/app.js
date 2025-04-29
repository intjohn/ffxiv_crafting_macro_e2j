import translations from '../assets/translations.json';

const tEJ = new Map();
const tJE = new Map();

function loadTranslations() {
  Object.entries(translations)
    .forEach(([e, j]) => {
      if (e && j) {
          tEJ.set(e, j);
          tJE.set(j, e);
      }
    });
}

const parserPlaceholder = new RegExp(/(\/(?:ac|action)\s+)(.*)(?=(\s+<[a-z.1-9]+>))/);
const parserActionOnly = new RegExp(/(\/(?:ac|action)\s+)(.*)$/);

// Function to translate text
function translateText(inputText, isE2J = true) {
  const tMap = isE2J ? tEJ : tJE;
  return inputText
    .split('\n')
    .map(line => {
      line = line.trim();
      const actionParser = line.endsWith('>') ? parserPlaceholder : parserActionOnly;
      const parseResult = actionParser.exec(line);
      if (parseResult) {
        const [_match, head, action, tail] = parseResult;
        if (tMap.has(action)) {
          const translatedAction = tMap.get(action);
          return `${head}${translatedAction}${tail || ''}`;
        }
      }
      return line;
    })
    .join('\n');
}

loadTranslations();

// Event listeners for user interactions
document.addEventListener('DOMContentLoaded', () => {
    const inputTextArea = document.getElementById('inputText');
    const outputTextArea = document.getElementById('outputText');
    const translateButton = document.getElementById('translateButton');
    const languageToggle = document.querySelector('input[type="radio"][name="languageOption"]:checked');

    translateButton.addEventListener('click', () => {
        const inputText = inputTextArea.value;
        const toJapanese = languageToggle.value === 'e2j';
        const translatedText = translateText(inputText, toJapanese);
        outputTextArea.value = translatedText;
    });
    translateButton.disabled = false; // Enable the button after loading translations
});