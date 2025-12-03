export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Fetch products from Laravel API - NO FALLBACK, ONLY REAL API DATA
export const getProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log('API Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Products endpoint not found. Please check if the Laravel API is running.');
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Please check CORS configuration.');
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const rawProducts = await response.json();
    console.log('Raw products from API:', rawProducts);
    
    // Validate that we received an array
    if (!Array.isArray(rawProducts)) {
      throw new Error('Invalid response format: expected an array of products');
    }
    
    // Validate and convert products
    const products: Product[] = rawProducts.map((product: any, index: number) => {
      // Validate required fields
      if (!product.id || !product.name || product.price === undefined) {
        console.warn(`Invalid product at index ${index}:`, product);
        throw new Error(`Invalid product data received from API`);
      }
      
      return {
        id: Number(product.id),
        name: String(product.name),
        description: String(product.description || ''),
        price: parseFloat(product.price),
        image_url: String(product.image_url || '')
      };
    });
    
    console.log(`Successfully loaded ${products.length} products from API`);
    return products;
    
  } catch (error) {
    console.error('Error fetching products from API:', error);
    
    // Enhanced error handling - NO FALLBACK DATA
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the API server. Please ensure the Laravel server is running on port 8000.');
    } else if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection and try again.');
    } else if (error instanceof Error) {
      throw error; // Re-throw the specific error
    } else {
      throw new Error('An unexpected error occurred while loading products.');
    }
  }
};

// Health check function to verify API connectivity
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    return response.ok;
  } catch {
    return false;
  }
};
