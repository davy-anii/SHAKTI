# Docker Deployment Guide

This guide explains how to deploy the Shakti Smart Safety application using Docker on any device/platform.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)
- At least 2GB of free disk space

## Supported Platforms

This Docker configuration supports:
- ✅ Linux (x86_64, ARM64)
- ✅ macOS (Intel & Apple Silicon)
- ✅ Windows (WSL2)
- ✅ Cloud platforms (AWS, Azure, GCP, DigitalOcean, etc.)
- ✅ Raspberry Pi and other ARM devices

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Create .env.local file** (if not exists):
```bash
touch .env.local
```

Add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

2. **Build and run**:
```bash
docker-compose up -d
```

3. **Access the application**:
```
http://localhost:3000
```

4. **Stop the application**:
```bash
docker-compose down
```

### Option 2: Using Docker Commands

1. **Build the image**:
```bash
docker build -t shakti-smart-safety .
```

2. **Run the container**:
```bash
docker run -d \
  --name shakti-app \
  -p 3000:3000 \
  --env-file .env.local \
  --restart unless-stopped \
  shakti-smart-safety
```

3. **Access the application**:
```
http://localhost:3000
```

## Docker Commands Reference

### View running containers
```bash
docker ps
```

### View logs
```bash
docker logs shakti-app -f
```

### Stop container
```bash
docker stop shakti-app
```

### Start container
```bash
docker start shakti-app
```

### Remove container
```bash
docker rm -f shakti-app
```

### Remove image
```bash
docker rmi shakti-smart-safety
```

### Rebuild and restart
```bash
docker-compose up -d --build
```

## Production Deployment

### Deploy to Cloud (AWS, Azure, GCP)

1. **Push to container registry**:
```bash
# Tag the image
docker tag shakti-smart-safety your-registry/shakti-smart-safety:latest

# Push to registry
docker push your-registry/shakti-smart-safety:latest
```

2. **Deploy to your cloud platform** using their container services:
   - AWS: ECS, Fargate, or EC2
   - Azure: Container Instances or App Service
   - GCP: Cloud Run or Kubernetes Engine

### Deploy to VPS (DigitalOcean, Linode, etc.)

1. **SSH into your server**:
```bash
ssh user@your-server-ip
```

2. **Clone the repository**:
```bash
git clone https://github.com/davy-anii/SHAKTI.git
cd SHAKTI
```

3. **Create .env.local file** with production variables

4. **Run with Docker Compose**:
```bash
docker-compose up -d
```

5. **Set up reverse proxy** (optional, recommended):
   - Use Nginx or Caddy for SSL/HTTPS
   - Configure domain name

## Environment Variables

Create a `.env.local` file with:

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Performance Optimization

The Docker image includes:
- ✅ Multi-stage builds for minimal size
- ✅ Alpine Linux base for security and size
- ✅ Non-root user for security
- ✅ Standalone output for optimal performance
- ✅ Health checks for reliability
- ✅ Automatic restart on failure

## Troubleshooting

### Container won't start
```bash
docker logs shakti-app
```

### Port already in use
```bash
# Use different port
docker run -p 8080:3000 shakti-smart-safety
```

### Permission issues
```bash
# Run with sudo (Linux)
sudo docker-compose up -d
```

### Clear everything and restart
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## Security Best Practices

1. **Never commit .env.local** - Already in .gitignore
2. **Use secrets management** in production
3. **Keep Docker updated**:
```bash
docker --version  # Check version
```
4. **Regular security scans**:
```bash
docker scan shakti-smart-safety
```

## Monitoring

### Check container health
```bash
docker inspect --format='{{.State.Health.Status}}' shakti-app
```

### View resource usage
```bash
docker stats shakti-app
```

## Scaling

### Run multiple instances
```bash
docker-compose up -d --scale shakti-app=3
```

### Use with load balancer
- Set up Nginx/HAProxy
- Configure multiple container backends

## Support

For issues or questions:
- GitHub: https://github.com/davy-anii/SHAKTI
- Check logs: `docker logs shakti-app`
