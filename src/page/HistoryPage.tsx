import { useEffect, useState } from "react";
import { useDatabase } from "../database";
import { useStore } from "../stores/root-store";
import { Box, Text } from "ink";
import { getTotalVolume, formatNumberToLiter } from "../helpers";

function getDate7DaysAgo() {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 7);
  return pastDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
}

type DatabaseEntry = {
  date: string;
  store: {
    volumes: number[];
    maxVolume: number;
    remainingVolume: number;
    waterPerHours: number;
    isSettingVolume: false;
    quote: string;
    isSoundOn: boolean;
    dailyTarget: number;
  };
  meta: {
    revision: number;
    created: number;
    version: number;
    updated: number;
  };
  $loki: number;
};

export default function HistoryPage() {
  const { store } = useStore();
  const { isDatabaseLoaded, db, dailyCollection } = useDatabase();
  const [recentEntries, setRecentEntries] = useState<DatabaseEntry[]>([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Save data to the database whenever the store changes
    if (!isDatabaseLoaded || !dailyCollection) return;
    const date7DaysAgo = getDate7DaysAgo();
    setRecentEntries(dailyCollection.find({ date: { $gte: date7DaysAgo } }));

    if (db) {
      db.saveDatabase();
    }
  }, [store, isDatabaseLoaded, dailyCollection]);

  return (
    <>
      <Box flexDirection="column" rowGap={1}>
        {recentEntries.length === 0 ? (
          <Box>
            <Text>No data available</Text>
          </Box>
        ) : (
          <Box>
            <Text>Recent 7 days</Text>
          </Box>
        )}
        {recentEntries.map((entry, index) => (
          <Box flexBasis="row" columnGap={4} key={index}>
            <Box>
              <Text>{entry.date === today ? "Today".padEnd(11) : entry.date.padEnd(11)}</Text>
            </Box>
            <Box>
              <Text>
                {formatNumberToLiter(getTotalVolume(entry.store.volumes))}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
