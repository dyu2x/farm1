import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  LayoutDashboard,
  PackageCheck,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Image,
  Layers,
  ShoppingBag,
  ArrowLeft,
  X,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
} from 'lucide-react';

import {
  FingerlingProduct,
  InquiryOrder,
  MonthlySalesSummary,
  FarmSettings,
  PriceTier,
  OrderStatus,
} from '../types';

interface AdminPanelProps {
  products: FingerlingProduct[];
  orders: InquiryOrder[];
  monthlySummaries: MonthlySalesSummary[];
  settings: FarmSettings;
  onUpdateProducts: (updated: FingerlingProduct[]) => void;
  onUpdateOrders: (updated: InquiryOrder[]) => void;
  onUpdateSettings: (updated: FarmSettings) => void;
  onExitAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  monthlySummaries,
  settings,
  onUpdateProducts,
  onUpdateOrders,
  onUpdateSettings,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'analytics' | 'orders' | 'reports' | 'settings'>('inventory');

  // New Fingerling Column/Size State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSizeInches, setNewSizeInches] = useState('');
  const [newSizeCm, setNewSizeCm] = useState('');
  const [newStock, setNewStock] = useState<number>(10000);
  const [newBasePrice, setNewBasePrice] = useState<number>(3.50);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80');
  const [newDesc, setNewDesc] = useState('');

