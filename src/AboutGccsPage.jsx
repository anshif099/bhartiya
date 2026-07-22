import './AboutGccsPage.css'

const BENEFITS = [
  {
    id: 1,
    icon: '/Bhartiya Converge About Digital Icon.svg',
    text: 'Digital, Technology & AI Transformation Fully-Owned By You.',
  },
  {
    id: 2,
    icon: '/Bhartiya Converge About Out scored Icon.svg',
    text: 'Not Outsourced, Not Available To All Players.',
  },
  {
    id: 3,
    icon: '/Bhartiya Converge About Compound Icon.svg',
    text: 'Compounded Wins: Improved Top-line; Enhanced bottom-line.',
  },
  {
    id: 4,
    icon: '/Bhartiya Converge About Strategy Icon.svg',
    text: 'A Strategic Edge & A Clear Value Proposition',
  },
  {
    id: 5,
    icon: '/Bhartiya Converge About Business Icon.svg',
    text: 'Business Models Designed & Customised To Your Needs',
  },
  {
    id: 6,
    icon: '/Bhartiya Converge About Access to talent Icon.svg',
    text: 'Ready Access to Talent',
  },
  {
    id: 7,
    icon: '/Bhartiya Converge About Improve Icon.svg',
    text: 'Improve Your Speed to Market',
  },
]

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

function AboutGccsPage({ onBack, onTabChange }) {
  return (
    <main className="about-page">
      {/* Back Button */}
      <button className="about-back-btn" onClick={onBack} title="Back">
        &#8592;
      </button>

      {/* Main Content Column */}
      <div className="about-content">
        {/* Top Cropped Hero Images */}
        <div className="about-hero-images">
          <div className="about-img-left">
            <img src="/Bharatiya About image 01.webp" alt="Architecture" />
          </div>
          <div className="about-img-right">
            <img src="/Bharatiya About image 02.webp" alt="Corporate Team" />
          </div>
        </div>

        {/* What is a GCC Section */}
        <div className="about-section-title">
          <span className="sub">WHAT IS A</span>
          <span className="main">GLOBAL CAPABILITY CENTRE?</span>
        </div>

        <p className="about-description">
          <strong>A Global Capability Centre (GCC)</strong> is your own team in India, technology, digital, analytics, finance, operations, owned by you, not outsourced. You build your team with the same expertise available to top global brands, giving you a competitive advantage with talent and cost.
        </p>

        {/* How It Benefits You Section */}
        <div className="about-benefits-title">
          HOW IT BENEFITS YOU?
        </div>

        {/* Benefits List */}
        <div className="about-benefits-list">
          {BENEFITS.map((item) => (
            <div className="benefit-item" key={item.id}>
              <div className="benefit-icon-wrapper">
                <img src={item.icon} alt="" className="benefit-icon" />
              </div>
              <span className="benefit-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar Tabs */}
      <aside className="bp-sidebar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`bp-tab ${tab.id === 'about' ? 'bp-tab--active' : ''}`}
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

export default AboutGccsPage
