import { Link, NavLink } from 'react-router-dom';
import { NAV } from '../data/content.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header() {
  return (
    <header>
      <div className="w">
        <Link className="logo" to="/" aria-label="TAIPOGRAPH home">
          TAIPO<b>GRAPH</b>
        </Link>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'on' : undefined)}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
