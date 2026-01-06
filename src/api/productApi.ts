import axiosClient from "./axiosClient";
import type { Product, ProductFormData } from "../types/product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};

export const addProduct = async (data: ProductFormData): Promise<Product> => {
  const newProduct = {
    ...data,
    id: Math.floor(Math.random() * 10000),
  };
  const response = await axiosClient.post<Product>("/products", newProduct);
  return response.data;
};

export const updateProduct = async ({ id, data }: { id: number; data: Partial<ProductFormData> }): Promise<Product> => {
  const response = await axiosClient.patch<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};