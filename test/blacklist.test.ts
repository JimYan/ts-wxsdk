import {getblacklist, setUser2Blacklist, unsetUser2Blacklist} from '../src/blacklist';
import {accessToken} from '../src/token';
import {userlist} from '../src/user';

// import {appId, appsecret} from './config';
const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('balcklist', () => {
    let accessTokenStr = '';
    let openid: string;
    beforeAll(async () => {
        const token = await accessToken(appid, appsecret);
        if (token && token.access_token) {
            accessTokenStr = token.access_token;
        } else {
            return false;
        }

        const list = await userlist(accessTokenStr);
        openid = list!.data.openid[0];
        return;
    });

    test('== getblacklist ==', async () => {
        const list = await getblacklist(accessTokenStr);
        if (list) {
            expect(list.count >= 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });

    test(' setUser2Blacklist ', async () => {
        const list = await setUser2Blacklist(accessTokenStr, [openid]);
        if (list) {
            expect(list.errcode).toBe(0);
        } else {
            expect(1).toBe(2);
        }
    });

    test('unsetUser2Blacklist', async () => {
        const list = await unsetUser2Blacklist(accessTokenStr, [openid]);
        if (list) {
            expect(list.errcode).toBe(0);
        } else {
            expect(0).toBe(1);
        }
    });

    afterAll(async () => {
        await unsetUser2Blacklist(accessTokenStr, [openid]);
    });
});
