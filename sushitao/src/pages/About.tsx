const POPULAR_ITEMS = [
  'Super Dragon Roll',
  'Sushi & Sashimi for Two Boat',
  'Volcano Roll',
  'Sashimi Appetizers',
  'Chicken Fried Rice',
  'Spicy Edamame',
  'Fried Oreos',
  'Mimosa Roll',
  'Butterfly Kisses',
  'Eel',
]

export default function About() {
  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* ── ABOUT HEADER ─────────────────────────────── */}
      <section style={{
        background: 'var(--ink)',
        padding: '6rem 2.5rem 5rem',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'end',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              color: 'var(--ember)',
              marginBottom: '2rem',
            }}>
              Our Story
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: 'var(--paper)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
            }}>
              About<br />
              <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>Sushi Tao</em>
            </h1>
          </div>

          <div style={{
            color: 'rgba(242,236,227,0.65)',
            fontSize: '1rem',
            lineHeight: 1.8,
          }}>
            <p>
              Tucked away on Overton Ridge, Sushi Tao has become the sushi destination
              Fort Worth didn't know it needed. Family-owned, locally sourced, and
              committed to craft above all else.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHEF + IMAGE ─────────────────────────────── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 480,
      }}>
        {/* Image */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=900&q=85"
            alt="Chef preparing sushi"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, transparent 50%, var(--paper) 100%)',
          }} />
        </div>

        {/* Chef copy */}
        <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 400,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Our Chef & Staff
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--ink-light)', marginBottom: '2rem' }}>
            With 20 years of experience cooking in the finest restaurants, our chef is excited
            to present their vision to you and all our guests. Our caring and committed staff
            will ensure you have a fantastic experience with us.
          </p>
          <a href="tel:+18172947200" className="btn-call" style={{ alignSelf: 'flex-start' }}>
            ☎ Make a Reservation
          </a>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────── */}
      <section style={{
        background: 'var(--paper-dark)',
        padding: '6rem 2.5rem',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 2px 1fr 2px 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Pillar 1 */}
          <div>
            <div style={{
              width: 40,
              height: 2,
              background: 'var(--ember)',
              marginBottom: '2rem',
            }} />
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 400,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              Special Events<br />&amp; Catering
            </h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--ink-light)' }}>
              Our restaurant is available for private events: weddings, business lunches,
              dinners, cocktail receptions, and more. We would love to discuss how to be
              a part of your next event.
            </p>
            <a
              href="tel:+18172947200"
              style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--ember)',
                textTransform: 'uppercase',
              }}
            >
              Call to Discuss ↗
            </a>
          </div>

          {/* Divider */}
          <div style={{ background: 'var(--bone)', height: '100%', minHeight: 200 }} />

          {/* Pillar 2 */}
          <div>
            <div style={{ width: 40, height: 2, background: 'var(--ember)', marginBottom: '2rem' }} />
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 400,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              Seasonal<br />&amp; Local
            </h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--ink-light)' }}>
              We refuse to compromise on quality. That's why we source our fresh ingredients
              from local farmers' markets, changing our menu with the seasons to bring you
              the very best.
            </p>
          </div>

          {/* Divider */}
          <div style={{ background: 'var(--bone)', height: '100%', minHeight: 200 }} />

          {/* Pillar 3 */}
          <div>
            <div style={{ width: 40, height: 2, background: 'var(--ember)', marginBottom: '2rem' }} />
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 400,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              Family<br />Owned
            </h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--ink-light)' }}>
              Sushi Tao is a locally owned family restaurant. Every guest is treated like a regular,
              and every meal is crafted with the kind of care that only comes from people
              who genuinely love what they do.
            </p>
          </div>
        </div>
      </section>

      {/* ── POPULAR ITEMS ─────────────────────────────── */}
      <section style={{ padding: '6rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '5rem',
          alignItems: 'start',
        }}>
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Guest<br />
              <em style={{ color: 'var(--ember)' }}>Favorites</em>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ash)', lineHeight: 1.7, marginBottom: '2rem' }}>
              These dishes keep people coming back.<br />Week after week.
            </p>
            <a href="tel:+18172947200" className="btn-call">
              ☎ Order by Phone
            </a>
          </div>

          <div>
            {POPULAR_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.4rem 0',
                  borderBottom: '1px solid var(--bone)',
                  transition: 'padding-left 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '1rem')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--ember)',
                  minWidth: '2ch',
                  opacity: 0.7,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ─────────────────────────────── */}
      <section style={{
        background: 'var(--ink)',
        padding: '5rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(242,236,227,0.35)',
            marginBottom: '1.5rem',
          }}>Visit Us</p>
          <address style={{
            fontStyle: 'normal',
            color: 'var(--paper)',
            fontSize: '1.2rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}>
            4938 Overton Ridge Blvd<br />
            Fort Worth, TX 76132
          </address>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:+18172947200" className="btn-call">
              ☎ (817) 294-7200
            </a>
            <a
              href="https://maps.google.com/?q=4938+Overton+Ridge+Blvd+Fort+Worth+TX+76132"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: 'var(--ember)',
                padding: '12px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
              }}
            >
              Get Directions ↗
            </a>
          </div>
        </div>

        <div style={{
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          paddingLeft: '4rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(242,236,227,0.35)',
            marginBottom: '1.5rem',
          }}>Hours</p>
          {[
            ['Monday', 'Closed'],
            ['Tue – Thu', '11am–3pm / 4:30–9pm'],
            ['Friday', '11am–3pm / 4:30–9:30pm'],
            ['Saturday', '11am–9:30pm'],
            ['Sunday', '12pm–9pm'],
          ].map(([day, hrs]) => (
            <div
              key={day}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.88rem',
              }}
            >
              <span style={{ color: 'rgba(242,236,227,0.6)' }}>{day}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: hrs === 'Closed' ? 'var(--ash)' : 'var(--paper)',
                fontStyle: hrs === 'Closed' ? 'italic' : 'normal',
              }}>{hrs}</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section:nth-child(2) { grid-template-columns: 1fr !important; }
          section:nth-child(3) > div { grid-template-columns: 1fr !important; }
          section:nth-child(3) > div > div[style*="2px"] { display: none; }
          section:nth-child(5) > div { grid-template-columns: 1fr !important; }
          section:nth-child(5) > div > div:first-child { position: static !important; }
          section:nth-child(6) { grid-template-columns: 1fr !important; }
          section:nth-child(6) > div:last-child { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 700px) {
          section:nth-child(1) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
