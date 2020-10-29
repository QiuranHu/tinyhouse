// Our goal is to export a funciton when run will make the connection with the database.
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
  const db = client.db("main"); // Access the main database.
  return {
    listings: db.collection("test_listings"), // Get the test_listings collection under the main database.
  };
};
