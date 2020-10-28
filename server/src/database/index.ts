// Our goal is to export a funciton when run will make the connection with the database.
import { MongoClient } from "mongodb";

const user = "qiuran";
const userPassword = "XXX";
const cluster = "XXX";
const databaseName = "main";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true });
  const db = client.db("main");
  return {
    listings: db.collection("test_listings"),
  };
};
