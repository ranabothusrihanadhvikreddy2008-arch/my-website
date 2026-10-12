import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { DemoRibbon } from './components/common/DemoRibbon';
import { ToastContainer } from './components/common/ToastContainer';
import { PeriodicLoginModal } from './components/common/PeriodicLoginModal';

// Public Pages
import { Home } from './pages/public/Home';
import { Catalog } from './pages/public/Catalog';
import { ProductDetail } from './pages/public/ProductDetail';
import { GoldSchemePublic } from './pages/public/GoldSchemePublic';
import { CustomBridal } from './pages/public/CustomBridal';
import { ShowroomsPage } from './pages/public/ShowroomsPage';
import { Login } from './pages/auth/Login';
import { CustomerLogin } from './pages/auth/CustomerLogin';
import { CustomerLogout } from './pages/auth/CustomerLogout';
import { AdminLogin } from './pages/auth/AdminLogin';
import { AdminLogout } from './pages/auth/AdminLogout';
import { GeneralLogout } from './pages/auth/GeneralLogout';

// Customer Portal Pages
import { PortalLayout } from './components/layout/PortalLayout';
import { CustomerDashboard } from './pages/portal/CustomerDashboard';
import { CustomerPayments } from './pages/portal/CustomerPayments';
import { CustomerRedeem } from './pages/portal/CustomerRedeem';
import { CustomerProfile } from './pages/portal/CustomerProfile';

// Admin Pages
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminGoldRates } from './pages/admin/AdminGoldRates';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminSettings } from './pages/admin/AdminSettings';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0C0A09] text-[#FBF7F0]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Demo ribbon always visible at top */}
      <DemoRibbon />
      <ToastContainer />
      <PeriodicLoginModal />

      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/schemes" element={<GoldSchemePublic />} />
          <Route path="/custom-bridal" element={<CustomBridal />} />
          <Route path="/showrooms" element={<ShowroomsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<GeneralLogout />} />
          <Route path="/portal/login" element={<CustomerLogin />} />
          <Route path="/portal/logout" element={<CustomerLogout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
        </Route>

        {/* Customer Portal (Website 2) */}
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="payments" element={<CustomerPayments />} />
          <Route path="redeem" element={<CustomerRedeem />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Admin Terminal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="gold-rates" element={<AdminGoldRates />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
