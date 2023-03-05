import { StatesManagerCtx } from "../Layout";
import GridLayout from "./GridLayout";
import ListLayout from "./ListLayout";

const { useState, useEffect, useRef, useContext } = require("react");

export default function TodoLists({
	dropdown,
	layoutView,
	todoLists,
	bodyBgColor,
	editing,
	heart,
	heartFilled,
	trash,
	editTodos,
	deleteTodos,
	undo,
	// del,
}) {
	const { edit, setEdit } = useContext(StatesManagerCtx);
	const todoRef = useRef();
	const todoListRef = useRef();
	const deleteRef = useRef();
	const deleteTimerRef = useRef();
	const editRef = useRef();
	const [hearted, setHearted] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [hideShowMore, setHideShowMore] = useState(false);
	const [checked, setChecked] = useState(false);
	const [changedTodo, setChangedTodo] = useState(``);
	const [deleted, setDeleted] = useState(false);
	const [deletionTime, setDeletionTime] = useState(5000);
	let [deletionTimer, setDeletionTimer] = useState(5);
	const [copied, setCopied] = useState(false);
	const [dropdownItems, setDropdownItems] = useState(false);

	const handleKey = (key) => {
		if (key === "Enter") {
			setEdit(false);
			setChangedTodo(``);
		}
	};

	const handleEdit = (value) => {
		setChangedTodo(value);
		if (value.length > 0) {
			editTodos(value, todoLists.id);
		} else {
			editTodos("Untitled", todoLists.id);
		}
	};

	useEffect(() => {
		const closeEditInput = (e) => {
			if (!e.target.closest(".edit-input")) {
				setEdit(false);
			}
		};

		document.addEventListener("mousedown", closeEditInput);
		return () => document.removeEventListener("mousedown", closeEditInput);
	}, [setEdit]);

	useEffect(() => {
		const closeTodoDropdown = (e) => {
			if (!e.target.closest(".dropdown-todo-items")) {
				setDropdownItems(false);
			}
		};

		document.addEventListener("mousedown", closeTodoDropdown);
		return () => document.removeEventListener("mousedown", closeTodoDropdown);
	}, [setDropdownItems]);

	useEffect(() => (changedTodo.length > 80 ? setHideShowMore(true) : setHideShowMore(false)), [changedTodo]);

	const handleCopyingText = (text) => {
		// TODO: Add in settings if they want to turn on: copying mode
		setCopied(true);
		navigator.clipboard.writeText(text);
		clearTimeout(todoListRef.current);
		todoListRef.current = setTimeout(() => {
			setCopied(false);
		}, 600);
	};

	const handleDeletionSystem = () => {
		// TODO: Add this in settings as: disable timer
		clearTimeout(deleteRef.current);
		setDeleted(true);
		deleteTimerRef.current = setInterval(() => {
			setDeletionTimer((deletionTimer -= 1));
			if (deletionTimer <= 0) {
				setDeletionTimer((deletionTimer = 5));
				clearInterval(deleteTimerRef.current);
			}
		}, 1000);
		deleteRef.current = setTimeout(() => {
			deleteTodos(todoLists.id);
		}, deletionTime);
	};

	const handleUndoDeletionSystem = () => {
		clearTimeout(deleteRef.current);
		clearTimeout(deleteTimerRef.current);
		setDeletionTimer((deletionTimer = 5));
		setDeleted(false);
	};

	const handleTimeSystem = () => {
		// TODO: Add in settings if they want to turn on: display time stamps
		const timeSystem = () => {
			const date = new Date(todoLists?.createdTime?.seconds * 1000);
			const hour = date.getHours();
			const min = date.getMinutes();
			// const sec = date.getSeconds();
			const time = `${hour > 12 ? hour - 12 : hour}:${
				hour > 11 ? (min < 10 ? `0${min} pm` : `${min} pm`) : min < 10 ? `0${min} am` : `${min} am`
			}`;
			// console.log(time);

			return time;
		};

		const dateSystem = () => {
			const currentDate = new Date(todoLists?.createdTime?.seconds * 1000);
			const date = new Date(currentDate);
			const day = date.getDate();
			const month = date.getMonth();
			const year = date.getFullYear();
			const fullDate = `${month + 1}/${day}/${year}`;

			return fullDate;
		};
		dateSystem();

		// console.log(`${timeSystem()} - ${dateSystem()}`);
		return `${timeSystem() || "time"} - ${dateSystem() || "date"}`;
	};

	return layoutView === "list" ? (
		<ListLayout
			handleKey={handleKey}
			handleEdit={handleEdit}
			handleCopyingText={handleCopyingText}
			handleDeletionSystem={handleDeletionSystem}
			handleUndoDeletionSystem={handleUndoDeletionSystem}
			handleTimeSystem={handleTimeSystem}
			dropdown={dropdown}
			bodyBgColor={bodyBgColor}
			editing={editing}
			heart={heart}
			heartFilled={heartFilled}
			trash={trash}
			undo={undo}
			todoLists={todoLists}
			deletionTimer={deletionTimer}
			setDeletionTimer={setDeletionTimer}
			deleteRef={deleteRef}
			todoListRef={todoListRef}
			changedTodo={changedTodo}
			todoRef={todoRef}
			editRef={editRef}
			hearted={hearted}
			setHearted={setHearted}
			showMore={showMore}
			setShowMore={setShowMore}
			hideShowMore={hideShowMore}
			checked={checked}
			setChecked={setChecked}
			edit={edit}
			setEdit={setEdit}
			deleted={deleted}
			copied={copied}
			dropdownItems={dropdownItems}
			setDropdownItems={setDropdownItems}
		/>
	) : (
		<GridLayout
			handleKey={handleKey}
			handleEdit={handleEdit}
			handleCopyingText={handleCopyingText}
			handleDeletionSystem={handleDeletionSystem}
			handleUndoDeletionSystem={handleUndoDeletionSystem}
			handleTimeSystem={handleTimeSystem}
			dropdown={dropdown}
			bodyBgColor={bodyBgColor}
			editing={editing}
			heart={heart}
			heartFilled={heartFilled}
			trash={trash}
			undo={undo}
			todoLists={todoLists}
			deleteRef={deleteRef}
			todoListRef={todoListRef}
			changedTodo={changedTodo}
			todoRef={todoRef}
			editRef={editRef}
			hearted={hearted}
			setHearted={setHearted}
			showMore={showMore}
			setShowMore={setShowMore}
			hideShowMore={hideShowMore}
			checked={checked}
			setChecked={setChecked}
			edit={edit}
			setEdit={setEdit}
			deleted={deleted}
			copied={copied}
			dropdownItems={dropdownItems}
			setDropdownItems={setDropdownItems}
		/>
	);
}
