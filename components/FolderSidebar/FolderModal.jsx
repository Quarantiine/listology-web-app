import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const FolderModal = () => {
	const {
		emoji,
		setEmoji,
		checkmark,
		setDisable,
		// ? editDescription,
		setEditDscription,
		// ? editTodoListTitle,
		setEditTodoListTitle,
		folderName,
		setFolderName,
		setFolderClicked,
		setAddFolderModal,
		setFolderModal,
		folders,
		addFolders,
	} = useContext(StatesManagerCtx);

	const [checkInfo, setCheckInfo] = useState(false);
	const [emojiPalette, setEmojiPalette] = useState(false);
	const [showInfo, setShowInfo] = useState(``);

	useEffect(() => {
		const closeEmojiPalette = (e) => {
			if (!e.target.closest(".emoji-palette")) {
				setEmojiPalette(false);
			}
		};

		document.addEventListener("mousedown", closeEmojiPalette);
		return () => document.removeEventListener("mousedown", closeEmojiPalette);
	}, [setEmojiPalette]);

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
		if (
			folders
				.map((name) => {
					return name.folderName.includes(folderName);
				})
				.includes(true)
		) {
			setCheckInfo(false);
		} else {
			if (folderName.length > 2) {
				setCheckInfo(true);
			} else {
				setCheckInfo(false);
			}
		}
	}, [folderName, folders]);

	const handleCancelBtn = () => {
		setFolderName(``);
		setEditTodoListTitle(``);
		setEditDscription(``);
		setAddFolderModal(false);
		setDisable(false);
	};

	const handleAddingFolder = () => {
		if (checkInfo) {
			setAddFolderModal(false);
			addFolders(folderName, "Untitled Todo List", "Add a description", emoji, checkmark);
			setFolderClicked(folderName);
			setTimeout(() => {
				setFolderName(``);
				setEditTodoListTitle(``);
				setEditDscription(``);
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
							<div className="flex justify-center items-center gap-2 cursor-pointer relative z-10">
								{emoji ? (
									<p className="text-6xl">{emoji.native}</p>
								) : (
									<div
										onClick={() => setEmojiPalette(!emojiPalette)}
										className={`bg-gray-400 w-10 h-10 rounded-full animate-pulse`}
									/>
								)}

								{emojiPalette && (
									<div className="emoji-palette w-fit h-full absolute top-12 -left-36">
										<Picker data={data} onEmojiSelect={setEmoji}></Picker>
									</div>
								)}
							</div>
							<div className="w-full h-fit flex flex-col justify-center items-center gap-5">
								<div className={`relative flex flex-col gap-1 justify-center items-start`}>
									{showInfo === "folder name" && (
										<ul className="absolute list-disc w-full h-20 bg-white text-black px-2 py-1 flex flex-col justify-center items-start shadow-lg rounded-md top-7 left-0">
											<li className="relative left-5 text-sm">{`Greater than 2 letters`}</li>
											<li className="relative left-5 text-sm">{`Cant be the same name as other folders`}</li>
										</ul>
									)}
									<label
										className="text-lg font-semibold flex justify-between items-center gap-1 w-full"
										htmlFor="folder-title"
									>
										Folder Name
										<Image
											id="folder name"
											onMouseOver={(e) => setShowInfo(e.target.id)}
											onMouseLeave={() => setShowInfo(``)}
											src="/icons/simple-icons/info.svg"
											alt=""
											width={20}
											height={20}
										/>
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
								{/* <div className={`flex flex-col gap-1 justify-center items-start`}>
									<label
										className="text-lg font-semibold flex justify-between items-center gap-1 w-full"
										htmlFor="folder-title"
									>
										Todo List Title
									</label>
									<input
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96"
										type="text"
										name="text"
										value={editTodoListTitle}
										onChange={(e) => setEditTodoListTitle(e.target.value)}
										placeholder="Todo List Title (Optional)"
									/>
								</div>
								<div className={`flex flex-col gap-1 justify-center items-start`}>
									<label
										className="text-lg font-semibold flex justify-between items-center gap-1 w-full"
										htmlFor="folder-title"
									>
										Description
									</label>
									<textarea
										className="bg-gray-200 border outline-none px-4 py-1 rounded-md w-full lg:w-96 max-h-32 min-h-[50px]"
										type="text"
										name="text"
										value={editDescription}
										onChange={(e) => setEditDscription(e.target.value)}
										placeholder="Description (Optional)"
									/>
								</div> */}
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
