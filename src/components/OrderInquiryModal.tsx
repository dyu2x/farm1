import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, CheckCircle2, Phone, Mail, MapPin, Calendar, Truck, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { InquiryItem, InquiryOrder, FarmSettings } from '../types';

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSubmitInquiry: (orderData: Omit<InquiryOrder, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => Promise<InquiryOrder>;
  settings: FarmSettings;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitInquiry,
  settings,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [townCity, setTownCity] = useState('Ivisan');
  const [province, setProvince] = useState('Capiz');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<InquiryOrder | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

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

  const handleCopyRef = () => {
    if (submittedOrder) {
      navigator.clipboard.writeText(submittedOrder.referenceNo);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A281A] rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#D1D9D1] dark:border-[#2D422D] shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#D1D9D1] dark:border-[#2D422D] flex items-center justify-between bg-[#F7F9F7] dark:bg-[#121E12]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                {submittedOrder ? 'Inquiry Submitted!' : 'Fingerling Order Inquiry'}
              </h3>
              <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                {submittedOrder
                  ? 'Your reference number is generated below'
                  : 'Review selected sizes and send direct inquiry to Mesina Farms'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmittedOrder(null);
              onClose();
            }}
            className="p-2 rounded-xl text-[#637863] dark:text-[#8FA38F] hover:text-[#1A2E1A] dark:hover:text-[#E2EFE2] hover:bg-[#EDF1ED] dark:hover:bg-[#233623] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submittedOrder ? (
            /* Confirmation Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#637863] dark:text-[#8FA38F] uppercase tracking-widest block mb-1">
                  Inquiry Reference Number
                </span>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D]">
                  <span className="font-mono font-black text-2xl text-[#3D6E3D] dark:text-[#A8CDA8]">
                    {submittedOrder.referenceNo}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="p-1.5 rounded-lg bg-white dark:bg-[#1A281A] text-[#2A3B2A] dark:text-[#C5D8C5] hover:text-[#3D6E3D] transition-colors"
                    title="Copy Reference"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-[#3D6E3D]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-[#F7F9F7] dark:bg-[#121E12] p-4 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#637863] dark:text-[#8FA38F]">Customer:</span>
                  <span className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">{submittedOrder.customerName} ({submittedOrder.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#637863] dark:text-[#8FA38F]">Total Fingerlings:</span>
                  <span className="font-bold text-[#3D6E3D] dark:text-[#A8CDA8]">{submittedOrder.totalQuantity.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#637863] dark:text-[#8FA38F]">Estimated Total:</span>
                  <span className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">₱{submittedOrder.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#637863] dark:text-[#8FA38F]">Pickup/Delivery:</span>
                  <span className="font-semibold text-[#2A3B2A] dark:text-[#C5D8C5] capitalize">{submittedOrder.deliveryOption} ({submittedOrder.townCity}, {submittedOrder.province})</span>
                </div>
              </div>

              <p className="text-xs text-[#637863] dark:text-[#8FA38F] leading-relaxed max-w-md mx-auto">
                Our farm manager at Ivisan, Capiz will verify stock availability and call you at <strong className="text-[#1A2E1A] dark:text-[#E2EFE2]">{submittedOrder.phone}</strong> shortly to finalize oxygen packaging and schedule.
              </p>

              {/* Direct Communication Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Support ({settings.supportPhone})
                </a>
                <a
                  href={`mailto:${settings.primaryEmail}?subject=Inquiry%20${submittedOrder.referenceNo}&body=Hello%20Mesina%20Farms,%20I%20have%20submitted%20an%20inquiry%20with%20ref%20${submittedOrder.referenceNo}`}
                  className="py-3 px-4 rounded-xl bg-[#2E572E] hover:bg-[#234523] text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#2D422D]"
                >
                  <Mail className="w-4 h-4 text-[#A8CDA8]" />
                  Email Farm Manager
                </a>
              </div>
            </div>
          ) : (
            /* Inquiry Form & Item List */
            <>
              {items.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-[#637863] dark:text-[#8FA38F]" />
                  <p className="text-base font-semibold text-[#1A2E1A] dark:text-[#E2EFE2]">
                    Your inquiry list is empty
                  </p>
                  <p className="text-xs text-[#637863] dark:text-[#8FA38F] max-w-sm mx-auto">
                    Select fingerling sizes from the catalog to calculate volume discounts and request an order.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Summary List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-[#637863] dark:text-[#8FA38F] uppercase tracking-wider">
                      <span>Selected Items ({items.length})</span>
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-amber-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                      </button>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">
                                {item.product.name} ({item.product.sizeInInches})
                              </div>
                              <div className="text-[#637863] dark:text-[#8FA38F] text-[11px]">
                                ₱{item.calculatedUnitPrice.toFixed(2)}/pc
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="font-mono font-bold text-[#2A3B2A] dark:text-[#C5D8C5]">
                              {item.quantity.toLocaleString()} pcs
                            </div>
                            <div className="font-black text-[#3D6E3D] dark:text-[#A8CDA8] w-20 text-right">
                              ₱{item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#637863] dark:text-[#8FA38F] hover:text-red-500 transition-colors p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Oxygenated Bags Summary Banner */}
                    <div className="bg-[#E0E7E0] dark:bg-[#1E341E] p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D] flex items-center justify-between text-xs text-[#1A2E1A] dark:text-[#E2EFE2]">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                        <span>Estimated Oxygenated Bags Needed:</span>
                      </span>
                      <span className="font-bold">{totalOxygenBags} bags (~500 pcs/bag)</span>
                    </div>
                  </div>

                  {/* Customer Information Inputs */}
                  <div className="space-y-4 pt-2 border-t border-[#D1D9D1] dark:border-[#2D422D]">
                    <h4 className="font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2]">
                      Customer & Farm Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Juan Dela Cruz"
                          className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+63 9XX XXX xxxx"
                          className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. farmer@gmail.com"
                          className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Town / City & Province
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            value={townCity}
                            onChange={(e) => setTownCity(e.target.value)}
                            placeholder="Ivisan"
                            className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                          />
                          <input
                            type="text"
                            required
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            placeholder="Capiz"
                            className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Fulfillment Option
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryOption('pickup')}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors ${
                              deliveryOption === 'pickup'
                                ? 'bg-[#3D6E3D] text-white border-[#3D6E3D]'
                                : 'bg-[#F7F9F7] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] border-[#D1D9D1] dark:border-[#2D422D]'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" /> Farm Pickup
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryOption('delivery')}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors ${
                              deliveryOption === 'delivery'
                                ? 'bg-[#3D6E3D] text-white border-[#3D6E3D]'
                                : 'bg-[#F7F9F7] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] border-[#D1D9D1] dark:border-[#2D422D]'
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" /> Pond Delivery
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                          Target Schedule Date
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] mb-1">
                        Additional Notes / Oxygen Packaging Instructions
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Need extra oxygen bags for 6-hour transport to Zambales..."
                        className="w-full bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] rounded-xl p-3 text-xs outline-none focus:border-[#3D6E3D] text-[#1A2E1A] dark:text-[#E2EFE2]"
                      />
                    </div>
                  </div>

                  {/* Submit Button Bar */}
                  <div className="pt-4 border-t border-[#D1D9D1] dark:border-[#2D422D] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#637863] dark:text-[#8FA38F] block">Total Fingerlings: {totalQuantity.toLocaleString()} pcs</span>
                      <span className="text-xl font-black text-[#3D6E3D] dark:text-[#A8CDA8]">
                        ₱{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || items.length === 0}
                      className="py-3 px-8 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-black text-sm shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Order Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
