import React, { useState } from "react";

interface Props {
  onSearch: (areaName: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: Props) => {
  const [areaName, setAreaName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaName.trim()) {
      onSearch(areaName);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          placeholder="地名を入力してください"
          className="input-field"
        />
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "検索中..." : "検索"}
        </button>
      </form>
    </div>
  );
};
