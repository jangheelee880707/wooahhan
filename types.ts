
export enum BeefCut {
  // Signature Raw Items
  MUNGTIGI = 'Mungtigi (Signature Raw Lumps)',
  BRISKET_SASHIMI = 'Brisket Sashimi (Chadol Sashimi)',
  YUKHOE = 'Yukhoe (Seasoned Raw Beef)',
  YUK_SASHIMI = 'Yuk-Sashimi (Premium Beef Sashimi)',
  
  // Cooked/Sets
  GIFT_SET = 'Premium Gift Set (1++ Gift Box)',
  PLATTER = 'Assorted Grilled Platter (Modem-Gui)',
  SIRLOIN = 'Premium Sirloin (Deungsim)',
  FLANK = 'Special Salchi-sal (Thin Flank)',
}

export enum ProductCategory {
  ALL = '전체보기',
  GRILL = '구이용',
  RAW = '생고기/육회',
  CEREMONIAL = '예단/선물세트'
}

export enum MarblingLevel {
  STANDARD = 'Standard (1 Grade)',
  PREMIUM = 'Premium (1+ Grade)',
  ULTRA = 'Ultra (1++ BMS No.9)'
}

export interface GenerationConfig {
  cut: BeefCut;
  marbling: MarblingLevel;
  garnish: boolean;
  cookingState: 'raw' | 'cooking' | 'cooked';
  isCeremonial?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  type: BeefCut;
  category: ProductCategory;
  imageUrl?: string;
}

export interface CartItem extends ProductItem {
  quantity: number;
}
