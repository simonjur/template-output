import * as core from '@actions/core'
import { Eta } from 'eta'
import YAML from 'yaml'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const template = core.getInput('template', { required: true })
    const variables = core.getInput('variables', {
      required: false
    })

    console.log(`Template: ${template}`)

    console.log('env', JSON.stringify(process.env, undefined, 2))

    const parsedVariables = YAML.parse(variables)

    console.log('variables', parsedVariables)

    const eta = new Eta()
    const renderedTemplate = eta.renderString(template, { ...parsedVariables })

    core.setOutput('text', renderedTemplate)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
