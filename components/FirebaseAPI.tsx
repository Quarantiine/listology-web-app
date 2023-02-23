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
	// const [heroUrl, setHeroUrl] = useState();

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const colRefHeroImg = collection(db, "hero-images");
	const queryHeroImgTime = query(colRefHeroImg, orderBy("lastModifiedDate"));

	useEffect(() => {
		onSnapshot(queryHeroImgTime, (ss) => {
			ss.docs.map((doc) => {
				let imgs: any = [];
				imgs.unshift({
					...doc.data(),
				});
				// setHeroUrl(imgs);
			});
		});
	}, []);
	// useEffect(() => console.log(heroUrl));

	class HeroSystem {
		constructor() {}

		saveHeroImage = async (url: any) => {
			await addDoc(colRefHeroImg, {
				lastModified: url.lastModified,
				lastModifiedDate: url.lastModifiedDate,
				url: url.name,
				size: url.size,
				type: url.type,
				webkitRelativePath: url.webkitRelativePath,
			}).catch((err) => alert(err.message));
		};
	}
	const HS = new HeroSystem();
	const saveBgImg = HS.saveHeroImage;

	class TodoListSystem {
		constructor() {}
	}

	class FolderSystem {
		constructor() {}
	}

	return { saveBgImg };
};

export default FirebaseAPI;
