import {getUserByTag, addUser2Tag, getTags, unUser4Tag, getUserTags} from '../src/tags';
import {accessToken} from '../src/token';
import {userlist} from '../src/user';

const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('tagsuser', () => {
    let accessTokenStr = '';
    let openid: string;
    let tagid: number;
    beforeAll(async () => {
        const token = await accessToken(appid, appsecret);
        if (token && token.access_token) {
            accessTokenStr = token.access_token;
            // console.log(accessTokenStr);
        } else {
            return false;
        }

        const list = await userlist(accessTokenStr);
        openid = list!.data.openid[0];

        const tags = await getTags(accessTokenStr);
        tagid = tags!.tags[0].id;
        return;
    });

    // 获取openid下的tag
    test('=== getUserByTag ===', async () => {
        const tags = await getUserByTag(accessTokenStr, tagid, openid);
        // console.log(tags);
        if (tags) {
            expect(tags.count >= 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });

    test('===  addUser2Tag ===', async () => {
        const tags = await addUser2Tag(accessTokenStr, [openid], tagid);
        if (tags) {
            expect(tags.errcode).toBe(0);
        } else {
            expect(1).toBe(2);
        }
    });

    test('===  getUserTags ===', async () => {
        const tags = await getUserTags(accessTokenStr, openid);
        // console.log(tags);
        if (tags) {
            expect(tags.tagid_list.length >= 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });

    test('===  unUser4Tag ===', async () => {
        const tags = await unUser4Tag(accessTokenStr, [openid], tagid);
        if (tags) {
            expect(tags.errcode).toBe(0);
        } else {
            expect(1).toBe(2);
        }
    });

    afterAll(async () => {
        // await deleteTag(accessTokenStr, {id: tagInfo.id});
    });
});
