const mongoose = require("mongoose");
const mongoURI =
  "mongodb://root:root@ac-qi6ppbl-shard-00-00.02n5kit.mongodb.net:27017,ac-qi6ppbl-shard-00-01.02n5kit.mongodb.net:27017,ac-qi6ppbl-shard-00-02.02n5kit.mongodb.net:27017/Foodies?ssl=true&replicaSet=atlas-tfp3cf-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    const fetched_data = mongoose.connection.db.collection("fooddata");
    const data = await fetched_data.find({}).toArray();
    const foodCategory=mongoose.connection.db.collection("foodcategory")
    const cdata=await foodCategory.find({}).toArray();
    
    global.food_items = data;
    global.foodCategory=cdata;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = mongoDB;
