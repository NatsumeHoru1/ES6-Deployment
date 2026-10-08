export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A comfortable and stylish everyday t-shirt.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
    category: "Clothing"
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Durable and classic blue denim jeans.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=60",
    category: "Clothing"
  },
  {
    id: 3,
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots.",
    price: 29.50,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Running Sneakers",
    description: "Lightweight sneakers perfect for jogging or walking.",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
    category: "Footwear"
  },
  {
    id: 5,
    name: "Sunglasses",
    description: "UV-protected stylish sunglasses for summer.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Coffee Mug",
    description: "Ceramic coffee mug with a minimalist design.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=60",
    category: "Home"
  }
];
