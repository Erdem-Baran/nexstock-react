export interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  itemsCount: number;
}
