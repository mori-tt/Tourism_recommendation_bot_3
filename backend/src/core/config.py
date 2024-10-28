from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "東京観光情報ボット"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    OPENAI_API_KEY: str
    HOT_PEPPER_API: str
    USER_AGENT: str = "TourismBot/1.0"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/tourism"
    CORS_ORIGINS: list = ["http://localhost:3000"]
    CULTURAL_PROPERTY_API_KEY: str | None = None
    TOKYO_EVENT_API_KEY: str | None = None
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings():
    return Settings()
