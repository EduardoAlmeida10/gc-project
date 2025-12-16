const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", ItemSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js API!");
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(201).json({
      message: "Item added successfully!",
      item: newItem,
    });
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
