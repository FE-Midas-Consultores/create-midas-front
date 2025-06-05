import { cp } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  clean: true,
  entry: ['src/index.ts'],
  outDir: 'build',
  shims: true,
  sourcemap: false,
  format: ['esm'],
  minify: !options.watch,
  onSuccess: async () => {
    await cp(
      join(dirname(fileURLToPath(import.meta.url)), 'src', 'templates'),
      join('build', 'templates'),
      { recursive: true },
    )

    await cp(
      join(dirname(fileURLToPath(import.meta.url)), 'src', 'dependencies'),
      join('build', 'dependencies'),
      { recursive: true },
    )
  },
}))
