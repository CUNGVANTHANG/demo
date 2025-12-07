import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { Star, Check } from 'lucide-react';
import { useCart } from '../App';

export const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Táo', 'Nho', 'Cherry', 'Cam', 'Kiwi', 'Dâu'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Cửa Hàng</h1>
        
        {/* Filters */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-brand-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
};

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center py-20 text-2xl font-bold">Sản phẩm không tồn tại</div>;
  }

  // Get related products: same category, different ID
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-sm breadcrumbs mb-8 text-gray-500">
            <Link to="/" className="hover:text-brand-600">Trang chủ</Link> / <Link to="/shop" className="hover:text-brand-600">Cửa hàng</Link> / <span className="text-gray-900">{product.name}</span>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <div className="inline-block px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-bold mb-4 tracking-wide">
            NHẬP KHẨU TỪ {product.origin.toUpperCase()}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-6">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                ))}
             </div>
             <span className="text-gray-500 ml-2 text-sm">({product.reviews} đánh giá)</span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-end gap-4 mb-8">
             <span className="text-3xl font-bold text-brand-700">{product.price.toLocaleString('vi-VN')} đ</span>
             <span className="text-sm text-gray-500 mb-1">/ 1kg</span>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-brand-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-brand-700 transition shadow-lg shadow-brand-200"
            >
              Thêm vào giỏ
            </button>
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
               <span className="sr-only">Yêu thích</span>
               <Star className="text-gray-400 hover:text-yellow-400 transition" />
            </button>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
             <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Còn hàng tại 3 chi nhánh</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Free ship đơn từ 500k</div>
                <div className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Bao đổi trả trong 24h</div>
             </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản Phẩm Liên Quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};