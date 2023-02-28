import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const FolderSystem = ({ folders }) => {
	const {
		disable,
		setDisable,
		setFolderBtnClicked,
		addTodos,
		setValue,
		bodyBgColor,
		setFolderModal,
		setAddFolderModal,
		folderClicked,
		setFolderClicked,
		deleteFolders,
	} = useContext(StatesManagerCtx);
	const { disabledCheckbox, filledCheckbox } = FolderIcons({ bodyBgColor });

	useEffect(() => {
		const closeFolderModal = (e) => {
			if (!e.target.closest(".folder-modal")) {
				setFolderModal(false);
			}
		};

		document.addEventListener("mousedown", closeFolderModal);
		return () => document.removeEventListener("mousedown", closeFolderModal);
	}, [setFolderModal]);

	const handleAddingFolder = () => {
		setAddFolderModal(true);
		setFolderModal(false);
	};

	return (
		<>
			<div className={`fixed flex flex-col justify-center items-start w-full h-full z-50 bg-[rgba(0,0,0,0)]`}>
				<div
					className={`folder-modal flex flex-col justify-start items-start px-5 sm:px-10 py-5 gap-10 w-fit h-full ${
						bodyBgColor
							? "bg-[#222] text-white shadow-[10px_0px_20px_0px_rgba(0,0,0,0.3)]"
							: "bg-white text-black shadow-[10px_0px_20px_0px_rgba(0,0,0,0.1)]"
					}`}
				>
					<div className="flex justify-center items-center gap-4 relative w-full">
						<h1 className="text-5xl font-base">Folders</h1>
						<div
							onClick={() => setFolderModal(false)}
							className="flex sm:hidden fixed top-10 right-0 bg-black w-10 h-10 rounded-l-lg z-50 btn justify-center items-center"
						>
							<Image src="/icons/simple-icons/folder_open.svg" alt="folder icon" width={25} height={25} />
						</div>
					</div>
					<div className="folder-modal-scroll flex flex-col justify-center items-center gap-3 overflow-y-scroll overflow-x-hidden w-full px-5">
						<div
							className={`btn w-full h-fit py-1 px-2 rounded-md text-center text-lg font-medium mb-10 ${
								bodyBgColor ? "bg-[#444] hover:bg-[#555]" : "bg-[#eee] hover:bg-[#ccc]"
							}`}
						>
							<p onClick={handleAddingFolder}>ADD FOLDER</p>
						</div>
						{/* TODO: **************** Map out the folder database here */}
						{folders.length > 0 ? (
							folders.map((folder, i) => {
								return (
									<FolderTodoList
										key={folder.id}
										disable={disable}
										setDisable={setDisable}
										setFolderBtnClicked={setFolderBtnClicked}
										deleteFolders={deleteFolders}
										addTodos={addTodos}
										setValue={setValue}
										setFolderModal={setFolderModal}
										folderClicked={folderClicked}
										setFolderClicked={setFolderClicked}
										folder={folder}
										bodyBgColor={bodyBgColor}
										filledCheckbox={filledCheckbox}
										disabledCheckbox={disabledCheckbox}
									/>
								);
							})
						) : (
							<>
								<div>Waiting on folders...</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

const FolderTodoList = ({
	disable,
	setDisable,
	setFolderBtnClicked,
	deleteFolders,
	addTodos,
	setValue,
	setFolderModal,
	folder,
	bodyBgColor,
	filledCheckbox,
	disabledCheckbox,
	folderClicked,
	setFolderClicked,
}) => {
	const handleChangingFolders = () => {
		setFolderClicked(folder.folderName);
		setValue(folder.folderName);
		setFolderModal(false);
		setFolderBtnClicked(true);
		setDisable(false);
	};

	return (
		<React.Fragment>
			<div
				className={`flex justify-between items-center border-2 gap-5 w-32 px-2 sm:w-52 sm:px-3 py-2 rounded-md text-lg ${
					bodyBgColor ? "bg-[#444]" : "bg-[#eee]"
				} ${folderClicked == folder.folderName && !disable ? "border-[#0E51FF]" : ""}`}
			>
				<div
					onClick={() => {
						handleChangingFolders();
					}}
					className={`flex justify-center items-center w-full btn text-center`}
				>
					<h1 title={folder.folderName} className="text-xl font-base line-clamp-1">
						{folder.folderName}
					</h1>
				</div>
				<div className="flex justify-center items-center gap-2 max-w-[20px] max-h-[20px]">
					<Image
						onClick={() => {
							deleteFolders(folder.id);
							setFolderBtnClicked(false);
							setDisable(true);
						}}
						className="btn"
						src={"/icons/simple-icons/Delete.svg"}
						alt=""
						width={20}
						height={20}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

const FolderIcons = ({ bodyBgColor }) => {
	const disabledCheckbox = (
		<svg className="btn" width="20" height="20" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.81825 2.18182L3.27279 5.09091L2.18188 4.00001"
				stroke={`${bodyBgColor ? "white" : "black"}`}
				strokeWidth="0.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="0.3"
				y="0.3"
				width="7.4"
				height="7.4"
				rx="1.7"
				stroke={`${bodyBgColor ? "white" : "black"}`}
				strokeWidth="0.6"
			/>
		</svg>
	);
	const filledCheckbox = (
		<svg width="20" height="20" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="8" height="8" rx="2" fill="#04DC00" />
			<path
				d="M5.81825 2.18182L3.27279 5.09091L2.18188 4.00001"
				stroke="white"
				strokeWidth="0.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	return { disabledCheckbox, filledCheckbox };
};

export default FolderSystem;
