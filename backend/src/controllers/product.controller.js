import { prisma } from '../config/db.js';

// Seed demo products if empty
const DEMO_PRODUCTS = [
  {
    id: "p-1",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium spatial audio with ultra-long 40h battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    stock: 25
  },
  {
    id: "p-2",
    name: "Minimalist Mechanical Keyboard",
    description: "Custom hot-swappable switches with RGB backlight and aluminum frame.",
    price: 129.50,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    stock: 14
  },
  {
    id: "p-3",
    name: "Organic Roast Coffee Beans (1kg)",
    description: "Freshly roasted single-origin artisan coffee beans.",
    price: 24.99,
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
    stock: 50
  },
  {
    id: "p-4",
    name: "Leather Minimalist Backpack",
    description: "Handcrafted water-resistant commuter bag with 16-inch laptop pocket.",
    price: 89.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    stock: 8
  },
  {
    id: "p-5",
    name: "Matte Ceramic Planter Pot",
    description: "Modern minimalist interior planter with matching drainage tray.",
    price: 34.00,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80",
    stock: 19
  },
  {
    id: "p-6",
    name: "Analog Bauhaus Classic Watch",
    description: "Sleek stainless steel timepiece with genuine sapphire glass.",
    price: 159.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    stock: 12
  }
];

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    
    // Return sample list + DB products if configured
    let products = [...DEMO_PRODUCTS];

    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (minPrice) {
      products = products.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => p.price <= parseFloat(maxPrice));
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
