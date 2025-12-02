export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Mock data - replace with actual API calls when Laravel backend is ready
export const getMockProducts = (): Product[] => {
  return [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation and premium sound.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Advanced fitness tracking with heart rate monitoring and GPS.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    {
      id: 3,
      name: "Minimalist Desk Lamp",
      description: "Modern LED desk lamp with adjustable brightness and USB charging.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      description: "Handcrafted ceramic mugs perfect for your morning coffee routine.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&q=80"
    },
    {
      id: 6,
      name: "Bluetooth Portable Speaker",
      description: "Compact wireless speaker with powerful sound and long battery life.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
    }
  ];
};

// Future API integration functions
export const fetchProducts = async (): Promise<Product[]> => {
  // TODO: Replace with actual Laravel API call
  // const response = await fetch('http://localhost:8000/api/products');
  // return response.json();
  return getMockProducts();
};