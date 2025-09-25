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
- **Smooth Animations**: CSS transitions and JavaScript-powered scroll effects
- **Modal Feedback**: Success confirmation modals with personalized messages
- **Navigation**: Smooth scrolling navigation bar with section anchors

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Custom properties, Flexbox, Grid, responsive media queries
- **JavaScript (ES6+)**: Modern vanilla JavaScript with DOM manipulation
- **Google Fonts**: Bebas Neue and Montserrat typography

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Google Drive API**: Dynamic image gallery management
- **Nodemailer**: Email service integration
- **dotenv**: Environment variable management

### APIs & Services
- **Google Drive API**: For gallery image management
- **Gmail SMTP**: For contact form email delivery
- **Google Maps Embed**: For location display
- **Google Calendar**: For training event integration

## 📁 Project Structure

```
entre-runners/
├── backend/
│   ├── server.js          # Express server configuration
│   ├── package.json       # Backend dependencies
│   ├── package-lock.json  # Dependency lock file
│   └── .gitignore        # Git ignore rules
├── img/                   # Static images and assets
├── index.html            # Main HTML structure
├── styles.css            # Main stylesheet with responsive design
├── index.js              # Frontend JavaScript functionality
├── site.webmanifest      # PWA configuration
└── README.md             # Project documentation
```

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
   EMAIL_PASS=your-app-password
   EMAIL_TO=contact@entrerunners.com
   ```

4. **Google Cloud Setup**
   - Create a Google Cloud project
   - Enable Google Drive API
   - Create a service account and download credentials
   - Share your Google Drive folder with the service account email

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
1. Upload images to the specified Google Drive folder
2. The API automatically fetches and displays them
3. Images are displayed in a responsive carousel format

## 🎨 Customization

### Styling
- **CSS Variables**: Color scheme defined in `:root` for easy theming
- **Responsive Breakpoints**: Mobile-first approach with defined breakpoints
- **Typography**: Custom font loading with fallbacks

### Content
- Update training locations in the `trainingSchedule` object
- Modify sponsor logos in the HTML
- Customize form validation rules in the JavaScript

## 📱 Responsive Design

The website is optimized for multiple screen sizes:

- **Desktop (1200px+)**: Full layout with side-by-side content
- **Laptop (992px-1199px)**: Adjusted font sizes and spacing
- **Tablet (768px-991px)**: Stacked layouts for better readability
- **Mobile Large (481px-767px)**: Single-column layout with touch-friendly elements
- **Mobile Small (320px-480px)**: Compact design with essential features
- **Extra Small (below 320px)**: Minimal layout for older devices

## 🔐 Security

- Input validation on both client and server side
- CORS configuration for cross-origin requests
- Environment variable protection for sensitive data
- Error handling to prevent information leakage

## 🚀 Deployment

### Production Checklist
- [ ] Set production environment variables
- [ ] Configure HTTPS
- [ ] Optimize images and assets
- [ ] Set up monitoring and logging
- [ ] Configure domain and DNS

### Platform Deployment
The application can be deployed to:
- **Railway**: Current production platform
- **Heroku**: Popular PaaS option
- **Vercel**: Great for static sites with API routes
- **DigitalOcean**: VPS deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 📞 Contact

- **Website**: [entrerunners.com](https://entrerunners.com)
- **Instagram**: [@entrerunners](https://www.instagram.com/entrerunners)
- **Facebook**: [Entre Runners El Salvador](https://www.facebook.com/entrerunners.sv/)

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Training session registration system
- [ ] Mobile app integration
- [ ] Performance tracking features
- [ ] Community forum
- [ ] Event calendar with recurring sessions
- [ ] Push notifications for training reminders

---

**Built with ❤️ for the running community in El Salvador**
