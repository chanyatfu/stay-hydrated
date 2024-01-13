import Loki, { Collection } from 'lokijs';
import { useState } from "react";

export let db = new Loki('dailyData.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

export let dailyCollection: Collection<any>;

function databaseInitialize() {
  dailyCollection = db.getCollection('daily');
  if (dailyCollection === null) {
    dailyCollection = db.addCollection('daily');
  }
}
