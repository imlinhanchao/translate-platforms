var test = require('tape')
var translate = require('./')

test('translate to designated language', async function (assert) {
    assert.deepEqual(await translate.google('word', {
        to: translate.google.ja
    }), {
        lang: {
            from: 'en',
            to: 'ja'
        },
        text: 'word',
        word: '語',
        candidate: ['ワード',
            '単語',
            '語',
            '言葉',
            '語句',
            '伝言',
            '一言半句',
            '口舌',
            '語',
            'ワード',
            '一言',
            '単語'
        ]
    });
    assert.end()
})

test('designated target language', async function (assert) {
    assert.deepEqual(await translate.google('中文', {
        from: translate.google.zh,
        to: translate.google.ko
    }), {
        lang: {
            from: 'zh',
            to: 'ko'
        },
        text: '中文',
        word: '중국어',
        candidate: ['중국어']
    });
    assert.end()
})

test('translate sentence', async function (assert) {
    assert.deepEqual(await translate.microsoft('用 Microsoft 翻译一下这条句子。', {
        to: translate.microsoft.en
    }), {
        lang: {
            from: 'zh-Hans',
            to: 'en'
        },
        text: '用 Microsoft 翻译一下这条句子。',
        word: 'Translate this sentence with Microsoft.',
        candidate: []
    });
    assert.end()
})