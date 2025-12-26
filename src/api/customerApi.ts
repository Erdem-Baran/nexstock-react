import axiosClient from "./axiosClient";
import type { Customer } from "../types/customer";

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axiosClient.get<Customer[]>("/customers");
  return response.data;
};
