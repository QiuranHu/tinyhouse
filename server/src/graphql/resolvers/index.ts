import merge from "lodash.merge";
import { bookingResolvers } from "./Booking";
import { viewerResolvers } from "./Viewer";
import { userResolvers } from "./User";
import { listingResolvers } from "./Listing";

export const resolvers = merge(
  listingResolvers,
  userResolvers,
  viewerResolvers,
  bookingResolvers
);
