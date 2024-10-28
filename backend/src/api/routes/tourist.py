from fastapi import APIRouter
from pydantic import BaseModel
from ...services.tourist_service import TouristService
from ...services.restaurant_service import RestaurantService
from ...services.cultural_property_service import CulturalPropertyService
from ...services.event_service import EventService

router = APIRouter()

class TouristRequest(BaseModel):
    area_name: str

@router.post("/tourist-info")
async def get_tourist_info(request: TouristRequest):
    tourist_service = TouristService()
    restaurant_service = RestaurantService()
    cultural_property_service = CulturalPropertyService()
    event_service = EventService()

    tourist_info = await tourist_service.get_tourist_info(request.area_name)
    restaurants = await restaurant_service.get_restaurants(request.area_name)
    cultural_properties = await cultural_property_service.get_cultural_properties(request.area_name)
    events = await event_service.get_events(request.area_name)

    return {
        "tourist_info": tourist_info,
        "restaurants": restaurants,
        "cultural_properties": cultural_properties,
        "events": events
    }
