import './SpeakersPage.css'

const TABS = [
  { id: 'bhartiya', label: 'BHARTIYA',   icon: '/Bhartiya Converge Bharatiya Page Logo.svg' },
  { id: 'about',    label: 'ABOUT GCCS', icon: '/Bhartiya Converge About Logo.svg' },
  { id: 'speakers', label: 'SPEAKERS',   icon: '/Bhartiya Converge Speaker Logo.svg' },
  { id: 'event',    label: 'EVENT',      icon: '/Bhartiya Converge Event Logo.svg' },
]

const SPEAKERS = [
  {
    id: 'julie',
    name: 'Julie Averill',
    role: 'Former CIO, Lululemon',
    photo: '/Bharatiya Converge Speakers Julie.webp',
    photoSide: 'right',
    linkedin: 'https://www.linkedin.com/in/julieaverill/',
  },
  {
    id: 'peter',
    name: 'Peter Wood',
    role: 'CEO, AllSaints',
    photo: '/Bharatiya Converge Speakers Peter.webp',
    photoSide: 'left',
    linkedin: 'https://www.linkedin.com/in/peter-wood-7391734b/',
  },
  {
    id: 'alfie',
    name: 'Alfie Meekings',
    role: 'CTO, AllSaints',
    photo: '/Bharatiya Converge Speakers Alfie.webp',
    photoSide: 'right',
    linkedin: 'https://www.linkedin.com/in/alfiemeekings/',
  },
]

// Inline LinkedIn SVG icon
const LinkedInIcon = () => (
  <svg className="sp-linkedin-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#000000"/>
    <path d="M7.2 9.6H5V19H7.2V9.6Z" fill="white"/>
    <circle cx="6.1" cy="7.1" r="1.4" fill="white"/>
    <path d="M13.4 12.4C13.4 11.3 14.1 10.6 15.1 10.6C16.1 10.6 16.6 11.3 16.6 12.4V19H18.8V12.1C18.8 9.9 17.6 8.7 15.8 8.7C14.4 8.7 13.4 9.5 13 10.2V9.6H11V19H13.4V12.4Z" fill="white"/>
  </svg>
)

function SpeakersPage({ onBack, onTabChange }) {
  return (
    <main className="sp-page">
      {/* Main Content */}
      <div className="sp-content">
        <h1 className="sp-main-heading">
          Meet the ones who've<br />leveraged the opportunity
        </h1>

        <p className="sp-subtext">
          The leaders who grew their business<br />
          rapidly and profitably - the ones who used<br />
          technology as an enabler.
        </p>

        <p className="sp-meet-label">Meet Our Speakers</p>

        {/* Speaker Cards */}
        <div className="sp-cards">
          {SPEAKERS.map((s) => (
            <div key={s.id} className={`sp-card-wrapper photo-${s.photoSide}`}>
              <div className="sp-card">
                {/* Text side */}
                <div className="sp-card-text">
                  <span className="sp-card-name">{s.name}</span>
                  <div className="sp-card-role-row">
                    <span className="sp-card-role">{s.role}</span>
                    {s.linkedin && (
                      <a
                        href={s.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="sp-linkedin-link"
                        title={`${s.name} LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                </div>

                {/* Floating photo overflowing card top */}
                <div className="sp-card-photo">
                  <img src={s.photo} alt={s.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p className="sp-footer-text">
          They will share their success roadmap from building<br />
          their strategic India capability centre to the<br />
          decisions they would make again in a heartbeat.
        </p>
      </div>

      {/* Right Sidebar Tabs */}
      <aside className="bp-sidebar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`bp-tab ${tab.id === 'speakers' ? 'bp-tab--active' : ''}`}
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

export default SpeakersPage
