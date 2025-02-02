type ErrorNodeKey = { node: string, index?: number };
type FullyQualifiedKey = { path: ErrorNodeKey[], key?: string, index?: number };

// Sort function
export function sort(arr: [FullyQualifiedKey, string[]][]): [FullyQualifiedKey, string[]][] {

  return arr.sort(([a], [b]) => {

    // Sort by `path` array lexicographically, considering `node` and then `index`
    const pathLength = Math.min(a.path.length, b.path.length)

    let pathComparison: number = 0
    for (let i = 0; i < pathLength; i++) {

      const aNode = a.path[i].node
      const bNode = b.path[i].node
      if (aNode !== bNode) {
        pathComparison = pathComparison + aNode.localeCompare(bNode)
        break
      }


      const aIndex = a.path[i].index ?? 0 // Default to 0 if `index` is undefined
      const bIndex = b.path[i].index ?? 0

      if (aIndex !== bIndex) {
        pathComparison = pathComparison + (aIndex - bIndex)
        break
      }


    }

    if (pathComparison === 0) {
      return (a.index === undefined && b.index === undefined)
             || (a.index === 0 && b.index === undefined)
             || (a.index === undefined && b.index === 0)
             || (!a.index && !b.index)
             ? 0
             : (a.index ?? 0) - (b.index ?? 0)

    } else {
      return pathComparison
    }
  })
}


export function reindex(original: [FullyQualifiedKey, string[]][]): [FullyQualifiedKey, string[]][] {
  const copy: [FullyQualifiedKey, string[]][] = JSON.parse(JSON.stringify(original))
  const counters: { [key: string]: { next: number, previous: number } } = {}
  return copy.map((entry) => {
    return [modify(entry[0], counters), entry[1]]
  })


}

function modify(entry: FullyQualifiedKey,
                lookups: { [key: string]: { next: number, previous: number } }): FullyQualifiedKey {
  const reindexedPaths: ErrorNodeKey[] = []
  const path: string = entry.path
                            .reduce((prev, p) => {
                              const key: string = `${prev}.${p.node}${p.index !== undefined ? `[x]` : ''}`
                              if (!lookups[key]) {
                                lookups[key] = { next: 0, previous: p.index ?? 0 }
                              }

                              if (p.index !== undefined && lookups[key].previous !== p.index) lookups[key].next++
                              lookups[key].previous = p.index ?? 0

                              if (p.index !== undefined) {
                                reindexedPaths.push({ node: p.node, index: lookups[key].next })
                              } else {
                                reindexedPaths.push({ node: p.node })
                              }

                              return key
                            }, '')


  const key = `${path}.${entry.key !== undefined ? entry.key : ''}${entry.index !== undefined
                                                                    ? '[x]'
                                                                    : ''}`


  if (!lookups[key]) {
    lookups[key] = { next: 0, previous: entry.index ?? 0 }
  }

  let newKey: FullyQualifiedKey
  if (entry.index !== undefined && lookups[key].previous !== entry.index) lookups[key].next++
  lookups[key].previous = entry.index ?? 0

  if (entry.index !== undefined) {
    newKey = { path: reindexedPaths, key: entry.key, index: lookups[key].next }
  } else {
    newKey = { path: reindexedPaths, key: entry.key }
  }

  return newKey


}
