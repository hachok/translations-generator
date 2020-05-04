import fs from 'fs';
import chalk from 'chalk';

import { checkTranslations, generateFileBasedOnJson, getFilename, parseFile } from 'src/utils';
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
  for (let i = 0; i < translationsList.length; i++) {
    // get the contents of each file on iteration.
    const filenameWithExt: string = translationsList[i];
    const filename: string = getFilename(filenameWithExt);
    const path = `${config.path}/${filenameWithExt}`;

    if (!translationsInput.length || checkTranslations(translationsInput, filename, config)) {
      if (config.ext === Extensions.js) {
        const file: Buffer = fs.readFileSync(path);

        const json: object = parseFile(file);

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
    }
  }
};
