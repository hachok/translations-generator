<div align=center>
<h1 style="border:0">Translations Generator</h1>
Generate translations for your project using cli. Support js and json extensions.
</div>

## Installation

1. Install package using npm or yarn.
   ```shell
   npm install translations-generator --save-dev
   ```
   or
   ```shell
   yarn add translations-generator -D
   ```
2. Add `translation.config.json` file to root of your directory.
   ```
       {
           ext: "js", // "js" or "json" (extention of translations),
           path: "src/translations", // path to folder with translations
           pattern: "translatations_", // specify pattern to use "en" instead of "translatations_en"
           alias: {
               "en": "translatations_en", // you can use "en" to specify translation
           }
       }
   ```

## Usage

Run command and answer questions!

```shell
translations-generator
```

Generated files are ready! 🎉

### CONTRIBUTING

Feel free contribute to the project. More information you can find in [CONTRIBUTING](CONTRIBUTING.md) file.

### License

MIT – See [LICENSE](LICENSE) file.
