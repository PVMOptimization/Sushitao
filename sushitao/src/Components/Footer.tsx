import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '4rem 2rem 2.5rem',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '3rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 300,
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            Sushi <em style={{ color: 'var(--ember)', fontStyle: 'italic' }}>Tao</em>
          </div>
          <p style={{ fontSize: '0.82rem', opacity: 0.6, lineHeight: 1.7 }}>
            A hidden gem on Overton Ridge.<br />
            Fort Worth's finest sushi experience.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.4,
            marginBottom: '1.25rem',
          }}>Navigate</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About Us']].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  opacity: 0.75,
                  transition: 'opacity 0.2s, color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: 0.4,
            marginBottom: '1.25rem',
          }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', opacity: 0.75 }}>
            <p>4938 Overton Ridge Blvd<br />Fort Worth, TX 76132</p>
            <a
              href="tel:+18172947200"
              style={{
                color: 'var(--ember)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
              }}
            >
              (817) 294-7200
            </a>
            <a
              href="https://sushitao.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.6, fontSize: '0.82rem' }}
            >
              sushitao.net ↗
            </a>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: 1100,
        margin: '3rem auto 0',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
        opacity: 0.35,
      }}>
        <span>© {new Date().getFullYear()} Sushi Tao. All rights reserved.</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Fort Worth, TX</span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
