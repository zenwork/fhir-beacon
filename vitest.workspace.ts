import {defineWorkspace} from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit-tests',
      include: [
        'src/**/*.test.ts'
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
        'src/**/primitive.spec.ts',
        'src/**/primitive-value.spec.ts',
        'src/**/primitive-label.spec.ts'

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
