export default {
  errors: {
    config:
      'Error: No config file provided. Please, make sure that translations.config.json is in root directory',
    translations: 'Error: No translations found in such directory',
    label: 'Error: The label field is required',
  },
  questions: {
    translations: 'Enter translations you want to use: (leave it empty if for all of them) ',
    label: 'Enter a label:\n',
    text: 'Enter a text:\n',
    newLabel: 'Enter a new label:\n',
  },
  warnings: {
    overwrites: (labelInput, filename): string =>
      `Warning: ${labelInput} already exists for ${filename}. Do you want to overwrite it?(y/n)\n`,
  },
  success: {
    translations: (labelInput, filename): string =>
      `The translation ${labelInput} was generated to ${filename} successfully!`,
  },
};
