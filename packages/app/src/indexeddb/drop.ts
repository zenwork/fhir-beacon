import {IDBPDatabase} from 'idb'



export async function drop(db: IDBPDatabase, storeName: string) {
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.clear()
  await tx.done
}
