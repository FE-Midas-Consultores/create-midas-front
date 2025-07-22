export const TEMPLATES = {
  next: 'Next.js',
  'next-ts': 'Next.js + TypeScript',
  react: 'React',
  'react-ts': 'React + TypeScript',
} as const

export type Template = keyof typeof TEMPLATES
