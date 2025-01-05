import {drop}  from './drop'
import {getDB} from './get'



export async function importDB(json: string, databaseName: string, storeName: string) {

  // Parse the JSON string
  let jsonData: { key: IDBValidKey; value: any }[]
  try {
    jsonData = JSON.parse(json)
    if (!Array.isArray(jsonData)) {
      throw new Error('JSON string must represent an array of key-value objects.')
    }
  } catch (error) {
    console.error('Invalid JSON format:', error)
    return
  }

  getDB(databaseName, storeName)
    .then(db => drop(db, storeName))
    .then(() => {

      // Open the IndexedDB database
      const dbRequest = indexedDB.open(databaseName, 1)

      dbRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create the object store if not already present
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName) // No keyPath specified – keys will be manually added
        }
      }

      dbRequest.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        const transaction = db.transaction([storeName], 'readwrite') // Object store: handles
        const objectStore = transaction.objectStore(storeName)

        // Insert all JSON objects into the object store
        jsonData.forEach((entry) => {
          const request = objectStore.put(entry.value, entry.key) // Add both key and value
          request.onerror = (err) => console.error('Error inserting data:', err)
          request.onsuccess = () => console.log(`Successfully inserted key: ${entry.key}`)
        })

        transaction.oncomplete = () => {
          console.log('JSON data imported successfully!')
        }

        transaction.onerror = () => {
          console.error('Transaction failed!')
        }
      }

      dbRequest.onerror = () => {
        console.error('Error opening database.')
      }
    })
}
