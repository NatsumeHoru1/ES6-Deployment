export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic White T-Shirt",
    description: "A comfortable and stylish everyday t-shirt.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "p2",
    name: "Denim Jeans",
    description: "Durable and classic blue denim jeans.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "p3",
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots.",
    price: 29.50,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "p4",
    name: "Running Sneakers",
    description: "Lightweight sneakers perfect for jogging or walking.",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "p5",
    name: "Sunglasses",
    description: "UV-protected stylish sunglasses for summer.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "p6",
    name: "Coffee Mug",
    description: "Ceramic coffee mug with a minimalist design.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=60"
  }
];
