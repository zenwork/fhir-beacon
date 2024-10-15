import pluginJs from '@eslint/js'
import globals  from 'globals'
import tseslint from 'typescript-eslint'

export default [
    {
        ignores:['**/dist/*', '**/coverage/*', '**/node_modules/*', '**/html/*', '**/storybook-static/*']
    },
    {
        files:['src/**/*.ts', 'stories/**/*.ts', 'tests/**/*.ts', 'demo-code/**/*.ts', '.storybook/**']
    },
    {languageOptions:{globals:globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules:{
            'prettier/prettier':'off',
            '@typescript-eslint/no-explicit-any':'off',
            semi:['error', 'never'],
            'newline-per-chained-call':'off',
            'function-paren-newline':'off',
            indent:'off',
            'no-use-before-define':['error', {'functions':false, 'classes':true}]
        }
    }
]
