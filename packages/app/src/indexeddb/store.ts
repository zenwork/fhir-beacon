import {IDBPDatabase} from 'idb'



export async function store<T>(key: string, value: T, db: IDBPDatabase, storeName: string) {
  if (value) {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.put(value, key)
    await tx.done
  }
}
