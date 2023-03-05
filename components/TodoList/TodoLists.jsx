const { useState, useEffect, useRef } = require("react");

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
	del,
}) {
	const todoRef = useRef();
	const todoListRef = useRef();
	const deleteRef = useRef();
	const deleteTimerRef = useRef();
	const editRef = useRef();
	const [hearted, setHearted] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [hideShowMore, setHideShowMore] = useState(false);
	const [checked, setChecked] = useState(false);
	const [edit, setEdit] = useState(false);
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

	return (
		<>
			{layoutView === "list" ? (
				<div
					className={`relative flex flex-col justify-center items-start w-full h-fit py-2 rounded-md border-2 ${
						deleted ? "border-red-500" : "border-transparent"
					}`}
				>
					{deleted && (
						<button
							onClick={handleUndoDeletionSystem}
							className={`absolute top-10 right-0 rounded-md p-1 w-fit h-fit bg-red-500 text-white flex justify-center items-center gap-1`}
						>
							<p>{undo}</p>
							<p>{deletionTimer}</p>
						</button>
					)}
					<div ref={todoRef} className="flex gap-5 w-full justify-between items-center relative">
						<div className="flex justify-start items-center gap-2 w-full">
							{checked ? (
								<div
									className="min-w-[20px] min-h-[20px] base-bg border rounded-md"
									onClick={() => setChecked(!checked)}
								/>
							) : (
								<div
									className={`min-w-[20px] min-h-[20px] border ${
										bodyBgColor ? "border-white" : "border-black"
									} rounded-md`}
									onClick={() => setChecked(!checked)}
								/>
							)}
							<div className="flex justify-between items-center w-full gap-3">
								<input
									ref={editRef}
									className={`edit-input w-full ${
										edit
											? `block ${bodyBgColor ? "bg-[#333]" : "bg-gray-200"} outline-none px-2 py-1 rounded-md`
											: "hidden"
									}`}
									type="text"
									name="text"
									onKeyDown={(e) => handleKey(e.key)}
									onChange={(e) => handleEdit(e.target.value)}
									value={changedTodo}
									autoComplete="off"
								/>
								{!edit && (
									<div className="relative w-full h-fit">
										{copied && (
											<div className={`bg-green-500 absolute -top-7 left-0 w-fit h-fit px-2 rounded-md`}>
												<p className="text-[10px] text-white">COPIED!</p>
											</div>
										)}
										<p
											ref={todoListRef}
											onClick={(e) => {
												const timeout = setTimeout(() => {
													clearTimeout(timeout);
													handleCopyingText(e.target.textContent);
												}, 300);
											}}
											onDoubleClick={() => {
												setEdit(true);
												setTimeout(() => {
													editRef.current.focus();
												}, 100);
											}}
											className={`${
												showMore ? "line-clamp-none" : "line-clamp-1"
											} text-lg md:text-2xl w-full pr-5 sm:pr-0`}
										>
											{todoLists.todo.trim()}
										</p>
									</div>
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
						<>
							<div className="hidden lg:flex justify-start lg:justify-center items-center gap-2">
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
								<button ref={deleteRef} className="btn" onClick={() => handleDeletionSystem()}>
									{trash}
								</button>
							</div>
							<div className="flex lg:hidden justify-center items-center w-fit">
								<div
									className={`dropdown-todo-items absolute flex flex-col justify-start items-start gap-2 top-0 right-0 bg-white p-2 rounded-full overflow-hidden min-w-[36px] text-center ${
										dropdownItems ? "h-fit shadow-lg" : "h-9 shadow-none"
									} border`}
								>
									{!dropdownItems && (
										<button
											className="btn"
											onClick={() => {
												setDropdownItems(true);
											}}
										>
											{dropdown}
										</button>
									)}
									<button
										className="btn"
										onClick={() => {
											setEdit(!edit);
											setDropdownItems(false);
											setTimeout(() => {
												editRef.current.focus();
											}, 100);
										}}
									>
										{editing}
									</button>
									<button
										className="btn"
										onClick={() => {
											setDropdownItems(false);
											setHearted(!hearted);
										}}
									>
										{hearted ? heartFilled : heart}
									</button>
									<button
										ref={deleteRef}
										className="btn"
										onClick={() => {
											setDropdownItems(false);
											handleDeletionSystem();
										}}
									>
										{trash}
									</button>
								</div>
							</div>
						</>
					</div>
					<p className="text-sm btn text-[#0E51FF] underline w-full text-start" onClick={() => setShowMore(!showMore)}>
						{showMore ? "show less" : "show more"}
					</p>
					<div className="flex justify-between items-center gap-1 w-full cursor-default">
						{/* TODO: make this apart of settings as: disable labels */}
						<div className="flex justify-center items-center">
							<div
								className={`flex justify-center items-center gap-2 px-2 text-[14px] rounded-lg relative top-1 ${
									bodyBgColor ? "bg-[#333]" : "hover:bg-gray-300 bg-gray-200 border-2"
								}`}
							>
								<p className={`w-fit h-fit`}>label 1</p>
								<span>{del}</span>
							</div>
						</div>
						<p className={`text-[11px] ${bodyBgColor ? "text-[#555]" : "text-gray-400"}`}>{handleTimeSystem()}</p>
					</div>
				</div>
			) : (
				<div
					className={`relative flex flex-col justify-center items-start w-full h-fit py-2 rounded-md border-2 ${
						deleted ? "border-red-500" : "border-transparent"
					}`}
				>
					{deleted && (
						<button
							onClick={handleUndoDeletionSystem}
							className={`absolute top-10 right-0 rounded-md p-1 w-fit h-fit bg-red-500 text-white flex justify-center items-center gap-1`}
						>
							<p>{undo}</p>
							<p>{deletionTimer}</p>
						</button>
					)}
					<div ref={todoRef} className="flex gap-5 w-full justify-between items-center relative">
						<div className="flex justify-start items-center gap-2 w-full">
							{checked ? (
								<div
									className="min-w-[20px] min-h-[20px] base-bg border rounded-md"
									onClick={() => setChecked(!checked)}
								/>
							) : (
								<div
									className={`min-w-[20px] min-h-[20px] border ${
										bodyBgColor ? "border-white" : "border-black"
									} rounded-md`}
									onClick={() => setChecked(!checked)}
								/>
							)}
							<div className="flex justify-between items-center w-full gap-3">
								<input
									ref={editRef}
									className={`edit-input w-full ${
										edit
											? `block ${bodyBgColor ? "bg-[#333]" : "bg-gray-200"} outline-none px-2 py-1 rounded-md`
											: "hidden"
									}`}
									type="text"
									name="text"
									onKeyDown={(e) => handleKey(e.key)}
									onChange={(e) => handleEdit(e.target.value)}
									value={changedTodo}
									autoComplete="off"
								/>
								{!edit && (
									<div className="relative w-full h-fit">
										{copied && (
											<div className={`bg-green-500 absolute -top-7 left-0 w-fit h-fit px-2 rounded-md`}>
												<p className="text-[10px] text-white">COPIED!</p>
											</div>
										)}
										<p
											ref={todoListRef}
											onClick={(e) => {
												const timeout = setTimeout(() => {
													clearTimeout(timeout);
													handleCopyingText(e.target.textContent);
												}, 300);
											}}
											onDoubleClick={() => {
												setEdit(true);
												setTimeout(() => {
													editRef.current.focus();
												}, 100);
											}}
											className={`${
												showMore ? "line-clamp-none" : "line-clamp-1"
											} text-lg md:text-2xl w-full pr-5 sm:pr-0`}
										>
											{todoLists.todo.trim()}
										</p>
									</div>
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
						<>
							<div className="hidden lg:flex justify-start lg:justify-center items-center gap-2">
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
								<button ref={deleteRef} className="btn" onClick={() => handleDeletionSystem()}>
									{trash}
								</button>
							</div>
							<div className="flex lg:hidden justify-center items-center w-fit">
								<div
									className={`dropdown-todo-items absolute flex flex-col justify-start items-start gap-2 top-0 right-0 bg-white p-2 rounded-full overflow-hidden min-w-[36px] text-center ${
										dropdownItems ? "h-fit shadow-lg" : "h-9 shadow-none"
									} border`}
								>
									{!dropdownItems && (
										<button
											className="btn"
											onClick={() => {
												setDropdownItems(true);
											}}
										>
											{dropdown}
										</button>
									)}
									<button
										className="btn"
										onClick={() => {
											setEdit(!edit);
											setDropdownItems(false);
											setTimeout(() => {
												editRef.current.focus();
											}, 100);
										}}
									>
										{editing}
									</button>
									<button
										className="btn"
										onClick={() => {
											setDropdownItems(false);
											setHearted(!hearted);
										}}
									>
										{hearted ? heartFilled : heart}
									</button>
									<button
										ref={deleteRef}
										className="btn"
										onClick={() => {
											setDropdownItems(false);
											handleDeletionSystem();
										}}
									>
										{trash}
									</button>
								</div>
							</div>
						</>
					</div>
					<p className="text-sm btn text-[#0E51FF] underline w-full text-start" onClick={() => setShowMore(!showMore)}>
						{showMore ? "show less" : "show more"}
					</p>
					<div className="flex justify-between items-center gap-1 w-full cursor-default">
						{/* TODO: make this apart of settings as: disable labels */}
						<div className="flex justify-center items-center">
							<div
								className={`flex justify-center items-center gap-2 px-2 text-[14px] rounded-lg relative top-1 ${
									bodyBgColor ? "bg-[#333]" : "hover:bg-gray-300 bg-gray-200 border-2"
								}`}
							>
								<p className={`w-fit h-fit`}>label 1</p>
								<span>{del}</span>
							</div>
						</div>
						<p className={`text-[11px] ${bodyBgColor ? "text-[#555]" : "text-gray-400"}`}>{handleTimeSystem()}</p>
					</div>
				</div>
			)}
		</>
	);
}
