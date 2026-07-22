import './EventPage.css'

const TABS = [
  { id: 'bhartiya', label: 'BHARTIYA',   icon: '/Bhartiya Converge Bharatiya Page Logo.svg' },
  { id: 'about',    label: 'ABOUT GCCS', icon: '/Bhartiya Converge About Logo.svg' },
  { id: 'speakers', label: 'SPEAKERS',   icon: '/Bhartiya Converge Speaker Logo.svg' },
  { id: 'event',    label: 'EVENT',      icon: '/Bhartiya Converge Event Logo.svg' },
]

/* Location pin SVG */
const PinIcon = () => (
  <svg className="ev-pin-icon" width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C5.477 0 1 4.477 1 10C1 17.5 11 28 11 28C11 28 21 17.5 21 10C21 4.477 16.523 0 11 0Z" fill="#881518"/>
    <circle cx="11" cy="10" r="4" fill="#f5e8dc"/>
  </svg>
)

/* Decorative arc SVG (for top-right and bottom-left corners) */
const DecoArcs = ({ flip }) => (
  <svg
    width="130" height="130"
    viewBox="0 0 130 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: 'rotate(180deg)' } : {}}
  >
    <path d="M10 120 Q10 10 120 10" stroke="#881518" strokeWidth="1.4" fill="none" opacity="0.45"/>
    <path d="M22 120 Q22 22 120 22" stroke="#881518" strokeWidth="1.4" fill="none" opacity="0.45"/>
    <path d="M36 120 Q36 36 120 36" stroke="#881518" strokeWidth="1.4" fill="none" opacity="0.45"/>
    <path d="M52 120 Q52 52 120 52" stroke="#881518" strokeWidth="1.4" fill="none" opacity="0.45"/>
  </svg>
)

function EventPage({ onBack, onTabChange }) {
  return (
    <main className="ev-page">
      {/* ── Main Content Column ── */}
      <div className="ev-content">

        {/* Section 1: What You'll Leave With */}
        <h2 className="ev-leave-heading">What You'll Leave With</h2>
        <p className="ev-leave-body">
          A clear view of what your own capability<br />
          centre is and how it fits your business.<br />
          The unvarnished cost-to-benefit picture, from<br />
          people who have lived it. Direct answers no<br />
          jargon, no pitch, no warm white wine.
        </p>

        {/* Section 2: The Details / Date */}
        <p className="ev-details-label">The Details</p>
        <p className="ev-date">
          29<sup>th</sup>&nbsp;September 2026
        </p>

        {/* Location */}
        <div className="ev-location">
          <div className="ev-location-row">
            <PinIcon />
            <span className="ev-location-venue">Battersea Power Station</span>
          </div>
          <span className="ev-location-time">5 PM Onwards</span>
        </div>

        {/* Divider */}
        <div className="ev-divider" />

        {/* Section 3: CTA */}
        <h2 className="ev-cta-heading">To Take The First Step</h2>
        <p className="ev-cta-sub">Join Us In London</p>
        <p className="ev-cta-small">
          To reserve your place or register interest,<br />please contact:
        </p>

        {/* Dark Red Info Bar */}
        <div className="ev-info-bar">
          <div className="ev-info-bar-row">
            <a
              href="https://forms.office.com/r/yhu1tj1yDJ"
              target="_blank"
              rel="noreferrer"
              className="ev-info-text ev-rsvp-link"
            >
              RSVP
            </a>
            <span className="ev-info-sep">|</span>
            <span className="ev-info-text">+91 1234567890</span>
            <span className="ev-info-sep">|</span>
            <span className="ev-info-text">abc@mail.com</span>
          </div>
          <a href="https://www.bhartiyaconverge.com" className="ev-info-url" target="_blank" rel="noreferrer">
            www.bhartiyaconverge.com
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="ev-bottom">
          <p className="ev-explore-text">Explore Your GCC Opportunity With Us</p>
          <a
            href="https://forms.office.com/r/3RUhmYaK2F"
            target="_blank"
            rel="noreferrer"
            className="ev-book-btn"
          >
            Book A Meeting
          </a>
        </div>
      </div>

      {/* ── Right Sidebar Tabs ── */}
      <aside className="bp-sidebar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`bp-tab ${tab.id === 'event' ? 'bp-tab--active' : ''}`}
            onClick={() => onTabChange && onTabChange(tab.id)}
            title={tab.label}
          >
            <span className="bp-tab-icon">
              <img src={tab.icon} alt={tab.label} />
            </span>
            <span className="bp-tab-label">{tab.label}</span>
          </button>
        ))}
      </aside>
    </main>
  )
}

export default EventPage
