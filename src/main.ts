import * as core from '@actions/core'
import { Eta } from 'eta'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const template = core.getInput('template', { required: true })
    const variables = core.getMultilineInput('variables', {
      required: false
    })

    core.debug(`Template: ${template}`)

    console.log('variables', variables)

    const eta = new Eta()
    eta.renderString(template, { name: 'Ben' })

    core.setOutput('text', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
