# Ambetter Health PWA

A Progressive Web App (PWA) built with Next.js that demonstrates three key capabilities for dynamic content delivery without requiring app marketplace redeployment.

## Overview

This PWA showcases how modern applications can deliver updates in three critical ways:

### 1. 🖼️ **Dynamic Image Updates**
- Change logos, images, and branding on the server
- Updates visible immediately in the client
- **No app redeployment needed**
- Example: Change seasonal branding, update logos, update promotional images

### 2. 🔄 **Field Name Changes (Schema Updates)**
- Modify form field names and structure on the server
- Client renders forms dynamically from API schema
- **No app marketplace redeployment needed**
- Example: Rename `phoneNumber` → `contactNumber`, add new required fields, change validation rules

### 3. ✨ **New Services & Pages**
- Add entirely new services and pages on the server
- Instant availability to all users without app updates
- **No app marketplace redeployment needed**
- Example: Launch telehealth services, add wellness programs, introduce new features

## Tech Stack

- **Framework**: Next.js 16+ with TypeScript
- **Styling**: Tailwind CSS 4
- **PWA Features**: Service Worker, Web App Manifest
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
# Dynamic logo URL (Scenario 1)
LOGO_URL=/ambetter-logo-new.png

# Add other server-side configuration here
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
ambetter_pwa/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with PWA setup
│   │   ├── page.tsx                # Home page
│   │   ├── scenario-1/             # Dynamic image updates demo
│   │   ├── scenario-2/             # Field name changes demo
│   │   ├── scenario-3/             # New services demo
│   │   ├── api/
│   │   │   ├── config/logo/        # API: Get dynamic logo URL
│   │   │   ├── schema/fields/      # API: Get form schema
│   │   │   ├── services/list/      # API: Get available services
│   │   │   └── scenarios/          # API: Get scenario list
│   │   ├── sw.js/                  # Service Worker route
│   │   └── globals.css             # Global styles
│   └── components/
│       ├── Navigation.tsx           # Main navigation with dynamic scenarios
│       ├── PWAInstall.tsx          # Install prompt for PWA
│       └── PWAInit.tsx             # Service worker initialization
├── public/
│   ├── manifest.json               # Web App Manifest
│   ├── offline.html                # Offline fallback page
│   ├── icon-192.png               # App icon (192x192)
│   └── icon-512.png               # App icon (512x512)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## How It Works

### Scenario 1: Dynamic Image Updates

**File**: [src/app/scenario-1/page.tsx](src/app/scenario-1/page.tsx)

The app fetches the logo URL from `/api/config/logo` at runtime:

```typescript
useEffect(() => {
  fetch('/api/config/logo')
    .then((res) => res.json())
    .then((data) => setLogoUrl(data.url));
}, []);
```

**To test**:
1. Update `LOGO_URL` in `.env.local`
2. Refresh the app
3. New logo appears immediately

### Scenario 2: Field Name Changes

**File**: [src/app/scenario-2/page.tsx](src/app/scenario-2/page.tsx)

The app fetches form schema from `/api/schema/fields` and renders fields dynamically:

```typescript
const [fields, setFields] = useState<Field[]>([]);

useEffect(() => {
  fetch('/api/schema/fields')
    .then((res) => res.json())
    .then((data) => setFields(data.schema.fields));
}, []);
```

**To test**:
1. Edit [src/app/api/schema/fields/route.ts](src/app/api/schema/fields/route.ts)
2. Change field IDs, labels, or add new fields
3. Refresh the app
4. Form automatically updates without code redeployment

### Scenario 3: New Services & Pages

**File**: [src/app/scenario-3/page.tsx](src/app/scenario-3/page.tsx)

The app fetches the services list from `/api/services/list`:

```typescript
const [services, setServices] = useState<Service[]>([]);

useEffect(() => {
  fetch('/api/services/list')
    .then((res) => res.json())
    .then((data) => setServices(data.services));
}, []);
```

**To test**:
1. Edit [src/app/api/services/list/route.ts](src/app/api/services/list/route.ts)
2. Add a new service object with `isNew: true`
3. Create new page at `src/app/services/[serviceId]/page.tsx` (optional)
4. Refresh the app
5. New service appears in the list

## PWA Features

### Service Worker
- **Caching Strategy**: Network-first with fallback to cache
- **Offline Support**: Automatic offline page when network unavailable
- **API Caching**: Smart caching for API responses
- **File**: Generated dynamically via `/api/sw.js`

