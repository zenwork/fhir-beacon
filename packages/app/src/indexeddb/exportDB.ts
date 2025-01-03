export async function exportDB(databaseName: string, storeName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(databaseName, 1) // Database name: fileHandlesDB

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      const transaction = db.transaction([storeName], 'readonly') // Object store: handles
      const objectStore = transaction.objectStore(storeName)

      const exportData: { key: IDBValidKey; value: any }[] = []
      const cursorRequest = objectStore.openCursor()

      cursorRequest.onsuccess = (cursorEvent) => {
        // @ts-ignore
        const cursor = cursorEvent.target.result
        if (cursor) {
          // Collect both key and value
          exportData.push({ key: cursor.key, value: cursor.value })
          cursor.continue()
        } else {
          // All data collected, return as JSON string
          const jsonData = JSON.stringify(exportData, null, 2) // Pretty print
          resolve(jsonData)
        }
      }

      cursorRequest.onerror = () => {
        reject('Error opening cursor.')
      }
    }

    dbRequest.onerror = () => {
      reject('Error opening database.')
    }
  })
}
