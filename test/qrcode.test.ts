import {createQrcode, getQrcodeByTicket} from '../src/qrcode';
import {accessToken} from '../src/token';
// import {appId, appsecret} from './config';
const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('qrcode', () => {
    let accessTokenStr = '';
    beforeEach(async () => {
        const token = await accessToken(appid, appsecret);
        if (token && token.access_token) {
            accessTokenStr = token.access_token;
        } else {
            return false;
        }
        return;
    });

    test('createQrcode', async () => {
        const list = await createQrcode(accessTokenStr, 1, 3000, 'QR_SCENE');
        if (list) {
            expect(list.ticket.length > 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });

    test('getQrcodeByTicket', async () => {
        const ticket = await createQrcode(accessTokenStr, 'STR', 3000, 'QR_LIMIT_STR_SCENE');
        if (ticket) {
            const img = await getQrcodeByTicket(ticket.ticket);
            expect(img).not.toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });
});
