import { Config } from 'src/types';

export const emptyFn = (): void => {};

export const checkTranslations = (
  translations: string[],
  filename: string,
  config: Config,
): boolean =>
  translations.includes(filename) || translations.includes(filename.replace(config.pattern, ''));

export const getFilename = (filename: string): string => filename.replace(/.js|.ts|.json/, '');

export const parseFile = (file: Buffer): object =>
  JSON.parse(
    file
      .toString()
      .replace('export default ', '')
      .replace(';', '')
      .replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":')
      .replace(/,(?!\s*?[{\["'\w])/g, ''),
  );

export const generateFileBasedOnJson = (json: object): string =>
  `export default ${JSON.stringify(json, null, 2).replace(/("|\w)(?=\s*?[}\]])/g, '$1,')};`;
