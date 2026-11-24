import { ABOUT, SEO } from '../data/content.js';
import useSeo from '../hooks/useSeo.js';
import useReveal from '../hooks/useReveal.js';
import { CardGrid, Eyebrow, PageHeader, Steps } from '../components/Sections.jsx';

export default function About() {
  useSeo(SEO.about);
  useReveal();
  const { header, lines, workflow, audience, who, tools } = ABOUT;

  return (
    <>
      <PageHeader {...header} />

      <section>
        <div className="w">
          <Eyebrow>{lines.eyebrow}</Eyebrow>
          <h2>{lines.title}</h2>
          {lines.groups.map((g) => (
            <div key={g.label}>
              <h3 className="sl">{g.label}</h3>
              <CardGrid cards={g.cards} />
            </div>
          ))}
        </div>
      </section>

      <section className="alt">
        <div className="w">
          <Eyebrow>{workflow.eyebrow}</Eyebrow>
          <h2>{workflow.title}</h2>
          {workflow.groups.map((g) => (
            <div key={g.label}>
              <h3 className="sl">{g.label}</h3>
              <Steps steps={g.steps} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="w">
          <Eyebrow>{audience.eyebrow}</Eyebrow>
          <h2>{audience.title}</h2>
          <div className="tags">
            {audience.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="w two">
          {[who.left, who.right].map((col) => (
            <div key={col.title}>
              <h2>{col.title}</h2>
              {col.paragraphs.map((p, i) => (
                <p key={i} style={{ color: 'var(--mute)', marginBottom: i < col.paragraphs.length - 1 ? 14 : 0 }}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="w">
          <Eyebrow>{tools.eyebrow}</Eyebrow>
          <h2>{tools.title}</h2>
          <p className="lead">{tools.lead}</p>
          <div className="tags">
            {tools.items.map((t) => (
              <span className="t" key={t.name}>
                {t.logo ? (
                  <img className="lg" src={t.logo} alt={t.alt} height="28" loading="lazy" />
                ) : (
                  <i className="tb" style={{ '--c': t.color }}>{t.badge}</i>
                )}
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
