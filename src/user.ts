/**
 * 微信公众号(小程序)登录服务端接口，[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
 * @packageDocumentation
 */
import axios from 'axios';

/**
 * code换取用户accessToken结果
 */
interface IAccessTokenResp {
    access_token: string;
    /** 过期时间，一般为7200 */
    expires_in: number;
    /** refresh_token, 可以通过refresh_token来获取一个新的access_token */
    refresh_token: string; //可以通过refresh_token来获取一个新的access_token
    openid: string;
    /** 用户授权的作用域，使用逗号（,）分隔     */
    scope: string;
    /** 微信返回错误码 */
    errcode?: number;
    errmsg?: string;
}
/**
 * 公众号登录
 * 通过code换取用户的accessToken
 * 如果errcode存在，那么不会返回access_token
 * ~~~
 * const {code2AccessToken} from 'ts-wxsdk/user'
 * const tokenInfo = await code2AccessToken(appid,appsecret,code)
 * ~~~
 * @param appId
 * @param appsecret
 */
export const code2AccessToken = async (
    appId: string,
    appsecret: string,
    code: string,
): Promise<IAccessTokenResp | null> => {
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
    const token = await axios.get<IAccessTokenResp>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface ICode2Session {
    openid: string;
    /** 会话密钥 */
    session_key: string;
    /** 用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 UnionID 机制说明。 */
    unionid: string;
    errcode: number;
    errmsg: string;
}
/**
 * 小程序登录 根据code获取用户的session_key和openid
 * ~~~
 * const {code2Session} from 'ts-wxsdk/user'
 * const session = await code2Session(appid,secrect,code);
 * ~~~
 * @param appid
 * @param secret 小程序 appSecret
 * @param js_code 登录时获取的 code
 * @param grant_type 授权类型，此处只需填写 authorization_code
 */
export const code2Session = async (
    appid: string,
    secret: string,
    // tslint:disable-next-line:variable-name
    js_code: string,
    // tslint:disable-next-line:variable-name
    grant_type: string = 'authorization_code',
): Promise<ICode2Session | null> => {
    const resp = await axios.get<ICode2Session>('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            grant_type,
            appid,
            secret,
            js_code,
        },
    });
    if (resp.status === 200) {
        return resp.data;
    }
    return null;
    // console.log(resp)
};

/**
 *
 * 由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。
 * @param appId
 * @param refreshToken
 */
export const refreshAccessToken = async (appId: string, refreshToken: string): Promise<IAccessTokenResp | null> => {
    const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appId}&grant_type=refresh_token&refresh_token=${refreshToken}`;
    const token = await axios.get<IAccessTokenResp>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 获取用户基本属性返回值
 */
interface IUserinfo {
    errcode?: number;
    errmsg?: string;
    openid: string;
    nickname: string;
    /** 性别：1男  2女 0未知 */
    sex: '1' | '2' | '0'; //1男  2女 0未知
    province: string;
    city: string;
    country: string;
    /** 头像地址 */
    headimgurl: Array<string>;
    /** 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom） */
    privilege: Array<string>;
    unionid: string;
}

/**
 *
 * 公众号适用。
 * 通过用户的accesstoken和openID获取用户的基本信息 拉取用户信息(需scope为 snsapi_userinfo)
 * @param accessToken 用户的accessToken，注意：这个accessToken和基础的accessToken不是同一个。
 * @param openID  用户openid
 * @param lang 语言，默认'zh_CN'
 */
export const userinfo = async (
    accessToken: string,
    openID: string,
    lang: string = 'zh_CN',
): Promise<IUserinfo | null> => {
    const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openID}&lang=${lang}`;
    const token = await axios.get<IUserinfo>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 公众号号登录，通过code一步换取userinfo。
 * @param appId appid
 * @param secret appsecret
 * @param code code
 */
export const code2userinfo = async (appId: string, secret: string, code: string): Promise<IUserinfo | null> => {
    const tokenInfo = await code2AccessToken(appId, secret, code);
    if (tokenInfo === null) {
        return null;
    }

    return await userinfo(tokenInfo.access_token, tokenInfo.openid);
};

interface ICheckAccessToken {
    errcode: number;
    errmsg: string;
}
/**
 * 检验用户的accesstoken是否过期
 * @param accessToken 用户accesstoken
 * @param openID 用户openid
 */
export const checkAccessToken = async (accessToken: string, openID: string): Promise<boolean | ICheckAccessToken> => {
    const url = `https://api.weixin.qq.com/sns/auth?access_token=${accessToken}&openid=${openID}`;
    const token = await axios.get<ICheckAccessToken>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data.errcode === 0 ? true : token.data;
    }
    return false;
};

interface IUserlist {
    total: number;
    count: number;
    data: {
        openid: Array<string>;
    };
    next_openid: string;
    errcode?: number;
    errmsg?: string;
}
/**
 *
 * @param accessToken 基础平台accessToken
 * @param nextOpenID 分页的下一步.
 */
export const userlist = async (accessToken: string, nextOpenID: string = ''): Promise<IUserlist | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&next_openid=${nextOpenID}`;
    const token = await axios.get<IUserlist>(url, {
        // proxy,
    });
    // console.log(token);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
