import { useEffect, useState } from 'react';
import "../styles/globals.css";
import { useRouter } from 'next/router';
import AppLoader from "../components/Common/AppLoader";
import Layout from "../components/Layout/Layout";
import { LanguageProvider } from "../contexts/LanguageContext";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleStart = () => {
      timeoutId = window.setTimeout(() => {
        setRouteLoading(true);
      }, 120);
    };

    const handleDone = () => {
      window.clearTimeout(timeoutId);
      setRouteLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      window.clearTimeout(timeoutId);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <AppLoader visible={routeLoading} />
            {isAdminRoute ? <Component {...pageProps} /> : <Layout><Component {...pageProps} /></Layout>}
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;

