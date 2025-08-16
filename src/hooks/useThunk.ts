import { useCallback, useState } from "react";
import { useAppDispatch } from "./hooks";
import type { thunkType } from "../store/thunks/userThunk";

const useThunk = (
  thunk: thunkType
): [() => Promise<void>, boolean, string | null] => {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const runThunk = useCallback(async () => {
    setIsloading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsloading(false));
  }, [dispatch, thunk]);

  return [runThunk, isloading, error];
};

export { useThunk };
