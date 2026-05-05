import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── Booking Modal ─────────────────────────────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']
const DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa']
const SLOTS = ['11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM',
               '4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM']

function BookingModal({ onClose }: { onClose: () => void }) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear]   = useState(today.getFullYear())
  const [day, setDay]     = useState<number | null>(null)
  const [slot, setSlot]   = useState('')
  const [name, setName]   = useState('')
  const [phone, setPhone] = useState('')
  const [party, setParty] = useState('2')
  const [done, setDone]   = useState(false)

  const firstDow   = new Date(year, month, 1).getDay()
  const daysInMo   = new Date(year, month + 1, 0).getDate()
  const cells      = [...Array(firstDow).fill(null), ...Array.from({length: daysInMo}, (_,i) => i+1)]
  const isDisabled = (d: number) => {
    const dow   = new Date(year, month, d).getDay()
    const isPast = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return dow === 1 || isPast
  }

  if (done) return (
    <div style={S.overlay} onClick={onClose}>
      <div style={{...S.modal, textAlign:'center', padding:'4rem 3rem'}} onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'4rem',marginBottom:'1.5rem',lineHeight:1}}>
          <em style={{color:'var(--ember)'}}>Thank you</em>
        </div>
        <p style={{fontSize:'0.95rem',color:'var(--ash)',lineHeight:1.8,marginBottom:'2.5rem'}}>
          <strong style={{color:'var(--ink)'}}>{name}</strong>, your table for {party} is requested<br/>
          {MONTHS[month]} {day}, {year} at <strong style={{color:'var(--ink)'}}>{slot}</strong>.<br/>
          We will confirm at <strong style={{color:'var(--ink)'}}>{phone}</strong>.
        </p>
        <button className="btn-call" onClick={onClose}>Close</button>
      </div>
    </div>
  )

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" style={{position:'absolute',top:18,right:22,background:'none',border:'none',fontSize:'1.6rem',cursor:'pointer',color:'var(--ash)',lineHeight:1}}>x</button>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.9rem',fontWeight:300,marginBottom:'0.25rem'}}>Reserve a Table</h2>
        <p style={{fontSize:'0.82rem',color:'var(--ash)',marginBottom:'2rem'}}>
          Or call us: <a href="tel:+18172947200" style={{color:'var(--ember)'}}>( 817 ) 294-7200</a>
        </p>
        {/* Calendar header */}
        <div style={{marginBottom:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1)}else setMonth(m=>m-1);setDay(null)}}
              style={{background:'none',border:'none',fontSize:'1.3rem',cursor:'pointer',padding:'4px 10px',color:'var(--ink)'}}>
              {'<'}
            </button>
            <span style={{fontFamily:'var(--font-display)',fontSize:'1.05rem',fontWeight:400}}>{MONTHS[month]} {year}</span>
            <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1)}else setMonth(m=>m+1);setDay(null)}}
              style={{background:'none',border:'none',fontSize:'1.3rem',cursor:'pointer',padding:'4px 10px',color:'var(--ink)'}}>
              {'>'}
            </button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'2px',marginBottom:'4px'}}>
            {DAYS_SHORT.map(d=><div key={d} style={{textAlign:'center',fontFamily:'var(--font-mono)',fontSize:'0.6rem',opacity:0.35,padding:'4px 0'}}>{d}</div>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'2px'}}>
            {cells.map((d,i)=>{
              if(!d) return <div key={'e'+i}/>
              const dis = isDisabled(d), sel = day===d
              return <button key={d} disabled={dis} onClick={()=>!dis&&setDay(d)} style={{
                padding:'9px 0',border:'1px solid '+(sel?'var(--ember)':'transparent'),
                background:sel?'var(--ember)':'transparent',
                color:sel?'#fff':dis?'var(--bone)':'var(--ink)',
                fontFamily:'var(--font-mono)',fontSize:'0.78rem',cursor:dis?'not-allowed':'pointer',
                borderRadius:0,transition:'all 0.15s',
              }}>{d}</button>
            })}
          </div>
        </div>
        {/* Time slots */}
        {day && (
          <div style={{marginBottom:'1.5rem'}}>
            <p style={{fontFamily:'var(--font-mono)',fontSize:'0.62rem',letterSpacing:'0.12em',textTransform:'uppercase',opacity:0.4,marginBottom:'0.75rem'}}>Select Time</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
              {SLOTS.map(s=><button key={s} onClick={()=>setSlot(s)} style={{
                padding:'6px 11px',border:'1px solid '+(slot===s?'var(--ember)':'var(--bone)'),
                background:slot===s?'var(--ember)':'transparent',color:slot===s?'#fff':'var(--ink)',
                fontFamily:'var(--font-mono)',fontSize:'0.7rem',cursor:'pointer',transition:'all 0.15s',borderRadius:0,
              }}>{s}</button>)}
            </div>
          </div>
        )}
        {/* Guest info */}
        {day && slot && (
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div>
                <label style={S.lbl}>Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={S.inp}/>
              </div>
              <div>
                <label style={S.lbl}>Party Size</label>
                <select value={party} onChange={e=>setParty(e.target.value)} style={S.inp}>
                  {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={S.lbl}>Phone Number</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(817) 555-0000" type="tel" style={S.inp}/>
            </div>
            <button className="btn-call" onClick={()=>name&&phone&&setDone(true)} style={{alignSelf:'flex-start',marginTop:'0.5rem'}}>
              Confirm Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name:'Jessica G.',     label:'Local Guide · 6 years a regular', text:'I passed by for six years before finally stopping. Now I am here at least once a week. Sometimes twice. The regulars all know each other at this point.' },
  { name:'James Polis',    label:'Local Guide · 225 reviews',        text:'A genuine hidden gem in Fort Worth. The quality is extraordinary and the prices are honest. Family-owned and it shows in every single detail.' },
  { name:'Katelyn Prater', label:'Dine in · Lunch',                  text:'The staff remembers your face, your order, your preferences. I have never had a bad experience here. Not once.' },
  { name:'Jessica Ramirez',label:'Local Guide · 136 photos',         text:'Hidden away and quiet, and it deserves to be packed every night. The ambiance, the service, the food — all of it earns its reputation.' },
]

const HOURS_DATA = [
  { day:'Monday',     times: null },
  { day:'Tue – Thu',  times: ['11am – 3pm', '4:30 – 9:00pm'] },
  { day:'Friday',     times: ['11am – 3pm', '4:30 – 9:30pm'] },
  { day:'Saturday',   times: ['11am – 9:30pm'] },
  { day:'Sunday',     times: ['12pm – 9:00pm'] },
]

const GALLERY = [
  { src:'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=900&q=85', alt:'Specialty rolls', col:'1/3', row:'1/2' },
  { src:'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=600&q=85', alt:'Sashimi', col:'3/4', row:'1/3' },
  { src:'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=700&q=85', alt:'Sushi bar', col:'1/2', row:'2/3' },
  { src:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=85', alt:'Plating', col:'2/3', row:'2/3' },
]

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const [booking, setBooking]     = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setHeroReady(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.32}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ paddingTop: 'var(--nav-h)', background: 'var(--paper)' }}>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: 'calc(100vh - var(--nav-h))',
        minHeight: 620,
        overflow: 'hidden',
        background: '#0c0a08',
      }}>
        {/* Parallax photo */}
        <div ref={parallaxRef} style={{ position: 'absolute', inset: '-25% 0', willChange: 'transform' }}>
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=90"
            alt="Sushi Tao crafted sashimi"
            onLoad={() => setHeroReady(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: heroReady ? 0.5 : 0,
              transition: 'opacity 1.6s ease',
              filter: 'contrast(1.1) saturate(0.7)',
            }}
          />
        </div>

        {/* Dual-gradient veil — cinematic letterbox feel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: [
            'linear-gradient(to bottom, rgba(12,10,8,0.55) 0%, rgba(12,10,8,0.1) 35%, rgba(12,10,8,0.1) 55%, rgba(12,10,8,0.92) 100%)',
          ].join(','),
        }}/>

        {/* Ember left-edge rule — architectural, not decorative */}
        <div style={{
          position: 'absolute', top: '12%', left: 0,
          width: 2, height: '38%',
          background: 'linear-gradient(to bottom, transparent, var(--ember) 40%, var(--ember) 60%, transparent)',
          opacity: 0.7,
        }}/>

        {/* Content — anchored to lower portion */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vh, 5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.24em',
              color: 'var(--ember)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}>Fort Worth, Texas</p>

            {/* The headline — restrained prestige, not billboard */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 7.5vw, 7rem)',
              color: '#f2ece3',
              lineHeight: 0.93,
              letterSpacing: '-0.015em',
              marginBottom: '2rem',
            }}>
              Where craft<br/>
              <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>meets quiet.</em>
            </h1>

            <p style={{
              fontSize: '0.83rem',
              color: 'rgba(242,236,227,0.42)',
              letterSpacing: '0.03em',
              marginBottom: '2.25rem',
              fontFamily: 'var(--font-body)',
            }}>
              4938 Overton Ridge Blvd &nbsp;·&nbsp; Fort Worth TX 76132
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button onClick={() => setBooking(true)} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'var(--ember)',
                color: '#f2ece3',
                border: 'none',
                padding: '14px 28px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e=>(e.currentTarget.style.background='var(--ember-hot)')}
                onMouseLeave={e=>(e.currentTarget.style.background='var(--ember)')}
              >
                Reserve a Table
              </button>
              <a href="tel:+18172947200" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#f2ece3',
                border: '1px solid rgba(242,236,227,0.28)',
                padding: '14px 28px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(242,236,227,0.75)';e.currentTarget.style.background='rgba(242,236,227,0.07)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(242,236,227,0.28)';e.currentTarget.style.background='transparent'}}
              >
                &#9742; ( 817 ) 294-7200
              </a>
            </div>
          </div>

          {/* Scroll hint — structural, minimal */}
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            gap:'8px', paddingBottom:'0.5rem', opacity: 0.28,
          }}>
            <div style={{ width:1, height:56, background:'linear-gradient(to bottom, transparent, #f2ece3)' }}/>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.52rem',
              letterSpacing:'0.22em', color:'#f2ece3',
              writingMode:'vertical-rl', textTransform:'uppercase', marginTop:'8px',
            }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ROW — dark left column + hero image ──── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '5fr 4fr',
      }}>
        <div style={{
          background: 'var(--ink)',
          padding: 'clamp(3.5rem, 6vw, 6.5rem) clamp(2.5rem, 5vw, 5.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2.5rem',
          minHeight: 460,
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(242,236,227,0.88)',
            lineHeight: 1.35,
            maxWidth: '22ch',
          }}>
            "A genuine hidden gem in Fort Worth. Beautifully prepared, honestly priced."
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
            <div style={{ width:30, height:1, background:'var(--ember)' }}/>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.62rem',
              letterSpacing:'0.14em', color:'rgba(242,236,227,0.35)',
              textTransform:'uppercase',
            }}>James Polis &nbsp;·&nbsp; Google Review</span>
          </div>
          <div style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginTop:'0.5rem' }}>
            <Link to="/menu" style={{
              fontFamily:'var(--font-mono)', fontSize:'0.68rem',
              letterSpacing:'0.12em', textTransform:'uppercase',
              color:'var(--ember)', border:'1px solid rgba(212,84,26,0.35)',
              padding:'12px 22px', textDecoration:'none',
              transition:'background 0.2s, color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--ember)';e.currentTarget.style.color='#f2ece3';e.currentTarget.style.borderColor='var(--ember)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--ember)';e.currentTarget.style.borderColor='rgba(212,84,26,0.35)'}}
            >View Menu</Link>
            <button onClick={() => setBooking(true)} style={{
              fontFamily:'var(--font-mono)', fontSize:'0.68rem',
              letterSpacing:'0.12em', textTransform:'uppercase',
              color:'rgba(242,236,227,0.42)', background:'none',
              border:'1px solid rgba(242,236,227,0.12)',
              padding:'12px 22px', cursor:'pointer',
              transition:'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.color='#f2ece3';e.currentTarget.style.borderColor='rgba(242,236,227,0.45)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(242,236,227,0.42)';e.currentTarget.style.borderColor='rgba(242,236,227,0.12)'}}
            >Reserve Online</button>
          </div>
        </div>

        <div style={{ overflow:'hidden', position:'relative', minHeight: 460 }}>
          <img
            src="/public/dragonroll.png"
            alt="Dragon roll"
            loading="lazy"
            style={{
              width:'100%', height:'100%', objectFit:'cover',
              transition:'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s',
              filter:'brightness(0.9) contrast(1.05)',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.04)';e.currentTarget.style.filter='brightness(1) contrast(1.05)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.filter='brightness(0.9) contrast(1.05)'}}
          />
          <div style={{
            position:'absolute', top:20, left:20,
            background:'var(--ember)', color:'#f2ece3',
            fontFamily:'var(--font-mono)', fontSize:'0.58rem',
            letterSpacing:'0.14em', textTransform:'uppercase',
            padding:'5px 10px',
          }}>Specialty Roll</div>
        </div>
      </section>

      {/* ── GALLERY — 4 images, asymmetric architectural grid ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '360px 360px',
        gap: '3px',
        background: '#0c0a08',
      }}>
        {GALLERY.map((img, i) => (
          <div key={i} style={{
            gridColumn: img.col, gridRow: img.row,
            overflow: 'hidden', position: 'relative',
          }}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width:'100%', height:'100%', objectFit:'cover',
                transition:'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s',
                filter:'brightness(0.82) contrast(1.06) saturate(0.9)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.filter='brightness(1) contrast(1.06) saturate(1)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.filter='brightness(0.82) contrast(1.06) saturate(0.9)'}}
            />
          </div>
        ))}
      </section>

      {/* ── HOURS + CONTACT — split dark/light ──────────────── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
        {/* Hours — paper side */}
        <div style={{
          background: 'var(--paper-dark)',
          padding: 'clamp(3.5rem, 6vw, 6rem) clamp(2.5rem, 5vw, 5rem)',
          borderRight: '1px solid var(--bone)',
        }}>
          <p style={{
            fontFamily:'var(--font-mono)', fontSize:'0.6rem',
            letterSpacing:'0.22em', textTransform:'uppercase',
            color:'var(--ember)', marginBottom:'2.5rem',
          }}>Hours of Service</p>

          {HOURS_DATA.map(({ day, times }) => (
            <div key={day} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'1.1rem 0', borderBottom:'1px solid var(--bone)',
            }}>
              <span style={{
                fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:400,
                color: !times ? 'var(--ash)' : 'var(--ink)',
                fontStyle: !times ? 'italic' : 'normal',
              }}>{day}</span>
              <div style={{ textAlign:'right' }}>
                {!times
                  ? <span style={{fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--ash)',letterSpacing:'0.06em'}}>Closed</span>
                  : times.map((t,j)=><div key={j} style={{fontFamily:'var(--font-mono)',fontSize:'0.78rem',color:'var(--ink)',letterSpacing:'0.03em',lineHeight:1.65}}>{t}</div>)
                }
              </div>
            </div>
          ))}
        </div>

        {/* Contact — dark side */}
        <div style={{
          background: 'var(--ink)',
          padding: 'clamp(3.5rem, 6vw, 6rem) clamp(2.5rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{
              fontFamily:'var(--font-mono)', fontSize:'0.6rem',
              letterSpacing:'0.22em', textTransform:'uppercase',
              color:'rgba(242,236,227,0.28)', marginBottom:'2.5rem',
            }}>Find Us</p>

            {/* The phone number is the hero of this block */}
            <a href="tel:+18172947200" style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight:300, color:'var(--ember)',
              letterSpacing:'-0.01em', lineHeight:1,
              marginBottom:'1.5rem', textDecoration:'none',
              display:'block', transition:'opacity 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.72')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
            >(817) 294-7200</a>

            <address style={{
              fontStyle:'normal', color:'rgba(242,236,227,0.45)',
              fontSize:'0.88rem', lineHeight:1.75, marginBottom:'2.5rem',
            }}>
              4938 Overton Ridge Blvd<br/>
              Fort Worth, TX 76132
            </address>

            <a href="https://maps.google.com/?q=4938+Overton+Ridge+Blvd+Fort+Worth+TX+76132"
              target="_blank" rel="noopener noreferrer" style={{
              fontFamily:'var(--font-mono)', fontSize:'0.66rem',
              letterSpacing:'0.14em', textTransform:'uppercase',
              color:'rgba(242,236,227,0.28)', textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:'6px',
              transition:'color 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--ember)')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,236,227,0.28)')}
            >Get Directions &rarr;</a>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'3rem' }}>
            <a href="tel:+18172947200" className="btn-call">&#9742; Call Now</a>
            <button onClick={() => setBooking(true)} style={{
              fontFamily:'var(--font-mono)', fontSize:'0.68rem',
              letterSpacing:'0.12em', textTransform:'uppercase',
              background:'transparent', color:'rgba(242,236,227,0.4)',
              border:'1px solid rgba(242,236,227,0.14)',
              padding:'12px 22px', cursor:'pointer',
              alignSelf:'flex-start',
              transition:'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.color='#f2ece3';e.currentTarget.style.borderColor='rgba(242,236,227,0.5)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(242,236,227,0.4)';e.currentTarget.style.borderColor='rgba(242,236,227,0.14)'}}
            >Reserve Online</button>
          </div>
        </div>
      </section>

      {/* ── REVIEWS — dark, editorial, no cards, no stars ──── */}
      <section style={{
        background: 'var(--ink)',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(2rem, 5vw, 5rem)',
      }}>
        {/* Label */}
        <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', marginBottom:'4rem' }}>
          <div style={{ width:40, height:1, background:'var(--ember)' }}/>
          <p style={{
            fontFamily:'var(--font-mono)', fontSize:'0.6rem',
            letterSpacing:'0.24em', textTransform:'uppercase',
            color:'rgba(242,236,227,0.3)',
          }}>Guest Voices</p>
        </div>

        {/* 2x2 grid — bordered cells, no card background */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(2,1fr)',
          border:'1px solid rgba(255,255,255,0.07)',
        }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{
              padding:'clamp(2rem, 4vw, 3.5rem)',
              borderRight: i%2===0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              borderBottom: i<2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              position:'relative',
            }}>
              {/* Decorative open-quote */}
              <div style={{
                fontFamily:'var(--font-display)', fontStyle:'italic',
                fontSize:'8rem', lineHeight:0.7,
                color:'var(--ember)', opacity:0.08,
                position:'absolute', top:'1.25rem',
                left:'clamp(1.5rem,3vw,2.5rem)', pointerEvents:'none',
              }}>"</div>

              <p style={{
                fontFamily:'var(--font-display)', fontStyle:'italic',
                fontSize:'clamp(1rem, 1.8vw, 1.25rem)',
                fontWeight:300, color:'rgba(242,236,227,0.82)',
                lineHeight:1.7, marginBottom:'2rem',
                paddingTop:'2.25rem', position:'relative', zIndex:1,
              }}>"{r.text}"</p>

              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ width:18, height:1, background:'var(--ember)', opacity:0.55 }}/>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:500, color:'#f2ece3', marginBottom:'2px' }}>{r.name}</p>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(242,236,227,0.28)' }}>{r.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google link */}
        <div style={{ marginTop:'3rem', display:'flex', justifyContent:'center' }}>
          <a href="https://share.google/vznnmPTSQn8L2xpxA" target="_blank" rel="noopener noreferrer" style={{
            fontFamily:'var(--font-mono)', fontSize:'0.65rem',
            letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(242,236,227,0.28)', textDecoration:'none',
            display:'inline-flex', alignItems:'center', gap:'12px',
            transition:'color 0.2s',
          }}
            onMouseEnter={e=>(e.currentTarget.style.color='var(--ember)')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,236,227,0.28)')}
          >
            <span style={{ display:'inline-block', width:28, height:1, background:'currentColor' }}/>
            Read All Reviews on Google
            <span style={{ display:'inline-block', width:28, height:1, background:'currentColor' }}/>
          </a>
        </div>
      </section>

      {/* ── CLOSING STRIP — refined, not shouting ───────────── */}
      <section style={{
        background: 'var(--paper-dark)',
        padding: 'clamp(3.5rem, 5vw, 5rem) clamp(2rem, 5vw, 5rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        borderTop: '1px solid var(--bone)',
      }}>
        <div>
          <p style={{
            fontFamily:'var(--font-display)', fontStyle:'italic',
            fontSize:'clamp(1.5rem, 3vw, 2.3rem)',
            fontWeight:300, color:'var(--ink)', lineHeight:1.25,
          }}>
            Fort Worth's finest sushi,<br/>
            <em style={{ color:'var(--ember)' }}>hidden in plain sight.</em>
          </p>
          <p style={{
            marginTop:'0.75rem', fontFamily:'var(--font-mono)',
            fontSize:'0.66rem', letterSpacing:'0.1em', color:'var(--ash)',
          }}>$10–20 per person &nbsp;·&nbsp; Dine In &amp; Takeout</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', alignItems:'flex-end' }}>
          <a href="tel:+18172947200" style={{
            fontFamily:'var(--font-mono)', fontSize:'0.7rem',
            letterSpacing:'0.12em', textTransform:'uppercase',
            background:'var(--ember)', color:'#f2ece3',
            padding:'14px 28px', textDecoration:'none',
            display:'inline-block', whiteSpace:'nowrap',
            transition:'background 0.2s',
          }}
            onMouseEnter={e=>(e.currentTarget.style.background='var(--ember-hot)')}
            onMouseLeave={e=>(e.currentTarget.style.background='var(--ember)')}
          >&#9742; Call Now</a>
          <button onClick={() => setBooking(true)} style={{
            fontFamily:'var(--font-mono)', fontSize:'0.67rem',
            letterSpacing:'0.12em', textTransform:'uppercase',
            background:'transparent', color:'var(--ash)',
            border:'1px solid var(--bone)', padding:'12px 26px',
            cursor:'pointer', whiteSpace:'nowrap',
            transition:'color 0.2s, border-color 0.2s',
          }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--ink)';e.currentTarget.style.borderColor='var(--ash)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='var(--ash)';e.currentTarget.style.borderColor='var(--bone)'}}
          >Reserve Online</button>
        </div>
      </section>

      {booking && <BookingModal onClose={() => setBooking(false)} />}

      <style>{`
        @media (max-width: 860px) {
          /* Statement row */
          main > section:nth-child(2) { grid-template-columns: 1fr !important; }
          main > section:nth-child(2) > div:last-child { min-height: 300px; }
          /* Gallery simplify */
          main > section:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 260px 260px 260px !important;
          }
          main > section:nth-child(3) > div:nth-child(1) { grid-column: 1/3 !important; grid-row: 1/2 !important; }
          main > section:nth-child(3) > div:nth-child(2) { grid-column: 1/2 !important; grid-row: 2/3 !important; }
          main > section:nth-child(3) > div:nth-child(3) { grid-column: 2/3 !important; grid-row: 2/3 !important; }
          main > section:nth-child(3) > div:nth-child(4) { grid-column: 1/3 !important; grid-row: 3/4 !important; }
          /* Hours stack */
          main > section:nth-child(4) { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          /* Reviews 1 col */
          main > section:nth-child(5) > div:nth-child(2) { grid-template-columns: 1fr !important; }
          main > section:nth-child(5) > div:nth-child(2) > div { border-right: none !important; }
        }
        @media (max-width: 480px) {
          main > section:last-child { flex-direction: column; align-items: flex-start; }
          main > section:last-child > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </main>
  )
}

/* ─── Shared modal styles ──────────────────────────────────────────────── */
const S = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(12,10,8,0.82)',
    zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem', backdropFilter: 'blur(6px)',
  } as React.CSSProperties,
  modal: {
    background: 'var(--paper)',
    width: '100%', maxWidth: 500,
    maxHeight: '90vh', overflowY: 'auto' as const,
    padding: '2.5rem', position: 'relative' as const,
  } as React.CSSProperties,
  lbl: {
    display: 'block', fontFamily: 'var(--font-mono)',
    fontSize: '0.62rem', letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, opacity: 0.45, marginBottom: '6px',
  } as React.CSSProperties,
  inp: {
    width: '100%', padding: '10px 12px',
    background: 'white', border: '1px solid var(--bone)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    color: 'var(--ink)', outline: 'none', borderRadius: 0,
    appearance: 'none' as const,
  } as React.CSSProperties,
}
