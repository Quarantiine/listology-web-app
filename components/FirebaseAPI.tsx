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
import { useEffect, useState } from "react";

const FirebaseAPI = () => {
	const [pathFolderName, setPathFolderName] = useState();
	const [todoLists, setTodoLists] = useState([]);
	const [folderList, setFolderList] = useState([]);
	// const [foldersLists, setFoldersLists] = useState([]);

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

	const todoListPath = `todos/folder-name: ${pathFolderName}/todo-items`;
	const colRefTodoList = collection(db, todoListPath);
	const qTodoList = query(colRefTodoList, orderBy("createdTime"));

	const folderPath = `folders/folder-name: ${pathFolderName}/folder-items`;
	const colRefFolder = collection(db, folderPath);
	const qFolder = query(colRefFolder, orderBy("createdTime"));

	useEffect(() => {
		// Todo List =====
		onSnapshot(qTodoList, (ss) => {
			let todoList: any = [];
			setTodoLists(todoList);
			ss.docs.map((doc) => {
				todoList.unshift({
					...doc.data(),
					id: doc.id,
				});
				console.log(todoLists);
			});
		});
	}, []);

	useEffect(() => {
		// Folder List =====
		onSnapshot(qFolder, (ss) => {
			let folders = [];
			setFolderList(folders);
			ss.docs.map((doc) => {
				folderList.push({
					...doc.data(),
					id: doc.id,
				});
			});
			console.log(folderList);
		});
	}, []);

	class TodoListSystem {
		constructor() {}

		addTodo = async () => {
			await addDoc(colRefTodoList, {
				todo: "Untitled",
				createdTime: serverTimestamp(),
			});
		};

		editTodo = async (text: string, id: string) => {
			const docRef = doc(db, todoListPath, id);
			await updateDoc(docRef, {
				todo: text.trim(),
			});
		};

		deleteTodo = async (id: string) => {
			const docRef = doc(db, todoListPath, id);
			await deleteDoc(docRef);
		};
	}
	const TLS = new TodoListSystem();
	const addTodos = TLS.addTodo;
	const editTodos = TLS.editTodo;
	const deleteTodos = TLS.deleteTodo;

	class FolderSystem {
		constructor() {}

		addFolder = async (folder_title: string, todo_title: string, description: string) => {
			addDoc(colRefFolder, {
				folderTitle: folder_title,
				todoTitle: todo_title,
				description: description,
			});
		};

		deleteFolder = async (id: string) => {
			const docRef = doc(db, folderPath, id);
			deleteDoc(docRef);
		};
	}
	const FS = new FolderSystem();
	const addFolder = FS.addFolder;
	const deleteFolder = FS.deleteFolder;

	return {
		folderList,
		deleteFolder,
		addFolder,
		todoLists,
		deleteTodos,
		editTodos,
		addTodos,
		setPathFolderName,
	};
};

export default FirebaseAPI;
