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

	const todoListPath = "main-todos/todo-list-section/todo-list";
	const colRefTodoList = collection(db, todoListPath);
	const qTodoList = query(colRefTodoList, orderBy("createdTime"));

	const [todoLists, setTodoLists] = useState();

	useEffect(() => {
		onSnapshot(qTodoList, (ss) => {
			let todoLists: any = [];
			setTodoLists(todoLists);
			ss.docs.map((doc) => {
				todoLists.unshift({
					...doc.data(),
					id: doc.id,
				});
				// console.log(todoLists);
			});
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
	}

	return { addTodos, todoLists, editTodos, deleteTodos };
};

export default FirebaseAPI;
