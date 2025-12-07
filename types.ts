export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  origin: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  prepTime: string;
}

export interface Promotion {
  id: string;
  title: string;
  code: string;
  discount: string;
  description: string;
  expiry: string;
  image: string;
}

export interface Origin {
  id: string;
  name: string;
  description: string;
  image: string;
}

export enum PageRoutes {
  HOME = '/',
  SHOP = '/shop',
  PRODUCT_DETAIL = '/shop/:id',
  BLOG = '/blog',
  BLOG_DETAIL = '/blog/:id',
  RECIPES = '/recipes',
  RECIPE_DETAIL = '/recipes/:id',
  PROMOTIONS = '/promotions',
  PROMOTION_DETAIL = '/promotions/:id',
  ORIGINS = '/origins',
  ORIGIN_DETAIL = '/origins/:id',
  CART = '/cart',
  CHECKOUT = '/checkout',
  SUCCESS = '/success',
}
