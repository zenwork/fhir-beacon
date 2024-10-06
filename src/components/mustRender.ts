import {meta, NoDataObject} from '../internal/base/Decorated'
import {DisplayMode}        from '../types'
import {isBlank} from '../utilities'

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

  if (isDisplay(mode) && isPresent(value) && shouldRender(summary, summaryMode)) {
    return true
  }

  if (isStructure(mode)) {
    if (isPresent(value) && shouldRender(summary, summaryMode)) {
      return true
    }

    if (verbose) {
      return true
    }

  }

  return false
}

function isDisplay(mode: DisplayMode) {
  return mode == DisplayMode.display
         || mode == DisplayMode.narrative
         || mode == DisplayMode.debug
}

function isStructure(mode: DisplayMode) {
  return mode == DisplayMode.structure
}

function shouldRender(summaryTaggedValue: boolean, summaryMode: boolean) {
  return (summaryTaggedValue && summaryMode) || !summaryMode
}

function isPresent(value: any) {
  if (value === NoDataObject) return false

  if (value && value[meta] && value[meta].hide) {
    return value[meta].hide !== true
  }

  return !isBlank(value)
}
