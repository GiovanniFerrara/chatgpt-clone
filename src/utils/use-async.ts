import { useCallback, useReducer, useRef } from "react";
import useSafeDispatch from "./use-safe-dispatch";

enum AsyncStatus {
  idle = "idle",
  resolved = "resolved",
  rejected = "rejected",
  pending = "pending",
}

type State<Data = Record<string, unknown>> = {
  data?: Data | null;
  isLoading?: boolean;
  error?: Error | null;
  status?: AsyncStatus;
};

const defaultInitialState = {
  status: AsyncStatus.idle,
  data: null,
  error: null,
};

function useAsync<Data>(initialState?: State<Data>) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer(
    (state: State<Data>, action: State<Data>) => ({
      ...state,
      ...action,
    }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (newData: unknown) => safeSetState({ data: newData, status: AsyncStatus.resolved }),
    [safeSetState]
  );

  const setError = useCallback(
    (newError: unknown) =>
      safeSetState({ error: newError, status: AsyncStatus.rejected }),
    [safeSetState]
  );

  const reset = useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = useCallback(
    (promise: Promise<unknown>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise.`
        );
      }

      safeSetState({ status: AsyncStatus.pending });
      return promise.then(
        (newData: unknown) => {
          setData(newData);
          return newData;
        },
        (newError: Error) => {
          setError(newError);
          return Promise.reject(newError);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === AsyncStatus.idle,
    isLoading: status === AsyncStatus.pending,
    isError: status === AsyncStatus.rejected,
    isSuccess: status === AsyncStatus.resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
