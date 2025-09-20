// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.deepseek.com/v1';

class ApiService {
  constructor() {
    this.apiKey = null;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  async generateApplication(profileData, jobData) {
    // This would be the actual implementation when we have the API key
    if (!this.apiKey) {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a more personalized response based on available data
      const hasLinkedIn = profileData.linkedin?.trim();
      const hasGitHub = profileData.github?.trim();
      const hasCustomInfo = profileData.customInput?.trim();
      const hasJobLink = jobData.jobLink?.trim();
      
      let personalizedContent = `Dear Hiring Manager,

I am writing to express my strong interest in this position${hasJobLink ? ' that I found through your job posting' : ''}. Based on my background and experience, I believe I would be an excellent fit for this role.`;

      if (hasCustomInfo) {
        personalizedContent += `\n\nMy background includes:\n${profileData.customInput}`;
      } else {
        personalizedContent += `\n\nMy background includes:
- Extensive experience in software development
- Strong problem-solving and analytical skills
- Proven ability to work effectively in collaborative environments
- Passion for learning and adapting to new technologies`;
      }

      if (hasLinkedIn || hasGitHub) {
        personalizedContent += `\n\nYou can find more details about my professional background`;
        if (hasLinkedIn) personalizedContent += ` on my LinkedIn profile (${profileData.linkedin})`;
        if (hasLinkedIn && hasGitHub) personalizedContent += ` and`;
        if (hasGitHub) personalizedContent += ` in my GitHub portfolio (${profileData.github})`;
        personalizedContent += `.`;
      }

      personalizedContent += `\n\nI would welcome the opportunity to discuss how my skills and experiences align with your team's needs. Thank you for your consideration.

Sincerely,
[Your Name]`;

      return {
        success: true,
        data: {
          application: personalizedContent
        }
      };
    }

    // This would be the actual API call when implemented
    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are an expert career advisor and professional writer. Your task is to create a highly customized job application letter based on the candidate's profile and the job requirements."
            },
            {
              role: "user",
              content: `Create a professional job application letter based on the following information:
              
              Candidate Profile:
              ${JSON.stringify(profileData)}
              
              Job Details:
              ${JSON.stringify(jobData)}
              
              Please create a compelling, customized application letter that:
              1. Highlights the candidate's most relevant skills and experiences
              2. Shows how they meet the specific job requirements
              3. Demonstrates enthusiasm for the role and company
              4. Maintains a professional tone throughout
              
              The letter should be well-structured with an introduction, body paragraphs highlighting relevant qualifications, and a strong conclusion.`
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: {
          application: response.data.choices[0].message.content
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  async extractJobDetails(jobUrl) {
    // This would extract job details from a URL
    // For now, return a simulated response
    return {
      success: true,
      data: {
        title: "Software Engineer",
        company: "Tech Corp",
        requirements: [
          "3+ years of experience in JavaScript/TypeScript",
          "Experience with React.js",
          "Knowledge of RESTful APIs",
          "Strong problem-solving skills"
        ],
        description: "We are looking for a skilled Software Engineer to join our team..."
      }
    };
  }
}

const apiService = new ApiService();
export default apiService;