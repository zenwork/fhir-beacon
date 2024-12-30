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
