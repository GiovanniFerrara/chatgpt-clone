import {
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

export default function useSafeDispatch(
  dispatch: Dispatch<unknown> | SetStateAction<unknown>
) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (...arg: unknown[]) =>
      mounted.current && typeof dispatch === "function"
        ? dispatch(...arg)
        : void 0,
    [dispatch]
  );
}
