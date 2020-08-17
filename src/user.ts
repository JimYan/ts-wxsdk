import axios from 'axios';

interface IAccessToken {
    access_token: string;
    expires_in: number;
    refresh_token: string; //可以通过refresh_token来获取一个新的access_token
    openid: string;
    scope: string;
    errcode?: number;
    errmsg?: string;
}
/**
 * 通过code换取用户的accessToken
 * 如果errcode存在，那么不会返回access_token
 * @param appId
 * @param secret
 */
export const code2AccessToken = async (appId: string, secret: string, code: string): Promise<IAccessToken | null> => {
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    const token = await axios.get<IAccessToken>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface ICode2Session {
    openid: string;
    session_key: string;
    unionid: string;
    errcode: number;
    errmsg: string;
}
/**
 * 小程序登录 根据code获取用户的session_key
 * @param appid
 * @param secret
 * @param code
 * @param grant_type
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
export const refreshAccessToken = async (appId: string, refreshToken: string): Promise<IAccessToken | null> => {
    const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appId}&grant_type=refresh_token&refresh_token=${refreshToken}`;
    const token = await axios.get<IAccessToken>(url, {
        // proxy,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface IUserinfo {
    errcode?: number;
    errmsg?: string;
    openid: string;
    nickname: string;
    sex: '1' | '2' | '0'; //1男  2女 0未知
    province: string;
    city: string;
    country: string;
    headimgurl: Array<string>;
    privilege: Array<string>;
    unionid: string;
}
/**
 * 通过用户的accesstoken和openID获取用户的基本信息
 * @param appId
 * @param refreshToken
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
 * 通过code一步换取userinfo
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
