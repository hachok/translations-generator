#!/usr/bin/env node
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

// default values
let config: Config = {
  ext: Extensions.js,
  path: 'translations',
};

// manual config
try {
  configFile = fs.readFileSync('translations.config.json', 'utf8');
} catch (e) {
  console.log(chalk.yellow(messages.errors.config));
}

// merge manual config with a default values
if (configFile) {
  config = Object.assign(config, JSON.parse(configFile));
}

// get the contents of the directory for loop over it.
const translationsList = fs.readdirSync(config.path);

if (!translationsList.length) {
  console.log(chalk.red(messages.errors.translations));
  process.exit(1);
}

const translationsAnswer = readlineSync.question(
  chalk.white(messages.questions.translations),
  emptyFn,
);

// remove white space and split by comma to array
translationsInput = translationsAnswer.replace(/\s/g, '').split(',');

// check if alias exists
if (config.alias) {
  translationsInput = translationsInput.map((item) => config.alias[item]);
}

labelInput = readlineSync.question(chalk.white(messages.questions.label), emptyFn);

if (!labelInput) {
  console.log(chalk.red(messages.errors.label));
  process.exit(1);
}

const textInput = readlineSync.question(chalk.white(messages.questions.text), emptyFn);

// check if label already exists
export const isOverwrites = (json: object, filename: string): boolean => {
  if (json[labelInput]) {
    const overwriteAnswer = readlineSync.question(
      chalk.yellow(messages.warnings.overwrites(labelInput, filename)),
      emptyFn,
    );
    if (overwriteAnswer) {
      labelInput = readlineSync.question(chalk.white(), emptyFn);
      return isOverwrites(json, filename);
    }
  } else {
    return true;
  }
};

writeTranslations(translationsList, translationsInput, config, labelInput, textInput);
