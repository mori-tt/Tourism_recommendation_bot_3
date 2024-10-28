from typing import Optional, Dict, List
import httpx
from ..core.config import get_settings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import json

class RestaurantService:
    def __init__(self):
        self.settings = get_settings()
        self.base_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
        self.station_base_url = "http://webservice.recruit.co.jp/hotpepper/station/v1/"
        self.llm = ChatOpenAI(
            openai_api_key=self.settings.OPENAI_API_KEY,
            temperature=0.7,
            model="gpt-3.5-turbo-0125"
        )
    
    async def get_nearest_station(self, area_name: str) -> Optional[str]:
        params = {
            "key": self.settings.HOT_PEPPER_API,
            "keyword": area_name,
            "format": "json",
            "type": "lite"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.base_url, params=params)
                data = response.json()
                
                if "results" not in data or not data["results"]["shop"]:
                    return None
                
                first_shop = data["results"]["shop"][0]
                if "station_name" in first_shop:
                    return first_shop["station_name"]
                
                return None
        except Exception as e:
            print(f"Error getting station: {e}")
            return None

    async def get_web_recommendations(self, area_name: str) -> List[Dict]:
        prompt = ChatPromptTemplate.from_template(
            """以下の地域の人気店を3つ程度、以下の形式でJSON形式で出力してください：
            {{
                "recommendations": [
                    {{
                        "name": "店舗名",
                        "genre": "ジャンル",
                        "famous_menu": "人気メニュー",
                        "highlights": "特徴や人気の理由（100文字程度）"
                    }}
                ]
            }}
            地域名：{area_name}"""
        )
        chain = prompt | self.llm
        response = await chain.ainvoke({"area_name": area_name})
        return json.loads(response.content)["recommendations"]

    async def get_restaurants(self, area_name: str) -> Optional[Dict[str, List[Dict]]]:
        genres = {"ラーメン": "G013", "和食": "G004"}
        all_restaurants = {}
        
        try:
            async with httpx.AsyncClient() as client:
                for genre_name, genre_code in genres.items():
                    params = {
                        "key": self.settings.HOT_PEPPER_API,
                        "keyword": area_name,
                        "genre": genre_code,
                        "large_area": "Z011",
                        "order": 4,
                        "count": 5,
                        "format": "json"
                    }
                    
                    response = await client.get(self.base_url, params=params)
                    data = response.json()
                    
                    if "results" in data and "shop" in data["results"]:
                        shops = data["results"]["shop"]
                        results = []
                        
                        for shop in shops:
                            restaurant_info = {
                                "name": shop["name"],
                                "address": shop["address"],
                                "access": shop.get("access", ""),
                                "tel": shop.get("tel", "電話番号非公開"),
                                "genre": genre_name,
                                "budget": {
                                    "name": shop.get("budget", {}).get("name", "予算情報なし"),
                                    "average": shop.get("budget", {}).get("average", "不明"),
                                },
                                "urls": shop.get("urls", {"pc": "#"}),
                                "photo": shop.get("photo", {}),
                                "open": shop.get("open", "営業時間情報なし"),
                                "close": shop.get("close", ""),
                                "catch": shop.get("catch", ""),
                                "card": shop.get("card", ""),
                                "capacity": shop.get("capacity", ""),
                                "private_room": shop.get("private_room", ""),
                                "wifi": shop.get("wifi", ""),
                                "parking": shop.get("parking", "")
                            }
                            results.append(restaurant_info)
                        
                        all_restaurants[genre_name] = results
                    else:
                        print(f"No {genre_name} shops found in API response.")
                        all_restaurants[genre_name] = []
                    
                return {
                    "restaurants": [
                        restaurant
                        for genre_results in all_restaurants.values()
                        for restaurant in genre_results
                    ]
                }
                
        except Exception as e:
            print(f"Error getting restaurants: {e}")
            return {
                "restaurants": []
            }

    def get_tel_number(self, shop):
        # 優先順位: tel_sub > tel > mobile_phone
        return shop.get("tel_sub") or shop.get("tel") or shop.get("mobile_phone") or "電話番号なし"
