import { useState } from 'react'

const MENU_ITEMS = [
  {
    label: 'Dragon Roll',
    desc: 'Shrimp tempura, avocado, cucumber topped with fresh tuna & spicy mayo',
    price: 'Market',
    tag: 'Specialty Roll',
    img: '/public/dragonroll.png',
  },
  {
    label: 'Sushi & Sashimi Boat',
    desc: 'Chef\'s selection for two — nigiri, sashimi, and signature rolls',
    price: 'Market',
    tag: 'For Two',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=85',
  },
  {
    label: 'Volcano Roll',
    desc: 'Spicy tuna inside, baked scallop and masago on top, chili sauce',
    price: '$16',
    tag: 'Hot Roll',
    img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=700&q=85',
  },
  {
    label: 'Sashimi Appetizer',
    desc: 'Seven pieces of chef\'s freshest cuts, daikon, pickled ginger',
    price: '$18',
    tag: 'Starter',
    img: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=700&q=85',
  },
  {
    label: 'Mimosa Roll',
    desc: 'Salmon, cream cheese, mango, topped with citrus aioli',
    price: '$15',
    tag: 'Specialty Roll',
    img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=700&q=85',
  },
  {
    label: 'Spicy Edamame',
    desc: 'Steamed edamame tossed in garlic chili butter & sea salt',
    price: '$7',
    tag: 'Starter',
    img: '/spicyed.png',
  },
  {
    label: 'Chicken Fried Rice',
    desc: 'Wok-tossed rice, scallion, egg, soy-ginger reduction',
    price: '$12',
    tag: 'Kitchen',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=85',
  },
]

export default function Menu() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* ── MENU HEADER ─────────────────────────────── */}
      <section style={{
        background: 'var(--ink)',
        padding: '5rem 2.5rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            color: 'var(--ember)',
            marginBottom: '1.5rem',
          }}>
            Fresh · Local · Seasonal
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: 'var(--paper)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}>
            The<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>Menu</em>
          </h1>
        </div>
        <div style={{ color: 'var(--paper)', opacity: 0.5, maxWidth: 320 }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Our menu changes with the season. Every dish is prepared with ingredients
            sourced from local farmers' markets.
          </p>
          <a href="tel:+18172947200" className="btn-call">
            ☎ Call to Ask About Today's Specials
          </a>
        </div>
      </section>

      {/* ── EDITORIAL MENU GRID ──────────────────────── */}
      <section style={{ padding: '0 0 6rem' }}>
        {/*
          Layout: an asymmetric editorial grid.
          Row 1: [large card col-span 2] [tall card] [medium card]
          Row 2: [medium] [medium] [large col-span 2]
          Not a uniform grid — each card breathes differently.
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 'auto',
          gap: '2px',
          background: 'var(--bone)',
        }}>
          {MENU_ITEMS.map((item, i) => {
            // Deliberate span assignments — breaks the grid rhythm
            const spanMap: Record<number, { colSpan: number; imgH: string }> = {
              0: { colSpan: 2, imgH: '380px' },
              1: { colSpan: 2, imgH: '380px' },
              2: { colSpan: 1, imgH: '300px' },
              3: { colSpan: 1, imgH: '300px' },
              4: { colSpan: 2, imgH: '340px' },
              5: { colSpan: 1, imgH: '300px' },
              6: { colSpan: 1, imgH: '300px' },
            }
            const { colSpan, imgH } = spanMap[i] ?? { colSpan: 1, imgH: '280px' }

            return (
              <div
                key={i}
                style={{
                  gridColumn: `span ${colSpan}`,
                  background: 'var(--paper)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Image */}
                <div style={{ overflow: 'hidden', height: imgH }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                      transform: active === i ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                </div>

                {/* Info panel */}
                <div style={{
                  padding: colSpan === 2 ? '2rem 2.5rem' : '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ember)',
                      display: 'block',
                      marginBottom: '6px',
                    }}>
                      {item.tag}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: colSpan === 2 ? '1.6rem' : '1.25rem',
                      fontWeight: 400,
                      marginBottom: '6px',
                      lineHeight: 1.2,
                    }}>
                      {item.label}
                    </h3>
                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--ash)',
                      lineHeight: 1.6,
                      maxWidth: 360,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: item.price === 'Market' ? 'var(--ember)' : 'var(--ink)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    paddingTop: '1.8rem',
                  }}>
                    {item.price}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FULL MENU CTA ────────────────────────────── */}
      <section style={{
        padding: '5rem 2.5rem',
        background: 'var(--paper-dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 300,
          lineHeight: 1.2,
        }}>
          This is just a taste.<br />
          <em style={{ color: 'var(--ember)' }}>Call for today's full menu.</em>
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="tel:+18172947200" className="btn-call">
            ☎ (817) 294-7200
          </a>
          <a
            href="https://sushitao.net"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Visit sushitao.net ↗
          </a>
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--ash)',
          letterSpacing: '0.08em',
        }}>
          $10–20 per person · Dine In & Takeout Available
        </p>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:nth-child(2) > div {
            grid-template-columns: 1fr 1fr !important;
          }
          section:nth-child(2) > div > div {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 480px) {
          section:nth-child(2) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
