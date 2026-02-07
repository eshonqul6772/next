import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PERMISSIONS = [
  'VIEW_USERS',
  'VIEW_USER',
  'CREATE_USER',
  'UPDATE_USER',
  'DELETE_USER',
  'VIEW_ROLES',
  'VIEW_ROLE',
  'CREATE_ROLE',
  'UPDATE_ROLE',
  'DELETE_ROLE',
  'VIEW_TRANSLATIONS',
  'VIEW_TRANSLATION',
  'CREATE_TRANSLATION',
  'UPDATE_TRANSLATION',
  'DELETE_TRANSLATION',
  'TEXTPATH_METHODTYPE_STRETCH'
];

async function main() {
  console.log('Seeding database...');

  // Create roles
  const superAdminRole = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Super Admin',
      description: 'Full access to all features',
      permissions: JSON.stringify(PERMISSIONS),
      status: 'ACTIVE'
    }
  });

  const userManagerRole = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'User Manager',
      description: 'Can manage users',
      permissions: JSON.stringify([
        'VIEW_USERS',
        'VIEW_USER',
        'CREATE_USER',
        'UPDATE_USER',
        'DELETE_USER'
      ]),
      status: 'ACTIVE'
    }
  });

  const viewerRole = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Viewer',
      description: 'Read-only access',
      permissions: JSON.stringify(['VIEW_USERS', 'VIEW_ROLES', 'VIEW_TRANSLATIONS']),
      status: 'INACTIVE'
    }
  });

  console.log('Roles created:', { superAdminRole, userManagerRole, viewerRole });

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      phone: '+998901234567',
      username: 'admin',
      password: 'admin123',
      roleId: superAdminRole.id,
      status: 'ACTIVE'
    }
  });

  const johnUser = await prisma.user.upsert({
    where: { username: 'john' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+998901234568',
      username: 'john',
      password: 'john123',
      roleId: userManagerRole.id,
      status: 'ACTIVE'
    }
  });

  const janeUser = await prisma.user.upsert({
    where: { username: 'jane' },
    update: {},
    create: {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+998901234569',
      username: 'jane',
      password: 'jane123',
      roleId: viewerRole.id,
      status: 'INACTIVE'
    }
  });

  console.log('Users created:', { adminUser, johnUser, janeUser });

  // Create translations
  const translations = [
    // Navigation
    {
      nameRu: 'Главная',
      nameUz: 'Bosh sahifa',
      nameEn: 'Home',
      tag: 'nav.home',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET', 'SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Настройки',
      nameUz: 'Sozlamalar',
      nameEn: 'Settings',
      tag: 'nav.settings',
      types: JSON.stringify(['ADMIN_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Профиль',
      nameUz: 'Profil',
      nameEn: 'Profile',
      tag: 'nav.profile',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Категории',
      nameUz: 'Kategoriyalar',
      nameEn: 'Categories',
      tag: 'nav.categories',
      types: JSON.stringify(['ADMIN_CABINET', 'SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Растения',
      nameUz: "O'simliklar",
      nameEn: 'Plants',
      tag: 'nav.plants',
      types: JSON.stringify(['ADMIN_CABINET', 'SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Контакты',
      nameUz: 'Aloqa',
      nameEn: 'Contact',
      tag: 'nav.contact',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    // Common
    {
      nameRu: 'Сохранить',
      nameUz: 'Saqlash',
      nameEn: 'Save',
      tag: 'common.save',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Отмена',
      nameUz: 'Bekor qilish',
      nameEn: 'Cancel',
      tag: 'common.cancel',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Удалить',
      nameUz: "O'chirish",
      nameEn: 'Delete',
      tag: 'common.delete',
      types: JSON.stringify(['ADMIN_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Редактировать',
      nameUz: 'Tahrirlash',
      nameEn: 'Edit',
      tag: 'common.edit',
      types: JSON.stringify(['ADMIN_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Добавить',
      nameUz: "Qo'shish",
      nameEn: 'Add',
      tag: 'common.add',
      types: JSON.stringify(['ADMIN_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Поиск',
      nameUz: 'Qidirish',
      nameEn: 'Search',
      tag: 'common.search',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET', 'SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Загрузка...',
      nameUz: 'Yuklanmoqda...',
      nameEn: 'Loading...',
      tag: 'common.loading',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET', 'SHOP']),
      status: 'ACTIVE' as const
    },
    // Shop specific
    {
      nameRu: 'Добавить в корзину',
      nameUz: "Savatga qo'shish",
      nameEn: 'Add to cart',
      tag: 'shop.addToCart',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Купить сейчас',
      nameUz: 'Hozir sotib olish',
      nameEn: 'Buy now',
      tag: 'shop.buyNow',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Корзина',
      nameUz: 'Savat',
      nameEn: 'Cart',
      tag: 'shop.cart',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Бесплатная доставка',
      nameUz: 'Bepul yetkazib berish',
      nameEn: 'Free delivery',
      tag: 'shop.freeDelivery',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Все растения',
      nameUz: "Barcha o'simliklar",
      nameEn: 'All plants',
      tag: 'shop.allPlants',
      types: JSON.stringify(['SHOP']),
      status: 'ACTIVE' as const
    },
    // Auth
    {
      nameRu: 'Войти',
      nameUz: 'Kirish',
      nameEn: 'Login',
      tag: 'auth.login',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Выйти',
      nameUz: 'Chiqish',
      nameEn: 'Logout',
      tag: 'auth.logout',
      types: JSON.stringify(['ADMIN_CABINET', 'CLIENT_CABINET']),
      status: 'ACTIVE' as const
    },
    {
      nameRu: 'Регистрация',
      nameUz: "Ro'yxatdan o'tish",
      nameEn: 'Register',
      tag: 'auth.register',
      types: JSON.stringify(['CLIENT_CABINET']),
      status: 'ACTIVE' as const
    }
  ];

  for (const translation of translations) {
    await prisma.translation.upsert({
      where: { tag: translation.tag },
      update: {},
      create: translation
    });
  }

  console.log('Translations created');

  // ==================== O'SIMLIKLAR MAGAZINI DATA ====================

  // Delete existing data
  await prisma.flower.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.heroSlide.deleteMany({});
  await prisma.setting.deleteMany({});

  // Create categories
  const categories = [
    {
      nameRu: 'Комнатные растения',
      nameUz: 'Xona o\'simliklari',
      nameEn: 'Indoor Plants',
      slug: 'indoor-plants',
      description: 'Uy va ofis uchun chiroyli xona o\'simliklari',
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
      sortOrder: 1
    },
    {
      nameRu: 'Кактусы и суккуленты',
      nameUz: 'Kaktuslar va sukkulentlar',
      nameEn: 'Cacti & Succulents',
      slug: 'cacti-succulents',
      description: 'Kam parvarish talab qiladigan chiroyli o\'simliklar',
      imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
      sortOrder: 2
    },
    {
      nameRu: 'Пальмы и крупные растения',
      nameUz: 'Palmalar va yirik o\'simliklar',
      nameEn: 'Palms & Large Plants',
      slug: 'palms-large',
      description: 'Katta bo\'shliqlar uchun hashamatli o\'simliklar',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400',
      sortOrder: 3
    },
    {
      nameRu: 'Цветущие растения',
      nameUz: 'Gullagan o\'simliklar',
      nameEn: 'Flowering Plants',
      slug: 'flowering',
      description: 'Chiroyli gullaydigan o\'simliklar',
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      sortOrder: 4
    },
    {
      nameRu: 'Горшки и аксессуары',
      nameUz: 'Guldonlar va aksessuarlar',
      nameEn: 'Pots & Accessories',
      slug: 'pots-accessories',
      description: 'O\'simliklar uchun guldonlar va parvarish vositalari',
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      sortOrder: 5
    }
  ];

  const createdCategories: Record<string, { id: number }> = {};
  for (const category of categories) {
    const created = await prisma.category.create({ data: category });
    createdCategories[category.slug] = created;
  }
  console.log('Categories created');

  // Create plants (using Flower model)
  const plants = [
    {
      nameRu: 'Монстера Делициоза',
      nameUz: 'Monstera Deliciosa',
      nameEn: 'Monstera Deliciosa',
      slug: 'monstera-deliciosa',
      description: 'Eng mashhur xona o\'simliklaridan biri. Katta teshikli barglari bilan ajralib turadi.',
      price: 350000,
      oldPrice: 420000,
      imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45c8f22b349?w=400',
      isFeatured: true,
      isNew: false,
      categoryId: createdCategories['indoor-plants'].id
    },
    {
      nameRu: 'Фикус Лирата',
      nameUz: 'Fikus Lirata',
      nameEn: 'Fiddle Leaf Fig',
      slug: 'fiddle-leaf-fig',
      description: 'Katta skripka shaklidagi barglari bilan zamonaviy interyer uchun ideal.',
      price: 480000,
      imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
      isFeatured: true,
      isNew: true,
      categoryId: createdCategories['indoor-plants'].id
    },
    {
      nameRu: 'Потос Золотой',
      nameUz: 'Oltin Potos',
      nameEn: 'Golden Pothos',
      slug: 'golden-pothos',
      description: 'Parvarishi oson, havoni tozalovchi o\'simlik. Yangi boshlovchilar uchun ideal.',
      price: 85000,
      imageUrl: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400',
      isFeatured: true,
      isNew: false,
      categoryId: createdCategories['indoor-plants'].id
    },
    {
      nameRu: 'Эхеверия',
      nameUz: 'Exeveriya',
      nameEn: 'Echeveria',
      slug: 'echeveria',
      description: 'Gul shaklidagi sukkulent. Kam suv talab qiladi.',
      price: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
      isFeatured: true,
      isNew: true,
      categoryId: createdCategories['cacti-succulents'].id
    },
    {
      nameRu: 'Алоэ Вера',
      nameUz: 'Aloe Vera',
      nameEn: 'Aloe Vera',
      slug: 'aloe-vera',
      description: 'Shifobaxsh xususiyatlarga ega mashhur o\'simlik.',
      price: 65000,
      oldPrice: 80000,
      imageUrl: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400',
      isFeatured: false,
      isNew: false,
      categoryId: createdCategories['cacti-succulents'].id
    },
    {
      nameRu: 'Сансевиерия',
      nameUz: 'Sansevieriya (Qaymoq tili)',
      nameEn: 'Snake Plant',
      slug: 'snake-plant',
      description: 'Juda chidamli, havoni tozalovchi o\'simlik. Kam yorug\'lik va suvga chidaydi.',
      price: 120000,
      imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400',
      isFeatured: true,
      isNew: false,
      categoryId: createdCategories['indoor-plants'].id
    },
    {
      nameRu: 'Пальма Арека',
      nameUz: 'Areka Palmasi',
      nameEn: 'Areca Palm',
      slug: 'areca-palm',
      description: 'Tropik muhit yaratuvchi hashamatli palma.',
      price: 650000,
      oldPrice: 750000,
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400',
      isFeatured: true,
      isNew: false,
      categoryId: createdCategories['palms-large'].id
    },
    {
      nameRu: 'Орхидея Фаленопсис',
      nameUz: 'Falenopsis Orxideyasi',
      nameEn: 'Phalaenopsis Orchid',
      slug: 'phalaenopsis-orchid',
      description: 'Nafis va uzoq vaqt gulli o\'simlik.',
      price: 280000,
      imageUrl: 'https://images.unsplash.com/photo-1566873535350-a3f5c4a5e5c9?w=400',
      isFeatured: true,
      isNew: true,
      categoryId: createdCategories['flowering'].id
    },
    {
      nameRu: 'Антуриум',
      nameUz: 'Anturium',
      nameEn: 'Anthurium',
      slug: 'anthurium',
      description: 'Yorqin qizil gullari bilan chiroyli tropik o\'simlik.',
      price: 220000,
      imageUrl: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=400',
      isFeatured: false,
      isNew: false,
      categoryId: createdCategories['flowering'].id
    },
    {
      nameRu: 'Керамический горшок',
      nameUz: 'Keramik guldon',
      nameEn: 'Ceramic Pot',
      slug: 'ceramic-pot-white',
      description: 'Oq rangli zamonaviy keramik guldon. O\'lcham: 20sm',
      price: 95000,
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      isFeatured: false,
      isNew: true,
      categoryId: createdCategories['pots-accessories'].id
    }
  ];

  for (const plant of plants) {
    await prisma.flower.create({ data: plant });
  }
  console.log('Plants created');

  // Create hero slides
  const heroSlides = [
    {
      titleRu: 'Озелените свой дом',
      titleUz: 'Uyingizni yashillantiring',
      titleEn: 'Green Your Home',
      subtitleRu: 'Лучшие комнатные растения с доставкой',
      subtitleUz: 'Eng yaxshi xona o\'simliklari yetkazib beramiz',
      subtitleEn: 'Best indoor plants with delivery',
      imageUrl: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1400',
      buttonText: 'Tanlash',
      buttonLink: '/home/categories',
      sortOrder: 1
    },
    {
      titleRu: 'Растения для начинающих',
      titleUz: 'Yangi boshlovchilar uchun',
      titleEn: 'Plants for Beginners',
      subtitleRu: 'Легкий уход, красивый результат',
      subtitleUz: 'Oson parvarish, chiroyli natija',
      subtitleEn: 'Easy care, beautiful results',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400',
      buttonText: 'Ko\'rish',
      buttonLink: '/home/plants',
      sortOrder: 2
    },
    {
      titleRu: 'Скидки до 20%',
      titleUz: '20% gacha chegirmalar',
      titleEn: 'Up to 20% off',
      subtitleRu: 'На избранные растения',
      subtitleUz: 'Tanlangan o\'simliklarga',
      subtitleEn: 'On selected plants',
      imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1400',
      buttonText: 'Xarid qilish',
      buttonLink: '/home/plants',
      sortOrder: 3
    }
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log('Hero slides created');

  // Create store settings
  const settings = [
    { key: 'store_name', value: 'O\'simliklar Dunyosi' },
    { key: 'store_phone', value: '+998 90 123 45 67' },
    { key: 'store_email', value: 'info@osimliklar.uz' },
    { key: 'store_address', value: 'Toshkent, Chilonzor tumani, 1-mavze' },
    { key: 'working_hours', value: '09:00 - 20:00' },
    { key: 'telegram', value: 'https://t.me/osimliklar_uz' },
    { key: 'instagram', value: 'https://instagram.com/osimliklar_uz' }
  ];

  for (const setting of settings) {
    await prisma.setting.create({ data: setting });
  }
  console.log('Settings created');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
