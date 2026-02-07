export interface PublicFlowerCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PublicFlower {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  category: PublicFlowerCategory;
}

export interface PublicFlowerListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicFlowerList {
  items: PublicFlower[];
  meta: PublicFlowerListMeta;
}

export interface PublicRelatedFlower {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  isNew: boolean;
}

export interface PublicFlowerDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  category: PublicFlowerCategory;
  related: PublicRelatedFlower[];
}
