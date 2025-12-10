# Garnet Mobile App

All-in-one video & image creation app for content creators. Record, edit, add AI-powered captions, manage watermarks, and publish to YouTube Shorts & Instagram Reels.

## Features

### 🎥 Recording & Capture
- Video recording with 60s/90s presets for Shorts/Reels
- Photo capture with filters
- Audio recording for podcasts
- Screen recording support

### ✂️ Editing Tools
- Trim, crop, rotate videos
- Brightness, contrast, saturation adjustments
- Text overlays with custom fonts
- Stickers and emoji support
- Transitions and effects

### 🤖 AI-Powered Features
- Auto-generate engaging captions
- Smart hashtag suggestions
- Content quality analysis
- Best posting time recommendations
- Multiple caption variations

### 🎨 Watermark Management
- Safe watermark removal (ownership verification required)
- Custom watermark addition
- Provenance tracking

### 📤 Publishing
- Direct upload to YouTube Shorts
- Instagram Reels integration
- TikTok format export
- Scheduled posting

### 🎙️ Podcasting
- Audio recording & editing
- Intro/outro management
- RSS feed publishing

## Tech Stack

- **Framework:** React Native (Expo)
- **Navigation:** React Navigation
- **State Management:** Zustand
- **Video Processing:** expo-av, expo-video-thumbnails
- **Image Processing:** expo-image-manipulator
- **Camera:** expo-camera
- **Storage:** AsyncStorage + AWS S3
- **AI Backend:** Garnet AI Engine
- **Authentication:** Firebase Auth
- **Payments:** Stripe

## Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
expo-cli
```

### Installation
```bash
# Clone repository
git clone https://github.com/singhsheetal0547-bit/garnet-mobile.git
cd garnet-mobile

# Install dependencies
npm install

# Start development server
npx expo start
```

### Run on Device
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## Project Structure

```
garnet-mobile/
├── src/
│   ├── screens/          # App screens
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API services
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom hooks
│   ├── constants/       # Constants & config
│   └── assets/          # Images, fonts, etc.
├── app.json
├── package.json
└── README.md
```

## Environment Variables

Create `.env` file:
```
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_STRIPE_KEY=your_stripe_key
EXPO_PUBLIC_AWS_BUCKET=your_s3_bucket
```

## License

MIT
