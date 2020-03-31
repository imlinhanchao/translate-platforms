const got = require('got');

async function translate(word, lang) {
    let url = 'https://edge.microsoft.com/translate/auth' // token url
    let req;

    try {
        req = await got.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
            }
        });
        let token = req.body;
        if (lang.from == 'auto') lang.from = null;
        url = `https://api.cognitive.microsofttranslator.com/translate?${lang.from ? `from=${lang.from}&` : ''}to=${lang.to}&api-version=3.0&includeSentenceLength=false`
        req = await got.post(url, {
            json: [ { Text: word } ],
            throwHttpErrors: false,
            headers: {
                'authorization': `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
            }
        });
        let translate = JSON.parse(req.body);
        if (translate.error) throw new Error(translate.error.message);

        translate = translate[0];
        if (!lang.from) lang.from = translate.detectedLanguage.language;
        return {
            lang,
            text: word,
            word: translate.translations[0].text,
            candidate: translate.translations.slice(1).map(t => t.text)
        };
    } catch (err) {
        throw err;
    }      
}

module.exports = async (word, { from, to }) => {
    let lang = {
        from: from,
        to: to || 'zh'
    };

    return await translate(word, lang);
};