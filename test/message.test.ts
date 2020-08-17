import {msg2json, parse} from '../src/message';
const msg = `<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>1348831860</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[this is a test]]></Content>
<MsgId>1234567890123456</MsgId>
</xml>`;
const locationmsg = `<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>1351776360</CreateTime>
<MsgType><![CDATA[location]]></MsgType>
<Location_X>23.134521</Location_X>
<Location_Y>113.358803</Location_Y>
<Scale>20</Scale>
<Label><![CDATA[位置信息]]></Label>
<MsgId>1234567890123456</MsgId>
</xml>`;
describe('message', () => {
    test('msg2json', () => {
        const r = msg2json<{ToUserName: string}>(msg);
        expect(r.ToUserName).toBe('toUser');
    });

    test('parse', () => {
        const l = parse(locationmsg);
        if (l && l.MsgType === 'location') {
            expect(l.Scale).toBe('20');
        } else {
            expect(1).toBe(2);
        }
    });
});
