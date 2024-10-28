from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from ..core.config import get_settings

class TouristService:
    def __init__(self):  # db_sessionパラメータを削除
        self.settings = get_settings()
        self.llm = ChatOpenAI(
            openai_api_key=self.settings.OPENAI_API_KEY,
            temperature=0.7,
            model="gpt-3.5-turbo-0125"
        )
        
    async def get_tourist_info(self, area_name: str):
        prompt = ChatPromptTemplate.from_template(
            "以下の地域の観光地としての特徴を200文字程度で説明してください：{area_name}"
        )
        chain = prompt | self.llm
        response = await chain.ainvoke({"area_name": area_name})
        return response.content
