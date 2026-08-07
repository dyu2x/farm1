/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CatalogSection } from './components/CatalogSection';
import { FishCareBlog } from './components/FishCareBlog';
import { LocationMap } from './components/LocationMap';
import { OrderInquiryPage } from './components/OrderInquiryPage';
import { OrderInquiryModal } from './components/OrderInquiryModal';
import { SearchBar } from './components/SearchBar';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

import {
  INITIAL_FARM_SETTINGS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_MONTHLY_SUMMARIES,
  INITIAL_BLOG_ARTICLES,
} from './data/initialData';

import {
  FingerlingProduct,
  InquiryItem,
  InquiryOrder,
  MonthlySalesSummary,
  FarmSettings,
  BlogArticle,
} from './types';

export default function App() {
  // Helper to resolve route page from window.location
  const getInitialPage = (): string => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (path.includes('/connect/admin') || search.includes('view=admin')) {
      return 'admin';
    }
    if (path.includes('/catalog')) return 'catalog';
    if (path.includes('/guides') || path.includes('/blog')) return 'guides';
    if (path.includes('/location') || path.includes('/map')) return 'location';
    if (path.includes('/inquiry') || path.includes('/cart')) return 'inquiry';
    return 'home';
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mesina_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mesina_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mesina_theme', 'light');
    }
  }, [isDarkMode]);

  // Handle URL history routing popstate
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Settings State with Persistence
  const [settings, setSettings] = useState<FarmSettings>(() => {
    const saved = localStorage.getItem('mesina_settings_v3');
    return saved ? JSON.parse(saved) : INITIAL_FARM_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('mesina_settings_v3', JSON.stringify(settings));
  }, [settings]);

  // Catalog Products State with Persistence
  const [products, setProducts] = useState<FingerlingProduct[]>(() => {
    const saved = localStorage.getItem('mesina_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('mesina_products_v2', JSON.stringify(products));
  }, [products]);

  // Orders State with Persistence
  const [orders, setOrders] = useState<InquiryOrder[]>(() => {
    const saved = localStorage.getItem('mesina_orders_v1');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('mesina_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Monthly Summaries & Articles
  const [monthlySummaries] = useState<MonthlySalesSummary[]>(INITIAL_MONTHLY_SUMMARIES);
  const [blogArticles] = useState<BlogArticle[]>(INITIAL_BLOG_ARTICLES);

  // Cart / Order Inquiry State
  const [cartItems, setCartItems] = useState<InquiryItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedBlogFromSearch, setSelectedBlogFromSearch] = useState<BlogArticle | null>(null);

  // Add Item to Inquiry
  const handleAddToInquiry = (product: FingerlingProduct, quantity: number) => {
    let unitPrice = product.basePrice;
    if (product.priceTiers && product.priceTiers.length > 0) {
      for (const tier of product.priceTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
          unitPrice = tier.pricePerPc;
          break;
        }
      }
    }

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const next = [...prev];
        const newQty = next[existingIdx].quantity + quantity;
        let newUnitPrice = product.basePrice;
        if (product.priceTiers) {
          for (const tier of product.priceTiers) {
            if (newQty >= tier.minQty && (tier.maxQty === null || newQty <= tier.maxQty)) {
              newUnitPrice = tier.pricePerPc;
              break;
            }
          }
        }
        next[existingIdx] = {
          product,
          quantity: newQty,
          calculatedUnitPrice: newUnitPrice,
          totalPrice: newQty * newUnitPrice,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            calculatedUnitPrice: unitPrice,
            totalPrice: quantity * unitPrice,
          },
        ];
      }
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          let unitPrice = item.product.basePrice;
          if (item.product.priceTiers) {
            for (const tier of item.product.priceTiers) {
              if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
                unitPrice = tier.pricePerPc;
                break;
              }
            }
          }
          return {
            ...item,
            quantity,
            calculatedUnitPrice: unitPrice,
            totalPrice: quantity * unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitInquiry = async (
    orderData: Omit<InquiryOrder, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ): Promise<InquiryOrder> => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: InquiryOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      referenceNo: `MF-2026-${randomNum}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock count in catalog
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInOrder = orderData.items.find((i) => i.product.id === prod.id);
        if (itemInOrder) {
          return {
            ...prod,
            stockCount: Math.max(0, prod.stockCount - itemInOrder.quantity),
          };
        }
        return prod;
      })
    );

    return newOrder;
  };

  const handleNavigate = (page: string) => {
    let target = page;
    let url = '/';

    if (page === 'inquiry-form' || page === 'cart') target = 'inquiry';
    if (page === 'blog') target = 'guides';

    if (target === 'catalog') url = '/catalog';
    else if (target === 'guides') url = '/guides';
    else if (target === 'location') url = '/location';
    else if (target === 'inquiry') url = '/inquiry';
    else if (target === 'admin') url = '/connect/admin';

    window.history.pushState({}, '', url);
    setActivePage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin View if activePage === 'admin'
  if (activePage === 'admin') {
    return (
      <AdminPanel
        products={products}
        orders={orders}
        monthlySummaries={monthlySummaries}
        settings={settings}
        onUpdateProducts={setProducts}
        onUpdateOrders={setOrders}
        onUpdateSettings={setSettings}
        onExitAdmin={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Header / Navbar */}
      <Navbar
        settings={settings}
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        onOpenCart={() => handleNavigate('inquiry')}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeSection={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Public Website Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            settings={settings}
            blogArticles={blogArticles}
            onNavigate={handleNavigate}
            onAddToInquiry={handleAddToInquiry}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogSection
            products={products}
            settings={settings}
            onAddToInquiry={handleAddToInquiry}
            onNavigateToInquiry={() => handleNavigate('inquiry')}
          />
        )}

        {activePage === 'guides' && (
          <FishCareBlog
            articles={blogArticles}
            selectedArticleFromSearch={selectedBlogFromSearch}
          />
        )}

        {activePage === 'location' && (
          <LocationMap settings={settings} />
        )}

        {activePage === 'inquiry' && (
          <OrderInquiryPage
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onSubmitInquiry={handleSubmitInquiry}
            settings={settings}
            orders={orders}
            products={products}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={handleNavigate} />

      {/* Order Inquiry Drawer / Quick Modal */}
      <OrderInquiryModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onSubmitInquiry={handleSubmitInquiry}
        settings={settings}
      />

      {/* Global Instant Search Bar */}
      <SearchBar
        products={products}
        blogs={blogArticles}
        onSelectProduct={(p) => {
          handleAddToInquiry(p, 1000);
          handleNavigate('inquiry');
        }}
        onSelectBlog={(b) => {
          setSelectedBlogFromSearch(b);
          handleNavigate('guides');
        }}
        onNavigate={handleNavigate}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
