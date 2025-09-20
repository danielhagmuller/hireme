# Hire Me - Automated Job Application Generator

A web application that helps users create custom job applications tailored to specific positions by pulling data from LinkedIn, GitHub, and custom inputs.

## Features

1. **User Authentication**: Sign up and login functionality with Supabase
2. **Skill Profile Creation**: Pull data from LinkedIn, GitHub, and custom inputs
3. **Job Advertisement Processing**: Submit job links to extract requirements
4. **Custom Application Generation**: Generate professional, tailored job applications
5. **File Upload**: Upload resumes and other relevant documents
6. **AI Integration**: Optional integration with DeepSeek API for enhanced application generation

## Tech Stack

- React.js
- Supabase (Authentication and Backend)
- React Router
- Axios
- CSS3

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your configuration
4. Start the development server:
   ```
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_DEEPSEEK_API_KEY=your_deepseek_api_key (optional)
```

## Supabase Configuration

The application is configured to connect to the following Supabase project:

- **Project URL**: https://wjxhpfgrkkmkvjkogrtt.supabase.co/
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGhwZmdya2tta3Zqa29ncnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjI5NTcsImV4cCI6MjA3MzkzODk1N30.5KTfFCXp8kbgBSx0Sn1TQnopVOFSuwELw2sbH7q73GE

## Deployment on Vercel

This application is ready for deployment on Vercel:

1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Click "New Project" and select your repository
4. Vercel will automatically detect the React project and configure the build settings
5. Add your environment variables in the Vercel project settings:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_DEEPSEEK_API_KEY` (optional)
6. Deploy the project

The `vercel.json` file is already included for proper routing configuration.

## AI Integration

For the application generation feature, the app can integrate with DeepSeek API. If you want to use this feature:

1. Sign up for a DeepSeek API key at [deepseek.com](https://www.deepseek.com)
2. Add your API key to the application in the dashboard
3. The application will use DeepSeek to generate more sophisticated job applications

## Future Enhancements

1. Implement actual LinkedIn and GitHub data pulling
2. Add more advanced customization options for generated applications
3. Implement job application tracking and analytics
4. Add email integration for sending applications directly
5. Create a portfolio section to showcase projects

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.