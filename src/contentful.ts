// src/contentful.js
import { createClient } from "contentful";

const client = createClient({
  space: "YOUR_SPACE_ID",
  accessToken: "YOUR_ACCESS_TOKEN", // Content Delivery API token
});

export default client;
