# Deployment Guide - Shakti Smart Safety Bag

This guide covers deploying your Shakti Smart Safety Bag application to production.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest way to deploy Next.js applications with zero configuration.

#### Step 1: Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin <your-repository-url>
git push -u origin main
```

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com/api
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
   ```
6. Click "Deploy"

#### Step 3: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate (automatic)

**Deployment time:** ~2 minutes
**URL:** `https://your-project.vercel.app`

---

### Option 2: Self-Hosted (VPS/Server)

Deploy on your own server using PM2 or Docker.

#### Using PM2

```bash
# 1. Build the application
npm run build

# 2. Install PM2 globally
npm install -g pm2

# 3. Start the application
pm2 start npm --name "shakti-app" -- start

# 4. Configure PM2 to restart on reboot
pm2 startup
pm2 save

# 5. View logs
pm2 logs shakti-app
```

#### Using Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create a `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://your-api.com/api
    restart: unless-stopped
```

Deploy:
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

### Option 3: Netlify

#### Step 1: Build Settings
```bash
# Build command
npm run build

# Publish directory
.next
```

#### Step 2: netlify.toml
Create a `netlify.toml` file:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 3: Deploy
1. Connect your Git repository
2. Configure build settings
3. Add environment variables
4. Deploy

---

### Option 4: AWS (Advanced)

Deploy using AWS Amplify, EC2, or ECS.

#### AWS Amplify (Easiest)
1. Connect your repository
2. Configure build settings
3. Deploy automatically on push

#### AWS EC2
1. Launch an EC2 instance
2. Install Node.js and PM2
3. Clone your repository
4. Build and start with PM2
5. Configure security groups for port 80/443

---

## 🔐 Environment Variables for Production

Create environment variables in your deployment platform:

```env
# Required
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-production-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Backend variables (if applicable)
DATABASE_URL=your-database-url
JWT_SECRET=your-strong-secret-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

**⚠️ Never commit `.env` files to Git!**

---

## 🔧 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Test production build: `npm run start`
- [ ] Update environment variables
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Configure CORS on backend API
- [ ] Test all pages and features
- [ ] Optimize images and assets
- [ ] Enable analytics (optional)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure CDN for static assets

---

## 📊 Performance Optimization

### Image Optimization
```bash
# Use Next.js Image component
import Image from 'next/image'

<Image src="/hero.jpg" width={800} height={600} alt="Hero" />
```

### Code Splitting
Next.js automatically splits code. For additional optimization:
```bash
# Dynamic imports
const Component = dynamic(() => import('./Component'), {
  loading: () => <Loader />,
})
```

### Caching
Configure proper caching headers in `next.config.ts`:
```typescript
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

## 🔍 Monitoring & Analytics

### Google Analytics
```bash
# Install package
npm install @next/third-parties

# Add to layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check for errors
npm run build

# Clear cache
rm -rf .next
npm run build
```

### 404 Errors
- Ensure all routes are properly defined
- Check `next.config.ts` for correct output configuration

### Slow Performance
- Enable static generation where possible
- Optimize images
- Use React Server Components
- Implement caching strategies

### API Connection Issues
- Verify CORS settings on backend
- Check environment variables
- Test API endpoints directly

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Amplify Docs](https://docs.amplify.aws)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test all pages and features
2. ✅ Verify environment variables are working
3. ✅ Check performance with Lighthouse
4. ✅ Set up monitoring and alerts
5. ✅ Share your deployment URL! 🎊

---

**Your app is now live! 🚀**

Visit your deployed application and share it with the world. Don't forget to update the README with your live URL!
