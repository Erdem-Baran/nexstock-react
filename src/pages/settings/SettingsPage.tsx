import { useState } from "react";
import {
  Save, Bell, Lock, Store, Mail, Sun, Moon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import type { RootState } from "../../store/store";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.mode);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Settings have been saved successfully! (Demo)");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your app preferences and account settings.
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          isLoading={isLoading} 
          icon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT MENU */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            <nav className="flex flex-col p-2 space-y-1">
              {[
                { id: "general", icon: Store, label: "General" },
                { id: "notifications", icon: Bell, label: "Notifications" },
                { id: "security", icon: Lock, label: "Security" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          
          {/* --- GENERAL SETTINGS --- */}
          {activeTab === "general" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Appearance</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => dispatch(setTheme("light"))}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      currentTheme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="font-semibold">Light Mode</span>
                  </button>

                  <button
                    onClick={() => dispatch(setTheme("dark"))}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      currentTheme === "dark"
                        ? "border-blue-500 bg-gray-900 text-white dark:bg-blue-900/50 dark:border-blue-500"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="font-semibold">Dark Mode</span>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Store Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Store Name" defaultValue="NexStock Technology" />
                <Input label="Email Address" defaultValue="info@nexstock.com" />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 dark:text-white">
                    <option value="USD">US Dollar ($)</option>
                    <option value="TRY">Turkish Lira (₺)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* --- NOTIFICATIONS --- */}
          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
               <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Low Stock Alert</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when stock is low.</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Weekly Report</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly summary via email.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {/* --- SECURITY --- */}
          {activeTab === "security" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password Change</h2>
              </div>

              <div className="space-y-4 max-w-md">
                <Input type="password" label="Current Password" placeholder="••••••••" />
                <Input type="password" label="New Password" placeholder="••••••••" />
                <Input type="password" label="Confirm Password" placeholder="••••••••" />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button variant="danger">Delete Account</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}