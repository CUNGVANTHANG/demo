import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../App';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      <Link to={`/shop/${product.id}`} className="relative block overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.origin}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <Link to={`/shop/${product.id}`} className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-600 line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center mb-3">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600 ml-1">{product.rating} ({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-brand-700">
            {product.price.toLocaleString('vi-VN')} đ
          </span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-gray-100 rounded-full text-gray-900 hover:bg-brand-500 hover:text-white transition-colors"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
