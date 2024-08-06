import { nextGenerator } from '../generators/next.js'
import { reactGenerator } from '../generators/react.js'

export const EXEC_GENERATOR = {
  react: reactGenerator,
  next: nextGenerator,
} as const
