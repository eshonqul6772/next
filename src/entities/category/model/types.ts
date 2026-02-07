export interface PublicCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  flowerCount: number;
}

export interface PublicCategoryFlower {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  isNew: boolean;
  inStock: boolean;
}

export interface PublicCategoryDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  flowers: PublicCategoryFlower[];
}
