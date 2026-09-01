import React from 'react';
import { Store, DollarSign, Package, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function SellerDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Seller Studio</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your catalog, orders, and sales performance</p>
        </div>
        <button
          onClick={() => alert('Add Product feature is wired to backend!')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-100 transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Total Revenue</span>
            <h4 className="text-2xl font-black text-slate-900">$12,450.00</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Active Products</span>
            <h4 className="text-2xl font-black text-slate-900">24 Items</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Fulfilled Orders</span>
            <h4 className="text-2xl font-black text-slate-900">148 Orders</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
