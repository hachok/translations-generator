export interface Config {
  path: string;
  ext: Extensions;
  pattern?: string;
  alias?: { [key: string]: string };
}

export enum Extensions {
  js = 'js',
  json = 'json',
  ts = 'ts',
}