  // Editing Product Image / Prices
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editImage, setEditImage] = useState('');
  const [editStock, setEditStock] = useState<number>(0);
  const [editTiers, setEditTiers] = useState<PriceTier[]>([]);

  // Settings State
  const [settingsAddress, setSettingsAddress] = useState(settings.farmAddress);
  const [settingsEmail, setSettingsEmail] = useState(settings.primaryEmail);
  const [settingsPhone, setSettingsPhone] = useState(settings.supportPhone);
  const [settingsThreshold, setSettingsThreshold] = useState(settings.lowStockThreshold);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Check Low Stock Items
  const lowStockItems = products.filter((p) => p.stockCount <= settings.lowStockThreshold);

  // Analytics Metrics
  const totalInquiries = orders.length;
  const totalFingerlingCount = products.reduce((sum, p) => sum + p.stockCount, 0);
  const totalRevenueAll = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  // Chart Data Formatting
  const COLORS = ['#3D6E3D', '#4E854E', '#D97706', '#637863', '#2E572E'];

  const orderStatusPieData = [
    { name: 'Pending', value: orders.filter((o) => o.status === 'Pending').length },
    { name: 'Contacted', value: orders.filter((o) => o.status === 'Contacted').length },
    { name: 'Confirmed', value: orders.filter((o) => o.status === 'Confirmed').length },
    { name: 'Completed', value: orders.filter((o) => o.status === 'Completed').length },
  ].filter((d) => d.value > 0);

  // Handlers
  const handleStartEditProduct = (product: FingerlingProduct) => {
    setEditingProductId(product.id);
    setEditImage(product.image);
    setEditStock(product.stockCount);
    setEditTiers([...product.priceTiers]);
  };

  const handleSaveProductEdit = (product: FingerlingProduct) => {
    const updated = products.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          image: editImage || p.image,
          stockCount: Number(editStock),
          priceTiers: editTiers,
          basePrice: editTiers[0]?.pricePerPc || p.basePrice,
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    setEditingProductId(null);
  };

  const handleAddTier = () => {
    const lastTier = editTiers[editTiers.length - 1];
    const newMin = lastTier ? (lastTier.maxQty || 5000) + 1 : 100;
    setEditTiers([...editTiers, { minQty: newMin, maxQty: null, pricePerPc: 2.50 }]);
  };

  const handleTierChange = (index: number, field: keyof PriceTier, value: any) => {
    const next = [...editTiers];
    next[index] = { ...next[index], [field]: value === '' ? null : Number(value) };
    setEditTiers(next);
  };

  const handleRemoveTier = (index: number) => {
    setEditTiers(editTiers.filter((_, i) => i !== index));
  };

  const handleAddNewFingerlingColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSizeInches) return;

    const newProd: FingerlingProduct = {
      id: `custom-${Date.now()}`,
      name: newName,
      sizeInInches: newSizeInches,
      sizeInCm: newSizeCm || `${(parseFloat(newSizeInches) * 2.54).toFixed(1)} cm`,
      image: newImage,
      stockCount: newStock,
      basePrice: newBasePrice,
      priceTiers: [
        { minQty: 100, maxQty: 1000, pricePerPc: newBasePrice },
        { minQty: 1001, maxQty: 5000, pricePerPc: newBasePrice * 0.9 },
        { minQty: 5001, maxQty: null, pricePerPc: newBasePrice * 0.8 },
      ],
      description: newDesc || `${newName} Clarias batrachus fingerlings grown in Santa Rita hatchery.`,
      growthPeriodDays: 90,
      survivalRateEstimate: '97 - 99%',
      bestFor: 'Grow-out ponds and tanks',
      isCustomAdded: true,
    };

    onUpdateProducts([...products, newProd]);
    setShowAddProductModal(false);
    setNewName('');
    setNewSizeInches('');
    setNewSizeCm('');
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    onUpdateOrders(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      farmAddress: settingsAddress,
      primaryEmail: settingsEmail,
      supportPhone: settingsPhone,
      lowStockThreshold: Number(settingsThreshold),
    });
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#121E12] text-[#C5D8C5] flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="bg-[#1A281A] border-b border-[#2D422D] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitAdmin}
            className="p-2 rounded-xl bg-[#233623] text-[#C5D8C5] hover:text-white hover:bg-[#2E572E] transition-colors flex items-center gap-2 text-xs font-bold"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Website</span>
          </button>
          <div className="h-6 w-[1px] bg-[#2D422D] hidden sm:block"></div>
          <div>
            <div className="font-serif font-black text-lg text-[#A8CDA8] flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-[#A8CDA8]" />
              Mesina Farms • Admin Portal
            </div>
            <div className="text-[11px] text-[#8FA38F]">
              Direct Route Management (/connect/admin) • Santa Rita, Pampanga
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Low Stock Badge Alert in Header */}
          {lowStockItems.length > 0 && (
            <div className="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{lowStockItems.length} Fingerling Size(s) Low Stock</span>
            </div>
          )}
          <span className="text-xs font-medium text-[#8FA38F] bg-[#233623] px-3 py-1.5 rounded-xl border border-[#2D422D]">
            {settings.supportPhone}
          </span>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#2D422D] pb-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'inventory'
                ? 'bg-[#3D6E3D] text-white shadow-lg'
                : 'bg-[#233623] text-[#8FA38F] hover:bg-[#2E572E] hover:text-[#E2EFE2]'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Inventory & Price Tiers</span>
            {lowStockItems.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'analytics'
                ? 'bg-[#3D6E3D] text-white shadow-lg'
                : 'bg-[#233623] text-[#8FA38F] hover:bg-[#2E572E] hover:text-[#E2EFE2]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Sales Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#3D6E3D] text-white shadow-lg'
                : 'bg-[#233623] text-[#8FA38F] hover:bg-[#2E572E] hover:text-[#E2EFE2]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Inquiry Orders ({orders.length})</span>
            {pendingOrders > 0 && (
              <span className="px-2 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-black rounded-full">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'reports'
                ? 'bg-[#3D6E3D] text-white shadow-lg'
                : 'bg-[#233623] text-[#8FA38F] hover:bg-[#2E572E] hover:text-[#E2EFE2]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Performance Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#3D6E3D] text-white shadow-lg'
                : 'bg-[#233623] text-[#8FA38F] hover:bg-[#2E572E] hover:text-[#E2EFE2]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Farm Settings</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY & PRICE TIER MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Header & Add Fingerling Column Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif font-black text-2xl text-[#E2EFE2]">
                  Clarias Batrachus Inventory & Pricing
                </h2>
                <p className="text-xs text-[#8FA38F]">
                  Update stock counts, tiered quantity rates, and product images. No feed products included.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Fingerling Size / Column</span>
              </button>
            </div>

            {/* Low Stock Warning Banner if applicable */}
            {lowStockItems.length > 0 && (
              <div className="bg-amber-950/80 border border-amber-500/50 rounded-2xl p-4 text-amber-200 text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">Low Stock Alert Triggered!</span>
                    The following size(s) are below the threshold of {settings.lowStockThreshold.toLocaleString()} pcs: {' '}
                    <strong>{lowStockItems.map((i) => `${i.name} (${i.stockCount.toLocaleString()} pcs)`).join(', ')}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Products List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => {
                const isEditing = editingProductId === product.id;
                const isLow = product.stockCount <= settings.lowStockThreshold;

                return (
                  <div
                    key={product.id}
                    className={`bg-[#1A281A] rounded-2xl border p-5 space-y-4 transition-all ${
                      isLow ? 'border-amber-500/60 shadow-lg' : 'border-[#2D422D]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover border border-[#2D422D]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-serif font-black text-lg text-[#E2EFE2] flex items-center gap-2">
                            {product.name}
                            <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-[#233623] text-[#C5D8C5]">
                              {product.sizeInInches}
                            </span>
                          </div>
                          <div className="text-xs text-[#8FA38F] mt-0.5">
                            Species: <em className="text-[#A8CDA8] font-serif">Clarias batrachus</em>
                          </div>
                        </div>
                      </div>

                      {/* Stock Count Badge */}
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-[#8FA38F] block uppercase">Current Stock</span>
                        <span
                          className={`font-mono font-black text-lg ${
                            isLow ? 'text-amber-400' : 'text-[#A8CDA8]'
                          }`}
                        >
                          {product.stockCount.toLocaleString()} pcs
                        </span>
                      </div>
                    </div>

                    {/* Quantity Price Tier Breakdown */}
                    <div className="bg-[#121E12] rounded-xl p-3 border border-[#2D422D] space-y-2">
                      <div className="text-[11px] font-bold text-[#8FA38F] uppercase tracking-wider flex justify-between">
                        <span>Quantity Tier Range</span>
                        <span>Price per Pc (₱)</span>
                      </div>

                      {product.priceTiers.map((tier, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-[#C5D8C5]">
                          <span>
                            {tier.minQty.toLocaleString()}
                            {tier.maxQty ? ` - ${tier.maxQty.toLocaleString()}` : '+'} pcs
                          </span>
                          <span className="font-mono font-bold text-[#A8CDA8]">₱{tier.pricePerPc.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Edit Drawer Trigger */}
                    {!isEditing ? (
                      <button
                        onClick={() => handleStartEditProduct(product)}
                        className="w-full py-2.5 rounded-xl bg-[#233623] hover:bg-[#2E572E] text-[#E2EFE2] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#A8CDA8]" />
                        <span>Edit Stock, Price Tiers & Product Image</span>
                      </button>
                    ) : (
                      /* Inline Product Editor Form */
                      <div className="bg-[#121E12] p-4 rounded-xl border border-[#3D6E3D] space-y-4 animate-in fade-in">
                        <div className="text-xs font-bold text-[#A8CDA8] uppercase tracking-wider flex justify-between">
                          <span>Editing {product.name}</span>
                          <button onClick={() => setEditingProductId(null)} className="text-[#8FA38F] hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Image URL Input */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8FA38F] mb-1">
                            Product Image URL
                          </label>
                          <input
                            type="text"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                            className="w-full bg-[#1A281A] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#3D6E3D]"
                          />
                        </div>

                        {/* Stock Input */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8FA38F] mb-1">
                            Inventory Stock Count (pcs)
                          </label>
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                            className="w-full bg-[#1A281A] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#3D6E3D]"
                          />
                        </div>

                        {/* Price Tiers Editor */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-bold text-[#8FA38F]">
                            <span>Quantity Price Tiers</span>
                            <button
                              type="button"
                              onClick={handleAddTier}
                              className="text-[#A8CDA8] hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add Tier
                            </button>
                          </div>

                          {editTiers.map((tier, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-2 items-center text-xs">
                              <input
                                type="number"
                                placeholder="Min"
                                value={tier.minQty}
                                onChange={(e) => handleTierChange(idx, 'minQty', e.target.value)}
                                className="col-span-4 bg-[#1A281A] border border-[#2D422D] rounded-lg px-2 py-1 text-white font-mono text-[11px]"
                              />
                              <input
                                type="number"
                                placeholder="Max (empty = +)"
                                value={tier.maxQty === null ? '' : tier.maxQty}
                                onChange={(e) => handleTierChange(idx, 'maxQty', e.target.value)}
                                className="col-span-4 bg-[#1A281A] border border-[#2D422D] rounded-lg px-2 py-1 text-white font-mono text-[11px]"
                              />
                              <input
                                type="number"
                                step="0.05"
                                placeholder="Price ₱"
                                value={tier.pricePerPc}
                                onChange={(e) => handleTierChange(idx, 'pricePerPc', e.target.value)}
                                className="col-span-3 bg-[#1A281A] border border-[#2D422D] rounded-lg px-2 py-1 text-[#A8CDA8] font-bold font-mono text-[11px]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveTier(idx)}
                                className="col-span-1 text-[#8FA38F] hover:text-red-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => setEditingProductId(null)}
                            className="px-4 py-2 rounded-xl bg-[#233623] text-[#C5D8C5] font-semibold text-xs hover:bg-[#2E572E]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveProductEdit(product)}
                            className="px-5 py-2 rounded-xl bg-[#3D6E3D] text-white font-bold text-xs shadow-md hover:bg-[#2E572E] flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: REAL-TIME SALES ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1A281A] p-5 rounded-2xl border border-[#2D422D] space-y-2">
                <span className="text-xs font-bold text-[#8FA38F] uppercase tracking-wider block">Total Inquiries</span>
                <span className="font-mono font-black text-3xl text-[#A8CDA8]">{totalInquiries} orders</span>
                <span className="text-[11px] text-[#8FA38F] block">Active pipeline orders</span>
              </div>

              <div className="bg-[#1A281A] p-5 rounded-2xl border border-[#2D422D] space-y-2">
                <span className="text-xs font-bold text-[#8FA38F] uppercase tracking-wider block">Total Hatchery Stock</span>
                <span className="font-mono font-black text-3xl text-cyan-400">{totalFingerlingCount.toLocaleString()} pcs</span>
                <span className="text-[11px] text-[#8FA38F] block">Available across sizes</span>
              </div>

              <div className="bg-[#1A281A] p-5 rounded-2xl border border-[#2D422D] space-y-2">
                <span className="text-xs font-bold text-[#8FA38F] uppercase tracking-wider block">Total Sales Pipeline</span>
                <span className="font-mono font-black text-3xl text-[#E2EFE2]">₱{totalRevenueAll.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                <span className="text-[11px] text-[#8FA38F] block">Generated order inquiries</span>
              </div>

              <div className="bg-[#1A281A] p-5 rounded-2xl border border-[#2D422D] space-y-2">
                <span className="text-xs font-bold text-[#8FA38F] uppercase tracking-wider block">Average Order Value</span>
                <span className="font-mono font-black text-3xl text-amber-400">
                  ₱{(totalInquiries ? totalRevenueAll / totalInquiries : 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[11px] text-[#8FA38F] block">Per customer inquiry</span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Monthly Sales Revenue Trend */}
              <div className="lg:col-span-8 bg-[#1A281A] p-6 rounded-3xl border border-[#2D422D] space-y-4">
                <h3 className="font-serif font-black text-xl text-[#E2EFE2]">Monthly Sales Revenue Trend (2026)</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySummaries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D422D" />
                      <XAxis dataKey="month" stroke="#8FA38F" fontSize={11} />
                      <YAxis stroke="#8FA38F" fontSize={11} tickFormatter={(v) => `₱${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#121E12', borderColor: '#2D422D', borderRadius: '12px' }}
                        formatter={(val: any) => [`₱${Number(val).toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="totalRevenue" fill="#3D6E3D" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Order Status Breakdown */}
              <div className="lg:col-span-4 bg-[#1A281A] p-6 rounded-3xl border border-[#2D422D] space-y-4 flex flex-col justify-between">
                <h3 className="font-serif font-black text-xl text-[#E2EFE2]">Order Pipeline Distribution</h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={75}
                        label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {orderStatusPieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#121E12', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1 text-xs text-[#8FA38F]">
                  <div className="flex justify-between"><span>Pending:</span><span className="font-bold text-amber-400">{orders.filter((o) => o.status === 'Pending').length}</span></div>
                  <div className="flex justify-between"><span>Confirmed:</span><span className="font-bold text-[#A8CDA8]">{orders.filter((o) => o.status === 'Confirmed').length}</span></div>
                  <div className="flex justify-between"><span>Completed:</span><span className="font-bold text-cyan-400">{orders.filter((o) => o.status === 'Completed').length}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDER INQUIRIES */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif font-black text-2xl text-[#E2EFE2]">Customer Order Inquiries</h2>
                <p className="text-xs text-[#8FA38F]">Manage buyer requests, update pickup dates, and change fulfillment status.</p>
              </div>
            </div>

            <div className="bg-[#1A281A] rounded-2xl border border-[#2D422D] overflow-x-auto">
              <table className="w-full text-left text-xs text-[#C5D8C5]">
                <thead className="bg-[#121E12] text-[#8FA38F] uppercase text-[10px] tracking-wider font-bold border-b border-[#2D422D]">
                  <tr>
                    <th className="p-4">Ref No.</th>
                    <th className="p-4">Customer & Contact</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Total Pcs</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Fulfillment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D422D]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#121E12]/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#A8CDA8]">{order.referenceNo}</td>
                      <td className="p-4">
                        <div className="font-bold text-[#E2EFE2]">{order.customerName}</div>
                        <div className="text-[11px] text-[#8FA38F]">{order.phone}</div>
                      </td>
                      <td className="p-4">{order.townCity}, {order.province}</td>
                      <td className="p-4 font-mono font-bold">{order.totalQuantity.toLocaleString()} pcs</td>
                      <td className="p-4 font-mono font-black text-[#A8CDA8]">₱{order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-4 capitalize">{order.deliveryOption} ({order.preferredDate})</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'Confirmed'
                              ? 'bg-[#3D6E3D]/30 text-[#A8CDA8] border border-[#3D6E3D]'
                              : order.status === 'Completed'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-[#233623] border border-[#2D422D] text-white text-xs font-semibold rounded-lg px-2 py-1 outline-none focus:border-[#3D6E3D]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MONTHLY SALES PERFORMANCE SUMMARIES & REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif font-black text-2xl text-[#E2EFE2]">Monthly Sales Performance Summaries</h2>
                <p className="text-xs text-[#8FA38F]">Historical performance summaries for informed hatchery management decision making.</p>
              </div>

              <button
                onClick={() => {
                  alert('Generating official Monthly Hatchery Performance Summary PDF/CSV report...');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#233623] hover:bg-[#2E572E] text-white font-bold text-xs border border-[#2D422D] flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#A8CDA8]" />
                <span>Export Monthly Summary (CSV)</span>
              </button>
            </div>

            <div className="bg-[#1A281A] rounded-2xl border border-[#2D422D] overflow-x-auto">
              <table className="w-full text-left text-xs text-[#C5D8C5]">
                <thead className="bg-[#121E12] text-[#8FA38F] uppercase text-[10px] tracking-wider font-bold border-b border-[#2D422D]">
                  <tr>
                    <th className="p-4">Month / Year</th>
                    <th className="p-4">Total Orders</th>
                    <th className="p-4">Fingerlings Sold</th>
                    <th className="p-4">Gross Revenue</th>
                    <th className="p-4">Top Selling Fingerling Size</th>
                    <th className="p-4">Fulfillment Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D422D]">
                  {monthlySummaries.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[#121E12]/50 transition-colors">
                      <td className="p-4 font-bold text-[#E2EFE2]">{m.month}</td>
                      <td className="p-4 font-mono">{m.totalOrders} orders</td>
                      <td className="p-4 font-mono font-bold text-[#A8CDA8]">{m.totalFingerlingsSold.toLocaleString()} pcs</td>
                      <td className="p-4 font-mono font-black text-[#A8CDA8]">₱{m.totalRevenue.toLocaleString()}</td>
                      <td className="p-4 text-[#C5D8C5]">{m.topSellingSize}</td>
                      <td className="p-4 font-mono font-bold text-cyan-400">{m.fulfillmentRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FARM SETTINGS PANEL */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-[#1A281A] rounded-3xl p-6 border border-[#2D422D] space-y-6">
            <div>
              <h2 className="font-serif font-black text-2xl text-[#E2EFE2]">Farm Settings & Contact Details</h2>
              <p className="text-xs text-[#8FA38F]">Update farm address, primary contact email, phone number, and stock alert limits directly.</p>
            </div>

            {settingsSavedNotice && (
              <div className="p-3 bg-[#3D6E3D]/30 border border-[#3D6E3D] text-[#A8CDA8] text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A8CDA8]" />
                <span>Settings saved successfully! Website headers and footers updated instantly.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#8FA38F] mb-1">
                  Farm Physical Address
                </label>
                <input
                  type="text"
                  required
                  value={settingsAddress}
                  onChange={(e) => setSettingsAddress(e.target.value)}
                  className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-3 text-xs font-semibold text-white outline-none focus:border-[#3D6E3D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8FA38F] mb-1">
                    Primary Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-3 text-xs font-semibold text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8FA38F] mb-1">
                    Support Mobile / Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsPhone}
                    onChange={(e) => setSettingsPhone(e.target.value)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-3 text-xs font-semibold text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8FA38F] mb-1">
                  Low Stock Notification Threshold (pcs)
                </label>
                <input
                  type="number"
                  step="500"
                  required
                  value={settingsThreshold}
                  onChange={(e) => setSettingsThreshold(Number(e.target.value))}
                  className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-3 text-xs font-semibold text-white outline-none focus:border-[#3D6E3D]"
                />
                <span className="text-[11px] text-[#8FA38F] mt-1 block">
                  Fingerling sizes with stock below this count will trigger low stock alert badges on dashboard & header.
                </span>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Farm Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add New Column / Fingerling Size Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#1A281A] rounded-3xl max-w-lg w-full p-6 border border-[#2D422D] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#2D422D]">
              <h3 className="font-serif font-black text-xl text-[#E2EFE2]">Add New Fingerling Size / Column</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-[#8FA38F] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewFingerlingColumn} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#8FA38F] mb-1">Fingerling Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Super Jumbo Stocker"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white font-semibold outline-none focus:border-[#3D6E3D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#8FA38F] mb-1">Size Range (Inches) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5.0 - 6.0 in"
                    value={newSizeInches}
                    onChange={(e) => setNewSizeInches(e.target.value)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#8FA38F] mb-1">Size Range (cm)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12.7 - 15.2 cm"
                    value={newSizeCm}
                    onChange={(e) => setNewSizeCm(e.target.value)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#8FA38F] mb-1">Initial Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#8FA38F] mb-1">Base Price (₱) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newBasePrice}
                    onChange={(e) => setNewBasePrice(Number(e.target.value))}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white font-semibold text-[#A8CDA8] outline-none focus:border-[#3D6E3D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#8FA38F] mb-1">Product Image URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white font-mono text-[11px] outline-none focus:border-[#3D6E3D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#8FA38F] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Details regarding fingerling size suitability..."
                  className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl p-2.5 text-white outline-none focus:border-[#3D6E3D]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#233623] text-[#C5D8C5] font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-md"
                >
                  Add Size Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
