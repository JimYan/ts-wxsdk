// export {};

// declare global {
namespace NodeJS {
    interface Global {
        jestconfig: {
            appid: string;
            appsecret: string;
        };
    }
}
// }

declare var xprocess: string;
