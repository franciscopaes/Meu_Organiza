import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics"; 

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALR55dnmA0z2SIvjk41TOhKHQY74hap58",
  authDomain: "organiza-42127.firebaseapp.com",
  projectId: "organiza-42127",
  storageBucket: "organiza-42127.firebasestorage.app",
  messagingSenderId: "865663206550",
  appId: "1:865663206550:web:a48f487521825cf7946eb7",
  measurementId: "G-PZSFWSFQ9C"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Authentication
export const auth = getAuth(app);

export default app;
