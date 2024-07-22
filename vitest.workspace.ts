import {defineWorkspace} from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit-tests',
      include: [
        'src/**/primitive.datetime.spec.ts'
      ],
      environment: 'node'
    }
  },
  {
    esbuild: false,
    test: {
      name: 'browser-tests',
      globals: false,
      setupFiles: './vitest.setup.ts',
      include: [
        'src/**/primitive.test.ts',
        'src/**/primitive-value.test.ts',
        'src/**/primitive-label.test.ts'

      ],
      browser: {
        enabled: true,
        name: 'chromium',
        headless: true,
        provider: 'playwright',
        viewport: { width: 1000, height: 800 }
      },
      typecheck: {
        enabled: true,
        tsconfig: './tsconfig.test.json'
      },
      testTimeout: 5000
    }
  }
])
