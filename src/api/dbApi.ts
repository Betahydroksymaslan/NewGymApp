import {db, set, ref } from 'assets/firebase/firebase';

export const setDatabase = <T>(refer: string, data: T) => {
    return set(ref(db, refer), {
        ...data 
    })
}