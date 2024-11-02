import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyBOkUFgy8LCc1Qd-WXKphPgVh6sIRSghtk",
	authDomain: "react-quicktasks-pwa.firebaseapp.com",
	projectId: "react-quicktasks-pwa",
	storageBucket: "react-quicktasks-pwa.firebasestorage.app",
	messagingSenderId: "352021449864",
	appId: "1:352021449864:web:24e8b21b500d4e21c0633d",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp);
