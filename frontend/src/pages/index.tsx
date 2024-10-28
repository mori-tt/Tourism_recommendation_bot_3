import { SearchForm } from "../components/SearchForm";
import { TouristInfo } from "../components/TouristInfo";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useTouristInfo } from "../hooks/useTouristInfo";

export default function Home() {
  const { data, loading, error, fetchTouristInfo } = useTouristInfo();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        東京観光情報ボット
      </h1>

      <div className="mb-8">
        <SearchForm onSearch={fetchTouristInfo} isLoading={loading} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? <LoadingSpinner /> : data && <TouristInfo data={data} />}
    </div>
  );
}
