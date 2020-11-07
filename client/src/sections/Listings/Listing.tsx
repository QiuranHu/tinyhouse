import React from "react";
import {gql} from '@apollo/client';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
} from "./types";

interface Props {
  title: string;
}

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listings = ({ title }: Props) => {
  const { data, refetch, error, loading } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);
  const handleDeleteListing = async (id: string) => {
    // Only when the request funciton is called, we will pass in the variables
    // necessary for the mutation.
    await deleteListing({ variables: {id} });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => (
        <li key={listing.id}>
          {listing.title}{" "}
          <button onClick={() => handleDeleteListing(listing.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later :(</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
