import {defineWorkspace} from 'vitest/config'

const headless = !!process.env.HEADLESS && process.env.HEADLESS === 'true'
console.log('headless: ', headless)

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: ['src/**/*.test.ts'],
      environment: 'node'
    }
  },
  {
    esbuild: false,
    test: {
      name: 'browser',
      globals: false,
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.spec.ts'],
      browser: {
        enabled: true,
        headless: headless,
        name: 'chromium',
        screenshotFailures: true,
        providerOptions: { debugger: true },
        provider: 'playwright',
        viewport: { width: 1000, height: 800 }
      },
      typecheck: {
        enabled: true,
        tsconfig: './tsconfig.test.json'
      },
      testTimeout: 5000
    }
  },
  {
    esbuild: false,
    test: {
      name: 'jsdom',
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.jsdom.ts'],
      environment: 'jsdom'
    }
  }
])
