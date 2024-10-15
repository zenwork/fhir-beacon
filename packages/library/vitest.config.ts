import {defineProject} from 'vitest/config'

export default defineProject({
    esbuild: false,
    test: {
      globals: false,
      setupFiles: './vitest.setup.ts',
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
      reporters: ['dot', 'junit'],
      outputFile: {
        junit: './results/junit-report.xml'
      },
      typecheck: {
        enabled: true,
        tsconfig: './tsconfig.json'
      }
    }
  })
