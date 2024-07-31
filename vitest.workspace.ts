import {defineWorkspace} from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit-tests',
      include: ['src/**/*.test.ts'],
      environment: 'node'
    }
  },
  {
    esbuild: false,
    test: {
      name: 'browser-tests',
      globals: false,
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.spec.ts'],
      browser: {
        enabled: true,
        name: 'chromium',
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
