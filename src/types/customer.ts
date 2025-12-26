export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  totalSpent: number;
  joinDate: string;
}
