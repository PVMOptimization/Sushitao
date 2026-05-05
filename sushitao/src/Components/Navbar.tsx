import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkColor = (to: string) =>
    location.pathname === to ? 'var(--ember)' : 'rgba(242,236,227,0.65)'

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(14,12,10,0.97)' : '#0e0c0a',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(14px)',
        transition: 'background 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
      }}>

        {/* Left links */}
        <nav style={{ display: 'flex', gap: '2.5rem', flex: 1 }} aria-label="nav-left">
          {NAV_LINKS.slice(0, 2).map(({ label, to }) => (
            <Link key={to} to={to} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: linkColor(to),
              borderBottom: location.pathname === to ? '1px solid var(--ember)' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.25s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { if (location.pathname !== to) (e.currentTarget as HTMLElement).style.color = '#f2ece3' }}
              onMouseLeave={e => { if (location.pathname !== to) (e.currentTarget as HTMLElement).style.color = 'rgba(242,236,227,0.65)' }}
            >{label}</Link>
          ))}
        </nav>

        {/* CENTERED LOGO */}
        <Link to="/" aria-label="Sushi Tao"
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3rem',
            position: 'relative',
            textDecoration: 'none',
          }}>
          {/* Ember halo behind logo */}
          <div style={{
            position: 'absolute',
            width: 160, height: 64,
            background: 'radial-gradient(ellipse at center, rgba(212,84,26,0.14) 0%, transparent 72%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            width: 140, height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <img
              src="/logo.png"
              alt="Sushi Tao"
              style={{ maxHeight: 112, maxWidth: 140, objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const p = e.currentTarget.parentElement!
                p.innerHTML = `<span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;font-weight:300;letter-spacing:0.1em;color:#f2ece3;white-space:nowrap;line-height:1;">SUSHI <em style='color:#d4541a;font-style:italic;font-weight:400;'>TAO</em></span>`
              }}
            />
          </div>
        </Link>

        {/* Right links */}
        <nav style={{ display: 'flex', gap: '2.5rem', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} aria-label="nav-right">
          {NAV_LINKS.slice(2).map(({ label, to }) => (
            <Link key={to} to={to} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: linkColor(to),
              borderBottom: location.pathname === to ? '1px solid var(--ember)' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.25s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { if (location.pathname !== to) (e.currentTarget as HTMLElement).style.color = '#f2ece3' }}
              onMouseLeave={e => { if (location.pathname !== to) (e.currentTarget as HTMLElement).style.color = 'rgba(242,236,227,0.65)' }}
            >{label}</Link>
          ))}
          <a href="tel:+18172947200" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.67rem',
            letterSpacing: '0.1em',
            color: 'var(--ember)',
            textDecoration: 'none',
            border: '1px solid rgba(212,84,26,0.45)',
            padding: '8px 16px',
            transition: 'background 0.22s, color 0.22s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--ember)'
              ;(e.currentTarget as HTMLElement).style.color = '#f2ece3'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--ember)'
            }}
          >☎ Reserve</a>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', padding: '8px', cursor: 'pointer', position: 'absolute', right: '1.25rem' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 22, height: 1.5, background: '#f2ece3',
              marginBottom: i < 2 ? 6 : 0,
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none') : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </header>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 99,
        background: '#0e0c0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        maxHeight: open ? '380px' : '0',
        padding: open ? '2.5rem' : '0 2.5rem',
        overflow: 'hidden',
        transition: 'max-height 0.38s cubic-bezier(0.4,0,0.2,1), padding 0.38s',
        display: 'flex', flexDirection: 'column', gap: '1.75rem',
      }}>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem', fontWeight: 300, fontStyle: 'italic',
            color: location.pathname === to ? 'var(--ember)' : '#f2ece3',
            lineHeight: 1, textDecoration: 'none',
          }}>{label}</Link>
        ))}
        <a href="tel:+18172947200" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
          letterSpacing: '0.12em', color: 'var(--ember)', marginTop: '0.5rem', textDecoration: 'none',
        }}>☎ (817) 294-7200</a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          nav[aria-label="nav-left"], nav[aria-label="nav-right"] { display: none !important; }
        }
      `}</style>
    </>
  )
}
