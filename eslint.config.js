import pluginJs from '@eslint/js'
import globals  from 'globals'
import tseslint from 'typescript-eslint'

export default [
    {
        ignores:[
            '**/dist/*',
            '**/coverage/*',
            '**/node_modules/*'
        ]
    },
    {
        files:['src/**/*.ts',
               'stories/**/*.ts',
               'tests/**/*.ts',
               'demo-code/**/*.ts',
               '.storybook/**'
        ]
    },
    {languageOptions:{globals:globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules:{
            '@typescript-eslint/no-explicit-any':'off'
        }
    }
]
