import React from 'react';
import { itineraries as mockItineraries } from './mock_itins';

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  departureDate: string;
  returnDate: string;
  departurePort: string;
  arrivalPort: string;
  portsOfCall: string[];
  imageUrl: string;
  shipName: string;
  amenities: string[];
}

export interface ItineraryPreview {
  id: number;
  title: string;
  price: number;
  duration: string;
  imageUrl: string;
}

// Update the suggestItineraryTool
export const suggestItineraryTool = {
  definition: {
    name: 'suggest_itinerary',
    description: 'Suggests one or two itineraries based on the given ID(s).',
    parameters: {
      type: 'object',
      properties: {
        itineraryIds: {
          type: 'array',
          items: {
            type: 'number',
          },
          description: 'The ID(s) of the itineraries to suggest (up to 2)',
          minItems: 1,
          maxItems: 2,
        },
      },
      required: ['itineraryIds'],
    },
  },

  handler: (setSelectedItineraries: React.Dispatch<React.SetStateAction<Itinerary[]>>) => {
    return async ({ itineraryIds }: { itineraryIds: number[] }) => {
      const suggestedItineraries = mockItineraries.filter(itinerary => itineraryIds.includes(itinerary.id));

      if (suggestedItineraries.length > 0) {
        setSelectedItineraries(suggestedItineraries);
        return { 
          ok: true, 
          message: `${suggestedItineraries.length} itinerary/itineraries suggested successfully`, 
          itineraries: suggestedItineraries 
        };
      } else {
        return { 
          ok: false, 
          message: 'No matching itineraries found', 
          itineraries: [] 
        };
      }
    };
  },
};

// You may want to add more tools here as needed for the itinerary app
