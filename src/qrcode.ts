import axios from 'axios';
import {Stream} from 'stream';

interface IQrcode {
    ticket: string;
    expire_seconds: number;
    url: string;
    errcode?: number;
    errmsg?: string;
}
interface IcreateQrcode {
    (
        access_token: string,
        action_info: number,
        expire_seconds: number,
        action_name: 'QR_SCENE' | 'QR_LIMIT_SCENE',
    ): Promise<IQrcode | null>;

    (
        access_token: string,
        action_info: string,
        expire_seconds: number,
        action_name: 'QR_STR_SCENE' | 'QR_LIMIT_STR_SCENE',
    ): Promise<IQrcode | null>;
}
/**
 * 生成二维码
 * https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
 * @param accessToken accessToken
 * @param action_info 二维码信息，具体看 https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
 * @param expire_seconds 过期时间，单位秒，默认30秒，最长30天
 * @param action_name 二维码类型 二维码类型，QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
 */
export const createQrcode: IcreateQrcode = async (
    accessToken: string,
    info: number | string,
    expire_seconds: number = 30,
    action_name: 'QR_STR_SCENE' | 'QR_LIMIT_STR_SCENE' | 'QR_SCENE' | 'QR_LIMIT_SCENE',
) => {
    const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`;
    let action_info = {};
    if (action_name === 'QR_SCENE' || action_name === 'QR_LIMIT_SCENE') {
        action_info = {
            scene: {scene_id: info},
        };
    } else {
        action_info = {
            scene: {scene_str: info},
        };
    }
    const token = await axios.post<IQrcode>(
        url,
        {
            action_info,
            expire_seconds,
            action_name,
        },
        {
            // proxy,
        },
    );
    if (token.status === 200) {
        return token.data;
    }
    return null;
};

/**
 * 通过ticket换取图片内容
 * const img = getQrcodeByTicket(ticket);
 * const ws = fs.createWriteStream(__dirname + '/update_files.jpeg');
 * img.pipe(ws);
 * @param ticket ticket
 */
export const getQrcodeByTicket = async (ticket: string) => {
    const url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`;
    const token = await axios.get<Stream>(url, {
        responseType: 'stream',
        // proxy,
    });
    // console.log(token);
    if (token.status === 200) {
        return token.data;
    }
    return null;
};
