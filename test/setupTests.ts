import {setProxy} from '../src/index';
// console.log(process.env);
import * as YAML from 'yaml';
import * as fs from 'fs';
const jestconfig = getConfig(__dirname + '/../jest.yml');
const local = getConfig(process.cwd() + '/.local.yml');

const config = Object.assign({}, jestconfig, local ? local : {});

if (config.proxy) {
    setProxy({
        host: config.proxy.host,
        port: config.proxy.port,
    });
}

if (!config.appinfo) {
    throw new Error('请配置appinfo');
}

global.jestconfig = {
    appid: config.appinfo.appid,
    appsecret: config.appinfo.appsecret,
};

function getConfig(path: string) {
    try {
        const file = fs.readFileSync(path, 'utf8');
        const config = YAML.parse(file);
        return config;
    } catch (err) {
        return null;
    }

    // const file = fs.readFileSync(path, 'utf8');
    // const config = YAML.parse(file);
    // return config;
}
