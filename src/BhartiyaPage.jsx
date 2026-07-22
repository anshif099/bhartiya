import { useState } from 'react'
import './BhartiyaPage.css'

const TABS = [
  {
    id: 'bhartiya',
    label: 'BHARTIYA',
    icon: '/Bhartiya Converge Bharatiya Page Logo.svg',
  },
  {
    id: 'about',
    label: 'ABOUT GCCS',
    icon: '/Bhartiya Converge About Logo.svg',
  },
  {
    id: 'speakers',
    label: 'SPEAKERS',
    icon: '/Bhartiya Converge Speaker Logo.svg',
  },
  {
    id: 'event',
    label: 'EVENT',
    icon: '/Bhartiya Converge Event Logo.svg',
  },
]

function BhartiyaPage({ onBack, onTabChange }) {
  const [activeTab, setActiveTab] = useState('bhartiya')

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    if (tabId === 'about' && onTabChange) {
      onTabChange('about')
    }
  }

  return (
    <main className="bp-page">
      {/* Background illustration layer */}
      <div className="bp-map-bg" />

      {/* ── Main content column ── */}
      <div className="bp-content">

        <p className="bp-top-quote">
          These are businesses that compete globally<br />
          and implement agile digital transformations, making<br />
          it their own capability rather than outsourcing it.
        </p>

        <div className="bp-diamonds">
          <span>◆</span><span>◆</span><span>◆</span>
        </div>

        <h2 className="bp-headline">
          This evening is for such leaders,<br />
          the first to leverage the opportunity.
        </h2>

        <p className="bp-body">
          The Bhartiya Group is a diversified Indian conglomerate with
          interests spanning fashion, real estate, integrated corporate
          services, infrastructure, amongst others.<br />
          Established with a strong foundation in fashion,<br />
          the Group has evolved into a multi-industry enterprise serving
          businesses across diverse sectors. Today,<br />
          the group operates in over 10 business verticals, delivering
          integrated solutions and creating value across across industries
          in Indian and global markets.
        </p>

        {/* Stats grid */}
        <div className="bp-stats-card">
          <div className="bp-stats-row">
            <div className="bp-stat">
              <span className="bp-stat-number">40+</span>
              <span className="bp-stat-label">Years of<br />Legacy</span>
            </div>
            <div className="bp-stat-divider-v" />
            <div className="bp-stat">
              <span className="bp-stat-number">6+</span>
              <span className="bp-stat-label">Countries</span>
            </div>
            <div className="bp-stat-divider-v" />
            <div className="bp-stat">
              <span className="bp-stat-number">500+</span>
              <span className="bp-stat-label">Global Clients<br />Across Industries</span>
            </div>
          </div>
          <div className="bp-stats-divider-h" />
          <div className="bp-stats-row">
            <div className="bp-stat">
              <span className="bp-stat-number">40,000+</span>
              <span className="bp-stat-label">Strong Employee<br />Base</span>
            </div>
            <div className="bp-stat-divider-v" />
            <div className="bp-stat">
              <span className="bp-stat-number bp-stat-number--red">30M sqft</span>
              <span className="bp-stat-label">Developed<br />Real Estate</span>
            </div>
            <div className="bp-stat-divider-v" />
            <div className="bp-stat">
              <span className="bp-stat-number bp-stat-number--red">40M sqft</span>
              <span className="bp-stat-label">Under<br />Development</span>
            </div>
          </div>
        </div>

        {/* Plane + BHARTIYA logo */}
        <div className="bp-bottom-section">
          <div className="bp-plane-area">
            <img src="/Flight.webp" alt="Flight" className="bp-plane" />
          </div>
          <div className="bp-logo-box">
            <img src="/Bhartiya.svg" alt="BHARTIYA" className="bp-bhartiya-logo-img" />
          </div>
        </div>
      </div>

      {/* ── Right Sidebar Tabs ── */}
      <aside className="bp-sidebar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`bp-tab ${activeTab === tab.id ? 'bp-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            title={tab.label}
          >
            <span className="bp-tab-icon">
              <img src={tab.icon} alt={tab.label} />
            </span>
            <span className="bp-tab-label">{tab.label}</span>
          </button>
        ))}
      </aside>

      {/* Floating back button */}
      <button className="bp-back-btn" onClick={onBack} title="Back">
        &#8592;
      </button>
    </main>
  )
}

export default BhartiyaPage
