import { useEffect, useState, useMemo } from "react";
import { db, ref, get, child } from "assets/firebase/firebase";
import debounce from "lodash.debounce";

export const useWatchDatabase = (path: string, value: string) => {
  const [isValueExists, setIsValueExists] = useState(false);

  const getValue = async () => {
    const reference = get(child(ref(db), path));
    reference
      .then((snapshot) => {
        if (value === "") return;
        if (snapshot.exists()) {
          setIsValueExists(true);
        } else {
          setIsValueExists(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const debouncedFunction = useMemo(() => debounce(getValue, 500), [value]);

  useEffect(() => {
    debouncedFunction();
    return () => debouncedFunction.cancel();
  }, [debouncedFunction]);

  return isValueExists;
};
