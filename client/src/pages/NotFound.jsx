import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { PageHeader } from '../components/Sections.jsx';

export default function NotFound() {
  useSeo({ title: 'Page not found | TAIPOGRAPH', description: 'This page could not be found.', path: '/404' });
  return (
    <>
      <PageHeader eyebrow="404" title="This page isn't on the press sheet." text="The link may be old or mistyped." />
      <section>
        <div className="w">
          <Link className="btn" to="/">Back to home</Link>
        </div>
      </section>
    </>
  );
}
