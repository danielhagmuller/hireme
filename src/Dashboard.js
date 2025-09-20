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
  const [deepSeekKey] = useState('sk-6ba4fa3163c44583bb581ef167c14851');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSkillProfile({...skillProfile, files: [...skillProfile.files, ...files]});
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(application);
      alert('Application copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = application;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Application copied to clipboard!');
    }
  };

  const generateApplication = async () => {
    setLoading(true);
    setApplication(''); // Clear previous application
    
    try {
      // Always set the API key for DeepSeek processing
      apiService.setApiKey(deepSeekKey);
      
      console.log('Generating application with profile:', skillProfile, 'and job:', { jobLink });
      
      // Call the API service to generate the application
      const result = await apiService.generateApplication(skillProfile, { jobLink });
      
      console.log('Generation result:', result);
      
      if (result.success) {
        setApplication(result.data.application);
      } else {
        setApplication(`Error generating application: ${result.error}`);
      }
    } catch (error) {
      console.error('Generate application error:', error);
      setApplication(`Error generating application: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Hire Me - Automated Job Application Generator</h1>
        <button onClick={signOut}>Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="profile-section">
          <h2>Your Information</h2>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn Profile URL (Optional)</label>
            <input
              type="text"
              id="linkedin"
              value={skillProfile.linkedin}
              onChange={(e) => setSkillProfile({...skillProfile, linkedin: e.target.value})}
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="github">GitHub Profile URL (Optional)</label>
            <input
              type="text"
              id="github"
              value={skillProfile.github}
              onChange={(e) => setSkillProfile({...skillProfile, github: e.target.value})}
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customInput">Additional Information (Optional)</label>
            <textarea
              id="customInput"
              value={skillProfile.customInput}
              onChange={(e) => setSkillProfile({...skillProfile, customInput: e.target.value})}
              placeholder="Add any additional information about your skills, experience, or preferences..."
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="files">Upload Files (Optional)</label>
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
        </section>

        <section className="job-section">
          <h2>Job Information</h2>
          <div className="form-group">
            <label htmlFor="jobLink">Job Posting URL (Optional)</label>
            <input
              type="text"
              id="jobLink"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              placeholder="https://example.com/job-posting"
            />
          </div>
        </section>

        <section className="application-section">
          <button 
            onClick={generateApplication} 
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating Application...' : 'Generate Custom Application'}
          </button>
          
          {application && (
            <div className="application-result">
              <h3>Generated Application</h3>
              <div className="application-text">
                <pre>{application}</pre>
              </div>
              <button className="copy-btn" onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;