import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	onSnapshot,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	orderBy,
	where,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const FirebaseAPI = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyAs56GPO60nYErJxefy9853HWz17bGPSho",
		authDomain: "listology-787f6.firebaseapp.com",
		projectId: "listology-787f6",
		storageBucket: "listology-787f6.appspot.com",
		messagingSenderId: "784456370033",
		appId: "1:784456370033:web:daf0c39df03edd2b6b98d0",
		measurementId: "G-X8VS02Q4Q6",
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	useEffect(() => {}, []);

	class TodoListSystem {
		constructor() {}
	}

	class FolderSystem {
		constructor() {}
	}

	return {};
};

export default FirebaseAPI;
