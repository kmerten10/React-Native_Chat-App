# Chat App - React Native

A mobile chat app optimized for both Android and iOS devices using React Native and Expo. Allows users to chat with friends and family, send images, share location, and more.

---

## Features:

1. **User Entry**: Customize your chat environment by setting your name and choosing a background color.
2. **Messaging**: Engage in real-time conversations through text messages.
3. **Multimedia Sharing**: Share memories through images, either from your device's gallery or by capturing fresh moments. 
4. **Location Sharing**: Stay connected by sharing your current location on a map.
5. **Offline Accessibility**: Access previous messages even without an internet connection.
6. **Universal Design**: Designed with accessibility in mind, ensuring a seamless experience for visually impaired users with screen reader support.

---

## Technical Details:

- Crafted using the power of React Native and Expo.
- All chats are securely stored in Google Firestore Database.
- Anonymous sign-in enabled via Google Firebase, ensuring privacy.
- Local persistence of chat conversations for offline viewing.
- Multimedia support allows sharing images directly from the device's library or camera.
- All media securely hosted in Firebase Cloud Storage.
- Real-time location sharing for enhanced connectivity.
- The chat interface is powered by the efficient Gifted Chat library.

---

## Getting Started:

1. **Clone the Repository**:  

git clone https://github.com/ywrth/chat-app.git

2. **Step into the Directory**: 

cd chat-app

2. **Install All Required Packages**: 

npm install

3. **Install All Required Packages**: 

expo start


## Packages to install: 
* npm install --save @react-navigation/native @react-navigation/native-stack
* expo install react-native-screens react-native-safe-area-context
* npm install react-native-gifted-chat --save
* npm install firebase@9.13.0 --save
* expo install @react-native-async-storage/async-storage
* expo install @react-native-community/netinfo
* expo install expo-image-picker
* expo install expo-location
* expo install react-native-maps