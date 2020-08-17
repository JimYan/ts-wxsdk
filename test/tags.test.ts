import {createTag, getTags, updateTag, deleteTag} from '../src/tags';
import {accessToken} from '../src/token';

const appid = global.jestconfig.appid;
const appsecret = global.jestconfig.appsecret;

describe('tags', () => {
    let accessTokenStr = '';
    let tagInfo: {id: number; name: string};
    beforeAll(async () => {
        const token = await accessToken(appid, appsecret);
        if (token && token.access_token) {
            accessTokenStr = token.access_token;
            // console.log(accessTokenStr);
        } else {
            return false;
        }

        const tags = await createTag(accessTokenStr, 't3.' + Math.random());
        tagInfo = tags!.tag;
        return;
    });

    test('=== createTag ===', async () => {
        const tags = await createTag(accessTokenStr, 't1' + Math.random());
        if (tags) {
            expect(tags.tag.name).toContain('t1');
        } else {
            expect(1).toBe(2);
        }
    });

    test('=== getTag ===', async () => {
        const tags = await getTags(accessTokenStr);
        // console.log(tags);
        if (tags) {
            expect(tags.tags.length > 0).toBe(true);
        } else {
            expect(1).toBe(2);
        }
    });

    test('=== updateTag ===', async () => {
        const up = await updateTag(accessTokenStr, {id: tagInfo.id, name: 'upinfo' + Math.random()});
        if (up) {
            expect(up.errcode).toBe(0);
        } else {
            expect(1).toBe(2);
        }
    });

    test('=== delTag ===', async () => {
        const tags = await createTag(accessTokenStr, 'tdel' + Math.random());
        if (tags) {
            expect(tags.tag.name).toContain('tdel');
        } else {
            expect(1).toBe(2);
        }

        const del = await deleteTag(accessTokenStr, {id: tags!.tag.id});
        if (del) {
            expect(del.errcode).toBe(0);
        } else {
            expect('del').toBe('x');
        }
    });

    afterAll(async () => {
        await deleteTag(accessTokenStr, {id: tagInfo.id});
    });
});
