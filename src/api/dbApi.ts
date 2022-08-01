import { db, set, ref, update, push } from "assets/firebase/firebase";

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