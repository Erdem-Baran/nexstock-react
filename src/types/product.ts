import { z } from "zod";

export interface Product{
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    lastUpdated: string;
}

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  status: z.enum(["In Stock", "Low Stock", "Out of Stock"]),
  image: z.any().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;