import React from "react";
import { TouristInfo as TouristInfoType } from "../types/types";
import { Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  data: TouristInfoType;
}

const TouristInfoContent = ({ data }: Props) => {
  const restaurants = data.restaurants?.restaurants || [];
  const culturalProperties =
    data.cultural_properties?.cultural_properties || [];
  const events = data.events?.events || [];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          観光地情報
        </h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {data.tourist_info}
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          おすすめ飲食店
        </h2>
        <div className="space-y-4">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary-main mb-2">
                {restaurant.name}
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ジャンル:</span>
                  <span>{restaurant.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">予算:</span>
                  <span>
                    {restaurant.budget.name} (平均: {restaurant.budget.average})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary-main"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary-main"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{restaurant.tel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">営業時間:</span>
                  <span>{restaurant.open}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">設備:</span>
                  <span>
                    {restaurant.card && "カード可 "}
                    {restaurant.private_room && "個室あり "}
                    {restaurant.wifi && "Wi-Fiり "}
                    {restaurant.parking && "駐車場あり"}
                  </span>
                </div>
                <a
                  href={restaurant.urls?.pc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-primary-main hover:text-primary-dark underline"
                >
                  詳細を見る
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 文化財情報 */}
      {culturalProperties.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">
            文化財情報
          </h2>
          <div className="space-y-4">
            {culturalProperties.map((property, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold text-primary-main mb-2">
                  {property.name}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">分類:</span>{" "}
                    {property.category}
                  </p>
                  <p>
                    <span className="font-semibold">指定:</span>{" "}
                    {property.designation}
                  </p>
                  <p>
                    <span className="font-semibold">所在地:</span>{" "}
                    {property.address}
                  </p>
                  <p className="text-sm">{property.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* イベント情報 */}
      {events.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">
            開催予定のイベント
          </h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold text-primary-main mb-2">
                  {event.name}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">期間:</span>{" "}
                    {event.start_date} 〜 {event.end_date}
                  </p>
                  <p>
                    <span className="font-semibold">会場:</span> {event.venue}
                  </p>
                  <p>
                    <span className="font-semibold">カテゴリー:</span>{" "}
                    {event.category}
                  </p>
                  <p className="text-sm">{event.description}</p>
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-primary-main hover:text-primary-dark underline"
                    >
                      詳細を見る
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TouristInfo = ({ data }: Props) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TouristInfoContent data={data} />
    </Suspense>
  );
};
