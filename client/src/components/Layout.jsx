import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { IconSprite } from './Icons.jsx';
import ScrollUI from './ScrollUI.jsx';
import StickyCta from './StickyCta.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) return el.scrollIntoView();
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <ScrollUI />
      <main id="main">
        <IconSprite />
        <ScrollToTop />
        <div className="view on" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <StickyCta />
      <WhatsAppButton />
    </>
  );
}
