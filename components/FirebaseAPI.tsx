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
	const [todoLists, setTodoLists] = useState([]);
	const [folders, setFolders] = useState([]);
	const [value, setValue] = useState<string>(``);

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

	const colRefFolders = collection(db, `folders/folder/item`);
	const qFolders = query(colRefFolders, orderBy("createdTime"));

	const colRefTodoList = collection(db, `todos/folder/todo-items`);
	const qTodoList = query(colRefTodoList, orderBy("createdTime"));

	useEffect(() => {
		// Todo List =====
		onSnapshot(qTodoList, (ss) => {
			let todoList = [];
			setTodoLists(todoList);
			ss.docs.map((doc) => {
				todoList.unshift({
					...doc.data(),
					id: doc.id,
				});
			});
			console.log(todoList);
		});
	}, []);

	useEffect(() => {
		onSnapshot(qFolders, (ss) => {
			let folderList = [];
			setFolders(folderList);
			ss.docs.map((doc) => {
				folderList.unshift({
					...doc.data(),
					id: doc.id,
				});
			});
			console.log(folderList);
		});
	}, []);

	class TodoListSystem {
		constructor() {}

		addTodo = async (folder: string) => {
			await addDoc(colRefTodoList, {
				todo: "Untitled",
				folder: folder,
				createdTime: serverTimestamp(),
			});
		};

		editTodo = async (text: string, id: string) => {
			const docRef = doc(colRefTodoList, id);
			await updateDoc(docRef, {
				todo: text.trim(),
			});
		};

		deleteTodo = async (id: string) => {
			const docRef = doc(colRefTodoList, id);
			await deleteDoc(docRef);
		};
	}
	const TLS = new TodoListSystem();
	const addTodos = TLS.addTodo;
	const editTodos = TLS.editTodo;
	const deleteTodos = TLS.deleteTodo;

	class FolderSystem {
		constructor() {}

		addFolders = async (folderName: string, todoTitle: string, description: string) => {
			await addDoc(colRefFolders, {
				folderName: folderName,
				todoTitle: todoTitle,
				description: description,
				createdTime: serverTimestamp(),
			});
		};

		deleteFolders = async (id: string) => {
			const docRef = doc(colRefFolders, id);
			await deleteDoc(docRef);
		};
	}
	const FS = new FolderSystem();
	const addFolders = FS.addFolders;
	const deleteFolders = FS.deleteFolders;

	return {
		setValue,
		addFolders,
		deleteFolders,
		folders,
		todoLists,
		deleteTodos,
		editTodos,
		addTodos,
	};
};

export default FirebaseAPI;
