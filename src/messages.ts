export default {
  errors: {
    translations: 'Error: No translations found in such directory.',
    translationsList: 'Error: the directory you provided doesnt exist. Check a config file.',
    label: 'Error: The label field is required.',
    noTranslation: (translation) => `Error: file ${translation} wasn't found.`,
  },
  questions: {
    translations: 'Enter translations you want to use: (empty is all)\n',
    removeTranslations: 'Enter translations you want to remove label from: (empty is all)\n',
    label: 'Enter a label:\n',
    text: 'Enter a text:\n',
    newLabel: 'Enter a new label:\n',
  },
  warnings: {
    config:
      'Warning: No config file provided. Please, make sure that translations.config.json is in root directory.',
    overwrites: (labelInput, filename): string =>
      `Warning: ${labelInput} already exists for ${filename}. Do you want to overwrite it?(y/n)\n`,
  },
  success: {
    translations: (labelInput, filename): string =>
      `The translation ${labelInput} was generated to ${filename} successfully!`,
    translationsRemove: (labelInput, filename): string =>
      `The translation ${labelInput} was removed from ${filename} successfully!`,
  },
};
