const express = require("express");

const app = express();
app.use(express.json());

// In-memory data
let suppliers = [];
let inventory = [];

// Add supplier
app.post("/supplier", (req, res) => {
  const { id, name, city } = req.body;
  suppliers.push({ id, name, city });
  res.json({ message: "Supplier added" });
});

// Add inventory
app.post("/inventory", (req, res) => {
  const { id, supplier_id, product_name, quantity, price } = req.body;

  // Validation
  const supplier = suppliers.find(s => s.id === supplier_id);
  if (!supplier) {
    return res.status(400).json({ error: "Invalid supplier" });
  }

  if (quantity < 0 || price <= 0) {
    return res.status(400).json({ error: "Invalid quantity or price" });
  }

  inventory.push({ id, supplier_id, product_name, quantity, price });
  res.json({ message: "Inventory added" });
});

// Get inventory grouped by supplier
app.get("/inventory", (req, res) => {
  let result = suppliers.map(s => {
    let items = inventory.filter(i => i.supplier_id === s.id);

    let totalValue = items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    return {
      supplier: s.name,
      totalValue,
      items
    };
  });

  // Sort by total value descending
  result.sort((a, b) => b.totalValue - a.totalValue);

  res.json(result);
});

app.listen(6000, () => console.log("B-database running on 6000"));