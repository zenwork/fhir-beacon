import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const headless = !!process.env.HEADLESS && process.env.HEADLESS === "true";
console.log("headless: ", headless);
console.log("cwd:", process.cwd());

export default defineConfig({
	test: {
		reporters: ["dot", "junit"],
		outputFile: {
			junit: "./results/junit-report.xml",
		},
		projects: [
			{
				test: {
					name: "unit",
					include: ["src/**/*.test.ts"],
					environment: "node",
				},
			},
			{
				test: {
					name: "browser",
					globals: false,
					setupFiles: "./vitest.setup.ts",
					include: ["src/**/*.spec.ts"],
					browser: {
						provider: playwright(),
						instances: [
							{
								browser: "chromium",
							},
						],
						enabled: true,
						headless: headless,
						screenshotFailures: true,
						viewport: { width: 1000, height: 800 },
					},
					typecheck: {
						enabled: true,
						tsconfig: "./tsconfig.json",
					},
					testTimeout: 5000,
					expect: { poll: { timeout: 500, interval: 5 } },
				},
			},
			{
				oxc: false,
				test: {
					name: "jsdom",
					setupFiles: "./vitest.setup.ts",
					include: ["src/**/*.jsdom.ts"],
					environment: "jsdom",
				},
			},
			{
				extends: true,
				plugins: [
					storybookTest({ configDir: path.join(dirname, ".storybook") }),
				],
				test: {
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: "chromium" }],
					},
				},
			},
		],
	},
});
