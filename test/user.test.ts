import {code2AccessToken, userinfo, code2userinfo} from '../src/user';
import axios from 'axios';

jest.mock('axios');
const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('user', () => {
    test('== code2AccessToken not null ==', async () => {
        (axios.get as any).mockReturnValueOnce({
            status: 200,
            data: {
                access_token: 'string',
                expires_in: 2,
                refresh_token: 'string', //可以通过refresh_token来获取一个新的access_token
                openid: 'string',
                scope: 'string',
            },
        });
        const token = await code2AccessToken(appid, appsecret, 'code');
        if (token) {
            expect(token.access_token).toBe('string');
        } else {
            expect(1).toBe(2);
        }
    });

    test('== code2AccessToken will be null ==', async () => {
        (axios.get as any).mockReturnValueOnce({
            status: 403,
        });
        const token = await code2AccessToken(appid, appsecret, 'code');
        expect(token).toBe(null);
    });

    test('== userinfo ==', async () => {
        (axios.get as any).mockReturnValueOnce({
            status: 200,
            data: {
                openid: 'openid str',
                nickname: 'jim',
                sex: '1',
                province: '广东',
                city: '深圳',
                country: '中国',
                headimgurl: ['http://aaa'],
                privilege: ['b'],
                unionid: 'string',
            },
        });
        const token = await userinfo('accesstoken', 'openid', 'zh-CN');
        if (token) {
            expect(token.openid).toBe('openid str');
        } else {
            expect(1).toBe(2);
        }
    });

    test('code2userinfo', async () => {
        (axios.get as any)
            .mockReturnValueOnce({
                status: 200,
                data: {
                    access_token: 'string',
                    expires_in: 2,
                    refresh_token: 'string', //可以通过refresh_token来获取一个新的access_token
                    openid: 'string',
                    scope: 'string',
                },
            })
            .mockReturnValueOnce({
                status: 200,
                data: {
                    openid: 'openid str',
                    nickname: 'jim',
                    sex: '1',
                    province: '广东',
                    city: '深圳',
                    country: '中国',
                    headimgurl: ['http://aaa'],
                    privilege: ['b'],
                    unionid: 'string',
                },
            });
        const token = await code2userinfo('accesstoken', 'openid', 'zh-CN');
        if (token) {
            expect(token.nickname).toBe('jim');
        } else {
            expect(1).toBe(2);
        }
    });
});
