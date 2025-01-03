import {IDBPDatabase, openDB} from 'idb'



export async function getDB(dbName: string, storeName: string) {
  const db: IDBPDatabase = await openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName)
    }
  })
  return db
}


export async function clear(db: IDBPDatabase, storeName: string) {
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.clear()
  await tx.done
}

export async function store<T>(key: string, value: T, db: IDBPDatabase, storeName: string) {
  if (value) {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.put(value, key)
    await tx.done
  }
}

export async function read<T>(key: string, db: IDBPDatabase, storeName: string): Promise<T | null> {
  if (key) {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const handle = await store.get(key) as T
    await tx.done
    return handle
  }
  return null
}


export async function exportDataFromIndexedDB():Promise<string> {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open('fileHandlesDB', 1); // Database name: fileHandlesDB

      dbRequest.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(['handles'], 'readonly'); // Object store: handles
        const objectStore = transaction.objectStore('handles');

        const exportData: { key: IDBValidKey; value: any }[] = [];
        const cursorRequest = objectStore.openCursor();

        cursorRequest.onsuccess = (cursorEvent) => {
          // @ts-ignore
          const cursor = cursorEvent.target.result;
          if (cursor) {
            // Collect both key and value
            exportData.push({ key: cursor.key, value: cursor.value });
            cursor.continue();
          } else {
            // All data collected, return as JSON string
            const jsonData = JSON.stringify(exportData, null, 2); // Pretty print
            resolve(jsonData);
          }
        };

        cursorRequest.onerror = () => {
          reject('Error opening cursor.');
        };
      };

      dbRequest.onerror = () => {
        reject('Error opening database.');
      };
    });
  }

export async function importDataToIndexedDB(json: string) {

  console.log(json)
  // Parse the JSON string
  let jsonData: { key: IDBValidKey; value: any }[];
  try {
    jsonData = JSON.parse(json);
    if (!Array.isArray(jsonData)) {
      throw new Error('JSON string must represent an array of key-value objects.');
    }
  } catch (error) {
    console.error('Invalid JSON format:', error);
    return;
  }

  // Open the IndexedDB database
  const dbRequest = indexedDB.open('fileHandlesDB', 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    // Create the object store if not already present
    if (!db.objectStoreNames.contains('handles')) {
      db.createObjectStore('handles'); // No keyPath specified – keys will be manually added
    }
  };

  dbRequest.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    const transaction = db.transaction(['handles'], 'readwrite'); // Object store: handles
    const objectStore = transaction.objectStore('handles');

    // Insert all JSON objects into the object store
    jsonData.forEach((entry) => {
      const request = objectStore.put(entry.value, entry.key); // Add both key and value
      request.onerror = (err) => console.error('Error inserting data:', err);
      request.onsuccess = () => console.log(`Successfully inserted key: ${entry.key}`);
    });

    transaction.oncomplete = () => {
      console.log('JSON data imported successfully!');
    };

    transaction.onerror = () => {
      console.error('Transaction failed!');
    };
  };

  dbRequest.onerror = () => {
    console.error('Error opening database.');
  };
}
