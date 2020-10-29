// Our goal is to export a funciton when run will make the connection with the database.
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const user = "qiuran";
const userPassword = "XXX";
const cluster = "XXX";
const databaseName = "main";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
  const db = client.db("main"); // Access the main database.
  return {
    listings: db.collection("test_listings"), // Get the test_listings collection under the main database.
  };
};
