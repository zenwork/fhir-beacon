import fs    from 'fs/promises'
import http  from 'http'
import https from 'https'
import path  from 'path'
import {URL} from 'url'

// Utility: Helper to ensure a directory exists
const ensureDir = async (dir) => {
    try {
        await fs.mkdir(dir, {recursive:true})
    } catch (error) {
        if (error.code !== 'EEXIST') throw error
    }
}

// Utility: Fetch file content from a given URL
const fetchFile = (url) => {
    const client = url.startsWith('https') ? https : http

    return new Promise((resolve, reject) => {
        client
            .get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to fetch ${url}: Status code ${response.statusCode}`))
                    return
                }

                let data = ''
                response.on('data', (chunk) => {
                    data += chunk
                })

                response.on('end', () => {
                    resolve(data)
                })
            })
            .on('error', (err) => reject(err))
    })
}

// Utility: Extract ESM imports from a JavaScript file
const extractImports = (jsContent) => {
    const importRegex = /import\s+['"]([^'"]+)['"];?/g // Handles side-effect imports like `import "./chunks/xyz.js"`
    const fromImportRegex = /import\s+(?:[\s\S]*?)?\s+from\s+['"]([^'"]+)['"];?/g // Handles named imports like `import { x } from './xyz.js'`
    const dynamicImportRegex = /import\(\s*['"]([^'"]+)['"]\s*\)/g // Handles dynamic imports like `import('./xyz.js')`

    const imports = new Set()

    let match
    // Match side-effect imports
    while ((match = importRegex.exec(jsContent)) !== null) {
        imports.add(match[1])
    }
    // Match named imports or wildcard imports
    while ((match = fromImportRegex.exec(jsContent)) !== null) {
        imports.add(match[1])
    }
    // Match dynamic imports
    while ((match = dynamicImportRegex.exec(jsContent)) !== null) {
        imports.add(match[1])
    }

    return [...imports] // Return a deduplicated list of imports
}

// Recursive function to download files and their imports
const fetchRecursively = async (url, outputDir, visited = new Set()) => {
    if (visited.has(url)) {
        return
    }
    visited.add(url)

    console.log(`Downloading: ${url}`)
    const jsContent = await fetchFile(url)

    // Save the file locally
    const parsedUrl = new URL(url)
    const localPath = path.join(outputDir, parsedUrl.hostname, parsedUrl.pathname)
    await ensureDir(path.dirname(localPath))
    await fs.writeFile(localPath, jsContent, 'utf8')
    console.log(`Saved to: ${localPath}`)

    // Extract imports and recursively fetch them
    const imports = extractImports(jsContent)

    for (const imp of imports) {
        try {
            const resolvedUrl = new URL(imp, url).href // Resolve relative imports
            await fetchRecursively(resolvedUrl, outputDir, visited)
        } catch (error) {
            console.error(`Error resolving import: ${imp} in ${url}. Error: ${error.message}`)
        }
    }
}

// Main function
const downloadJSWithImports = async (entryFileUrl, outputDirectory) => {
    try {
        console.log(`Starting download from: ${entryFileUrl}`)
        await fetchRecursively(entryFileUrl, outputDirectory)
        console.log('All files downloaded successfully!')
    } catch (error) {
        console.error(`Error during download: ${error.message}`)
    }
}

// Example usage:
// Update `entryFileUrl` and `outputDirectory` as needed
const entryFileUrl = 'https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/webawesome.loader.js'
const outputDirectory = path.resolve('./downloaded_files')

downloadJSWithImports(entryFileUrl, outputDirectory)
