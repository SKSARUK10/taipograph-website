import { useEffect } from 'react';

// Injects a <script type="application/ld+json"> block for the page and removes it on leave.
export default function useJsonLd(id, data) {
  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = `ld-${id}`;
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => el.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
}
