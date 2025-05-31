import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Navbar({ currentPage, setCurrentPage }) {
  /** This is the main navigation bar for page selection. */
  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Profile', page: 'profile' },
    { label: 'Matching Jobs', page: 'jobs' },
    { label: 'Skill Recommendations', page: 'skills' },
  ];
  return (
    <nav className="navbar luxury-navbar">
      <div className="container nav-flex">
        <div className="logo">
          <span className="logo-symbol" style={{color: 'var(--accent-color)'}}>*</span> EliteCareerMatch
        </div>
        <div className="navlinks">
          {navLinks.map((nav) => (
            <button
              key={nav.page}
              className={`nav-btn${currentPage === nav.page ? ' active' : ''}`}
              onClick={() => setCurrentPage(nav.page)}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function HomePage({ setCurrentPage }) {
  /** Luxury-style hero section with CTA */
  return (
    <section className="hero luxury-hero">
      <div className="subtitle luxury-subtitle">Welcome to Your Elite Career Journey</div>
      <h1 className="title luxury-title">Find Your Dream Job, 
        <br/> Elevate Your Skills
      </h1>
      <div className="description luxury-desc">
        EliteCareerMatch personalizes job matching and skill recommendations for ambitious professionals. Explore, grow, and achieve with a modern, premium experience tailored to your goals.
      </div>
      <div className="hero-actions">
        <button className="btn btn-large"
          onClick={() => setCurrentPage('profile')}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ProfileForm({ userProfile, setUserProfile, onSubmit }) {
  /** User profile input form with fields for career tailoring. */
  const [form, setForm] = useState(userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    // Simulate comma separated/array input
    setForm(f => ({ ...f, skills: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(form);
    onSubmit && onSubmit();
  };

  return (
    <form className="profile-form luxury-panel" onSubmit={handleSubmit}>
      <h2 className="panel-title">Your Profile</h2>
      <label>
        Full Name
        <input
          type="text"
          name="name"
          className="input"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </label>
      <label>
        Desired Title
        <input
          type="text"
          name="title"
          className="input"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: Senior Software Engineer"
          required
        />
      </label>
      <label>
        Location
        <input
          type="text"
          name="location"
          className="input"
          value={form.location}
          onChange={handleChange}
          placeholder="Ex: New York, Remote"
        />
      </label>
      <label>
        Skills (comma separated)
        <input
          type="text"
          name="skills"
          className="input"
          value={form.skills}
          onChange={handleMultiSelect}
          placeholder="Ex: React, Node.js, Data Analysis"
        />
      </label>
      <label>
        Years of Experience
        <input
          type="number"
          name="experience"
          className="input"
          min={0}
          value={form.experience}
          onChange={handleChange}
          placeholder="Ex: 5"
        />
      </label>
      <button className="btn btn-large" type="submit" style={{marginTop: 20}}>
        Save Profile
      </button>
    </form>
  );
}

// PUBLIC_INTERFACE
function JobMatchPanel({ userProfile }) {
  /**
   * Simulate personalized job matching based on userProfile.
   * In a real app, this would query a backend. We'll use static sample data and filter.
   */
  const mockJobs = [
    {
      title: 'Senior React Developer',
      company: 'Luxurious Tech Inc.',
      location: 'Remote',
      requirements: ['React', 'JavaScript', 'UI/UX'],
      experience: 4,
      description: 'Build premium web applications for elite clients.',
    },
    {
      title: 'Data Analyst',
      company: 'Prestige Analytics',
      location: 'New York',
      requirements: ['Data Analysis', 'Python', 'SQL'],
      experience: 2,
      description: 'Analyze luxury market trends for Fortune 500 clients.',
    },
    {
      title: 'Backend Engineer',
      company: 'Golden Pyramid Solutions',
      location: 'San Francisco',
      requirements: ['Node.js', 'API Design', 'Cloud'],
      experience: 3,
      description: 'Engineer scalable cloud solutions for high-end businesses.',
    },
    // Add more as needed
  ];
  
  let matchedJobs = mockJobs;
  if (userProfile && userProfile.skills) {
    const userSkills = userProfile.skills.split(',').map(s => s.trim().toLowerCase());
    matchedJobs = mockJobs.filter(job => 
      job.requirements.some(req => userSkills.includes(req.toLowerCase()))
    );
  }
  if (userProfile && userProfile.experience) {
    matchedJobs = matchedJobs.filter(job => userProfile.experience >= job.experience);
  }
  if (matchedJobs.length === 0) matchedJobs = mockJobs;

  return (
    <div className="job-match luxury-panel">
      <h2 className="panel-title">Personalized Job Matches</h2>
      {matchedJobs.map((job, idx) => (
        <div key={idx} className="job-listing">
          <div className="job-title">{job.title}</div>
          <div className="job-meta">
            <span className="job-company">{job.company}</span> | <span className="job-location">{job.location}</span>
          </div>
          <div className="job-desc">{job.description}</div>
          <div className="job-skills">
            <span className="job-label">Required:</span> {job.requirements.join(', ')}
          </div>
          <div className="job-exp">
            <span className="job-label">Experience:</span> {job.experience}+
          </div>
          <div className="job-apply-row">
            <div className="luxury-tooltip-btn-wrapper">
              <button
                className="btn luxury-apply-btn"
                type="button"
                // Dummy apply handler; in real scenario, you would adapt this for actual application
                onClick={() => window.alert('Your application has been submitted!')}
                tabIndex={0}
              >
                Apply
              </button>
              <div className="luxury-tooltip">
                are you sure to apply to this job?
              </div>
            </div>
          </div>
        </div>
      ))}
      {matchedJobs.length === 0 && <div className="no-jobs luxury-desc">No matching jobs found. Update your profile and try again.</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillRecommendations({ userProfile }) {
  /**
   * Suggest additional skills based on mock logic.
   * Would use a recommendation engine in production.
   */
  const skillMap = {
    'React': ['TypeScript', 'Next.js', 'Redux'],
    'Node.js': ['GraphQL', 'Docker', 'AWS'],
    'Data Analysis': ['Tableau', 'Power BI', 'Machine Learning'],
    'Python': ['Machine Learning', 'Pandas', 'ETL'],
    'SQL': ['Data Warehousing', 'NoSQL'],
    'UI/UX': ['Figma', 'Motion Design'],
    'API Design': ['GraphQL', 'API Security'],
    'Cloud': ['AWS', 'Azure', 'GCP']
  };
  let userSkills = [];
  if (userProfile && userProfile.skills) {
    userSkills = userProfile.skills.split(',').map(s => s.trim());
  }
  const recommended = [];
  userSkills.forEach(skill => {
    if (skillMap[skill]) {
      skillMap[skill].forEach(rec => {
        if (!userSkills.includes(rec) && !recommended.includes(rec)) recommended.push(rec);
      });
    }
  });
  if (recommended.length === 0) {
    recommended.push("Leadership", "Advanced Communication"); // Fallback
  }

  return (
    <div className="skills-panel luxury-panel">
      <h2 className="panel-title">Recommended Skills For You</h2>
      <ul className="skills-list">
        {recommended.map((skill, i) => (
          <li key={i} className="skill-listing">{skill}</li>
        ))}
      </ul>
    </div>
  );
}

const initialProfile = {
  name: '',
  title: '',
  location: '',
  skills: '',
  experience: '',
};

// PUBLIC_INTERFACE
function App() {
  /** Main container for EliteCareerMatch, holding all navigation, state, and visual layout. */
  const [page, setPage] = useState('home');
  const [userProfile, setUserProfile] = useState(initialProfile);

  // Checks if the minimal required profile fields are filled (name and title, non-empty)
  function isProfileComplete(profile) {
    return (
      profile &&
      typeof profile.name === 'string' && profile.name.trim().length > 0 &&
      typeof profile.title === 'string' && profile.title.trim().length > 0
    );
  }

  return (
    <div className="app luxury-app">
      <Navbar currentPage={page} setCurrentPage={setPage} />
      <main>
        <div className="container">
          {page === 'home' && <HomePage setCurrentPage={setPage} />}
          {page === 'profile' && (
            <div className="section-flex">
              <ProfileForm
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                onSubmit={() => setPage('jobs')}
              />
            </div>
          )}
          {page === 'jobs' && (
            <div className="section-flex">
              <div className="section-block">
                {isProfileComplete(userProfile) ? (
                  <JobMatchPanel userProfile={userProfile} />
                ) : (
                  <div className="luxury-panel" style={{textAlign: "center", maxWidth: 420}}>
                    <h2 className="panel-title">Personalized Job Matches</h2>
                    <div className="luxury-desc" style={{padding: "18px 0"}}>
                      Please provide your profile details (Name and Desired Title) in the Profile section to view personalized job matches.
                    </div>
                    <button className="btn btn-large" onClick={() => setPage('profile')}>
                      Go to Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {page === 'skills' && (
            <div className="section-flex">
              <div className="section-block">
                <SkillRecommendations userProfile={userProfile} />
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="luxury-footer">
        <div className="container">
          EliteCareerMatch &copy; {new Date().getFullYear()} &mdash; Designed for Excellence
        </div>
      </footer>
    </div>
  );
}

export default App;
