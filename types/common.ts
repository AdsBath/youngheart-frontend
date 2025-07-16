export interface IMeta {
  limit: number;
  page: number;
  size: number;
}

export type ResponseSuccessType = {
  data: any;
  meta: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type ResponseErrorType = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage;
};

export type IResult = {
  data?: ResponseSuccessType | any;
  error?: ResponseErrorType | any;
};

export type ICategoryFormProps = {
  categoryData?: {
    id: string;
    title: string;
    description?: string;
    image?: string;
    featured?: boolean;
    status?: boolean;
    showInFooter?: boolean;
    parentId?: string;
  };
};

export type IBannerFormProps = {
  bannerData?: {
    id: string;
    title?: string;
    imageUlr?: string;
    linkUrl?: string;
    isActive?: boolean;
    description?: string;
    displayOrder: number;
  };
};

export type IBannerAdFormProps = {
  bannerAdData?: {
    id: string;
    title?: string;
    imageUrl: string;
    categoryId: string;
    isActive: boolean;
    description?: string;
    displayOrder: number;
  };
};

export type IDiscountBannerFormProps = {
  discountBannerData?: {
    id: string;
    name: string;
    logo: string;
    banner: string;
    bgImage: string;
    status: boolean;
  };
};

export type IBlogFormProps = {
  blogData?: {
    id: string;
    title: string;
    thumbnail: string;
    isActive: boolean;
    shortDescription: string;
    content: string;
  };
};

export type IPageLinkFormProps = {
  pageLinkData?: {
    id: string;
    title: string;
    content: string;
    isActive: boolean;
    shortDescription?: string;
    displayOrder: number;
  };
};
export type ICareerFormProps = {
  careerData?: {
    id: string;
    title: string;
    content: string;
    isActive: boolean;
    shortDescription?: string;
    applyUrl: string;
  };
};

export type UserDataBody = {
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  isUser: boolean | undefined;
  role?: Role; // Optional role property
};

// orderStatus.ts
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PACKING = "PACKING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  EXCHANGE = "EXCHANGE",
}

export enum Role {
  USER = "USER",
  GUEST = "GUEST",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
}

export enum ProductCollectionEnum {
  TRENDING_DESIGNS = "Trending Designs",
  SHOPPERS_CHOICE = "Shoppers Choice",
  TOP_SELLING_PRODUCTS = "Top Selling Products",
  NEW_ARRIVAL = "New Arrival",
  TRAVELER_ADVENTURE_IN_STYLE = "Traveler Adventure In Style",
  GADGET_KEEPER_WORKING_ON_THE_GO = "Gadget Keeper: Working on the Go",
  FASHION_QUEENS_WHERE_FASHION_TALKS = "Fashion Queens - Where Fashion Talks",
  MONEY_KEEPER_VERSATILE_COMPANION = "Money Keeper Versatile Companion",
  DAPPER_EXECUTIVE_WHERE_STYLE_SHINES = "Dapper Executive - Where Style Shines",
}
