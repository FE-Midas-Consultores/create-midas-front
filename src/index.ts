#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { Command } from '@commander-js/extra-typings'

import pkgJson from '../package.json' with { type: 'json' }

import { baseGenerator } from './generators/base.js'
import { nextGenerator } from './generators/next.js'
import { reactGenerator } from './generators/react.js'
import { showIntro, showOutro } from './utils/intro-outro.js'

const program = new Command('create-midas-front')
  .description('Generators for bootstrapping your project configurations.')
  .version(pkgJson.version)
  .action(async () => {
    showIntro()
    await baseGenerator()
    showOutro()
  })

program
  .command('react')
  .description('Initialize a React project with Vite')
  .option('-ts, --typescript', 'Initialize the project with TypeScript')
  .option('--no-ts, --no-typescript', 'Initialize the project with JavaScript')
  .action(async (options) => {
    showIntro()
    await reactGenerator(options)
    showOutro()
  })

program
  .command('next')
  .description('Initialize a Next project')
  .option('-ts, --typescript', 'Initialize the project with TypeScript')
  .option('--no-ts, --no-typescript', 'Initialize the project with JavaScript')
  .action(async (options) => {
    showIntro()
    await nextGenerator(options)
    showOutro()
  })

program.parse(process.argv)
