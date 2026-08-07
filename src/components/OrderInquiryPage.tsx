import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Truck,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  Search,
  Package,
  Clock,
  Sparkles,
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { InquiryItem, InquiryOrder, FarmSettings, FingerlingProduct } from '../types';

interface OrderInquiryPageProps {
  items: InquiryItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSubmitInquiry: (
    orderData: Omit<InquiryOrder, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ) => Promise<InquiryOrder>;
  settings: FarmSettings;
  orders: InquiryOrder[];
  products: FingerlingProduct[];
  onNavigate: (page: string) => void;
}

export const OrderInquiryPage: React.FC<OrderInquiryPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitInquiry,
  settings,
  orders,
  products,
  onNavigate,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [townCity, setTownCity] = useState('Santa Rita');
  const [province, setProvince] = useState('Pampanga');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<InquiryOrder | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Lookup State
  const [lookupRef, setLookupRef] = useState('');
  const [foundOrder, setFoundOrder] = useState<InquiryOrder | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalOxygenBags = Math.ceil(totalQuantity / settings.oxygenPackingCapacityPerBag);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const newOrder = await onSubmitInquiry({
        customerName,
        phone,
        email: email || settings.primaryEmail,
        townCity,
        province,
        deliveryOption,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        items,
        totalQuantity,
        totalAmount,
        notes,
      });

      setSubmittedOrder(newOrder);
      onClearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = (refNo: string) => {
    navigator.clipboard.writeText(refNo);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupAttempted(true);
    const cleanRef = lookupRef.trim().toUpperCase();
    const match = orders.find(
      (o) => o.referenceNo.toUpperCase() === cleanRef || o.id.toUpperCase() === cleanRef
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="py-12 lg:py-20 bg-[#F7F9F7] dark:bg-[#121E12] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider border border-[#D1D9D1] dark:border-[#2D422D]">
            <ShoppingBag className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Direct Hatchery Booking
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A2E1A] dark:text-[#E2EFE2] tracking-tight">
            Order Inquiry & <span className="text-[#3D6E3D] dark:text-[#A8CDA8]">Reservation</span>
          </h1>
          <p className="text-sm sm:text-base text-[#637863] dark:text-[#8FA38F]">
            Reserve your batch of high-viability <em className="text-[#3D6E3D] dark:text-[#A8CDA8] font-serif">Clarias batrachus</em> fingerlings directly from Mesina Farms in Santa Rita, Pampanga.
          </p>
        </div>

        {/* Success Modal / State */}
        {submittedOrder ? (
          <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-8 sm:p-12 border border-[#D1D9D1] dark:border-[#2D422D] shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                Inquiry Successfully Submitted!
              </h2>
              <p className="text-sm text-[#637863] dark:text-[#8FA38F] max-w-md mx-auto">
                Thank you, <strong className="text-[#1A2E1A] dark:text-[#E2EFE2]">{submittedOrder.customerName}</strong>. Our farm manager will contact you at <strong className="text-[#3D6E3D] dark:text-[#A8CDA8]">{submittedOrder.phone}</strong> to confirm your batch allocation and pickup schedule.
              </p>
            </div>

            {/* Reference Number Box */}
            <div className="bg-[#EDF1ED] dark:bg-[#121E12] p-5 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#637863] dark:text-[#8FA38F]">
                  Order Reference No.
                </span>
                <span className="font-mono text-xl font-black text-[#3D6E3D] dark:text-[#A8CDA8]">
                  {submittedOrder.referenceNo}
                </span>
              </div>
              <button
                onClick={() => handleCopyRef(submittedOrder.referenceNo)}
                className="px-3.5 py-2 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              >
                {copiedRef ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRef ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Summary Details */}
            <div className="bg-[#EDF1ED]/50 dark:bg-[#121E12]/50 rounded-2xl p-6 text-left border border-[#D1D9D1] dark:border-[#2D422D] space-y-3 max-w-md mx-auto text-xs text-[#2A3B2A] dark:text-[#C5D8C5]">
              <div className="flex justify-between pb-2 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                <span>Fingerling Items:</span>
                <span className="font-bold">{submittedOrder.items.length} size type(s)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                <span>Total Quantity:</span>
                <span className="font-bold">{submittedOrder.totalQuantity.toLocaleString()} pcs</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                <span>Option & Location:</span>
                <span className="font-bold capitalize">{submittedOrder.deliveryOption} ({submittedOrder.townCity}, {submittedOrder.province})</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2]">
                <span>Estimated Total:</span>
                <span className="text-[#3D6E3D] dark:text-[#A8CDA8]">₱{submittedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => setSubmittedOrder(null)}
                className="px-6 py-3 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs transition-colors"
              >
                Submit Another Inquiry
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] border border-[#D1D9D1] dark:border-[#2D422D] hover:bg-[#E0E7E0] font-semibold text-xs transition-colors"
              >
                Back to Fingerling Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Selected Items & Oxygen Bag Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-6 sm:p-8 border border-[#D1D9D1] dark:border-[#2D422D] shadow-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                        1. Inquiry Items ({items.length})
                      </h2>
                      <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                        Review quantities and calculated wholesale tier pricing
                      </p>
                    </div>
                  </div>

                  {items.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear List
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EDF1ED] dark:bg-[#121E12] flex items-center justify-center mx-auto text-[#637863]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">
                        Your Inquiry List is Empty
                      </p>
                      <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                        Select fingerling sizes from our catalog to build your inquiry request.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-md shadow-[#3D6E3D]/20 transition-all"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-2xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-[#D1D9D1] dark:border-[#2D422D]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h3 className="font-serif font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2]">
                              {item.product.name}
                            </h3>
                            <span className="text-xs text-[#3D6E3D] dark:text-[#A8CDA8] font-mono">
                              {item.product.sizeRange}
                            </span>
                            <div className="text-[11px] text-[#637863] dark:text-[#8FA38F]">
                              Rate: ₱{item.calculatedUnitPrice.toFixed(2)}/pc
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-white dark:bg-[#1A281A] p-1 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 500)}
                              className="p-1.5 rounded-lg hover:bg-[#EDF1ED] dark:hover:bg-[#233623] text-[#2A3B2A] dark:text-[#C5D8C5] transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value) || 0)}
                              className="w-20 text-center font-mono font-bold text-xs bg-transparent focus:outline-none text-[#1A2E1A] dark:text-[#E2EFE2]"
                            />
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 500)}
                              className="p-1.5 rounded-lg hover:bg-[#EDF1ED] dark:hover:bg-[#233623] text-[#2A3B2A] dark:text-[#C5D8C5] transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="block font-mono font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2]">
                              ₱{item.totalPrice.toLocaleString()}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[11px] text-rose-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Oxygen Packing & Total Banner */}
                    <div className="bg-[#EDF1ED] dark:bg-[#121E12] p-5 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#2A3B2A] dark:text-[#C5D8C5]">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                          Oxygen Bag Estimate (~{settings.oxygenPackingCapacityPerBag} pcs/bag):
                        </span>
                        <span className="font-bold font-mono text-[#3D6E3D] dark:text-[#A8CDA8]">
                          {totalOxygenBags} Bag(s) Required
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#D1D9D1] dark:border-[#2D422D]">
                        <div>
                          <span className="text-xs text-[#637863] dark:text-[#8FA38F] block">
                            Total Quantity: {totalQuantity.toLocaleString()} pcs
                          </span>
                          <span className="font-serif font-black text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                            Estimated Total
                          </span>
                        </div>
                        <span className="font-mono font-black text-2xl text-[#3D6E3D] dark:text-[#A8CDA8]">
                          ₱{totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Status Tracker & Reference Lookup */}
              <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-6 sm:p-8 border border-[#D1D9D1] dark:border-[#2D422D] shadow-md space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                  <div className="p-2 rounded-xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#1A2E1A] dark:text-[#E2EFE2]">
                      Lookup Existing Order Inquiry Status
                    </h2>
                    <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                      Check the status of a previously submitted inquiry by Reference No.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLookup} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Ref No. (e.g. MF-2026-1001)"
                    value={lookupRef}
                    onChange={(e) => setLookupRef(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs font-mono text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs transition-colors"
                  >
                    Lookup
                  </button>
                </form>

                {lookupAttempted && (
                  foundOrder ? (
                    <div className="p-4 rounded-2xl bg-[#EDF1ED] dark:bg-[#121E12] border border-[#3D6E3D]/40 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#3D6E3D] dark:text-[#A8CDA8] text-sm">
                          {foundOrder.referenceNo}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          foundOrder.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : foundOrder.status === 'Confirmed'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          ● {foundOrder.status}
                        </span>
                      </div>
                      <div className="text-[#637863] dark:text-[#8FA38F] space-y-1">
                        <p>Customer: <strong className="text-[#1A2E1A] dark:text-[#E2EFE2]">{foundOrder.customerName}</strong> ({foundOrder.phone})</p>
                        <p>Quantity: <strong className="text-[#1A2E1A] dark:text-[#E2EFE2]">{foundOrder.totalQuantity.toLocaleString()} pcs</strong> | Total: <strong className="text-[#3D6E3D] dark:text-[#A8CDA8]">₱{foundOrder.totalAmount.toLocaleString()}</strong></p>
                        <p>Preferred Date: {foundOrder.preferredDate} ({foundOrder.deliveryOption})</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-rose-500 font-medium">
                      No order found matching "{lookupRef}". Please verify your reference number.
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Right Column: Customer Details & Submission Form (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#1A281A] rounded-3xl p-6 sm:p-8 border border-[#D1D9D1] dark:border-[#2D422D] shadow-md space-y-6">
              <div className="pb-4 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                <h2 className="font-serif font-bold text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                  2. Contact & Delivery Info
                </h2>
                <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                  Provide contact info so our hatchery manager can reach out
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0917 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="optional"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={townCity}
                      onChange={(e) => setTownCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                      Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                    />
                  </div>
                </div>

                {/* Delivery Option Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1.5">
                    Order Fulfillment
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('pickup')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        deliveryOption === 'pickup'
                          ? 'bg-[#E0E7E0] dark:bg-[#1E341E] border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]'
                          : 'bg-[#F7F9F7] dark:bg-[#121E12] border-[#D1D9D1] dark:border-[#2D422D] text-[#637863]'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                      <div>
                        <div>Farm Pickup</div>
                        <div className="text-[10px] font-normal opacity-80">Free oxygen packing</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('delivery')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        deliveryOption === 'delivery'
                          ? 'bg-[#E0E7E0] dark:bg-[#1E341E] border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]'
                          : 'bg-[#F7F9F7] dark:bg-[#121E12] border-[#D1D9D1] dark:border-[#2D422D] text-[#637863]'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                      <div>
                        <div>Direct Delivery</div>
                        <div className="text-[10px] font-normal opacity-80">Luzon transport fee</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                    Preferred Pickup / Delivery Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] mb-1">
                    Additional Instructions or Pond System
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify pond size (e.g., 500 sqm earthen pond) or custom requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] disabled:bg-[#8FA38F] text-white font-bold text-sm shadow-lg shadow-[#3D6E3D]/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry to Mesina Farms</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-[11px] text-[#637863] dark:text-[#8FA38F] pt-2 justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  <span>No upfront online payment required for initial inquiry.</span>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
