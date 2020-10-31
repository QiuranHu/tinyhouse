export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface ListingsData {
  listings: Listing[];
}

// Data returned from GraphQL mutation, this interface is corresponding to the deleteListing field.
export interface DeleteListingData {
  deleteListing: Listing;
}

// The argument passed to deleteListing mutation.
export interface DeleteListingVariables {
  id: string;
}
