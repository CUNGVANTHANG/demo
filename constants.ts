import { Product, BlogPost, Recipe, Promotion, Origin } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Táo Envy Mỹ',
    price: 250000,
    category: 'Táo',
    origin: 'USA',
    description: 'Táo Envy Mỹ size lớn, giòn ngọt, hương thơm đặc trưng. Được nhập khẩu trực tiếp từ Washington.',
    image: 'https://tfruit.com.vn/wp-content/uploads/2019/09/TAO-ENVY-T-FRUIT.jpg',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'p2',
    name: 'Nho Mẫu Đơn Nhật',
    price: 1200000,
    category: 'Nho',
    origin: 'Japan',
    description: 'Nho Shine Muscat (Mẫu Đơn) Nhật Bản, trái to, không hạt, vị ngọt sữa, vỏ mỏng ăn được.',
    image: 'https://tfruit.com.vn/wp-content/uploads/2024/10/nho-mau-don-nanago-nhat-ban.webp',
    rating: 5.0,
    reviews: 56,
  },
  {
    id: 'p3',
    name: 'Cherry Đỏ Úc',
    price: 550000,
    category: 'Cherry',
    origin: 'Australia',
    description: 'Cherry Úc size 30-32, quả căng mọng, ngọt đậm, cuống xanh tươi.',
    image: 'https://tfruit.com.vn/wp-content/uploads/2019/08/cherry-%C4%91%E1%BB%8F-t-fruit.jpg',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'p4',
    name: 'Cam Vàng Navel',
    price: 90000,
    category: 'Cam',
    origin: 'South Africa',
    description: 'Cam vàng Navel không hạt, mọng nước, vị ngọt thanh, vỏ dễ bóc.',
    image: 'https://minhphuongfruit.com/upload/hinhthem/navel-uc-892.jpg',
    rating: 4.5,
    reviews: 210,
  },
  {
    id: 'p5',
    name: 'Kiwi Vàng New Zealand',
    price: 180000,
    category: 'Kiwi',
    origin: 'New Zealand',
    description: 'Kiwi vàng Zespri, vị ngọt dịu, giàu vitamin C, tốt cho sức khỏe.',
    image: 'https://cdn.lottemart.vn/media/description/product/cache/2181530000000-DT-3.jpeg.webp',
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 'p6',
    name: 'Dâu Tây Hàn Quốc',
    price: 350000,
    category: 'Dâu',
    origin: 'Korea',
    description: 'Dâu tây Hàn Quốc giống Maehyang, thơm nức, ngọt lịm, quả to đẹp.',
    image: 'https://traicaytonyteo.com/uploads/source/nho-mau-don/dau-han-quoc.webp',
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 'p7',
    name: 'Lê Nâu Hàn Quốc',
    price: 150000,
    category: 'Lê',
    origin: 'Korea',
    description: 'Lê nâu Hàn Quốc quả lớn, vỏ mỏng, thịt trắng giòn tan, nhiều nước.',
    image: 'https://product.hstatic.net/1000304337/product/nhap_by_chip_26ef13968acc4ab5bb6413346784c7ef.png',
    rating: 4.6,
    reviews: 76,
  },
  {
    id: 'p8',
    name: 'Việt Quất Peru',
    price: 120000,
    category: 'Việt Quất',
    origin: 'Peru',
    description: 'Việt quất Peru quả to, cứng, ngọt, lớp phấn trắng tự nhiên.',
    image: 'https://vinfruits.com/wp-content/uploads/2017/09/1-13-scaled.jpg',
    rating: 4.7,
    reviews: 112,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Cách chọn Cherry tươi ngon nhất',
    excerpt: 'Hướng dẫn chi tiết cách nhận biết cherry tươi, giòn, ngọt thông qua cuống và màu sắc.',
    content: 'Để chọn được những quả cherry ngon nhất, bạn cần chú ý đến màu sắc của cuống. Cuống phải còn xanh tươi, dính chặt vào quả...',
    image: 'https://storage.googleapis.com/teko-gae.appspot.com/media/image/2025/1/2/de9df7c6-d7ae-4bdf-bf42-bd1675c5832a/1.png',
    date: '2023-10-15',
    author: 'Minh Anh'
  },
  {
    id: 'b2',
    title: 'Lợi ích bất ngờ của Táo Envy',
    excerpt: 'Táo Envy không chỉ ngon mà còn chứa nhiều dưỡng chất giúp đẹp da, giữ dáng.',
    content: 'Táo Envy chứa nhiều chất chống oxy hóa, vitamin C và chất xơ...',
    image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/tao_envy_va_nhung_cong_dung_cua_no_doi_voi_suc_khoe_1_e998441d60.png',
    date: '2023-10-20',
    author: 'Hoàng Nam'
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Salad Trái Cây Nhiệt Đới',
    description: 'Món salad tươi mát giải nhiệt mùa hè với sốt sữa chua.',
    ingredients: ['1 quả táo', '10 quả nho', '1 quả kiwi', 'Sốt mayonnaise', 'Sữa chua không đường'],
    instructions: ['Rửa sạch hoa quả', 'Cắt hạt lựu', 'Trộn đều với sốt', 'Để lạnh 15 phút trước khi dùng'],
    image: 'https://img-global.cpcdn.com/recipes/c62fe02c37929cee/400x400cq80/photo.jpg',
    prepTime: '20 phút'
  },
  {
    id: 'r2',
    title: 'Smoothie Dâu Tây Chuối',
    description: 'Thức uống bổ dưỡng cho bữa sáng năng động.',
    ingredients: ['10 quả dâu tây', '1 quả chuối', '200ml sữa tươi', 'Đá xay'],
    instructions: ['Rửa sạch dâu tây', 'Cho tất cả vào máy xay', 'Xay nhuyễn và thưởng thức'],
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/cach_lam_sinh_to_dau_chuoi_thumb_438a7bb738.jpg',
    prepTime: '5 phút'
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'pr1',
    title: 'Giảm 20% cho Đơn hàng đầu tiên',
    code: 'HELLO20',
    discount: '20%',
    description: 'Áp dụng cho khách hàng mới đăng ký tài khoản và mua hàng lần đầu.',
    expiry: '31/12/2023',
    image: 'https://media.istockphoto.com/id/1480336741/vi/vec-to/gi%E1%BA%A3m-20-logo-thi%E1%BA%BFt-k%E1%BA%BF-huy-hi%E1%BB%87u-gi%E1%BA%A3m-gi%C3%A1-%C4%91%E1%BA%B7c-bi%E1%BB%87t.jpg?s=612x612&w=0&k=20&c=Z1mjyEKLRhDUDb5BQOFZwdVCII79Qp98Aivf5pJ6n_0='
  },
  {
    id: 'pr2',
    title: 'Mua 1 Tặng 1 Việt Quất',
    code: 'VQFREE',
    discount: 'Mua 1 Tặng 1',
    description: 'Áp dụng khi mua hộp Việt Quất Peru 125g.',
    expiry: '25/11/2023',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjCFhNxY3UzxguYkSh0-rX5yebYB5KCVLmA&s'
  }
];

export const ORIGINS: Origin[] = [
  {
    id: 'o1',
    name: 'Mỹ (USA)',
    description: 'Nổi tiếng với các loại táo, nho và cherry chất lượng cao, quy trình kiểm soát nghiêm ngặt.',
    image: 'https://vtourist.com.vn/wp-content/uploads/2024/05/nhung-su-that-thu-vi-ve-nuoc-my.jpg'
  },
  {
    id: 'o2',
    name: 'Nhật Bản (Japan)',
    description: 'Thiên đường của các loại trái cây cao cấp, vị ngọt thanh khiết và hình thức tuyệt đẹp.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56QNLoFTABJY0CHfxerNNobGmZ_rDilw8sQ&s'
  },
    {
    id: 'o3',
    name: 'New Zealand',
    description: 'Vùng đất của Kiwi và Táo với khí hậu ôn đới hải dương lý tưởng.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg'
  }
];
