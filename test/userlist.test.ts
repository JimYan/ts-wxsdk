import {userlist} from '../src/user';
import {accessToken} from '../src/token';
const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('userlist', () => {
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

    test('userlist', async () => {
        const list = await userlist(accessTokenStr);
        if (list) {
            expect(list.total >= 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });
});
