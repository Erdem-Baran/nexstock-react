import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

// FALSE DATA (For reports only)
const monthlyData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
  { name: 'Apr', sales: 2780, profit: 3908 },
  { name: 'May', sales: 1890, profit: 4800 },
  { name: 'Jun', sales: 2390, profit: 3800 },
  { name: 'Jul', sales: 3490, profit: 4300 },
];

const categoryPerformance = [
  { name: 'Electronic', value: 4000 },
  { name: 'Clothing', value: 3000 },
  { name: 'House', value: 2000 },
  { name: 'Sports', value: 2780 },
  { name: 'Cosmetics', value: 1890 },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* --- HEADING AND ACTIONS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Reports & Analysis</h1>
          <p className="text-gray-500 dark:text-gray-300">Take a detailed look at your business's performance metrics.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Calendar className="w-4 h-4" />
            This Year
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white dark:text-gray-100 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-blue-500 dark:from-blue-900 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Revenue (Annual)</p>
              <h3 className="text-3xl font-bold">$124,500</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            <TrendingUp className="w-4 h-4" />
            <span>12.5% increase compared to last year</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-500 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-950 text-sm font-medium mb-1">Average Cart Value</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">$450</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-700" />
            </div>
          </div>
          <p className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">+5.2% this month</p>
        </div>

        <div className="bg-white dark:bg-gray-500 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-950 text-sm font-medium mb-1">Return Rate</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">%2.4</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-700" />
            </div>
          </div>
          <p className="mt-4 text-sm text-red-600 dark:text-red-350 font-medium">Compared to last month -0.1% (Good)</p>
        </div>
      </div>

      {/* --- GRAPHICS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Monthly Income Analysis</h3>
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  formatter={(value: any) => [`₺${value}`, 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit/Loss Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Category Performance</h3>
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#6b7280', fontSize: 13}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{backgroundColor: '#fff', borderRadius: '8px'}}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}