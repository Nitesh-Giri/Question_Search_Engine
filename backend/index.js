import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import questionSearch from "./routes/Question.route.js";
import cors from 'cors'

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

const dataSchema = new mongoose.Schema({
  type: String,
  siblingId: String,
  title: String,
  anagramType: String,
  solution: String,
  blocks: Array,
});

const Data = mongoose.model('Data', dataSchema);

try {
  await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to database");
} catch (error) {
  console.log("Database connection error: ", error);
}

//cors
const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials
};

app.use(cors(corsOptions));


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//api
app.use("/api/v1", questionSearch);

app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/data/:type", async (req, res) => {
  try {
    const data = await Data.find({ type: { $regex: new RegExp(req.params.type, "i") } });
    if (data.length === 0) {
      return res.status(404).json({ error: "No data found for the given type" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});