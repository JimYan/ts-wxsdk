import {accessToken, ticket} from '../src/token';

const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('token', () => {
    let accessTokenStr = '';
    beforeAll(async () => {
        const token = await accessToken(appid, appsecret);
        if (token && token.access_token) {
            accessTokenStr = token.access_token;
            // console.log(accessTokenStr);
        } else {
            return false;
        }
        return;
    });

    test('== accessToken ==', async () => {
        expect(accessTokenStr.length > 0).toBe(true);
    });

    test('== apiticket ==', async () => {
        const token = await ticket(accessTokenStr, 'wx_card');
        if (token) {
            expect(token.ticket.length > 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }

        const jstoken = await ticket(accessTokenStr, 'jsapi');
        if (jstoken) {
            expect(jstoken.ticket.length > 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });
});
