import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Phone, Facebook, Instagram, User, Leaf } from 'lucide-react';
import { useCart } from '../App';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/shop', label: 'Cửa hàng' },
    { path: '/promotions', label: 'Khuyến mãi' },
    { path: '/blog', label: 'Tin tức' },
    { path: '/recipes', label: 'Công thức' },
    { path: '/origins', label: 'Nguồn gốc' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-brand-500 text-white p-2 rounded-full">
                <Leaf size={24} />
              </div>
              <span className="font-bold text-2xl text-brand-900 tracking-tight">FreshFruit</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-600 hover:text-brand-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Tìm kiếm..." className="bg-transparent border-none focus:outline-none text-sm ml-2 w-24 lg:w-40" />
             </div>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 space-y-1">
             <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mx-2 mb-4">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Tìm kiếm sản phẩm..." className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full" />
             </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-brand-500 text-white p-1.5 rounded-full">
                <Leaf size={20} />
              </div>
              <h3 className="text-xl font-bold">FreshFruit</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hệ thống cửa hàng trái cây nhập khẩu uy tín hàng đầu. Chúng tôi cam kết mang đến những sản phẩm tươi ngon nhất từ khắp nơi trên thế giới.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-400">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white">Cửa hàng</Link></li>
              <li><Link to="/about" className="hover:text-white">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-white">Liên hệ</Link></li>
              <li><Link to="/faq" className="hover:text-white">Chính sách đổi trả</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-400">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone size={16} /> 1900 123 456</li>
              <li className="flex items-center gap-2">Email: support@freshfruit.com</li>
              <li>Địa chỉ: 123 Đường Nguyễn Huệ, Q.1, TP.HCM</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-400">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full transition-colors"><Instagram size={20} /></a>
            </div>
            <div className="mt-6">
               <p className="text-xs text-gray-500 mb-2">Đăng ký nhận tin</p>
               <div className="flex">
                 <input type="email" placeholder="Email của bạn" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-l-md focus:outline-none w-full" />
                 <button className="bg-brand-600 hover:bg-brand-700 px-3 py-2 rounded-r-md text-sm font-medium">Gửi</button>
               </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          © 2023 FreshFruit. All rights reserved. Designed for excellence.
        </div>
      </div>
    </footer>
  );
};
