/**
 * 黑名单管理API，[官方文档](https://developers.weixin.qq.com/doc/offiaccount/User_Management/Manage_blacklist.html)
 * @packageDocumentation
 */
import axios from 'axios';

/**
 * 黑名单列表返回值
 */
interface IGetBlackList {
    /** 黑名单总数 */
    total: number;
    /** 本次返回总数 */
    count: number;
    /** 本次请求的分页开始open_id */
    next_openid: string;
    data: {
        openid: Array<string>;
    };
    errcode?: number;
    errmsg?: string;
}

/**
 * 获取黑名单列表
 * ~~~
 * import {getblacklist} from 'ts-wxsdk/blacklist'
 * const list = await getbalcklist(accessToken,'');
 * ~~~
 * @param accessToken
 * @param begin_openid 开始的openid,如果为空，从头开始，分页用
 */
export const getblacklist = async (accessToken: string, begin_openid: string = ''): Promise<IGetBlackList | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=${accessToken}`;
    const token = await axios.post<IGetBlackList>(url, {
        begin_openid,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface IRes {
    errcode: number;
    errmsg: string;
}
/**
 * 把用户添加到黑名单列表
 * @param accessToken accessToken
 * @param openid_list openids
 */
export const setUser2Blacklist = async (accessToken: string, openid_list: Array<string>) => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=${accessToken}`;
    const token = await axios.post<IRes>(url, {
        openid_list,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 取消设置为黑名单
 * @param accessToken accessToken
 * @param openid_list 用户列表
 */
export const unsetUser2Blacklist = async (accessToken: string, openid_list: Array<string>) => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=${accessToken}`;
    const token = await axios.post<IRes>(url, {
        openid_list,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
