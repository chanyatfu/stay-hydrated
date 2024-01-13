import Loki, { Collection } from 'lokijs';
import { useState, useEffect, createContext, useContext } from 'react';

const DatabaseContext = createContext({
  isDatabaseLoaded: false,
  db: null as Loki | null,
  dailyCollection: null as Collection<any> | null,
});

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDatabaseLoaded, setIsDatabaseLoaded] = useState(false);
  const [db, setDb] = useState<Loki | null>(null);
  const [dailyCollection, setDailyCollection] = useState<Collection<any> | null>(null);

  useEffect(() => {
    const localDb = new Loki('dailyData.db', {
      autoload: true,
      autoloadCallback: () => {
        let collection = localDb.getCollection('daily');
        if (!collection) {
          collection = localDb.addCollection('daily');
        }
        setDailyCollection(collection);
        setDb(localDb);
        setIsDatabaseLoaded(true);
      },
      autosave: true,
      autosaveInterval: 4000
    });
  }, []);

  return (
    <DatabaseContext.Provider value={{ isDatabaseLoaded, db, dailyCollection }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
