import {defineProject} from 'vitest/config'

export default defineProject(
  {
    esbuild: false,
    test: {
      globals: true,
      setupFiles: './vitest.setup.ts',
      include: [
        'src/**/primitive.test.ts',
        'src/**/primitive-value.test.ts',
        'src/**/primitive-label.test.ts',
        'src/**/primitive.datetime.spec.ts'
      ],
      browser: {
        enabled: true,
        name: 'chromium',
        headless: true,
        provider: 'playwright'
      },
      reporters: ['verbose', 'junit'],
      outputFile: {
        junit: './results/junit-report.xml'
      }
    }
  })
