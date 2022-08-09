import { db, set, ref, update, push, remove } from "assets/firebase/firebase";
import { DatabaseReference } from "firebase/database";

export const setDatabase = <T>(refer: string, data: T) => {
  return set(ref(db, refer), {
    ...data,
  });
};

export const updateDatabase = <T>( updates: {[key: string]: T}) => {
  return update(ref(db), updates);
};

export const pushDatabase = <T>(refer: string, data: T) => {
  return push(ref(db, refer), {
    ...data
  })
}

export const removeLocation = (refer: string) => {
  return remove(ref(db, refer))
}