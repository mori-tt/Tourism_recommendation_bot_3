import { use } from "react";

export function useAsyncData<T>(promise: Promise<T>) {
  return use(promise);
}
