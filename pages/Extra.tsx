import React from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS, RECIPES, PROMOTIONS, ORIGINS } from "../constants";
import {
  Calendar,
  User,
  Clock,
  ChefHat,
  Tag,
  MapPin,
  ArrowLeft,
} from "lucide-react";

// --- BLOG ---
export const BlogList = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-8 text-center">Tin Tức & Kiến Thức</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {BLOG_POSTS.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <User size={12} /> {post.author}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            <Link
              to={`/blog/${post.id}`}
              className="text-brand-600 font-semibold text-sm"
            >
              Đọc tiếp &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const BlogDetail = () => {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);
  if (!post) return <div>Not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="text-gray-500 text-sm flex items-center mb-6 hover:text-brand-600"
      >
        <ArrowLeft size={16} className="mr-1" /> Quay lại
      </Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <User size={14} /> {post.author}
        </span>
      </div>
      <img
        src={post.image}
        alt={post.title}
        className="w-full rounded-xl mb-8"
      />
      <div className="prose prose-lg text-gray-700">
        <p>{post.content}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

// --- RECIPES ---
export const RecipeList = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-8 text-center">Công Thức Món Ngon</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {RECIPES.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
        >
          <div className="relative overflow-hidden aspect-video">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock size={12} /> {recipe.prepTime}
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-lg font-bold mb-2 group-hover:text-brand-600">
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = RECIPES.find((r) => r.id === id);
  if (!recipe) return <div>Not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/recipes"
        className="text-gray-500 text-sm flex items-center mb-6 hover:text-brand-600"
      >
        <ArrowLeft size={16} className="mr-1" /> Danh sách công thức
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-2xl object-cover h-96 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 mb-6">
            <Clock size={18} /> <span>Chuẩn bị: {recipe.prepTime}</span>
            <span className="mx-2">•</span>
            <ChefHat size={18} /> <span>Độ khó: Dễ</span>
          </div>
          <p className="text-gray-700 italic mb-6 border-l-4 border-brand-500 pl-4 bg-gray-50 py-2">
            {recipe.description}
          </p>

          <h3 className="font-bold text-lg mb-3">Nguyên liệu:</h3>
          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="font-bold text-2xl mb-6">Cách thực hiện:</h3>
        <div className="space-y-6">
          {recipe.instructions.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <p className="text-gray-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PROMOTIONS ---
export const PromotionList = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-2 text-center">Khuyến Mãi Hot</h1>
    <p className="text-center text-gray-500 mb-10">
      Săn deal hời - Ăn trái cây thả ga
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {PROMOTIONS.map((promo) => (
        <div
          key={promo.id}
          className="bg-white border-2 border-dashed border-brand-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-brand-500 transition relative overflow-hidden"
        >
          <div className="w-full md:w-1/3">
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              HSD: {promo.expiry}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <Link to={`/promotions/${promo.id}`}>{promo.title}</Link>
            </h2>
            <p className="text-gray-500 text-sm mb-4">{promo.description}</p>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Mã giảm giá</span>
                <span className="font-mono font-bold text-brand-600 text-lg">
                  {promo.code}
                </span>
              </div>
              <button className="text-xs bg-brand-600 text-white px-3 py-1.5 rounded hover:bg-brand-700">
                Sao chép
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PromotionDetail = () => {
  const { id } = useParams();
  const promo = PROMOTIONS.find((p) => p.id === id);
  if (!promo) return <div>Not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <Link
        to="/promotions"
        className="text-gray-500 text-sm flex items-center mb-6 hover:text-brand-600"
      >
        <ArrowLeft size={16} className="mr-1" /> Danh sách khuyến mãi
      </Link>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <img
          src={promo.image}
          className="w-full h-64 object-cover rounded-xl mb-6"
          alt={promo.title}
        />
        <h1 className="text-3xl font-bold mb-4">{promo.title}</h1>
        <p className="text-gray-600 mb-8">{promo.description}</p>

        <div className="inline-block bg-brand-50 border-2 border-brand-200 p-6 rounded-xl mb-8">
          <p className="text-sm text-gray-500 mb-2">Mã Khuyến Mãi</p>
          <p className="text-4xl font-mono font-bold text-brand-600 tracking-wider">
            {promo.code}
          </p>
        </div>

        <div className="text-sm text-gray-500">
          <p>
            Hạn sử dụng:{" "}
            <span className="font-semibold text-gray-800">{promo.expiry}</span>
          </p>
          <p className="mt-2 text-xs italic">
            * Áp dụng cho đơn hàng đặt trực tuyến.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- ORIGINS ---
export const OriginList = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-10 text-center">Nguồn Gốc Xuất Xứ</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {ORIGINS.map((origin) => (
        <Link
          to={`/origins/${origin.id}`}
          key={origin.id}
          className="group relative rounded-xl overflow-hidden h-80 block shadow-lg"
        >
          <img
            src={origin.image}
            alt={origin.name}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <MapPin size={20} className="text-brand-400" /> {origin.name}
            </h2>
            <p className="text-gray-300 text-sm group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">
              {origin.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export const OriginDetail = () => {
  const { id } = useParams();
  const origin = ORIGINS.find((o) => o.id === id);
  if (!origin) return <div>Not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link
        to="/origins"
        className="text-gray-500 text-sm flex items-center mb-6 hover:text-brand-600"
      >
        <ArrowLeft size={16} className="mr-1" /> Quay lại
      </Link>
      <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
        <img
          src={origin.image}
          alt={origin.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{origin.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {origin.description}
          </p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl h-fit">
          <h3 className="font-bold text-lg mb-4">
            Các sản phẩm từ {origin.name}
          </h3>
          {/* In a real app, filter products by origin ID or name */}
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-600">
              <Tag size={16} /> Táo Envy
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Tag size={16} /> Nho Ngón Tay
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Tag size={16} /> Cherry Đỏ
            </li>
          </ul>
          <Link
            to="/shop"
            className="block mt-6 text-center bg-white border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition"
          >
            Xem tại cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
};
