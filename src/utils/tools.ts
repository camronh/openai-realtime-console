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
    description: 'Suggests an itinerary based on the given ID.',
    parameters: {
      type: 'object',
      properties: {
        itineraryId: {
          type: 'number',
          description: 'The ID of the itinerary to suggest',
        },
      },
      required: ['itineraryId'],
    },
  },

  handler: (setSelectedItinerary: React.Dispatch<React.SetStateAction<Itinerary | null>>) => {
    return async ({ itineraryId }: { itineraryId: number }) => {
      // Find the itinerary with the matching ID
      const suggestedItinerary = mockItineraries.find(itinerary => itinerary.id === itineraryId);

      if (suggestedItinerary) {
        // Set the selected itinerary to render it in the utility pane
        setSelectedItinerary(suggestedItinerary);
        return { 
          ok: true, 
          message: 'Itinerary suggested successfully', 
          itinerary: suggestedItinerary 
        };
      } else {
        return { 
          ok: false, 
          message: 'Itinerary not found', 
          itinerary: null 
        };
      }
    };
  },
};

// You may want to add more tools here as needed for the itinerary app
