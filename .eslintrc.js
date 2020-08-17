/** @format */

module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
    env: {
        //指定代码的运行环境
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 6, //也就是ES6语法支持的意思
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
};
