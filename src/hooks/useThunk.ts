import { useCallback, useState } from "react";
import { useAppDispatch } from "./hooks";
import type { AsyncThunk } from "@reduxjs/toolkit";

export function useThunk<R, RV>(
  thunk: AsyncThunk<R, void, { rejectValue: RV }>
): [() => Promise<R>, boolean, RV | null];

export function useThunk<R, A, RV>(
  thunk: AsyncThunk<R, A, { rejectValue: RV }>
): [(arg: A) => Promise<R>, boolean, RV | null];

export function useThunk<R, A, RV>(
  thunk: AsyncThunk<R, A, { rejectValue: RV }>
) {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<RV | null>(null);

  // helper call types with NO `any`
  type ThunkNoArg = () => ReturnType<typeof thunk>;
  type ThunkWithArg = (arg: A) => ReturnType<typeof thunk>;

  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    async (arg?: A) => {
      const action =
        arg === undefined
          ? (thunk as unknown as ThunkNoArg)()
          : (thunk as unknown as ThunkWithArg)(arg);

      setIsloading(true);
      dispatch(action)
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsloading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isloading, error];
}
