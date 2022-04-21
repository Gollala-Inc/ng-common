interface Wholesale {
  wholesaleId: string | null;
  wsSeq: string;
  name: string;
  engName: string | null;
  phone: string;
  description: string | null;
  status: string | null;
  building: string;
  floor: string;
  section: string;
  mobiles: string | null;
}

interface ProductOption {
  photoUse: string;
  singleSale: boolean;
  designedByKorea: boolean;
  mainLabel: boolean;
  careLabel: boolean;
}

interface Property {
  key: string;
  type: string;
  name: string;
  engName: string;
  displayName: string;
  custom: boolean;
  display: boolean;
}

interface ColorProperty extends Property {
  colorCode: string;
}

interface Category {
  gender: Property;
  itemType: Property;
  itemMiddle: Property;
  itemLarge: Property;
  sizes: Property[];
  colors: ColorProperty[];
  made: Property;
}

interface Attribute {
  key: string;
  name: string;
  subtype?: string;
  displayName: string;
  custom: boolean;
  display: boolean;
  colorCode?: string;
  attributes?: {
    key: string;
    name: string;
    subtype: string;
    displayName: string;
    custom: boolean;
    display: boolean;
  }[];
}

interface Item {
  category: string;
  gender: string;
  name: string;
  displayName: string;
  type: string;
  displayOrder: number;
  required: boolean;
  attributes: Attribute[];
}

interface Size {
  category: string;
  gender: string;
  name: string;
  displayName: string;
  type: string;
  subtype: string;
  displayOrder: number;
  required: boolean;
  attributes: Attribute[];
}

interface Color {
  category: string;
  name: string;
  displayName: string;
  displayOrder: number;
  required: boolean,
  attributes: Attribute[];
}

interface Made {
  category: string;
  name: string;
  displayName: string;
  displayOrder: number;
  required: boolean;
  attributes: Attribute[];
}

interface ProductMetric {
  wholesaleStoreId: string;
  productId: string | null;
  countDisplay: number;
  countBrowse: number;
  countFavorite: number;
}

export interface Product {
  id: string;
  prodKey: string;
  productType: string;
  subProductType: any;
  testYn: string;
  approvedYn: string;
  claimed: boolean;
  status: string;
  baseName: string;
  name: string;
  displayName: string;
  description: string | null;
  price: number;
  wsSeq: string;
  xWholesaleId: any;
  wholesaleStoreId: string;
  wholesale: Wholesale;
  imgSource: string;
  imgPaths: string[];
  storeImgPaths: string[];
  productOption: ProductOption;
  category: Category;
  item: Item;
  sizes: Size;
  colors: Color;
  mixtures: any;
  made: Made;
  tagSet: any;
  productMetric: ProductMetric;
  registDate: number;
  updtDate: number;
  firstOrderDate: any;
  lastOrderDate: any;
  taggedDate: any;
  wholesaleStoreRegistDate: number;
  wholesaleStoreUpdtDate: number;
  linkedProductId: any;
  browseCount: number;
  favoriteCount: number;
  master: boolean;
  groupId: any;
  masterProductId: any;
  groupedDt: any;
}

export type Products = Product[];
