import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import apiService from './apiService';

const Dashboard = () => {
  const { signOut } = useAuth();
  const [skillProfile, setSkillProfile] = useState({
    linkedin: '',
    github: '',
    customInput: '',
    files: []
  });
  const [jobLink, setJobLink] = useState('');
  const [application, setApplication] = useState('');
  const [loading, setLoading] = useState(false);
  const [deepSeekKey, setDeepSeekKey] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would process the profile data
    alert('Skill profile data saved!');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSkillProfile({...skillProfile, files: [...skillProfile.files, ...files]});
  };

  const handleJobLinkSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would fetch and process the job posting
    alert('Job link submitted!');
  };

  const generateApplication = async () => {
    setLoading(true);
    
    // Set the API key if provided
    if (deepSeekKey) {
      apiService.setApiKey(deepSeekKey);
    }
    
    try {
      // This would normally call an AI API to generate the application
      const result = await apiService.generateApplication(skillProfile, { jobLink });
      
      if (result.success) {
        setApplication(result.data.application);
      } else {
        setApplication(`Error generating application: ${result.error}`);
      }
    } catch (error) {
      setApplication(`Error generating application: ${error.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Hire Me - Automated Job Application Generator</h1>
        <button onClick={signOut}>Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="profile-section">
          <h2>Skill Profile</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn Profile URL</label>
              <input
                type="url"
                id="linkedin"
                value={skillProfile.linkedin}
                onChange={(e) => setSkillProfile({...skillProfile, linkedin: e.target.value})}
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="github">GitHub Profile URL</label>
              <input
                type="url"
                id="github"
                value={skillProfile.github}
                onChange={(e) => setSkillProfile({...skillProfile, github: e.target.value})}
                placeholder="https://github.com/yourusername"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="customInput">Custom Information</label>
              <textarea
                id="customInput"
                value={skillProfile.customInput}
                onChange={(e) => setSkillProfile({...skillProfile, customInput: e.target.value})}
                placeholder="Add any additional information about your skills, experience, or preferences..."
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="files">Upload Files (Resume, Portfolio, etc.)</label>
              <input
                type="file"
                id="files"
                onChange={handleFileChange}
                multiple
              />
              {skillProfile.files.length > 0 && (
                <div className="file-list">
                  <p>Uploaded files:</p>
                  <ul>
                    {skillProfile.files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <button type="submit">Save Profile</button>
          </form>
        </section>

        <section className="job-section">
          <h2>Job Advertisement</h2>
          <form onSubmit={handleJobLinkSubmit}>
            <div className="form-group">
              <label htmlFor="jobLink">Job Posting URL</label>
              <input
                type="url"
                id="jobLink"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="https://example.com/job-posting"
              />
            </div>
            <button type="submit">Save Job Link</button>
          </form>
        </section>

        <section className="api-section">
          <h2>AI Integration</h2>
          <div className="form-group">
            <label htmlFor="deepSeekKey">DeepSeek API Key (Optional)</label>
            <input
              type="password"
              id="deepSeekKey"
              value={deepSeekKey}
              onChange={(e) => setDeepSeekKey(e.target.value)}
              placeholder="Enter your DeepSeek API key for enhanced application generation"
            />
            <p className="hint">If provided, the application will use DeepSeek AI to generate more sophisticated job applications.</p>
          </div>
        </section>

        <section className="application-section">
          <h2>Generate Application</h2>
          <button 
            onClick={generateApplication} 
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate Custom Application'}
          </button>
          
          {application && (
            <div className="application-result">
              <h3>Generated Application</h3>
              <div className="application-text">
                <pre>{application}</pre>
              </div>
              <button className="copy-btn">Copy to Clipboard</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;