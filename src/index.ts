#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings'

import pkgJson from '../package.json' with { type: 'json' }

import { TEMPLATES } from './constants/templates.js'
import { createProject } from './generators/create-project.js'
import { showIntro, showOutro } from './utils/intro-outro.js'

const program = new Command('create-midas-front')
  .description('Generators for bootstrapping your project configurations.')
  .version(pkgJson.version)
  .argument('[project-name]', 'The name of the project to create')
  .option(
    '--template <template>',
    `The template to use. Available templates are: ${Object.keys(TEMPLATES).join(', ')}`,
  )
  .action(async (name, { template }) => {
    showIntro()
    await createProject({ name, template })
    showOutro()
  })

program.parse(process.argv)
