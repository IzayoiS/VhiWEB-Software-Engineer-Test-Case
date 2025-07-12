const products = []; // Mock database

export const getProducts = (req, res) => {
  const userProducts = products.filter((p) => p.owner === req.user.username);
  res.json(userProducts);
};

export const addProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || !price)
    return res.status(400).json({ message: "Missing fields" });
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    owner: req.user.username,
  };
  products.push(newProduct);
  res.json(newProduct);
};

export const updateProduct = (req, res) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id) && p.owner === req.user.username
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  const { name, price } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  res.json(product);
};

export const deleteProduct = (req, res) => {
  const index = products.findIndex(
    (p) => p.id === parseInt(req.params.id) && p.owner === req.user.username
  );
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.json({ message: "Deleted successfully" });
};
