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
 * 发送模板消息
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

interface IUniomMsgReq<T = any, U = any> {
    touser: string;
    weapp_template_msg?: {
        template_id: string;
        page: string;
        form_id: string;
        data: U;
        emphasis_keyword: string;
    };
    mp_template_msg: {
        appid: string;
        template_id: string;
        url: string;
        miniprogram?: {
            appid: string;
            pagepath: string;
        };
        data: T;
    };
}

/**
 * 发送统一模板消息
 * @param accessToken
 * @param data
 */
export const sendUniformMessage = async <T = any>(
    accessToken: string,
    data: IUniomMsgReq<T>,
): Promise<ITemplateResp | null> => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${accessToken}`;
    const token = await axios.post<ITemplateResp>(url, data);
    // console.log(token);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
