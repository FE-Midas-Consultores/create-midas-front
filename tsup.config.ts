import { cp } from 'fs/promises'
import { dirname, join } from 'path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'url'

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
  },
}))
