import json
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from ..core.config import get_settings

class CulturalPropertyService:
    def __init__(self):
        self.settings = get_settings()
        self.llm = ChatOpenAI(
            openai_api_key=self.settings.OPENAI_API_KEY,
            temperature=0.7,
            model="gpt-3.5-turbo-0125"
        )
        
    async def get_cultural_properties(self, area_name: str):
        prompt = ChatPromptTemplate.from_template(
            """以下の地域にある重要な文化財を3つ程度、以下の形式でJSON形式で出力してください：
            {{
                "cultural_properties": [
                    {{
                        "name": "文化財名",
                        "category": "種別（建造物、美術品、史跡など）",
                        "description": "100文字程度の説明",
                        "address": "所在地",
                        "designation": "国宝、重要文化財などの指定区分",
                        "designated_date": "指定年月日"
                    }}
                ]
            }}
            地域名：{area_name}"""
        )
        chain = prompt | self.llm
        response = await chain.ainvoke({"area_name": area_name})
        return json.loads(response.content) 