import React, { useContext, useEffect, useRef, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import FirebaseAPI from "../FirebaseAPI";

const MainTodoListIcons = () => {
	const { bodyBgColor } = useContext(StatesManagerCtx);
	const { dropdown, editing, heart, heartFilled, trash, checkboxOutlined } = TodoListIcons({ bodyBgColor });
	const { editTodos, deleteTodos, todoLists } = FirebaseAPI();
	const [loadingTodoLists, setLoadingTodoLists] = useState(false);

	return (
		<>
			<div
				className={`w-full h-fit flex flex-col justify-center items-start gap-10 ${
					bodyBgColor ? "text-white" : "text-black"
				}`}
			>
				<div className="w-full flex flex-col justify-center items-start gap-3">
					<h3>FOLDER TITLE 1</h3>
					<div className="flex justify-center items-center gap-3">
						<h1 className="text-5xl font-semibold">Todo List Title</h1>
						<div className="flex justify-center items-center gap-2 cursor-pointer">
							<div className="bg-gray-400 w-10 h-10 rounded-full" />
							{dropdown}
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-start w-full h-fit gap-6 text-lg">
					{todoLists?.length > 0 ? (
						todoLists?.map((todoLists) => (
							<TodoLists
								key={todoLists.id}
								todoLists={todoLists}
								bodyBgColor={bodyBgColor}
								editing={editing}
								heart={heart}
								heartFilled={heartFilled}
								trash={trash}
								editTodos={editTodos}
								deleteTodos={deleteTodos}
							/>
						))
					) : (
						<>
							<div className="flex justify-center items-center gap-2">
								<p>Waiting on Todo List</p>
								<div className="border-2 w-7 h-7 border-t-transparent border-[#222] animate-spin rounded-full" />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

const TodoLists = ({ todoLists, bodyBgColor, editing, heart, heartFilled, trash, editTodos, deleteTodos }) => {
	const todoRef = useRef();
	const editRef = useRef();
	const [hearted, setHearted] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [hideShowMore, setHideShowMore] = useState(false);
	const [checked, setChecked] = useState(false);
	const [edit, setEdit] = useState(false);
	const [changedTodo, setChangedTodo] = useState(``);
	const [deleted, setDeleted] = useState(false);
	const [undoDelete, setUndoDelete] = useState(true);

	const handleKey = (key) => {
		if (key === "Enter") {
			setEdit(false);
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
	});

	useEffect(() => (changedTodo.length > 80 ? setHideShowMore(true) : setHideShowMore(false)), [changedTodo]);

	return (
		<React.Fragment>
			<div ref={todoRef} className="grid lg:grid-cols-[90%_10%] w-full justify-between items-center gap-2">
				<div className="flex justify-start items-center gap-2 w-full">
					{checked ? (
						<div className="min-w-[20px] min-h-[20px] base-bg border rounded-md" onClick={() => setChecked(!checked)} />
					) : (
						<div
							className={`min-w-[20px] min-h-[20px] border ${bodyBgColor ? "border-white" : "border-black"} rounded-md`}
							onClick={() => setChecked(!checked)}
						/>
					)}
					<div className="flex justify-between items-center w-full gap-3">
						<input
							ref={editRef}
							className={`edit-input w-full ${
								edit ? `block ${bodyBgColor ? "bg-[#333]" : "bg-gray-200"} outline-none px-2 py-1 rounded-md` : "hidden"
							}`}
							type="text"
							name="text"
							onKeyDown={(e) => handleKey(e.key)}
							onChange={(e) => handleEdit(e.target.value)}
							value={changedTodo}
							autoComplete="off"
						/>
						{!edit && (
							<p
								onDoubleClick={() => {
									setEdit(true);
									setTimeout(() => {
										editRef.current.focus();
									}, 100);
								}}
								className={`${showMore ? "line-clamp-none" : "line-clamp-1"} text-xl w-full`}
							>
								{todoLists.todo.trim()}
							</p>
						)}

						{hideShowMore && (
							<p
								className="text-md btn text-[#0E51FF] underline min-w-[fit-content] text-center hidden sm:block"
								onClick={() => setShowMore(!showMore)}
							>
								{showMore ? "show less" : "show more"}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-start lg:justify-center items-center gap-2">
					<p
						className="text-md btn text-[#0E51FF] underline w-32 text-center block sm:hidden"
						onClick={() => setShowMore(!showMore)}
					>
						{showMore ? "show less" : "show more"}
					</p>
					<button
						className="btn"
						onClick={() => {
							setEdit(!edit);
							setTimeout(() => {
								editRef.current.focus();
							}, 100);
						}}
					>
						{editing}
					</button>
					<button className="btn" onClick={() => setHearted(!hearted)}>
						{hearted ? heartFilled : heart}
					</button>
					<button className="btn" onClick={(e) => deleteTodos(todoLists.id)}>
						{trash}
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

const TodoListIcons = ({ bodyBgColor }) => {
	const dropdown = (
		<svg
			className="relative top-[2px]"
			width="15"
			height="10"
			viewBox="0 0 19 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 1L9.5 11L18 1"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const editing = (
		<svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0 24.9998H5.20761L20.5666 9.64078L15.359 4.43317L0 19.7922V24.9998ZM2.77739 20.9448L15.359 8.36318L16.6366 9.64078L4.055 22.2224H2.77739V20.9448Z"
				fill={bodyBgColor ? `white` : `black`}
			/>
			<path
				d="M21.344 0.406194C20.8024 -0.135398 19.9275 -0.135398 19.3859 0.406194L16.8446 2.94751L22.0522 8.15512L24.5935 5.61381C25.1351 5.07222 25.1351 4.19734 24.5935 3.65574L21.344 0.406194Z"
				fill={bodyBgColor ? `white` : `black`}
			/>
		</svg>
	);

	const heart = (
		<svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.5377 21.849L11.5398 21.8505C11.6791 21.9492 11.8395 21.9996 12.0003 22C12.161 21.9996 12.3214 21.9494 12.4607 21.8508L12.4623 21.8496C16.9228 18.7058 18.8144 16.5801 19.8337 15.2906C22.0202 12.523 23.0281 9.7422 22.9994 6.75626C22.9678 3.5258 20.4833 1 17.5912 1C15.4733 1 13.967 2.23294 13.0318 3.36329L13.0284 3.36748C12.9046 3.51547 12.7493 3.63685 12.5715 3.72102C12.3936 3.80525 12.1986 3.84958 12 3.84958C11.8014 3.84958 11.6064 3.80525 11.4285 3.72102C11.2507 3.63685 11.0954 3.51547 10.9716 3.36748L10.9685 3.36367L10.9685 3.36366C10.0329 2.23384 8.52643 1 6.40876 1C3.5166 1 1.03224 3.52586 1.00059 6.75566L11.5377 21.849ZM11.5377 21.849C7.07731 18.7053 5.18572 16.5796 4.16638 15.2901L11.5377 21.849ZM4.1663 15.29C1.97886 12.522 0.971984 9.7413 1.00059 6.75584L4.1663 15.29Z"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
			/>
		</svg>
	);

	const heartFilled = (
		<svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.5377 21.849L11.5398 21.8505C11.6791 21.9492 11.8395 21.9996 12.0003 22C12.161 21.9996 12.3214 21.9494 12.4607 21.8508L12.4623 21.8496C16.9228 18.7058 18.8144 16.5801 19.8337 15.2906C22.0202 12.523 23.0281 9.7422 22.9994 6.75626C22.9678 3.5258 20.4833 1 17.5912 1C15.4733 1 13.967 2.23294 13.0318 3.36329L13.0284 3.36748C12.9046 3.51547 12.7493 3.63685 12.5715 3.72102C12.3936 3.80525 12.1986 3.84958 12 3.84958C11.8014 3.84958 11.6064 3.80525 11.4285 3.72102C11.2507 3.63685 11.0954 3.51547 10.9716 3.36748L10.9685 3.36367L10.9685 3.36366C10.0329 2.23384 8.52643 1 6.40876 1C3.5166 1 1.03224 3.52586 1.00059 6.75566L11.5377 21.849ZM11.5377 21.849C7.07731 18.7053 5.18572 16.5796 4.16638 15.2901L11.5377 21.849ZM4.1663 15.29C1.97886 12.522 0.971984 9.7413 1.00059 6.75584L4.1663 15.29Z"
				fill={bodyBgColor ? `white` : `black`}
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
			/>
		</svg>
	);

	const trash = (
		<svg width="20" height="20" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.6592 1.72732H7.34102C7.28413 1.72666 7.22769 1.73739 7.17501 1.75886C7.12232 1.78033 7.07446 1.81211 7.03423 1.85234C6.994 1.89257 6.96222 1.94043 6.94075 1.99311C6.91928 2.0458 6.90856 2.10224 6.90921 2.15913V3.45456H12.091V2.15913C12.0916 2.10224 12.0809 2.0458 12.0594 1.99311C12.038 1.94043 12.0062 1.89257 11.9659 1.85234C11.9257 1.81211 11.8779 1.78033 11.8252 1.75886C11.7725 1.73739 11.716 1.72666 11.6592 1.72732Z"
				fill="#FF0000"
			/>
			<path
				d="M18.2083 3.20779H13.4583V2.00487C13.4583 1.47315 13.2498 0.963199 12.8786 0.587213C12.5075 0.211227 12.0041 0 11.4792 0H7.52083C6.99593 0 6.49252 0.211227 6.12135 0.587213C5.75019 0.963199 5.54167 1.47315 5.54167 2.00487V3.20779H0.791667C0.581704 3.20779 0.38034 3.29228 0.231874 3.44268C0.0834077 3.59307 0 3.79705 0 4.00974C0 4.22243 0.0834077 4.42641 0.231874 4.5768C0.38034 4.7272 0.581704 4.81169 0.791667 4.81169H1.63281L2.57292 20.0948C2.64318 21.4406 3.66146 22.4545 4.94792 22.4545H14.0521C15.345 22.4545 16.343 21.4631 16.4271 20.0988L17.3672 4.81169H18.2083C18.4183 4.81169 18.6197 4.7272 18.7681 4.5768C18.9166 4.42641 19 4.22243 19 4.00974C19 3.79705 18.9166 3.59307 18.7681 3.44268C18.6197 3.29228 18.4183 3.20779 18.2083 3.20779ZM6.36154 19.2468H6.33333C6.12817 19.2469 5.93096 19.1663 5.78328 19.0221C5.6356 18.8778 5.54898 18.6811 5.54167 18.4734L5.14583 7.2461C5.13835 7.03341 5.21459 6.82642 5.35776 6.67067C5.50094 6.51492 5.69933 6.42316 5.9093 6.41558C6.11926 6.40801 6.3236 6.48523 6.47735 6.63027C6.63111 6.7753 6.72169 6.97627 6.72917 7.18896L7.125 18.4162C7.12877 18.5216 7.11201 18.6266 7.07567 18.7254C7.03933 18.8241 6.98413 18.9147 6.91322 18.9918C6.84231 19.0689 6.75709 19.1312 6.66243 19.1749C6.56777 19.2187 6.46552 19.2431 6.36154 19.2468ZM10.2917 18.4448C10.2917 18.6575 10.2083 18.8615 10.0598 19.0119C9.91133 19.1623 9.70996 19.2468 9.5 19.2468C9.29004 19.2468 9.08867 19.1623 8.94021 19.0119C8.79174 18.8615 8.70833 18.6575 8.70833 18.4448V7.21753C8.70833 7.00484 8.79174 6.80086 8.94021 6.65047C9.08867 6.50008 9.29004 6.41558 9.5 6.41558C9.70996 6.41558 9.91133 6.50008 10.0598 6.65047C10.2083 6.80086 10.2917 7.00484 10.2917 7.21753V18.4448ZM11.875 3.20779H7.125V2.00487C7.1244 1.95205 7.13423 1.89963 7.15392 1.85071C7.1736 1.80179 7.20273 1.75735 7.23961 1.71999C7.27648 1.68264 7.32036 1.65312 7.36865 1.63319C7.41695 1.61325 7.46869 1.60329 7.52083 1.6039H11.4792C11.5313 1.60329 11.5831 1.61325 11.6313 1.63319C11.6796 1.65312 11.7235 1.68264 11.7604 1.71999C11.7973 1.75735 11.8264 1.80179 11.8461 1.85071C11.8658 1.89963 11.8756 1.95205 11.875 2.00487V3.20779ZM13.4583 18.4734C13.451 18.6811 13.3644 18.8778 13.2167 19.0221C13.069 19.1663 12.8718 19.2469 12.6667 19.2468H12.638C12.534 19.243 12.4318 19.2185 12.3372 19.1748C12.2426 19.131 12.1575 19.0688 12.0866 18.9916C12.0157 18.9145 11.9606 18.824 11.9243 18.7253C11.888 18.6265 11.8712 18.5215 11.875 18.4162L12.2708 7.18896C12.2745 7.08365 12.2987 6.98011 12.3419 6.88425C12.3851 6.78838 12.4465 6.70208 12.5227 6.63027C12.5988 6.55845 12.6881 6.50253 12.7856 6.4657C12.8831 6.42886 12.9867 6.41183 13.0907 6.41558C13.1947 6.41934 13.2969 6.44379 13.3915 6.48756C13.4861 6.53133 13.5713 6.59355 13.6422 6.67067C13.7131 6.74779 13.7683 6.8383 13.8047 6.93703C13.8411 7.03577 13.8579 7.14079 13.8542 7.2461L13.4583 18.4734Z"
				fill="#FF0000"
			/>
		</svg>
	);

	const checkboxOutlined = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="25"
			width="25"
			viewBox="0 0 960 960"
			fill={bodyBgColor ? `white` : `black`}
		>
			<path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Z" />
		</svg>
	);

	return { dropdown, editing, heart, heartFilled, trash, checkboxOutlined };
};

export default MainTodoListIcons;