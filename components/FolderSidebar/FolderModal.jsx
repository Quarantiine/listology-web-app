import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const FolderModal = () => {
	const { addFolderModal, setAddFolderModal, setFolderModal, addFolder, setPathFolderName } =
		useContext(StatesManagerCtx);
	const [folderName, setFolderName] = useState(``);
	const [todoTitle, setTodoTitle] = useState(``);
	const [description, setDescription] = useState(``);

	useEffect(() => {
		const closeAddFolderModal = (e) => {
			if (!e.target.closest(".add-folder-modal")) {
				setAddFolderModal(false);
				setFolderModal(true);
			}
		};

		document.addEventListener("mousedown", closeAddFolderModal);
		return () => document.removeEventListener("mousedown", closeAddFolderModal);
	});

	const handleCancelBtn = () => {
		setFolderName(``);
		setTodoTitle(``);
		setDescription(``);
	};

	return (
		<>
			<div className="w-full h-full fixed bg-[rgba(0,0,0,0.8)] backdrop-blur-lg flex justify-center items-center z-50">
				<div className="add-folder-modal relative w-[90%] sm:w-[50%] xl:w-[600px] h-fit py-10 bg-white rounded-lg p-10">
					<>
						<Image
							className={`ml-auto absolute top-5 sm:-top-10 right-5 sm:right-0 bg-black p-1 rounded-full btn`}
							src="/icons/simple-icons/close.svg"
							alt="close btn"
							width={30}
							height={30}
							onClick={() => {
								setAddFolderModal(false);
								setFolderModal(true);
							}}
						/>
					</>
					<>
						<form className="w-full h-fit flex flex-col justify-center items-center gap-8">
							<div className="w-full h-fit flex flex-col justify-center items-center gap-5">
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label className="text-lg font-semibold" htmlFor="folder-title">
										Folder Name
									</label>
									<input
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96"
										type="text"
										name="text"
										value={folderName}
										onChange={(e) => {
											setFolderName(e.target.value);
											setPathFolderName(e.target.value);
										}}
										placeholder="Folder Title"
									/>
								</div>
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label className="text-lg font-semibold" htmlFor="folder-title">
										Todo Title
									</label>
									<input
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96"
										type="text"
										name="text"
										value={todoTitle}
										onChange={(e) => setTodoTitle(e.target.value)}
										placeholder="Todo Title"
									/>
								</div>
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label className="text-lg font-semibold" htmlFor="folder-title">
										Description
									</label>
									<input
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96"
										type="text"
										name="text"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Description"
									/>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row justify-center items-center w-[90%] h-fit gap-5">
								<input
									onClick={(e) => {
										e.preventDefault();
										addFolder(folderName, todoTitle, description);
										setAddFolderModal(false);
									}}
									className="btn px-5 py-1 rounded-md base-bg text-white w-full"
									type="submit"
									value={"Add Folder"}
								/>
								<input
									onClick={(e) => {
										e.preventDefault();
										handleCancelBtn();
									}}
									className="btn px-5 py-1 rounded-md border-2 border-[#] w-full"
									type="submit"
									value={"Cancel"}
								/>
							</div>
						</form>
					</>
				</div>
			</div>
		</>
	);
};

export default FolderModal;
