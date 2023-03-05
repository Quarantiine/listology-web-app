export default function GridLayout({
	handleKey,
	handleEdit,
	handleCopyingText,
	handleDeletionSystem,
	handleUndoDeletionSystem,
	handleTimeSystem,
	dropdown,
	bodyBgColor,
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
	hearted,
	setHearted,
	showMore,
	setShowMore,
	hideShowMore,
	checked,
	setChecked,
	edit,
	setEdit,
	deleted,
	copied,
	dropdownItems,
	setDropdownItems,
}) {
	return (
		<>
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
								className={`dropdown-todo-items absolute flex flex-col justify-start items-start gap-2 top-0 right-0 ${
									bodyBgColor ? "bg-[#333]" : "bg-white"
								} p-2 rounded-full overflow-hidden min-w-[36px] text-center ${
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
				<p className={`text-[11px] z-[-1] absolute top-10 right-0 ${bodyBgColor ? "text-[#555]" : "text-gray-400"}`}>
					{handleTimeSystem()}
				</p>
				<p className="text-sm btn text-[#0E51FF] underline w-fit text-start" onClick={() => setShowMore(!showMore)}>
					{showMore ? "show less" : "show more"}
				</p>

				{/* TODO: Add Labels Section: ====== */}
				{/* TODO: make this apart of settings as: disable labels */}
				{/* <div className="flex justify-between items-center gap-1 w-full cursor-default">
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
		</div> */}
			</div>
		</>
	);
}
