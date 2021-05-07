import { ClientSession, CollectionBase } from 'mongoose'

type MongoConnection = {
  client: ClientSession | null;
  db: CollectionBase;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache: {
        conn:  MongoConnection | null;        
        promise: Promise<MongoConnection> | null;
      };
    }
  }
}