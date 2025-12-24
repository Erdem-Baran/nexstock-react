import axiosClient from "./axiosClient";
import type { Order } from "../types/order";

export const getOrders = async (): Promise<Order[]> => {
  const response = await axiosClient.get<Order[]>("/orders");
  return response.data;
};
