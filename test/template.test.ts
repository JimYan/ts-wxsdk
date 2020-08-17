import {template} from '../src/template';
import {unsetUser2Blacklist} from '../src/blacklist';

import {accessToken} from '../src/token';
const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('template', () => {
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

    test('template', async () => {
        const openid = 'o_FaM03uRf6Zf4_xUM38DG087AGo';
        await unsetUser2Blacklist(accessTokenStr, [openid]);
        const list = await template<{
            name: {
                value: string;
                color?: string;
            };
        }>(accessTokenStr, {
            touser: openid,
            template_id: '3W-7l84S25TMqdzJPN7jaqE5Fj451aGobsc1wMD7NXU',
            url: 'https://www.baidu.com/',
            topcolor: '#00ff00',
            data: {
                name: {
                    value: 'jimhello',
                    color: '#173177',
                },
            },
        });
        if (list) {
            expect(list.errcode >= 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });
});
