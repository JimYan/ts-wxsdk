/**
 * 用户标签管理
 */
import axios from 'axios';
interface ITag {
    id: number;
    name: string;
}
interface ICreateTag {
    tag: ITag;
    errcode?: number;
    errmsg?: string;
}
/**
 * 创建tag名称
 * errcode:
 * 45157 标签名非法，请注意不能和其他标签重名
 * 45158 标签名长度超过30个字节
 * 45056 创建的标签数过多，请注意不能超过100个
 * 详情请看：https://developers.weixin.qq.com/doc/offiaccount/User_Management/User_Tag_Management.html
 * @param accessToken accessToken
 * @param name 标签名
 */
export const createTag = async (accessToken: string, name: string): Promise<ICreateTag | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/create?access_token=${accessToken}`;
    const token = await axios.post<ICreateTag>(url, {
        tag: {
            name,
        },
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface ITags {
    tags: Array<ITag & {count: number}>;
}

/**
 * 获取tag列表
 * @param accessToken accesstoken
 */
export const getTags = async (accessToken: string): Promise<ITags | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/get?access_token=${accessToken}`;
    const token = await axios.get<ITags>(url);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface ITagUpdate {
    errcode: number;
    errmsg: string;
}
/**
 * 更新tag
 * @param accessToken
 * @param update 更新的tag内容
 */
export const updateTag = async (accessToken: string, update: ITag): Promise<ITagUpdate | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/update?access_token=${accessToken}`;
    const token = await axios.post<ITagUpdate>(url, {
        tag: update,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 删除tag
 * @param accessToken
 * @param del: {id:111}
 */
export const deleteTag = async (accessToken: string, del: Omit<ITag, 'name'>): Promise<ITagUpdate | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=${accessToken}`;
    const token = await axios.post<ITagUpdate>(url, {
        tag: del,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface IUserByTag {
    errcode?: number;
    errmsg?: string;
    count: number;
    next_openid: string;
    data: {
        openid: Array<string>;
    };
}
export const getUserByTag = async (
    accessToken: string,
    tagid: number,
    next_openid: string = '',
): Promise<IUserByTag | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=${accessToken}`;
    const token = await axios.post<IUserByTag>(url, {
        tagid,
        next_openid,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 设置用户tag
 * @param accessToken accessToken
 * @param openids openids
 * @param tag id
 */
export const addUser2Tag = async (accessToken: string, openids: Array<string>, tagid: number) => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=${accessToken}`;
    const token = await axios.post<ITagUpdate>(url, {
        openid_list: openids,
        tagid,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 取消用户tag
 * @param accessToken accessToken
 * @param openids openids
 * @param tag id
 */
export const unUser4Tag = async (accessToken: string, openids: Array<string>, tagid: number) => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=${accessToken}`;
    const token = await axios.post<ITagUpdate>(url, {
        openid_list: openids,
        tagid,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

interface IUserTags {
    tagid_list: Array<number>;
    errcode?: number;
    errmsg?: string;
}
/**
 * 获取用户的tag列表
 * @param accessToken
 * @param openid 用户openid
 */
export const getUserTags = async (accessToken: string, openid: string) => {
    const url = `https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=${accessToken}`;
    const token = await axios.post<IUserTags>(url, {
        openid,
    });
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
