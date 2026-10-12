import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  CreditCard,
  Gem,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useGold } from '../../context/GoldContext';

export const AdminDashboard: React.FC = () => {
  const { subscriptions, payments, enquiries, products, goldRates } = useGold();

  // Metrics
  const totalCollections = payments
    .filter((p) => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0);

  const activeMembers = subscriptions.filter((s) => s.status === 'ACTIVE').length;
  const maturedMembers = subscriptions.filter((s) => s.status === 'MATURED').length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;

  // Chart Data: Monthly Collections (₹ in Lakhs)
  const monthlyCollectionsData = [
    { month: 'Apr', amount: 8.5 },
    { month: 'May', amount: 11.2 },
    { month: 'Jun', amount: 14.8 },
    { month: 'Jul', amount: 16.5 },
    { month: 'Aug', amount: 19.4 },
    { month: 'Sep', amount: 23.0 },
    { month: 'Oct (Current)', amount: 28.5 }
  ];

  // Category Distribution Data
  const categorySplitData = [
    { name: 'Antique Bangles', value: 8, color: '#D4AF37' },
    { name: 'Temple Necklaces', value: 6, color: '#E5B544' },
    { name: 'Bridal Kadas', value: 5, color: '#B88B24' },
    { name: 'Royal Chokers', value: 4, color: '#F3C658' },
    { name: 'Bullion Coins', value: 3, color: '#8E6719' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#261E15]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            MANAGEMENT OVERVIEW
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#FBF7F0]">
            Bullion Operations & KPI Dashboard
          </h1>
          <p className="text-xs text-[#9E9080] mt-0.5">
            Real-time synchronization across Hyderabad & Bengaluru flagships.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#1C1611] border border-[#3A2E1F] text-[#E5B544] text-xs font-mono font-bold px-3 py-1.5 rounded-xs">
            22K: ₹{goldRates.gold22k}/g | 24K: ₹{goldRates.gold24k}/g
          </span>
        </div>
      </div>

      {/* KPI Cards (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Collections */}
        <div className="bg-[#14100D] border border-[#352B1E] p-5 rounded-sm space-y-2 hover:border-[#8A6D3B] transition-colors">
          <div className="flex items-center justify-between text-[#A89D8F]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Collections</span>
            <div className="w-8 h-8 rounded bg-[#1F1710] border border-[#4A3B24] flex items-center justify-center text-[#E5B544]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#FBF7F0]">
            ₹{(totalCollections / 100000).toFixed(2)} Lakhs
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% growth vs last month</span>
          </div>
        </div>

        {/* Active Scheme Subscribers */}
        <div className="bg-[#14100D] border border-[#352B1E] p-5 rounded-sm space-y-2 hover:border-[#8A6D3B] transition-colors">
          <div className="flex items-center justify-between text-[#A89D8F]">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Subscribers</span>
            <div className="w-8 h-8 rounded bg-[#1F1710] border border-[#4A3B24] flex items-center justify-center text-[#E5B544]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#FBF7F0]">
            {activeMembers} Active
          </div>
          <div className="text-[11px] text-[#8A7E70]">
            {maturedMembers} matured awaiting bonus redemption
          </div>
        </div>

        {/* Live Catalog Products */}
        <div className="bg-[#14100D] border border-[#352B1E] p-5 rounded-sm space-y-2 hover:border-[#8A6D3B] transition-colors">
          <div className="flex items-center justify-between text-[#A89D8F]">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog Masterpieces</span>
            <div className="w-8 h-8 rounded bg-[#1F1710] border border-[#4A3B24] flex items-center justify-center text-[#E5B544]">
              <Gem className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#FBF7F0]">
            {products.length} Designs
          </div>
          <div className="text-[11px] text-emerald-400">
            100% In-Stock & BIS Hallmarked
          </div>
        </div>

        {/* Pending Enquiries */}
        <div className="bg-[#14100D] border border-[#352B1E] p-5 rounded-sm space-y-2 hover:border-[#8A6D3B] transition-colors">
          <div className="flex items-center justify-between text-[#A89D8F]">
            <span className="text-xs font-semibold uppercase tracking-wider">Priority Enquiries</span>
            <div className="w-8 h-8 rounded bg-[#1F1710] border border-[#4A3B24] flex items-center justify-center text-[#E5B544]">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#E5B544]">
            {newEnquiries} New Leads
          </div>
          <div className="text-[11px] text-[#A89D8F]">
            Avg. response speed: ~18 mins
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Collections Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#14100D] border border-[#2D2419] rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#211A12]">
            <div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FBF7F0]">
                Monthly Scheme Collections
              </h3>
              <p className="text-[11px] text-[#8A7E70]">
                Swarna Sanchay installments received in ₹ Lakhs (2025)
              </p>
            </div>
            <span className="text-xs text-[#E5B544] font-semibold">Total ₹28.5L</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCollectionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#6E5D4B" fontSize={11} />
                <YAxis stroke="#6E5D4B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16120E',
                    border: '1px solid #5E4A28',
                    borderRadius: '4px',
                    color: '#FBF7F0',
                    fontSize: '11px'
                  }}
                  formatter={(val: any) => [`₹${val} Lakhs`, 'Collections']}
                />
                <Bar dataKey="amount" fill="#D4AF37" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Split Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-[#14100D] border border-[#2D2419] rounded-sm p-5 space-y-4">
          <div className="pb-3 border-b border-[#211A12]">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FBF7F0]">
              Inventory by Category
            </h3>
            <p className="text-[11px] text-[#8A7E70]">Distribution across curated ateliers</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categorySplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16120E',
                    border: '1px solid #5E4A28',
                    borderRadius: '4px',
                    color: '#FBF7F0',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#A89D8F] pt-2 border-t border-[#211A12]">
            {categorySplitData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-[#14100D] border border-[#2D2419] rounded-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#211A12]">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FBF7F0]">
            Live Activity Feed & Latest Transactions
          </h3>
          <Link to="/admin/payments" className="text-xs text-[#E5B544] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18130F] text-[#8A7E70] uppercase tracking-wider text-[10px] border-b border-[#211A12]">
              <tr>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Receipt No</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1710] text-[#B3A696]">
              {payments.slice(0, 5).map((pay) => (
                <tr key={pay.id} className="hover:bg-[#1A1612]">
                  <td className="py-3 px-3 font-semibold text-[#FBF7F0]">{pay.customerName}</td>
                  <td className="py-3 px-3 font-mono text-[#D4AF37]">{pay.receiptNumber}</td>
                  <td className="py-3 px-3 font-bold text-[#FBF7F0]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">{pay.paymentMethod}</td>
                  <td className="py-3 px-3 text-[#7A6E60]">{pay.date} {pay.time}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
