# Shakti Smart Safety Bag - Women Protection Ecosystem

A modern, fully responsive web application built with Next.js 14, TypeScript, TailwindCSS, and ShadCN UI for empowering women's safety through IoT technology.

![Shakti Smart Safety Bag](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Landing Website
- **Hero Section**: Eye-catching introduction with gradient text and smooth animations
- **Feature Highlights**: Showcase of SOS alerts, GPS tracking, emergency communication, and guardian dashboard
- **Testimonials**: Real user impact stories with ratings
- **Statistics**: Key metrics showing user trust and system reliability
- **Professional Footer**: Complete contact information and quick links

### User Dashboard
- **Profile Management**: View and edit user information
- **SOS Button**: One-press emergency alert system with visual feedback
- **Device Status**: Real-time monitoring of battery, GPS, GSM, and tracking status
- **Emergency Contacts**: Quick access to saved contacts with call functionality
- **Activity Timeline**: Recent safety activity log

### Guardian Dashboard
- **Live Location Tracking**: Real-time GPS position with map visualization
- **Location Details**: Precise coordinates, speed, battery, and accuracy info
- **Quick Actions**: Call, message, directions, and check-in requests
- **Emergency Alerts**: Priority-based notification system
- **Movement Timeline**: Historical location data with timestamps

### Emergency Contacts Management
- **Add/Edit/Delete**: Full CRUD operations with modal confirmations
- **Contact Details**: Name, phone number, and relationship tracking
- **Avatar Integration**: Visual representation of each contact

### Authentication System
- **Login Page**: Secure sign-in with remember me option
- **Registration**: Complete sign-up flow with validation
- **Forgot Password**: Email-based password recovery

### Documentation
- **Problem Statement**: Clear explanation of the safety challenges
- **Proposed Solution**: Comprehensive system overview
- **Technology Stack**: Hardware and software components
- **How It Works**: Step-by-step process flow
- **Future Scope**: Planned enhancements and features

## 🎨 Design Features

- **Glassmorphism UI**: Soft, translucent panels with backdrop blur effects
- **Purple/Pink Gradient Theme**: Beautiful color scheme with OKLCH color space
- **Smooth Animations**: Hover effects, transitions, and pulse animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode Ready**: Theme switching capabilities built-in
- **Accessible**: WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Animations**: CSS transitions and TailwindCSS utilities

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shakti-smart-safety
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your API keys and configuration

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
shakti-smart-safety/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Landing page
│   ├── dashboard/               # User dashboard
│   ├── guardian/                # Guardian dashboard
│   ├── contacts/                # Contact management
│   ├── docs/                    # Documentation
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── globals.css              # Global styles with custom theme
├── components/                   # Reusable components
│   ├── ui/                      # ShadCN UI components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer component
│   ├── FeatureCard.tsx          # Feature display card
│   ├── DashboardCard.tsx        # Dashboard card wrapper
│   ├── MapCard.tsx              # Map visualization placeholder
│   ├── ContactForm.tsx          # Contact add/edit form
│   └── NotificationBadge.tsx    # Notification indicator
├── lib/                         # Utility functions
│   ├── utils.ts                 # Helper functions
│   ├── api-config.ts            # API endpoints configuration
│   └── api-client.ts            # API client with placeholder functions
├── public/                      # Static assets
└── README.md                    # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.example` for a complete list of available environment variables.

### API Integration

The project includes placeholder API functions in `lib/api-client.ts`. To integrate with a backend:

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Implement actual API calls in `lib/api-client.ts`
3. Add authentication token management
4. Update type definitions as needed

## 🎯 Key Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, testimonials |
| `/dashboard` | User dashboard with SOS and device status |
| `/guardian` | Guardian dashboard with live tracking |
| `/contacts` | Emergency contacts management |
| `/docs` | Complete project documentation |
| `/auth/login` | User login page |
| `/auth/register` | User registration page |
| `/auth/forgot-password` | Password recovery page |

## 🎨 Theming

The app uses a custom purple/pink theme defined in `app/globals.css` using OKLCH color space for better color consistency. Key theme colors:

- Primary: Purple (`oklch(0.6 0.2 320)`)
- Accent: Pink (`oklch(0.75 0.15 330)`)
- Custom glassmorphism effects
- Smooth transitions and animations

## 🛣️ Roadmap

- [ ] Backend API integration
- [ ] Real Google Maps/Mapbox integration
- [ ] WebSocket for real-time updates
- [ ] Push notifications with Firebase
- [ ] Mobile app development (React Native)
- [ ] Hardware device integration (Arduino/ESP32)
- [ ] AI-powered danger detection
- [ ] Community safety network
- [ ] Geofencing capabilities
- [ ] Health monitoring sensors

## 📱 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Self-hosted
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t shakti-smart-safety .
docker run -p 3000:3000 shakti-smart-safety
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Created with ♡ for women's safety

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- ShadCN for the beautiful UI components
- Vercel for hosting and deployment platform
- All contributors and supporters of women's safety initiatives

## 📞 Support

For support, email support@shakti-safety.com

---

**Built with Next.js 14, TypeScript, TailwindCSS, and ShadCN UI** 💜
