import React from "react";
import { server } from "../../lib/api";

interface Props {
  title: string;
}

const LISTINGS = `
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
export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const listings = await server.fetch({ query: LISTINGS });
    console.log(listings);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
    </div>
  );
};
