require("dotenv").config();

const productData = require("./data/products");
const { connectDB } = require("./config/db");
const Product = require("./models/Product");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB(); // Wait for DB to connect
  await importData(); // Then run import
};

run();

// importData();
