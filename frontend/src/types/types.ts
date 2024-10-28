export interface Restaurant {
  name: string;
  tel: string;
  address: string;
  access: string;
  budget: {
    code: string;
    name: string;
    average: string;
  };
  urls: {
    pc: string;
  };
}

export interface CulturalProperty {
  name: string;
  category: string;
  description: string;
  address: string;
  designation: string;
  designated_date: string;
}

export interface Event {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: string;
  category: string;
  url: string;
}

export interface TouristInfo {
  tourist_info: string;
  restaurants: {
    restaurants: Restaurant[];
  };
  cultural_properties?: {
    cultural_properties: CulturalProperty[];
  };
  events?: {
    events: Event[];
  };
}
