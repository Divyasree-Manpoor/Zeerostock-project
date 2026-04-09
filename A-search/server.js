const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 50000 },
  { id: 2, name: "Mobile", category: "Electronics", price: 20000 },
  { id: 3, name: "Chair", category: "Furniture", price: 2000 },
  { id: 4, name: "Table", category: "Furniture", price: 3000 },
  { id: 5, name: "Shoes", category: "Fashion", price: 1500 }
];

app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;
  let result = products;

  if (q) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  res.json(result);
});

app.listen(5000, () => console.log("A-search running on 5000"));