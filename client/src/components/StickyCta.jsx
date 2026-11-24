import { Link, useLocation } from 'react-router-dom';

// Phones only: a persistent route to the free preflight. Hidden on Home (hero already has it) and Contact.
export default function StickyCta() {
  const { pathname } = useLocation();
  if (pathname === '/' || pathname.startsWith('/contact')) return null;
  return (
    <div className="scta">
      <Link className="btn" to="/contact?service=preflight">Send one file for a free preflight</Link>
    </div>
  );
}
