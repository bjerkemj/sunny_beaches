const express = require("express");
const AWS = require("aws-sdk");
require("dotenv").config();

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "ap-southeast-2",
});

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "tauro-cab432-yoyo";
const objectKey = "text.json";

// Define a route that accepts latitude and longitude as parameters
router.get("/", async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const data = await s3.getObject(params).promise();
    // Parse JSON content
    const parsedData = JSON.parse(data.Body.toString("utf-8"));

    if(parsedData.counter === undefined) {
        throw new Error("Counter is undefined");
    }

    const newData = {
        ...parsedData,
        counter: parsedData.counter + 1,
      };
          
    const params_update = {
      Bucket: bucketName,
      Key: objectKey,
      Body: JSON.stringify(newData), // Convert JSON to string
      ContentType: "application/json", // Set content type
    };
    
    await s3.putObject(params_update).promise();
    
    res.status(200).json(newData);

  } catch (error) {
    // Handle any errors that occur during the calculation
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
