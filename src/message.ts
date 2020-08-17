import * as convert from 'xml-js';

export const msg2json = <T>(xml: string): T => {
    const result2 = convert.xml2js(xml, {compact: false});
    const r = {} as T;
    if (result2.elements && result2.elements[0] && result2.elements[0].elements) {
        result2.elements[0].elements.forEach((e: any) => {
            switch (e.elements[0].type) {
                case 'cdata':
                    r[e.name] = e.elements[0].cdata;
                    break;
                case 'text':
                    r[e.name] = e.elements[0].text;
                    break;
                default:
                    r[e.name] = 'unknow';
                    break;
            }
        });
    }
    return r;
};

export type IMsgBase<T> = {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
    MsgId: string;
} & T;

export type IMsgText = IMsgBase<{
    MsgType: 'text';
    Content: string;
}>;

export type IMsgImage = IMsgBase<{
    MsgType: 'image';
    PicUrl: string;
    MediaId: string;
}>;

export type IMsgVoice = IMsgBase<{
    Format: string;
    MsgType: 'voice';
    MediaId: string;
    Recognition: string;
}>;

export type IMsgVideo = IMsgBase<{
    MsgType: 'video' | 'shortvideo';
    ThumbMediaId: string;
    MediaId: string;
}>;

export type IMsgLocation = IMsgBase<{
    MsgType: 'location';
    Location_X: string;
    Location_Y: string;
    Scale: string;
    Label: string;
}>;

export type IMsgLink = IMsgBase<{
    MsgType: 'link';
    Title: string;
    Description: string;
    Url: string;
}>;

export type IEvent = IMsgBase<{
    MsgType: 'event';
    Event: 'subscribe' | 'unsubscribe';
}>;
export type IEventScan = IMsgBase<{
    MsgType: 'event';
    Event: 'subscribe' | 'SCAN';
    EventKey: string;
    Ticket: string;
}>;
export type IEventReportLocation = IMsgBase<{
    MsgType: 'event';
    Event: 'LOCATION';
    Latitude: string;
    Longitude: string;
    Precision: string;
}>;
export type IEventMenu = IMsgBase<{
    MsgType: 'event';
    Event: 'VIEW' | 'CLICK';
    EventKey: string;
}>;

export type IResiveEvent =
    | IMsgText
    | IMsgImage
    | IMsgVideo
    | IMsgVoice
    | IMsgLocation
    | IEvent
    | IEventScan
    | IMsgLink
    | IEventReportLocation
    | IEventMenu;

export const parse = (xml: string): IResiveEvent | null => {
    const msg = msg2json<IResiveEvent>(xml);
    if (msg.ToUserName) {
        return {
            ...msg,
            CreateTime: parseInt(msg.CreateTime.toString(), 10),
        };
    }

    return null;
};
