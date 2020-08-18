# ts-wxsdk

![Node.js CI](https://github.com/JimYan/ts-wxsdk/workflows/Node.js%20CI/badge.svg)

微信公众平台服务端 API SDK，使用 TS 开发，有完善的 TS 声明和单元测试。
主要功能：

-   [x] 微信公众号登录、小程序登录
-   [x] 获取和刷新 accessToken
-   [x] 发送模板消息
-   [x] 解析微信事件推送和格式化回复消息
-   [x] 黑名单管理
-   [x] 标签管理
-   [x] 生成长期 OR 临时二维码

TODO：

-   解析加密消息
-   支付回调

> 申请微信公众号沙箱测试号，请移步：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login

## Installation

```bash
yarn add ts-wxsdk
// or
npm install ts-wxsdk -s
```

## Usage

### 设置访问代理

如果你的服务器需要通过代理服务器访问外网，需要在调用任何一个 API 之前设置代理，全局只需要设置一次。（如果服务器是直接连外网，那么忽略。）
设置方法：

```typescript
import {setProxy} from 'ts-wxsdk';

setProxy({
    host: 'your proxy server host',
    port: your proxy server port,
});
```

### accessToken

获取全局 accessToken 或 jsapi ticket：

```typescript
import {accessToken, ticket} from 'ts-wxsdk/token';

// 获取微信全局accesstoken，2小时有效期，建议定时刷新内部保存。
const token = await accessToken(appid, appsecret); // appid和appsecret在微信公众号管理后台获取

// 微信卡券api接口ticket或者jsapi ticket
const jsticket = await ticket(token, 'jsapi');
```

## 用户登录

```typescript
import {code2AccessToken, refreshAccessToken, userinfo, code2userinfo, code2Session} from 'ts-wxsdk/user';

// 微信公众号登录，使用code换用户的accessToken和openId
const accessToken = await code2AccessToken(appid, appsecret, code);
const userinfo = await userinfo(appid, openID);

// 小程序登录
const info = await code2Session(appid, appsecret, code);
```

### 模板消息

发送模板消息

```typescript
import {template} from 'ts-wxsdk/template';

template<{
    name: {
        value: string;
        color?: string;
    };
}>(accessToken, {
    touser: 'TO USER OPENID',
    template_id: '3W-7l84S25TMqdzJPN7jaqE5Fj451aGobsc1wMD7NXU',
    url: 'https://www.baidu.com/',
    topcolor: '#00ff00',
    data: {
        name: {
            value: 'name',
            color: '#173177',
        },
    },
});
```

### 解析微信事件通知

> 微信消息通知具体见：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html

此 API 是把通知过来的 XML 内容解析成 JSON 格式。todo: 加密消息解密（当前版本没有处理）

```typescript
import {parse} from 'ts-wxsdk/message';
const l = parse(wxSendMessage);
```

### 被动回复

> 具体见：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html

这个 API 负责把对应的消息内容组装成 XML 格式。

```typescript
import {text, image, video, voice, news} from 'ts-wxsdk/message.response';
// 文本消息
const r = text({
    ToUserName: 'a',
    FromUserName: 'b',
    Content: 's',
});

// 图片消息
const r = image({
    ToUserName: 'a',
    FromUserName: 'b',
    Image: {
        MediaId: 'b',
    },
});

// 视频消息
const r = video({
    ToUserName: 'a',
    FromUserName: 'b',
    Video: {
        MediaId: '11',
        Title: 'hello video',
        Description: 'desc',
    },
});

// 语音消息
const r = voice({
    ToUserName: 'a',
    FromUserName: 'b',
    Voice: {
        MediaId: 'voiceid',
    },
});

// 图文消息
const r = news({
    ToUserName: 'a',
    FromUserName: 'b',
    ArticleCount: 2, // 文章数量
    Articles: {
        item: [
            {
                Title: 't1',
                Description: 'd1',
                PicUrl: 'pu1',
                Url: 'u1',
            },
            {
                Title: 't2',
                Description: 'd2',
                PicUrl: 'pu2',
                Url: 'u2',
            },
        ],
    },
});
```

更多的 API 请移步：[API 文档](https://jimyan.github.io/ts-wxsdk/)

## Contributing

项目已经设置了 GIT ACTIONS，在 PR 的时候需要检查：

-   [x] 类型检测
-   [x] 充分的注释
-   [x] 单元测试

## License

MIT
