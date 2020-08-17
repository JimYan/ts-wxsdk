import axios from 'axios';

interface ITemplateResp {
    msgid: number;
    errcode: number;
    errmsg: string;
}
interface ITemplateReq<T> {
    touser: string;
    template_id: string;
    topcolor?: string;
    url?: string;
    data: T;
}
/**
 * 获取微信全局access_token票据，2小时有效期。
 * @param appId
 * @param secret
 */
export const template = async <T = any>(accessToken: string, data: ITemplateReq<T>): Promise<ITemplateResp | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    const token = await axios.post<ITemplateResp>(url, data);
    // console.log(token);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
