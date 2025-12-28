import './App.css'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import DashboardLayout from './layouts/DashboardLayout'
import {Routes, Route} from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import ReportsPage from './pages/reports/ReportsPage'
import OrderListPage from './pages/orders/OrderListPage'
import CustomersPage from './pages/customers/CustomersPage'
import SettingsPage from './pages/settings/SettingsPage'
import ProductsPage from './pages/inventory/ProductsPage'

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="inventory" element={<ProductsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="orders" element={<OrderListPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App
