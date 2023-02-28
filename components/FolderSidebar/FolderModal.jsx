import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const FolderModal = () => {
	// TODO: Make it required for user to input all fields before submitting

	const {
		setDisable,
		description,
		setDescription,
		todoTitle,
		setTodoTitle,
		folderName,
		setFolderName,
		folderClicked,
		setFolderClicked,
		setAddFolderModal,
		setFolderModal,
		folders,
		addFolders,
		deleteFolders,
	} = useContext(StatesManagerCtx);

	const [checkInfo, setCheckInfo] = useState(false);

	useEffect(() => {
		const closeAddFolderModal = (e) => {
			if (!e.target.closest(".add-folder-modal")) {
				setAddFolderModal(false);
			}
		};

		document.addEventListener("mousedown", closeAddFolderModal);
		return () => document.removeEventListener("mousedown", closeAddFolderModal);
	});

	useEffect(() => {
		if (folderName.length > 2) {
			setCheckInfo(true);
		} else {
			setCheckInfo(false);
		}
	}, [setCheckInfo, folderName]);

	const handleCancelBtn = () => {
		setFolderName(``);
		setTodoTitle(``);
		setDescription(``);
		setAddFolderModal(false);
		setDisable(false);
	};

	const handleAddingFolder = () => {
		if (checkInfo) {
			setAddFolderModal(false);
			addFolders(
				folderName,
				todoTitle.length > 0 ? todoTitle : "Untitled Todo List",
				description.length > 0 ? description : "Add a description"
			);
			setFolderClicked(folderName);
			setTimeout(() => {
				setFolderName(``);
				setTodoTitle(``);
				setDescription(``);
			}, 1000);
		}
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
										}}
										placeholder="Folder Name (Required)"
									/>
								</div>
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label className="text-lg font-semibold" htmlFor="folder-title">
										Todo List Title
									</label>
									<input
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96"
										type="text"
										name="text"
										value={todoTitle}
										onChange={(e) => setTodoTitle(e.target.value)}
										placeholder="Todo List Title (Optional)"
									/>
								</div>
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label className="text-lg font-semibold" htmlFor="folder-title">
										Description
									</label>
									<textarea
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96 max-h-32 min-h-[50px]"
										type="text"
										name="text"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Description (Optional)"
									/>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row justify-center items-center w-[90%] h-fit gap-5">
								<input
									onClick={(e) => {
										e.preventDefault();
										handleAddingFolder();
									}}
									className={`px-5 py-1 rounded-md w-full ${
										checkInfo ? "base-bg text-white btn" : "bg-gray-400 text-[#ccc]"
									}`}
									disabled={checkInfo ? false : true}
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
