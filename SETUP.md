# Garnet Mobile - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for Android development)
- Physical device with Expo Go app (optional)

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/singhsheetal0547-bit/garnet-mobile.git
cd garnet-mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
EXPO_PUBLIC_API_URL=https://your-backend-api.com
EXPO_PUBLIC_AI_ENGINE_URL=https://your-ai-engine.com
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 4. Start Development Server

```bash
npx expo start
```

This will open Expo DevTools in your browser.

### 5. Run on Device/Simulator

**iOS Simulator (Mac only):**
```bash
npx expo run:ios
```

**Android Emulator:**
```bash
npx expo run:android
```

**Physical Device:**
1. Install Expo Go app from App Store/Play Store
2. Scan QR code from Expo DevTools

## Project Structure

```
garnet-mobile/
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.js
│   │   ├── CameraScreen.js
│   │   ├── AIAssistantScreen.js
│   │   └── ...
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   │   └── AppNavigator.js
│   ├── services/         # API services
│   │   ├── api.js
│   │   ├── aiService.js
│   │   └── mediaService.js
│   ├── store/           # State management (Zustand)
│   │   ├── useAuthStore.js
│   │   └── useMediaStore.js
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom hooks
│   └── constants/       # Constants & config
├── assets/              # Images, fonts, etc.
├── App.js              # Entry point
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

## Key Features Implemented

### ✅ Core Screens
- **HomeScreen** - Dashboard with quick actions
- **CameraScreen** - Photo/video recording
- **AIAssistantScreen** - AI caption & hashtag generation
- **EditorScreen** - Media editing (to be implemented)
- **PublishScreen** - Multi-platform publishing (to be implemented)

### ✅ Services
- **API Client** - Axios with auth interceptors
- **AI Service** - Caption, hashtag, content analysis
- **Media Service** - Camera, gallery, image manipulation

### ✅ State Management
- **Auth Store** - User authentication & subscription
- **Media Store** - Current media & editor state

### ✅ Navigation
- Bottom tabs (Home, Camera, Library, Profile)
- Stack navigation for screens
- Auth flow (Login/Signup)

## Next Steps

### Screens to Implement

1. **EditorScreen** - Video/image editing interface
2. **LibraryScreen** - Media library with grid view
3. **ProfileScreen** - User profile & settings
4. **PublishScreen** - Platform selection & scheduling
5. **WatermarkScreen** - Watermark detection/removal
6. **SubscriptionScreen** - Pricing & payment
7. **LoginScreen** - Authentication
8. **SignupScreen** - User registration

### Features to Add

1. **Video Editor**
   - Trim, crop, rotate
   - Filters & effects
   - Text overlays
   - Stickers

2. **Publishing**
   - YouTube API integration
   - Instagram API integration
   - Scheduled posting

3. **Watermark Tools**
   - Detection algorithm
   - Safe removal with ownership verification
   - Provenance tracking

4. **Payments**
   - Stripe integration
   - Subscription management
   - Credit system

## Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## Building for Production

### iOS

```bash
# Build for App Store
eas build --platform ios
```

### Android

```bash
# Build APK
eas build --platform android
```

## Troubleshooting

### Common Issues

**1. Metro bundler not starting**
```bash
npx expo start -c
```

**2. Dependencies not installing**
```bash
rm -rf node_modules
npm install
```

**3. iOS build fails**
```bash
cd ios
pod install
cd ..
```

**4. Android build fails**
```bash
cd android
./gradlew clean
cd ..
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## Support

For issues or questions:
- GitHub Issues: https://github.com/singhsheetal0547-bit/garnet-mobile/issues
- Backend API: https://github.com/singhsheetal0547-bit/garnet-ai-engine
