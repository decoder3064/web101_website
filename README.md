# Entre Runners Website 🏃‍♂️

A modern, responsive website for the Entre Runners community in El Salvador - connecting passionate runners through organized training sessions, community events, and shared experiences.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dynamic Countdown Timer**: Real-time countdown to the next training session
- **Interactive Gallery**: Carousel-based image gallery with pagination
- **Contact Form**: Email integration for user inquiries with automatic confirmation emails
- **Training Schedule**: Automatic calculation of next training sessions across multiple locations
- **Google Maps Integration**: Interactive maps with Waze and Google Maps navigation links

### User Experience
- **Modern UI/UX**: Clean, athletic design with custom fonts (Bebas Neue, Montserrat)
- **Smooth Animations**: CSS transitions, scroll-triggered carousel, rotating modal elements
- **Advanced Form Validation**: Real-time validation with visual error feedback
- **Modal Feedback**: Animated success modals with personalized messages
- **Timezone-Aware Countdown**: Automatic countdown calculation for El Salvador timezone
- **Dynamic Content**: Auto-updating maps and event details based on training schedule
- **Touch-Friendly Navigation**: Optimized for mobile interaction with swipe gestures

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Custom properties, Flexbox, Grid, responsive media queries
- **JavaScript (ES6+)**: Modern vanilla JavaScript with DOM manipulation
- **Google Fonts**: Bebas Neue and Montserrat typography

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js v5.1.0**: Web application framework with static file serving
- **Google APIs v126.0.1**: Google Drive integration for dynamic gallery
- **Nodemailer v7.0.6**: Email service integration with Gmail SMTP
- **dotenv**: Environment variable management
- **CORS Middleware**: Cross-origin request handling

### APIs & Services
- **Google Drive API**: Dynamic image gallery management with folder-based organization
- **Gmail SMTP**: Contact form email delivery with confirmation emails
- **Google Maps Embed**: Interactive location display with navigation links
- **Google Calendar**: Training event integration for calendar reminders
- **Waze Integration**: Direct navigation links for training locations

## 📁 Project Structure

```
entre-runners/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   ├── package-lock.json  # Dependency lock file
│   └── .gitignore        # Git ignore (node_modules, credentials, .env)
├── .vscode/
│   └── settings.json     # VSCode configuration
├── img/                   # Static images and assets
├── index.html            # Main HTML structure
├── styles.css            # Main stylesheet with responsive design
├── index.js              # Frontend JavaScript functionality
├── site.webmanifest      # PWA configuration
├── package.json          # Root package.json for deployment
└── README.md             # Project documentation
```

## 🔌 API Endpoints

- **GET /**: Serves the main application
- **GET /api/test**: Server health check endpoint
- **GET /api/gallery-images**: Fetches images from Google Drive folder
- **POST /api/contact**: Handles contact form submissions with email delivery

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Google Cloud Platform account (for Drive API)
- Gmail account (for email service)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd entre-runners
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3000
   GOOGLE_CREDENTIALS={"type":"service_account",...} # Your Google Service Account JSON
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password # Use Gmail App Password, not regular password
   EMAIL_TO=contact@entrerunners.com
   ```

4. **Google Cloud Setup**
   - Create a Google Cloud project
   - Enable Google Drive API
   - Create a service account and download credentials JSON
   - Share your Google Drive folder (ID: 1UIcXGf1M09J5wMORI9xjX0Sjd3B3MBA2) with the service account email
   - Copy the service account JSON content to GOOGLE_CREDENTIALS env variable

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   Open `http://localhost:3000` in your browser

## ⚙️ Configuration

### Training Schedule
The application automatically calculates the next training session based on a predefined schedule in `index.js`:

- **Tuesday**: 7:30 PM - Millennium Plaza
- **Wednesday**: 7:30 PM - Las Cascadas
- **Thursday**: 7:30 PM - Plaza Presidente  
- **Saturday**: 6:00 AM - Multiplaza

### Email Configuration
Configure SMTP settings in your `.env` file. The system sends:
- Notification emails to administrators
- Confirmation emails to users
- Error handling for failed deliveries

**⚠️ Note**: The contact form email feature is currently not fully functional in the Railway production environment due to their spam prevention measures that block outgoing SMTP connections. This is a known limitation that we're working to resolve. The feature works correctly in local development environments.

### Gallery Management
Images are managed through Google Drive:
1. Upload images to the specified Google Drive folder (ID: 1UIcXGf1M09J5wMORI9xjX0Sjd3B3MBA2)
2. The API automatically fetches and displays them via googleapis
3. Images are displayed in a responsive carousel with pagination dots
4. Supports automatic grid layout (4x2 on desktop, 2x4 on mobile)
5. Includes error handling for failed image loads

## 🎨 Customization

### Styling
- **CSS Variables**: Color scheme defined in `:root` for easy theming
- **Responsive Breakpoints**: Mobile-first approach with 6 defined breakpoints
- **Typography**: Custom font loading (Bebas Neue, Montserrat) with system fallbacks
- **Animation System**: Scroll-triggered animations and hover effects

### Content
- Update training locations in the `trainingSchedule` object (index.js lines 410+)
- Modify sponsor logos in the sponsors section of index.html
- Customize form validation rules in the `validateForm` function
- Update Google Drive folder ID in server.js for different image sources
- Modify countdown timer locations and times in the training schedule

## 📱 Responsive Design

The website is optimized for multiple screen sizes:

- **Desktop (1200px+)**: Full layout with side-by-side content
- **Laptop (992px-1199px)**: Adjusted font sizes and spacing
- **Tablet (768px-991px)**: Stacked layouts for better readability
- **Mobile Large (481px-767px)**: Single-column layout with touch-friendly elements
- **Mobile Small (320px-480px)**: Compact design with essential features
- **Extra Small (below 320px)**: Minimal layout for older devices

## 🔐 Security

- **Input validation**: Both client-side and server-side form validation
- **CORS configuration**: Controlled cross-origin request handling
- **Environment variables**: Sensitive data protected in .env files
- **Error handling**: Graceful error handling without information leakage
- **Email validation**: Comprehensive email format and domain validation
- **Rate limiting**: Natural rate limiting through form submission flow

## 🚀 Deployment

### Production Checklist
- [ ] Set production environment variables (Railway, Heroku, etc.)
- [ ] Configure HTTPS and SSL certificates
- [ ] Optimize images and compress assets
- [ ] Set up monitoring and error logging
- [ ] Configure custom domain and DNS
- [ ] Test email functionality in staging environment
- [ ] Verify Google Drive API quotas and limits

### Platform Deployment
The application is configured for multiple platforms:
- **Railway**: Current production deployment (https://entre-runners-production.up.railway.app/)
- **Heroku**: Easy deployment with git integration
- **Vercel**: Excellent for static sites with serverless functions
- **DigitalOcean**: VPS deployment with full control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 📞 Contact

- **Instagram**: [@entrerunners](https://www.instagram.com/entrerunners)
- **Facebook**: [Entre Runners El Salvador](https://www.facebook.com/entrerunners.sv/)


**Built with ❤️ for the running community in El Salvador**
