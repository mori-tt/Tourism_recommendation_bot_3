import { useState, useEffect } from "react";

export function useSuspenseQuery<T>(promise: Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    promise
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
        }
      });

    return () => {
      mounted = false;
    };
  }, [promise]);

  if (error) throw error;
  if (!data) throw promise;

  return data;
}
