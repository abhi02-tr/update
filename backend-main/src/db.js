import mongo from "mongodb";
const { MongoClient } = mongo;

// Create Client
export const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

// CODE for connet to DB

export const connectDb = async () => {
  try {
    // Connect to client
    client.connect();
    console.log("Connected To DB 💾");

    // Confirm Connection and check is there admin
    //if yes then do ping
  } catch (error) {
    console.error(error);
    client.close();
  }
};

export const spectrum = client.db("spectrum-test");
export const campaign = spectrum.collection("campaign");
export const session = spectrum.collection("session");
