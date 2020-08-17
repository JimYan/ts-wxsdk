/**
 * 消息回复组件
 */
import * as convert from 'xml-js';

const baseField = ['ToUserName', 'FromUserName', 'MsgType'];

type IString = {
    _cdata: string;
};
type Idata<T> = {
    _cdata: T;
};
export type IMsgRespBase<T> = {
    ToUserName: string; // 接收者openid
    FromUserName: string; // 发送者openid
    /* 创建时间 */
    CreateTime?: number; // 消息创建时间
} & T;
export type IMsgRespBase2wx<T> = {
    ToUserName: IString;
    FromUserName: IString;
    CreateTime?: number;
} & T;
export type IMsgText = IMsgRespBase<{
    MsgType: 'text';
    Content: string; //文本内容
}>;

export type IMsgText2wx = IMsgRespBase2wx<{
    MsgType: Idata<'text'>;
    Content: IString;
}>;

export function transData(obj: {[k: string]: any}, keys: Array<string>) {
    let a: {
        [key: string]: {
            _cdata: string;
        };
    } = {};
    keys.forEach(k => {
        a[k] = {
            _cdata: obj[k],
        };
    });
    return a;
}

/**
 * 回复文本消息
 * @param p
 */
export const text = (p: Omit<IMsgText, 'MsgType'>) => {
    const trans = transData({MsgType: 'text', ...p}, baseField.concat(['Content']));
    const wx = {
        ...trans,
    } as Omit<IMsgText2wx, 'CreateTime'>;

    return resp(wx);
};

export type IMsgImage = IMsgRespBase<{
    MsgType: 'image';
    Image: {
        MediaId: string;
    };
}>;
export type IMsgImage2wx = IMsgRespBase2wx<{
    MsgType: Idata<'image'>;
    Image: {
        MediaId: IString;
    };
}>;
/**
 * 回复图片消息
 * @param p
 */
export const image = (p: Omit<IMsgImage, 'MsgType'>) => {
    let t = {MsgType: 'image', ...p};
    const trans = transData(t, baseField);

    const wx = {
        ...trans,
        Image: {
            MediaId: {
                _cdata: p.Image.MediaId,
            },
        },
    } as Omit<IMsgImage2wx, 'CreateTime'>;

    return resp(wx as any);
};

export type IMsgVideo = IMsgRespBase<{
    MsgType: 'video';
    Video: {
        MediaId: string;
        Title: string;
        Description: string;
    };
}>;
export type IMsgVideo2wx = IMsgRespBase2wx<{
    MsgType: Idata<'video'>;
    Video: {
        MediaId: IString;
        Title: IString;
        Description: IString;
    };
}>;
/**
 * 回复视频消息
 * @param p
 */
export const video = (p: Omit<IMsgVideo, 'MsgType'>) => {
    let t = {MsgType: 'video', ...p};
    const trans = transData(t, baseField);

    const wx = {
        ...trans,
        Video: {
            MediaId: {
                _cdata: p.Video.MediaId,
            },
            Title: {
                _cdata: p.Video.Title,
            },
            Description: {
                _cdata: p.Video.Description,
            },
        },
    } as Omit<IMsgVideo2wx, 'CreateTime'>;

    return resp(wx);
};

export type IMsgVoice = IMsgRespBase<{
    MsgType: 'voice';
    Voice: {
        MediaId: string;
    };
}>;
export type IMsgVoice2wx = IMsgRespBase2wx<{
    MsgType: Idata<'voice'>;
    Video: {
        MediaId: IString;
    };
}>;
/**
 * 回复语音消息
 * @param p
 */
export const voice = (p: Omit<IMsgVoice, 'MsgType'>) => {
    let t = {MsgType: 'voice', ...p};
    const trans = transData(t, baseField);

    const wx = {
        ...trans,
        Video: {
            MediaId: {
                _cdata: p.Voice.MediaId,
            },
        },
    } as Omit<IMsgVoice2wx, 'CreateTime'>;

    return resp(wx);
};

export type IMsgNews = IMsgRespBase<{
    MsgType: 'news';
    ArticleCount: number;
    Articles: {
        item: Array<{
            Title: string;
            Description: string;
            PicUrl: string;
            Url: string;
        }>;
    };
}>;
export type IMsgNews2wx = IMsgRespBase2wx<{
    MsgType: Idata<'news'>;
    ArticleCount: number;
    Articles: {
        item: Array<{
            Title: IString;
            Description: IString;
            PicUrl: IString;
            Url: IString;
        }>;
    };
}>;
/**
 * 回复图文消息
 * @param p 回复
 */
export const news = (p: Omit<IMsgNews, 'MsgType'>) => {
    let t = {MsgType: 'news', ...p};
    const trans = transData(t, baseField);
    const item = p.Articles.item.map(item => {
        return {
            Title: {
                _cdata: item.Title,
            },
            Description: {
                _cdata: item.Description,
            },
            PicUrl: {
                _cdata: item.PicUrl,
            },
            Url: {
                _cdata: item.Url,
            },
        };
    });

    const wx = {
        ...trans,
        ArticleCount: p.ArticleCount,
        Articles: {
            item,
        },
    } as Omit<IMsgNews2wx, 'CreateTime'>;

    return resp(wx);
};

export type IMsgMusic = IMsgRespBase<{
    MsgType: 'music';
    Music: {
        Title: string;
        Description: string;
        MusicUrl: string;
        HQMusicUrl: string;
        ThumbMediaId: string;
    };
}>;
export type IMsgMusic2wx = IMsgRespBase2wx<{
    MsgType: Idata<'music'>;
    Music: {
        Title: IString;
        Description: IString;
        MusicUrl: IString;
        HQMusicUrl: IString;
        ThumbMediaId: IString;
    };
}>;
/**
 * 回复音乐消息
 * @param p
 */
export const music = (p: Omit<IMsgMusic, 'MsgType'>) => {
    let t = {MsgType: 'news', ...p};
    const trans = transData(t, baseField);

    const wx = {
        ...trans,
        Music: {
            Title: {
                _cdata: p.Music.Title,
            },
            Description: {
                _cdata: p.Music.Description,
            },
            MusicUrl: {
                _cdata: p.Music.MusicUrl,
            },
            HQMusicUrl: {
                _cdata: p.Music.HQMusicUrl,
            },
            ThumbMediaId: {
                _cdata: p.Music.ThumbMediaId,
            },
        },
    } as Omit<IMsgMusic2wx, 'CreateTime'>;

    return resp(wx);
};

type IRespJSON = IMsgText2wx | IMsgImage2wx | IMsgVideo2wx | IMsgVoice2wx | IMsgNews2wx | IMsgMusic2wx;
/**
 * 关注或者取消关注事件，事件类型，subscribe(订阅)、unsubscribe(取消订阅)
 * @param xml 消息
 */
export const resp = (p: IRespJSON) => {
    return json2msg({
        ...p,
        CreateTime: p.CreateTime ? p.CreateTime : now(),
    });
};
const now = () => {
    return parseInt((new Date().getTime() / 1000).toString(), 10);
};
export const json2msg = (json: any): string => {
    const options = {compact: true, ignoreComment: true, spaces: 2, indentCdata: true, ignoreCdata: false};
    const result = convert.json2xml(
        {
            xml: json,
        } as any,
        options,
    );
    return result;
};
