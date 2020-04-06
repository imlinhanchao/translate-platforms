# Translate Platforms
A Node module to translate words by multiple platforms.

## Installation
```bash
npm install translate-platforms
```

## Usage

```javascript
const { google, microsoft, youdao, baidu } = require('translate-platforms');
// async/await. The second parameter can be a language name (ISO 639-1)
const result = await google('Hello world', { to: google.ja });
console.log(result); 
// Output:
// {
//     lang: { from: 'en', to: 'ja' },
//     word: 'Hello world', 
//     text: 'こんにちは世界', 
//     candidate: [ 'こんにちは世界', 'こんにちは' ] 
// }
 
// Promises with .then(). The third parameter is the source language.
microsoft('こんにちは世界', { to: microsoft.zh }).then(result => {
  console.log(result);  
  // Output:
  // { 
  //     lang: { from: 'ja', to: 'zh' },
  //     word: 'こんにちは世界', 
  //     text: '你好世界', 
  //     candidate: [ ] 
  // }
});
```

## Parameters

```typescript
function translate(word: string, language: { from: string, to: string }): object
```

|parameter|description|
|--|--|
|word|The word want to translate.|
|from|The source language. Default is recognized automatically(`auto`). (Optional)|
|to|The target language. Default is Chinese(`zh`). (Optional)|

### Return Object
|key|description|
|--|--|
|lang|The source language and target language.|
|word|The word want to translate.|
|text|The most match result.|
|candidate|Other translate result.|

## Language Code
Each platform supports different translation languages. You can check the interface function properties.

## Support Platform
Supported platforms are [Google](http://translate.google.com/), [Microsoft](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate), [Yandex](https://translate.yandex.com/), [Baidu](https://fanyi.baidu.com/), [Tencent](https://fanyi.qq.com/) and [Youdao](http://fanyi.youdao.com/).

## Notice
Tencent does not support mutual translation of all languages, you can use the `support` function to get the translation language supported by the language.