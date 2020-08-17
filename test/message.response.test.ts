import {text, image, video, voice, news} from '../src/message.response';

describe('message.response', () => {
    test('text', () => {
        const r = text({
            ToUserName: 'a',
            FromUserName: 'b',
            Content: 's',
        });
        expect(r).toContain('ToUserName');
    });

    test('image', () => {
        const r = image({
            ToUserName: 'a',
            FromUserName: 'b',
            Image: {
                MediaId: 'b',
            },
        });
        expect(r).toContain('MediaId');
    });

    test('video', () => {
        const r = video({
            ToUserName: 'a',
            FromUserName: 'b',
            Video: {
                MediaId: '11',
                Title: 'hello video',
                Description: 'desc',
            },
        });
        expect(r).toContain('desc');
    });

    test('voice', () => {
        const r = voice({
            ToUserName: 'a',
            FromUserName: 'b',
            Voice: {
                MediaId: 'voiceid',
            },
        });
        expect(r).toContain('voiceid');
    });

    test('news', () => {
        const r = news({
            ToUserName: 'a',
            FromUserName: 'b',
            ArticleCount: 2,
            Articles: {
                item: [
                    {
                        Title: 't1',
                        Description: 'd1',
                        PicUrl: 'pu1',
                        Url: 'u1',
                    },
                    {
                        Title: 't2',
                        Description: 'd2',
                        PicUrl: 'pu2',
                        Url: 'u2',
                    },
                ],
            },
        });
        expect(r).toContain('pu1');
    });
});
