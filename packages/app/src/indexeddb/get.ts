import {IDBPDatabase, openDB} from 'idb'



export async function getDB(dbName: string, storeName: string) {
  const db: IDBPDatabase = await openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName)
    }
  })
  return db
}
