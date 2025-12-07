import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, BLOG_POSTS } from '../constants';

export const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop"
            alt="Fruits Banner"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Hương Vị Tự Nhiên <br /> <span className="text-brand-400">Từ Khắp Thế Giới</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Chúng tôi mang đến những loại trái cây tươi ngon, chuẩn vị, được tuyển chọn kỹ lưỡng từ những nông trại hàng đầu thế giới.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 md:text-lg transition-all"
            >
              Mua ngay
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-brand-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Truck size={24} /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Giao hàng nhanh 2h</h3>
                <p className="text-sm text-gray-500">Nội thành TP.HCM & Hà Nội</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full text-green-600"><ShieldCheck size={24} /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Đảm bảo chất lượng</h3>
                <p className="text-sm text-gray-500">Nguồn gốc rõ ràng 100%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600"><RefreshCw size={24} /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Đổi trả miễn phí</h3>
                <p className="text-sm text-gray-500">Nếu sản phẩm hư hỏng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
               <h2 className="text-3xl font-bold text-gray-900">Sản Phẩm Nổi Bật</h2>
               <p className="text-gray-500 mt-2">Những loại trái cây được yêu thích nhất tuần qua</p>
            </div>
            <Link to="/shop" className="text-brand-600 hover:text-brand-700 font-medium flex items-center">
              Xem tất cả <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Middle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent-500 rounded-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 text-white relative z-10">
                <span className="uppercase tracking-wider text-sm font-semibold opacity-90">Khuyến mãi đặc biệt</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Combo Sức Khỏe Mùa Hè</h2>
                <p className="mb-8 opacity-90 text-lg">Giảm ngay 15% khi mua Combo Cam + Táo + Lê. Tặng kèm công thức Detox.</p>
                <Link to="/promotions" className="bg-white text-accent-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  Xem chi tiết
                </Link>
              </div>
              <div className="h-64 md:h-full relative">
                 <img src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Summer Fruits" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Góc Chia Sẻ</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2">
                    <img src={post.image} alt={post.title} className="w-full h-48 md:h-full object-cover" />
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-center">
                    <span className="text-brand-600 text-xs font-bold uppercase tracking-wide mb-2">Kiến thức</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="text-brand-600 font-medium hover:underline inline-flex items-center">
                      Đọc thêm <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};
