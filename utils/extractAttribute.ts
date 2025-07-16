// types.ts

export interface AttributeItem {
  id: string;
  name: string;
  attributeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attribute {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: AttributeItem[];
}

// utils/extractAttributes.ts

export const extractAttributes = (
  data: Attribute[] | undefined,
  attributeName: string
): string[] => {
  const attribute = data?.find((attr) => attr.name === attributeName);
  return attribute ? attribute?.items?.map((item) => item.name) : [];
};
