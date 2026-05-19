# Firebase Setup for Online Multi-User Features

The app supports **real-time online** chat and progress sharing between 2 users using Firebase Firestore (free tier).

## Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Create a project** (or add Firebase to an existing project)
3. Name it (e.g., "data-analyst-academy")
4. Disable Google Analytics (optional)
5. Click **Create**

## Step 2: Register your app

1. In the Firebase console, click the **Web** icon (`</>`) to add a web app
2. Register the app (nickname: "data-academy")
3. **Copy the Firebase config object** — it looks like:
```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## Step 3: Enable Firestore Database

1. In the left sidebar, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (this allows read/write without auth — fine for a 2-user app)
4. Choose a location closest to you
5. Click **Enable**

## Step 4: Configure your app

1. Open `.env.local` in the project root
2. Add the Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## How it works

- **Chat**: Messages are stored in a `chat` collection in Firestore. Both users see messages in real-time using `onSnapshot`.
- **Progress**: Each user's completed tasks are synced to a `progress/user1` and `progress/user2` document.
- **Comments**: Topic comments are stored in a `topicComments` collection, filtered by `topicId`.
- **Fallback**: If Firebase is not configured, the app falls back to localStorage (works offline for a single user).

## Free Tier Limits

Firebase Spark (free) plan includes:
- 1GB stored data
- 10GB/month download
- 50K reads/day
- 20K writes/day
- 20K deletes/day

For 2 users studying 24 weeks, this is more than enough.
