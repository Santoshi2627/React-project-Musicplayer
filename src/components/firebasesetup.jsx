
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC_bkHiEncn00066VfGcwDRjAP3DdEtADE",
//   authDomain: "musicplayer-5b27a.firebaseapp.com",
//   databaseURL: "https://musicplayer-5b27a-default-rtdb.firebaseio.com",
//   projectId: "musicplayer-5b27a",
//   storageBucket: "musicplayer-5b27a.firebasestorage.app",
//   messagingSenderId: "681253184472",
//   appId: "1:681253184472:web:2c41e418ca66f45ab488ad",
//   measurementId: "G-JCJEQHV0YY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnz6MZmpBeb55COt1KEsG9jUcg9aCNKTs",
  authDomain: "music-player-ad308.firebaseapp.com",
  projectId: "music-player-ad308",
  storageBucket: "music-player-ad308.firebasestorage.app",
  messagingSenderId: "1095029768500",
  appId: "1:1095029768500:web:7a539bdedc73d118972561",
  measurementId: "G-410493JY7K"
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, database, auth };
// export default firebaseConfig
