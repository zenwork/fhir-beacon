import {defineProject} from 'vitest/config'

export default defineProject(
  {
    esbuild: false,
    test: {
      globals: false,
      setupFiles: './vitest.setup.ts',
      reporters: ['default', 'junit'],
      outputFile: {
        junit: './results/junit-report.xml'
      },
      typecheck: {
        enabled: true,
        tsconfig: './tsconfig.test.json'
      }
    }
  })
