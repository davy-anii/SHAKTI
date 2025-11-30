# Quick Start Guide - Shakti Smart Safety Bag

Welcome! This guide will help you get started with the Shakti Smart Safety Bag web application.

## 🚀 Getting Started in 5 Minutes

### Step 1: Installation
```bash
# Navigate to the project directory
cd shakti-smart-safety

# Install dependencies
npm install
```

### Step 2: Environment Setup
```bash
# Copy the environment template
cp .env.example .env.local

# The app will work with default values, but you can customize:
# - NEXT_PUBLIC_API_URL: Your backend API URL
# - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: For map integration (optional)
```

### Step 3: Run the Application
```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

That's it! You're ready to explore the application.

## 📱 Navigating the Application

### 1. Landing Page (/)
- Beautiful hero section introducing Shakti
- Feature highlights with glassmorphism effects
- User testimonials and statistics
- Call-to-action buttons

**Try this:** Scroll through the landing page to see smooth animations and hover effects.

### 2. User Dashboard (/dashboard)
- View your profile information
- Test the SOS emergency button
- Monitor device status (Battery, GPS, GSM)
- Check emergency contacts
- View recent activity

**Try this:** Click the big red SOS button to see the emergency alert simulation.

### 3. Guardian Dashboard (/guardian)
- See live location tracking
- View detailed GPS coordinates
- Access emergency notifications
- Check movement history
- Quick action buttons (Call, Message)

**Try this:** Explore the map placeholder and location details section.

### 4. Emergency Contacts (/contacts)
- Add new emergency contacts
- Edit existing contacts
- Delete contacts (with confirmation)
- View all contacts with avatars

**Try this:** Click "Add Contact" to open the form and add a test contact.

### 5. Documentation (/docs)
- Read the problem statement
- Understand the proposed solution
- See technology stack
- Learn how it works
- Explore future enhancements

**Try this:** Read through the comprehensive project documentation.

### 6. Authentication
- Login page (/auth/login)
- Registration page (/auth/register)
- Forgot password (/auth/forgot-password)

**Try this:** Visit the registration page to see the complete sign-up form with validation.

## 🎨 Design Features to Notice

### Glassmorphism Effects
Look for translucent panels with subtle blur effects throughout the app. These create a modern, elegant look.

### Purple/Pink Gradient Theme
The app uses a beautiful purple-to-pink gradient color scheme:
- Buttons with gradient backgrounds
- Gradient text on headings
- Smooth color transitions

### Smooth Animations
- Hover effects on cards and buttons
- Scale transformations
- Fade-in effects
- Pulse animations on the SOS button

### Responsive Design
Try resizing your browser window or opening on different devices:
- Mobile menu appears on small screens
- Grid layouts adapt to screen size
- Touch-friendly on mobile devices

## 🔧 Customization Tips

### Changing Colors
Edit `app/globals.css` to modify the theme colors. The app uses OKLCH color space for better color consistency.

### Adding New Pages
Create a new folder in `app/` directory:
```bash
app/
  your-page/
    page.tsx
```

### Creating Components
Add reusable components in the `components/` directory:
```bash
components/
  YourComponent.tsx
```

### API Integration
Update the placeholder functions in `lib/api-client.ts` to connect to your backend API.

## 🎯 Next Steps

1. **Explore All Pages**: Click through every page to see all features
2. **Test Responsiveness**: Try the app on mobile, tablet, and desktop
3. **Read Documentation**: Visit /docs to understand the full project
4. **Customize Theme**: Adjust colors in globals.css to match your brand
5. **Add Backend**: Integrate with your API using the provided client

## 📚 Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **ShadCN UI**: https://ui.shadcn.com
- **Lucide Icons**: https://lucide.dev

## 💡 Tips for Development

### Hot Reload
The app automatically reloads when you save changes. No need to refresh the browser!

### Console Logs
Open browser DevTools (F12) to see console logs and debug information.

### Component Inspection
Use React DevTools browser extension to inspect components and their props.

### Styling
TailwindCSS classes are used throughout. Hover over class names in your editor for documentation.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

### Dependencies Issues
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Check for TypeScript errors:
```bash
npm run build
```

## 🎉 Have Fun!

Explore the app, test all features, and feel free to customize it to your needs. The code is well-commented and organized for easy understanding.

Happy coding! 💜

---

**Questions?** Check the main README.md or open an issue on GitHub.
