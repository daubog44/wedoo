import type { UserConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

const baseConfig = viteConfig as UserConfig;

export default defineConfig({
  ...baseConfig,
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/integration/**/*.test.ts"],
    maxWorkers: 4,
    pool: "threads",
    setupFiles: "./vitest.setup.ts",
  },
});
