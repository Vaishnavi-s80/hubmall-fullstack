import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingBag, Star, Filter } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Groceries', 'Home & Living'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'All' 
        ? '/api/products' 
        : `/api/products?category=${selectedCategory}`;
      const res = await axios.get(url);
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold tracking-wide">
            ⚡ All-in-One Multi-Vendor Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Quality Goods from Independent Vendors.
          </h1>
          <p className="text-indigo-200 text-base sm:text-lg max-w-2xl mx-auto">
            Shop directly from trusted independent creators, designers, and merchants all across HubMall.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mt-6">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, brands, essentials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-900 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-lg font-bold text-slate-700">No products found</p>
              <p className="text-sm text-slate-500">Try changing your search term or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold text-slate-700 px-2.5 py-1 rounded-md shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Price</span>
                        <span className="text-xl font-extrabold text-slate-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => addItem(product)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-indigo-100"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
