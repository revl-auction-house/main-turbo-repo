/**
 * Mongo free-tier does not support creating indexes using mongo driver
 * so need to use the Atlas API to create indexes
 */
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
// const db = client.db(process.env.DB_NAME);

const index = {
  //   name: "collectionSearch",
  collectionName: "collectionDetails",
  database: "revl-dev", //process.env.DB_NAME,
  /* search index definition fields */
  mappings: {
    dynamic: true,
    // fields: {
    //   description: {
    //     type: "string",
    //     analyzer: "lucene.standard",
    //     searchAnalyzer: "lucene.standard",
    //   },
    //   name: {
    //     type: "string",
    //     analyzer: "lucene.standard",
    //     searchAnalyzer: "lucene.standard",
    //     autocomplete: true,
    //   },
    // },
  },
  name: "default",
};

try {
  const res = await axios.post(
    `https://cloud.mongodb.com/api/atlas/v1.0/groups/6556a92a95c0237c8b3b7618/clusters/devDB/fts/indexes?pretty=true`,
    index,
    {
      auth: {
        username: "roqpqxtw", //process.env.ATLAS_PUBLIC_KEY!,
        password: "66eb71e8-1f36-4ff7-b383-c5c03bd13e8f", //process.env.ATLAS_PRIVATE_KEY!,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Successfully started index creation for collectionDetails", res);
} catch (e) {
  console.error("Error creating index");
}

// curl --user "roqpqxtw:66eb71e8-1f36-4ff7-b383-c5c03bd13e8f" --digest \
//      --header "Content-Type: application/json" \
//      --include \
//      --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/6556a92a95c0237c8b3b7618/clusters/devDB/fts/indexes?pretty=true" \
//      --data '{
//          "collectionName": "collectionDetails",
//          "database": "revl-dev",
//          "mappings": {
//              "dynamic": true
//          },
//          "name": "default"
//        }'
