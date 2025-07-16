import { LuPackageCheck, LuPackageSearch, LuPackageX } from "react-icons/lu";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { z } from "zod";

// Define the schema for a single product item
export const productSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  sku: z.string(),
  isAvailable: z.boolean(),
  status: z.boolean(),
  productImage: z.string().url(),
  price: z.string(), // Assuming price is a string with a currency symbol, you might want to change this to a number if needed
  discountPrice: z.string(), // Same assumption as above
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  shoppingCartItems: z.array(z.unknown()), // Assuming this is an array of unknown objects
  inventories: z.object({
    id: z.string(),
    productId: z.string(),
    stockInQuantity: z.string(),
    restockInQuantity: z.string(),
    stockInDate: z.string().datetime(),
    restockDate: z.string().datetime(),
    expireDate: z.string().datetime(),
    supplierName: z.string(),
    warehouseLocation: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  product: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    categoryId: z.string().uuid(),
    brandId: z.string().uuid(),
    bundleDiscountId: z.string().uuid(),
    vendorId: z.string().uuid(),
    shippingId: z.string().uuid(),
    productCollectionId: z.string().uuid(),
    taxRuleId: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    reviews: z.array(z.unknown()), // Assuming this is an array of unknown objects
    promotion: z.array(z.unknown()), // Assuming this is an array of unknown objects
    productAttributes: z.array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
    ),
    category: z.object({
      id: z.string().uuid(),
      title: z.string(),
      description: z.string().nullable(),
      featured: z.boolean(),
      showInFooter: z.boolean(),
      status: z.boolean(),
      image: z.string().url(),
      parentId: z.string().uuid(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    brand: z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      image: z.string().url(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    taxRule: z.object({
      id: z.string().uuid(),
      title: z.string(),
      rate: z.string(), // Assuming rate is a string, change to number if necessary
      type: z.string(),
      status: z.boolean(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    productCollections: z.object({
      id: z.string().uuid(),
      title: z.string(),
      status: z.boolean(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    shipping: z.object({
      id: z.string().uuid(),
      title: z.string(),
      rate: z.string(), // Assuming rate is a string, change to number if necessary
      type: z.string(),
      updatedAt: z.string().datetime(),
      status: z.boolean(),
      createdAt: z.string().datetime(),
    }),
    vendor: z.object({
      id: z.string().uuid(),
      authId: z.string().uuid(),
      shopName: z.string(),
      email: z.string().email(),
      phone: z.string(),
      description: z.string().nullable(),
      nid: z.string(),
      nidCardImage: z.string().url().nullable(),
      isVerified: z.boolean(),
      isActive: z.boolean(),
      registrationDate: z.string().datetime(),
      averageRating: z.string(), // Assuming averageRating is a string, change to number if necessary
      totalItemsSold: z.number().nullable(),
      bloodGroup: z.string().nullable(),
      gender: z.string().nullable(),
      shopBanner: z.string().url().nullable(),
      shopLogo: z.string().url().nullable(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    bundleDiscount: z.object({
      id: z.string().uuid(),
      title: z.string(),
      free: z.string(), // Assuming free is a string, change to number if necessary
      buy: z.string(), // Assuming buy is a string, change to number if necessary
      image: z.string().url(),
      updatedAt: z.string().datetime(),
      status: z.boolean(),
      createdAt: z.string().datetime(),
    }),
    productImages: z.array(
      z.object({
        id: z.string().uuid(),
        imageUrl: z.string().url(),
        productId: z.string().uuid(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
    ),
  }),
  inventory: z.array(
    z.object({
      id: z.string().uuid(),
      productItemId: z.string().uuid(),
      totalSell: z.number(),
      qtyInStock: z.number(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    })
  ),
});

export type ProductItem = z.infer<typeof productSchema>;

export const statuses = [
  {
    value: "published",
    label: "Active",
    icon: MdPublishedWithChanges,
  },
  {
    value: "draft",
    label: "Draft",
    icon: RiDraftLine,
  },
  {
    value: "archived",
    label: "Archived",
    icon: MdOutlineUnpublished,
  },
];

export const priorities = [
  {
    value: "inStock",
    label: "InStock",
    icon: LuPackageCheck,
  },
  {
    value: "outOfStock",
    label: "OutOfStock",
    icon: LuPackageX,
  },
  {
    value: "preOrder",
    label: "PreOrder",
    icon: LuPackageSearch,
  },
];
