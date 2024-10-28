from typing import Optional, Dict, List
import httpx
from datetime import datetime, timedelta
from ..core.config import get_settings
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import json

class EventService:
    def __init__(self):
        self.settings = get_settings()
        self.llm = ChatOpenAI(
            openai_api_key=self.settings.OPENAI_API_KEY,
            temperature=0.7,
            model="gpt-3.5-turbo-0125"
        )
        
    async def get_events(self, area_name: str):
        prompt = ChatPromptTemplate.from_template(
            """以下の地域で毎年定期的に開催される伝統的な祭りやイベントを2-3個、以下の形式でJSON形式で出力してください：
            {{
                "events": [
                    {{
                        "name": "イベント名",
                        "description": "100文字程度の説明",
                        "start_date": "開催時期（月日）",
                        "end_date": "終了時期（月日）",
                        "venue": "開催場所",
                        "category": "祭り、伝統行事、イベントなど",
                        "url": "公式サイトのURL（ない場合はnull）"
                    }}
                ]
            }}
            地域名：{area_name}"""
        )
        chain = prompt | self.llm
        response = await chain.ainvoke({"area_name": area_name})
        return json.loads(response.content)
