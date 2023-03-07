export default function GridLayout({
	handleCompletedTodos,
	handleActiveTodos,
	handleFavoritesTodos,
	handleComplete,
	handleKey,
	handleEdit,
	handleCopyingText,
	handleDeletionSystem,
	handleUndoDeletionSystem,
	handleTimeSystem,
	// ? dropdown,
	themeMode,
	editing,
	heart,
	heartFilled,
	trash,
	undo,
	deletionTimer,
	deleteRef,
	todoLists,
	todoListRef,
	changedTodo,
	todoRef,
	editRef,
	// ? hearted,
	// ? setHearted,
	showMore,
	setShowMore,
	// ? hideShowMore,
	// ? checked,
	// ? setChecked,
	edit,
	setEdit,
	deleted,
	copied,
	// ? dropdownItems,
	// ? setDropdownItems,
}) {
	return (
		<>
			<div
				className={`relative flex flex-col justify-center items-start w-[180px] border p-3 ${
					themeMode[0]?.mode ? "bg-[#222]" : "bg-white"
				} shadow-lg h-fit rounded-md ${deleted ? "border-red-500" : "border-transparent"}`}
			>
				{todoLists.completed && (
					<div className="bg-[rgba(0,0,0,0.7)] absolute w-full h-full z-10 left-0 top-0 rounded-md flex justify-between items-end gap-1 p-3">
						{todoLists.completed ? (
							<div
								className="min-w-[20px] min-h-[20px] base-bg border rounded-md btn"
								onClick={() => {
									handleComplete(false);
									handleCompletedTodos(false);
									handleActiveTodos(true);
								}}
							/>
						) : (
							<div
								className={`min-w-[20px] min-h-[20px] border btn ${
									themeMode[0]?.mode ? "border-white" : "border-black"
								} rounded-md`}
								onClick={() => {
									handleComplete(true);
									handleCompletedTodos(true);
									handleActiveTodos(false);
								}}
							/>
						)}
						<div className="flex justify-start lg:justify-center items-center gap-2">
							<button ref={deleteRef} className="btn" onClick={() => handleDeletionSystem()}>
								{trash}
							</button>
						</div>
					</div>
				)}
				{deleted && (
					<button
						onClick={handleUndoDeletionSystem}
						className={`relative top-0 right-0 rounded-md p-1 w-fit h-fit bg-red-500 text-white flex justify-center items-center gap-1`}
					>
						<p>{undo}</p>
						<p>{deletionTimer}</p>
					</button>
				)}
				<div ref={todoRef} className="flex gap-5 w-full justify-between items-center relative">
					<div className="flex flex-col justify-start items-center gap-2 w-full">
						<div className="flex flex-col justify-between items-center w-full gap-1">
							<textarea
								ref={editRef}
								className={`edit-input w-full h-full ${
									edit
										? `block ${themeMode[0]?.mode ? "bg-[#333]" : "bg-gray-200"} outline-none px-2 py-1 rounded-md`
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
										title={todoLists.todo}
										onClick={(e) => {
											const timeout = setTimeout(() => {
												clearTimeout(timeout);
												handleCopyingText(e.target.textContent);
											}, 300);
										}}
										className={`${
											showMore ? "line-clamp-none" : "line-clamp-1"
										} text-lg md:text-2xl w-full pr-5 sm:pr-0`}
									>
										{todoLists.todo.trim()}
									</p>
								</div>
							)}
							<p
								className="text-sm btn text-[#0E51FF] underline w-full text-start"
								onClick={() => setShowMore(!showMore)}
							>
								{showMore ? "show less" : "show more"}
							</p>
						</div>
						<div className="flex justify-between items-center gap-1 w-full">
							{!todoLists.completed && (
								<>
									{todoLists.completed ? (
										<div
											className="min-w-[20px] min-h-[20px] base-bg border rounded-md btn"
											onClick={() => {
												handleComplete(false);
												handleCompletedTodos(false);
												handleActiveTodos(true);
											}}
										/>
									) : (
										<div
											className={`min-w-[20px] min-h-[20px] border ${
												themeMode[0]?.mode ? "border-white" : "border-black"
											} rounded-md btn`}
											onClick={() => {
												handleComplete(true);
												handleCompletedTodos(true);
												handleActiveTodos(false);
											}}
										/>
									)}
								</>
							)}
							<div className="flex justify-start lg:justify-center items-center gap-2">
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
								{todoLists.favoritesTodo ? (
									<button
										className="btn"
										onClick={() => {
											handleFavoritesTodos(false);
										}}
									>
										{heartFilled}
									</button>
								) : (
									<button
										className="btn"
										onClick={() => {
											handleFavoritesTodos(true);
										}}
									>
										{heart}
									</button>
								)}
								<button
									ref={deleteRef}
									className="btn"
									onClick={() => {
										handleDeletionSystem();
									}}
								>
									{trash}
								</button>
							</div>
						</div>
					</div>
				</div>
				<p className={`text-[11px] relative top-2 ${themeMode[0]?.mode ? "text-[#555]" : "text-gray-400"}`}>
					{handleTimeSystem()}
				</p>

				{/* TODO: Add Labels Section: ====== */}
				{/* <div className="flex justify-between items-center gap-1 w-full cursor-default">
			<div className="flex justify-center items-center">
				<div
					className={`flex justify-center items-center gap-2 px-2 text-[14px] rounded-lg relative top-1 ${
						themeMode[0]?.mode  ? "bg-[#333]" : "hover:bg-gray-300 bg-gray-200 border-2"
					}`}
				>
					<p className={`w-fit h-fit`}>label 1</p>
					<span>{del}</span>
				</div>
			</div>
		</div> */}
			</div>
		</>
	);
}
