const got = require('got');

const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36';

async function translate(word, lang) {
    let id = '8579e2a3.5e842118.1116371a-1-0';
    let url = 'https://translate.yandex.net/api/v1/tr.json/translate'
    let rsp;

    try {
        if (lang.from == 'auto') {
            rsp = await got.get(`https://translate.yandex.net/api/v1/tr.json/detect?sid=9ca425c3.5e8ac014.5a186358&srv=tr-text&text=${encodeURI(word)}&options=1`)
            lang.from = JSON.parse(rsp.body).lang;
        }

        let form = {
            text: word,
            options:4
        };

        url = `${url}?id=${id}&srv=tr-text&lang=${lang.from}-${lang.to}&reason=auto&format=text`
        
        rsp = await got.post(url, {
            form,
            headers: {
                'User-Agent': userAgent,
            }
        })
        let translate = JSON.parse(rsp.body);

        let result = translate.text[0];
        let candidate = translate.text.slice(1);
        return {
            lang,
            text: word,
            word: result,
            candidate
        };
    } catch (err) {
        throw err;
    }      
}

module.exports = Object.assign(async (word, { from, to }) => {
    let lang = {
        from: from || 'auto',
        to: to || 'zh'
    };

    return await translate(word, lang);
}, {
    auto: 'auto', af: 'af', sq: 'sq', am: 'am', ar: 'ar', hy: 'hy', az: 'az', ba: 'ba', 
    eu: 'eu', be: 'be', bn: 'bn', bs: 'bs', bg: 'bg', my: 'my', ca: 'ca', ceb: 'ceb', 
    zh: 'zh', cv: 'cv', hr: 'hr', cs: 'cs', da: 'da', nl: 'nl', sjn: 'sjn', emj: 'emj', 
    en: 'en', eo: 'eo', et: 'et', fi: 'fi', fr: 'fr', gl: 'gl', ka: 'ka', de: 'de', 
    el: 'el', gu: 'gu', ht: 'ht', he: 'he', mrj: 'mrj', hi: 'hi', hu: 'hu', is: 'is', 
    id: 'id', ga: 'ga', it: 'it', ja: 'ja', jv: 'jv', kn: 'kn', kk: 'kk', kazlat: 'kazlat', 
    km: 'km', ko: 'ko', ky: 'ky', lo: 'lo', la: 'la', lv: 'lv', lt: 'lt', lb: 'lb', 
    mk: 'mk', mg: 'mg', ms: 'ms', ml: 'ml', mt: 'mt', mi: 'mi', mr: 'mr', mhr: 'mhr', 
    mn: 'mn', ne: 'ne', no: 'no', pap: 'pap', fa: 'fa', pl: 'pl', pt: 'pt', pa: 'pa', 
    ro: 'ro', ru: 'ru', gd: 'gd', sr: 'sr', si: 'si', sk: 'sk', sl: 'sl', es: 'es', 
    su: 'su', sw: 'sw', sv: 'sv', tl: 'tl', tg: 'tg', ta: 'ta', tt: 'tt', te: 'te', 
    th: 'th', tr: 'tr', udm: 'udm', uk: 'uk', ur: 'ur', uz: 'uz', uzbcyr: 'uzbcyr', 
    vi: 'vi', cy: 'cy', xh: 'xh', sah: 'sah', yi: 'yi'
});