import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Store, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Hub<span className="text-indigo-600">Mall</span>
          </span>
        </Link>

        {/* Navigation Links & Actions */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            Explore Market
          </Link>

          {user?.role === 'SELLER' && (
            <Link
              to="/seller-dashboard"
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
            >
              <Store className="w-4 h-4" />
              Seller Studio
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-700 hover:text-indigo-600 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* User Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-rose-600 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
