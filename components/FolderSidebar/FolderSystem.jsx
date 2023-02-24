import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const FolderSystem = () => {
	const { bodyBgColor, folderModal, setFolderModal } = useContext(StatesManagerCtx);
	const { disabledCheckbox, filledCheckbox } = FolderIcons({ bodyBgColor });
	const todoList = [
		{
			title: "Folder 1",
			todosNames: [
				{ text: "Lorem ipsum" },
				{ text: "Lorem ipsum" },
				{ text: "Lorem ipsum" },
				{ text: "Lorem ipsum" },
				{ text: "Lorem ipsum" },
			],
		},
		{
			title: "Folder 2",
			todosNames: [{ text: "Lorem ipsum" }, { text: "Lorem ipsum" }, { text: "Lorem ipsum" }],
		},
	];
	const [check, setCheck] = useState(false);

	useEffect(() => {
		const closeFolderModal = (e) => {
			if (!e.target.closest(".folder-modal")) {
				setFolderModal(false);
			}
		};

		document.addEventListener("mousedown", closeFolderModal);
		return () => document.removeEventListener("mousedown", closeFolderModal);
	}, [setFolderModal]);

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
					<div className="flex justify-center items-center gap-4 relative">
						<h1 className="text-5xl font-base">Folders</h1>
						<div
							onClick={() => setFolderModal(false)}
							className="flex sm:hidden fixed top-10 right-0 bg-black w-10 h-10 rounded-l-lg z-50 btn justify-center items-center"
						>
							<Image src="/icons/simple-icons/folder_open.svg" alt="folder icon" width={25} height={25} />
						</div>
					</div>
					<div className="folder-modal-scroll flex flex-col justify-start items-start gap-10 overflow-y-scroll overflow-x-hidden w-full px-5">
						{todoList.map((list, i) => (
							<React.Fragment key={i}>
								<div className="flex flex-col justify-start items-start gap-2">
									<h1 className="text-xl font-medium">{list.title}</h1>
									<div className="flex flex-col justify-start items-start gap-2">
										{list.todosNames.map((todos, i) => (
											<React.Fragment key={i}>
												<div
													className={`flex justify-center items-center gap-5 cursor-pointer ${
														bodyBgColor ? "bg-[#444] hover:bg-[#555]" : "bg-[#eee] hover:bg-[#ccc]"
													} px-6 py-2 rounded-md text-lg`}
												>
													<p className="line-clamp-1">{todos.text}</p>
													<div className="flex justify-center items-center gap-2">
														<button onClick={() => setCheck(!check)}>
															{check ? filledCheckbox : disabledCheckbox}
														</button>
														<Image
															className="btn"
															src={"/icons/simple-icons/Delete.svg"}
															alt=""
															width={20}
															height={20}
														/>
													</div>
												</div>
											</React.Fragment>
										))}
									</div>
								</div>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
		</>
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
