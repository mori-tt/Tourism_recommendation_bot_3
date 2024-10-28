import { useState } from "react";
import { TouristInfo } from "../types/types";
import { touristApi } from "../services/api";

export const useTouristInfo = () => {
  const [data, setData] = useState<TouristInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTouristInfo = async (areaName: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await touristApi.getTouristInfo(areaName);
      setData(result);
    } catch (err) {
      setError("情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchTouristInfo };
};
