import {IDBPDatabase} from 'idb'



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
