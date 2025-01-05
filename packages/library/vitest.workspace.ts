import {defineWorkspace} from 'vitest/config'



const headless = !!process.env.HEADLESS && process.env.HEADLESS === 'true'
console.log('headless: ', headless)
console.log('cwd:', process.cwd())

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: ['src/**/*.test.ts'],
      environment: 'node'
    }
  },
  {

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
        tsconfig: './tsconfig.json'
      },
      testTimeout: 5000,
      expect: { poll: { timeout: 500, interval: 5 } }

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
