import axios from 'axios';
import * as tunnel from 'tunnel';

/**
 * 设置axios请求数据的代理服务器信息。如果你的服务器请求微信的接口需要通过代理服务器，那么需要设置，进程内只需设置一次。
 * ~~~
 * import {setProxy} from 'ts-wxsdk';
 * setProxy({
 *  host:'x.x.x.x',
 *  port: 8080
 * })
 * ~~~
 * @param proxy 代理服务器的IP和端口
 */
export const setProxy = (proxy: {host: string; port: number}) => {
    const agent = tunnel.httpsOverHttp({proxy});
    axios.interceptors.request.use(function (config: any) {
        if (config.url.indexOf('https') !== -1) {
            config.httpsAgent = agent;
            config.proxy = false;
        }
        return config;
    });
};
