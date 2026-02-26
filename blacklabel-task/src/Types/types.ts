export type CategoryOrdersSummary = {
  category: string;
  newCustomersOrders: number;
  returningCustomersOrders: number;
  newCustomersOrdersPrice: number;
  returningCustomersOrdersPrice: number;
};

export type SubCategoryOrdersSummary = {
  parentCategory: string;
  subCategory: string;
  newCustomersOrders: number;
  returningCustomersOrders: number;
  newCustomersOrdersPrice: number;
  returningCustomersOrdersPrice: number;
};

export type CompleteOrdersSummary = {
  categoryOrdersSummaries: CategoryOrdersSummary[];
  subCategoryOrdersSummaries: SubCategoryOrdersSummary[];
};

export type JsonData = {
  meta: OrdersMeta;
  orders: Order[];
};

export type OrdersMeta = {
  currency: string;
  generatedAt: string;
  source: string;
};

export type Order = {
  orderId: string;
  timestamp: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  category: string;
  subcategory: string;
  product: string;
  quantity: number;
  unitPrice: number;
  paymentMethod: string;
  customerType: string;
  device: string;
  deliveryDays: number;
};
