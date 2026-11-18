
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const SystemDesign = require('./models/SystemDesign.js')
const systemDesignData = require("./data/SystemDesignData.js")


dotenv.config();

const seedSystemDesign = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const topic of systemDesignData) {
      await SystemDesign.findOneAndUpdate(
        { slug: topic.slug },
        topic,
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );
    }

    console.log("System Design topics added successfully!");

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Seeding error:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedSystemDesign();
