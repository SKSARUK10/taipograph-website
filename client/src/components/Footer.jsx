import { SITE } from '../data/content.js';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div>{SITE.footerLeft}</div>
        <div>{SITE.footerRight}</div>
      </div>
    </footer>
  );
}
