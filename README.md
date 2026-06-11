# TOEIC Personalized

## Firebase

Firebase SDK is configured in `lib/firebase.ts`.

The app reads TOEIC data from Firestore at:

- Document: `toeic/starter`
- Subcollections:
  - `vocabulary`
  - `grammar`
  - `sentencePatterns`
  - `conversations`
  - `readingPassages`
  - `quiz`

If Firestore data is missing or read fails, the app falls back to `data/toeic-starter.json`.

To seed data:

```bash
npm run seed:firebase
```

If seeding returns `PERMISSION_DENIED`, update Firestore rules temporarily or seed with an admin/service-account script. Example development-only rules:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /toeic/{docId} {
      allow read: if true;
      allow write: if true;
      match /{subcollection}/{itemId} {
        allow read: if true;
        allow write: if true;
      }
    }
  }
}
```

Do not keep open write rules in production.

## Login / Register

The app uses Firebase Authentication with Email/Password. The UI asks for `username/password`; internally the username is converted to:

```text
username@english-app.local
```

Enable this in Firebase Console:

1. Authentication
2. Sign-in method
3. Email/Password

User progress is saved at:

```text
users/{uid}/progress/toeicStarter
```

Production-style Firestore rules for progress:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /toeic/{docId} {
      allow read: if true;
      allow write: if false;
      match /{subcollection}/{itemId} {
        allow read: if true;
        allow write: if false;
      }
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /progress/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```
