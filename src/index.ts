import fs from 'fs';
import chalk from 'chalk';
import readlineSync from 'readline-sync';

import { writeTranslations } from 'src/writeTranslations';
import { emptyFn } from 'src/utils';

import { Extensions, Config } from 'src/types';

import messages from 'src/messages';

let configFile: string;
let labelInput: string;
let translationsInput: string[];
let translationsList: string[];

// default values
let config: Config = {
  ext: Extensions.js,
  path: 'translations',
};

// manual config
try {
  configFile = fs.readFileSync('translations.config.json', 'utf8');
} catch (e) {
  console.log(chalk.yellow(messages.warnings.config));
}

// merge manual config with a default values
if (configFile) {
  config = Object.assign(config, JSON.parse(configFile));
}

try {
  // get the contents of the directory for loop over it.
  translationsList = fs.readdirSync(config.path);
} catch (e) {
  console.log(chalk.red(messages.errors.translationsList));
  process.exit(1);
}

if (!translationsList.length) {
  console.log(chalk.red(messages.errors.translations));
  process.exit(1);
}

const translationsAnswer = readlineSync.question(messages.questions.translations, emptyFn);

// remove white space and split by comma to array
translationsInput = translationsAnswer ? translationsAnswer.replace(/\s/g, '').split(',') : [];

// check if alias or pattern exists
translationsInput = translationsInput.map((item) => {
  if (config.alias && config.alias[item]) {
    return config.alias[item];
  }
  if (config.pattern) {
    return config.pattern + item;
  }
  return item;
});

labelInput = readlineSync.question(messages.questions.label, emptyFn);

if (!labelInput) {
  console.log(chalk.red(messages.errors.label));
  process.exit(1);
}

const textInput = readlineSync.question(messages.questions.text, emptyFn);

// check if label already exists
export const isOverwrites = (json: object, filename: string): boolean => {
  if (json[labelInput]) {
    const overwriteAnswer: string = readlineSync.question(
      chalk.yellow(messages.warnings.overwrites(labelInput, filename)),
      emptyFn,
    );
    if (/^(n|no|not)$/.test(overwriteAnswer)) {
      labelInput = readlineSync.question(messages.questions.newLabel, emptyFn);
      return isOverwrites(json, filename);
    } else {
      return true;
    }
  } else {
    return true;
  }
};

writeTranslations(translationsList, translationsInput, config, labelInput, textInput);
