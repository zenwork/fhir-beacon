import {DisplayMode} from '../types'

/**
 * Determines if a value should be rendered based on the provided context parameters.
 *
 * @param value - The value to be rendered. Can be of any type or null/undefined.
 * @param mode - The display mode. Optional. Defaults to `DisplayMode.display` if not provided.
 * @param verbose - Specifies if verbose rendering is required. Optional. Defaults to `false` if not provided.
 * @param summaryMode - Specifies if summary mode is enabled. Optional. Defaults to `false` if not provided.
 * @param summary - Specifies if summary rendering is required. Optional. Defaults to `false` if not provided.
 * @returns True if the value should be rendered, otherwise false.
 */
export function mustRender(value: unknown | null | undefined,
                           mode: DisplayMode = DisplayMode.display,
                           verbose: boolean = false,
                           summaryMode: boolean = false,
                           summary: boolean = false): boolean {

  if (isDisplay(mode) && isPresent(value) && shouldREnder(summary, summaryMode)) {
    return true
  }

  if (isStructure(mode)) {
    if (isPresent(value) && shouldREnder(summary, summaryMode)) {
      return true
    }

    if (verbose) {
      return true
    }

  }

  return false
}

function isDisplay(mode: DisplayMode) {
  return mode == DisplayMode.display || mode == DisplayMode.display_summary || mode == DisplayMode.narrative
}

function isStructure(mode: DisplayMode) {
  return mode == DisplayMode.structure || mode == DisplayMode.structure_summary
}

function shouldREnder(summary: boolean, summaryMode: boolean) {
  return (summary && summaryMode) || !summaryMode
}

function isPresent(value: unknown) {
  return value
}