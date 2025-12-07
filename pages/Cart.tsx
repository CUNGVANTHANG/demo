import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../App';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Trash2 size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-8">Bạn chưa chọn sản phẩm nào.</p>
        <Link to="/shop" className="bg-brand-600 text-white px-8 py-3 rounded-full font-medium hover:bg-brand-700 transition">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng Của Bạn</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500 border-b border-gray-100">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Thành tiền</div>
              <div className="col-span-1 text-center"></div>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-100 last:border-0 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex items-center gap-4 w-full">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.origin}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs mt-2 hover:underline flex items-center gap-1 md:hidden"
                    >
                      <Trash2 size={12} /> Xóa
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-center w-full flex justify-between md:block">
                   <span className="md:hidden text-gray-500 text-sm">Đơn giá:</span>
                   <span>{item.price.toLocaleString('vi-VN')} đ</span>
                </div>
                
                <div className="col-span-2 flex justify-center w-full md:w-auto mt-2 md:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-right font-bold text-gray-900 w-full flex justify-between md:block mt-2 md:mt-0">
                   <span className="md:hidden text-gray-500 text-sm font-normal">Thành tiền:</span>
                   {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </div>

                <div className="col-span-1 hidden md:flex justify-end items-center">
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                        title="Xóa sản phẩm"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Tổng Đơn Hàng</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{total.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>30.000 đ</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-xl text-brand-700">
                <span>Tổng cộng</span>
                <span>{(total + 30000).toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Checkout = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            navigate('/success');
        }, 1000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Thanh Toán</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
                                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Nguyễn" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                                <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Văn A" />
                            </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                             <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="0901234567" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                             <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="email@example.com" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng</label>
                             <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Số nhà, Tên đường, Phường/Xã" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                             <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Giao hàng trong giờ hành chính..."></textarea>
                        </div>
                    </form>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl h-fit">
                    <h2 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h2>
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} <span className="text-gray-500">x {item.quantity}</span></span>
                                <span className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                             <span>Tạm tính</span>
                             <span>{total.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                             <span>Phí vận chuyển</span>
                             <span>30.000 đ</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl text-brand-700 pt-2">
                             <span>Tổng cộng</span>
                             <span>{(total + 30000).toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 p-3 border border-brand-200 bg-white rounded-lg cursor-pointer">
                            <input type="radio" name="payment" defaultChecked className="text-brand-600 focus:ring-brand-500" />
                            <span className="text-sm font-medium">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                         <div className="flex items-center gap-3 p-3 border border-gray-200 bg-white rounded-lg cursor-pointer opacity-60">
                            <input type="radio" name="payment" disabled className="text-brand-600" />
                            <span className="text-sm font-medium">Chuyển khoản ngân hàng (Bảo trì)</span>
                        </div>
                    </div>

                    <button form="checkout-form" type="submit" className="w-full mt-8 bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition">
                        Đặt Hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Success = () => {
    const { clearCart } = useCart();
    // Clear cart on mount
    React.useEffect(() => {
        clearCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <CheckCircle size={64} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt Hàng Thành Công!</h1>
            <p className="text-gray-600 max-w-md mb-8">
                Cảm ơn bạn đã mua sắm tại FreshFruit. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
            </p>
            <div className="flex gap-4">
                 <Link to="/" className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition">
                    Về Trang Chủ
                </Link>
                <Link to="/shop" className="px-6 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition">
                    Tiếp Tục Mua Sắm
                </Link>
            </div>
        </div>
    );
};