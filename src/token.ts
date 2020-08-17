/**
 * 获取accessToken、jsticket或者微信卡包ticket的接口。[参考文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1)
 * @packageDocumentation
 */
import axios from 'axios';

interface IAccessToken {
    access_token: string;
    expires_in: number;
    errcode?: number;
    errmsg?: string;
}
/**
 * 获取微信基础平台的access_token票据，2小时有效期。对小程序也有效。
 * ~~~
 * import {accessToken} from 'ts-wxsdk/token'
 * const token = await accessToken(appid,appsecret)
 * ~~~
 * @param appId 公众号或者小程序的appId
 * @param appSecret 公众号的或者小程序的appsecret 在微信公众号管理平台获取。
 */
export const accessToken = async (appId: string, appSecret: string): Promise<IAccessToken | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const token = await axios.get<IAccessToken>(url, {
        // proxy,
    });
    // console.log(token);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface ITicket {
    errcode: number;
    errmsg: string;
    ticket: string;
    expires_in: number;
}
/**
 * 微信卡券api接口ticket或者jsapi ticket
 * @param accessToken 公众号全局accessToken
 * @param type wx_card卡包ticket   jsapi：jsapi_ticket
 */
export const ticket = async (accessToken: string, type: 'wx_card' | 'jsapi' = 'jsapi'): Promise<ITicket | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=${type}`;
    const token = await axios.get<ITicket>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
