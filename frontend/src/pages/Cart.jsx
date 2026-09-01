import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                  <span className="text-xs text-indigo-600 font-semibold">{item.category}</span>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-slate-200 transition text-slate-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-slate-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-slate-200 transition text-slate-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="font-bold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 transition p-1.5"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 sticky top-24 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-600 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert('Order Placed Successfully! (Demo Checkout)')}
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
