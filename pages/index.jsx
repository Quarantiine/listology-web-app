import Head from "next/head";
import MainHeroSection from "../components/HeroSection/MainHeroSection";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StatesManagerCtx } from "@/components/Layout";
import UploadModal from "@/components/HeroSection/UploadModal";
import FilterBar from "@/components/FilterBar/FilterBar";
import FilterModal from "@/components/FilterBar/FilterModal";
import FolderSystem from "@/components/FolderSidebar/FolderSystem";
import Image from "next/image";
import MainTodoList from "@/components/TodoList/MainTodoList";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FolderModal from "@/components/FolderSidebar/FolderModal";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const {
		edit,
		editModeActive,
		folderBtnClicked,
		uploadModal,
		filterModal,
		folderModal,
		setFolderModal,
		addFolderModal,
		folders,
		folderClicked,
	} = useContext(StatesManagerCtx);
	const mainTodoListRef = useRef();

	useEffect(() => {
		const handleOpenFolderWithKey = (e) => {
			if (e === "f" && !uploadModal && !addFolderModal && !edit && !editModeActive) {
				setFolderModal(!folderModal);
			} else {
				setFolderModal(false);
			}
		};

		document.addEventListener("keydown", (e) => {
			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				handleOpenFolderWithKey(e.key);
			}, 100);
		});
		return document.removeEventListener("keydown", (e) => handleOpenFolderWithKey(e.key));
	}, [setFolderModal, folderModal, addFolderModal, uploadModal, edit, editModeActive]);

	const tailwindGSAP = "opacity-0";
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (!folderModal) {
				gsap.timeline().to(".folder-icon", {
					scrollTrigger: {
						scrub: true,
						// markers: true,
						trigger: ".main-content-section",
						start: "top 60%",
						end: "top 60%",
					},
					opacity: 1,
				});
			}
		});

		return () => ctx.revert();
	});

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<>
				{/* MODAL COMPONTENTS */}
				{uploadModal && <UploadModal />}
				{filterModal && <FilterModal />}
				{addFolderModal && <FolderModal />}
			</>
			<>
				{/* FOLDER SYSTEM */}
				{folderModal ? (
					<FolderSystem folders={folders} />
				) : (
					<>
						<div
							onClick={() => setFolderModal(true)}
							className={`folder-icon ${tailwindGSAP} fixed top-10 sm:top-1/2 left-0 bg-black w-10 h-10 rounded-r-lg z-50 btn flex justify-center items-center`}
						>
							<Image src="/icons/simple-icons/folder.svg" alt="folder icon" width={25} height={25} />
						</div>
					</>
				)}
			</>
			<MainHeroSection />
			<main className="main-content-section relative flex flex-col justify-center items-center gap-16 my-32 mx-auto w-[90%] sm:w-[70%] 2xl:w-[1200px]">
				<FilterBar />
				{/* {<MainTodoList />} */}
				<div ref={mainTodoListRef} className="w-full h-fit flex justify-center items-center">
					{folders.length > 0 && folderBtnClicked && mainTodoListRef.current?.childNodes.length > 0 ? (
						folders.map((folder, i) => {
							if (folder.folderName === folderClicked) {
								return <MainTodoList key={folder.id} folder={folder} />;
							}
						})
					) : (
						<>
							<h1
								onClick={() => setFolderModal(true)}
								className="text-xl text-white btn font-semibold base-bg px-4 py-1 rounded-md"
							>
								{folders.length > 0 ? "Click A Folder" : "Add A Folder"}
							</h1>
						</>
					)}
				</div>
			</main>
		</>
	);
}
