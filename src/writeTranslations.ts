import fs from 'fs';
import chalk from 'chalk';

import { generateFileBasedOnJson, parseFile } from 'src/utils';
import { isOverwrites } from 'src/index';

import { Extensions, Config } from 'src/types';

import messages from 'src/messages';

export const writeTranslations = (
  translationsList: string[],
  translationsInput: string[],
  config: Config,
  labelInput: string,
  textInput: string,
): void => {
  let allTranslations = false;

  if (!translationsInput.length) {
    allTranslations = true;
  }

  const arrTranslations = allTranslations ? translationsList : translationsInput;

  for (let i = 0; i < arrTranslations.length; i++) {
    // get the contents of each file on iteration.
    const filename: string = arrTranslations[i];
    const ext: string = allTranslations ? '' : '.' + config.ext;
    const filenameWithExt: string = filename + ext;
    const path = `${config.path}/${filenameWithExt}`;

    if (allTranslations || translationsList.includes(filenameWithExt)) {
      if (config.ext === Extensions.js) {
        let json: object;
        const file: Buffer = fs.readFileSync(path);

        try {
          json = parseFile(file);
        } catch (e) {}

        if (isOverwrites(json, filename)) {
          json[labelInput] = textInput;
        }

        fs.writeFileSync(path, generateFileBasedOnJson(json));
      }

      if (config.ext === Extensions.json) {
        const file: string = fs.readFileSync(path, 'utf8');

        const json: object = JSON.parse(file);

        if (isOverwrites(json, filename)) {
          json[labelInput] = textInput;
        }

        fs.writeFileSync(path, JSON.stringify(json, null, 2));
      }

      console.log(chalk.green(messages.success.translations(labelInput, filename)));
    } else {
      console.log(chalk.red(messages.errors.noTranslation(filenameWithExt)));
    }
  }
};
