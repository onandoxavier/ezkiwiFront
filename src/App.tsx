import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import QueueManagement from './pages/QueueManagement/index';
import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register';
import QueuePage from './pages/Queue';
import QueueDisplay from './pages/QueueDisplay/QueueDisplay'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword/Index';
import VerifyCode from './pages/VerifyCode/Index';
import ResetPassword from './pages/ResetPassword/Index';
import SettingsPage from './pages/Settings/Index';
import { useSnackbar } from 'notistack';
import CheckoutForm from './pages/Checkout/CheckoutForm';
import Return from './pages/Checkout/Return';

const App: React.FC = () => {

  const location = useLocation();
  useSnackbar();

  useEffect(() => {
    // Define classes baseadas na rota
    const path = location.pathname;    
    if (path.startsWith('/display')) {      
      document.body.classList.add('bodyDisplay');
    } else if (path.startsWith('/queue')) {
      document.body.classList.add('bodyDisplay');
    } else {
      document.body.classList.remove('bodyDisplay');
    }

    // Cleanup para evitar classes persistentes
    return;
  }, [location.pathname]);

  return (
    <Routes>
      {/* Redireciona a raiz para /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-code/:id" element={<VerifyCode/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>}/>
      </Route>

      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route path="/queue/:id" element={<QueuePage />} />
        <Route path="/queues" element={<QueueManagement />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/return" element={<Return />} />
      </Route>

      {/* Rota sem proteção (pode ser acessada sem login) */}
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/display/:id" element={<QueueDisplay />} />
    </Routes>
  );
};

export default App;
