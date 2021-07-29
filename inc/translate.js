const google = require('./google');
const microsoft = require('./microsoft');
const youdao = require('./youdao');
const baidu = require('./baidu');
const yandex = require('./yandex');
const tencent = require('./tencent');

function doesItSupported(lang, engine) {
    switch(engine) {
        case 'google':
            return Object.keys(google.languages).indexOf(lang) !== -1;
        case 'microsoft':
            return Object.keys(microsoft.languages).indexOf(lang) !== -1;
        case 'youdao':
            return Object.keys(youdao.languages).indexOf(lang) !== -1;
        case 'baidu':
            return Object.keys(baidu.languages).indexOf(lang) !== -1;
        case 'yandex':
            return Object.keys(yandex.languages).indexOf(lang) !== -1;
        case 'tencent':
            return Object.keys(tencent.languages).indexOf(lang) !== -1;

        default:
            return false;
    }
}

module.exports = {
    google, microsoft, youdao, baidu, yandex, tencent, doesItSupported
}