### Web App Manifest
- **Installation**: Install as standalone app on iOS and Android
- **App Icon**: Maskable and regular icons for all devices
- **Splash Screens**: Custom launch screens
- **File**: [public/manifest.json](public/manifest.json)

### Mobile Web App Features
- **Status Bar**: Transparent black on iOS
- **App Title**: Appears in app switcher
- **Theme Color**: Blue header bar
- **Viewport**: Optimized for mobile devices

## Testing as PWA

### On Desktop (Chrome/Edge)

1. Open DevTools (F12)
2. Go to Application tab
3. Click "Install app" or use browser menu
4. App installs as standalone window

### On iOS

1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App installs with native-like experience

### On Android

1. Open app in Chrome
2. Tap menu (three dots)
3. Select "Install app"
4. App appears in launcher with offline support

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
```

### Self-Hosted

```bash
# Build and start
npm run build
npm start

# Use with Docker or your favorite hosting platform
```

### Important: Service Worker Caching

After deployment, service workers cache assets aggressively. For updates:

1. **Increment version** in [src/app/sw.js/route.ts](src/app/sw.js/route.ts)
2. **Redeploy** your app
3. Users will get new version on next visit

```typescript
const CACHE_NAME = 'ambetter-pwa-v2'; // Bump version for new deployment
```

## API Routes Reference

### GET /api/config/logo
Returns the current logo URL from environment variable.

```json
{
  "url": "/ambetter-logo-new.png",
  "lastUpdated": "2025-01-17T10:00:00Z"
}
```

### GET /api/schema/fields
Returns dynamic form schema for rendering.

```json
{
  "schema": {
    "fields": [
      {
        "id": "contactNumber",
        "label": "Contact Number",
        "type": "tel",
        "required": true
      }
    ]
  },
  "exampleData": { "contactNumber": "+1-555-123-4567" }
}
```

### GET /api/services/list
Returns available services with metadata.

```json
{
  "services": [
    {
      "id": "primary-care",
      "name": "Primary Care",
      "description": "Find and manage your primary care physician",
      "icon": "👨‍⚕️",
      "url": "/services/primary-care",
      "isNew": false
    }
  ],
  "totalServices": 6
}
```

### GET /api/scenarios
Returns list of available scenarios.

```json
{
  "scenarios": [
    {
      "id": 1,
      "title": "Scenario 1",
      "description": "Dynamic Image Update",
      "link": "/scenario-1"
    }
  ]
}
```

## Development Tips

### Hot Reload
- Changes to API routes require full page refresh
- React component changes hot-reload automatically
- Service worker changes: clear cache and reload

### Debugging
- **Network Tab**: See API calls and caching behavior
- **Application Tab**: Inspect service worker and cache
- **Console**: Check for any errors

### Performance
- Service worker caches intelligently by default
- API responses are cached for offline availability
- Images are optimized via Next.js Image component

## Real-World Use Cases

### Healthcare (Ambetter Focus)
- Update member portal logos and branding
- Add new health services and specialists
- Rename form fields for compliance
- Launch new telehealth features

### Financial Services
- Update rates and product information
- Add new investment options
- Modify account field labels for regulations
- Launch new financial products

### E-commerce
- Add new product categories
- Update shipping and payment options
- Modify checkout form fields
- Launch flash sales and promotions

### Government/Public Services
- Update service information
- Add new application types
- Rename fields for new regulations
- Launch new digital services

## Troubleshooting

### Service Worker Not Updating
```bash
# Clear cache in DevTools or:
# 1. Go to Application → Cache Storage
# 2. Delete "ambetter-pwa-v1" cache
# 3. Refresh page
```

### API Returns 404
- Check that route files exist in `src/app/api/`
- Verify file naming: should be `route.ts` not `route.js`
- Restart dev server: `npm run dev`

### Images Not Loading
- Check image paths in `public/` folder
- Verify `LOGO_URL` environment variable is set
- Check browser console for CORS errors

### PWA Not Installable
- HTTPS required (automatically on Vercel, use ngrok for local testing)
- Check manifest.json is served correctly
- Ensure icons are 192x192 and 512x512 PNG

## Performance Metrics

Target metrics for PWA:
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

Run Lighthouse audit:
1. Open DevTools
2. Go to Lighthouse tab
3. Click "Analyze page load"

## Security Considerations

- All API routes run on the server (secure)
- Environment variables not exposed to client
- HTTPS enforced in production
- Service worker validates all requests

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on multiple devices
4. Submit pull request

## License

MIT License - feel free to use for your projects

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API routes
3. Inspect browser DevTools
4. Check Next.js documentation

---

**Built with ❤️ using Next.js and PWA technologies**
