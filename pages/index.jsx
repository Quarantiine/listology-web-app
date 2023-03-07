import Head from "next/head";
import MainHeroSection from "../components/HeroSection/MainHeroSection";
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
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
		folderBtnClicked,
		uploadModal,
		filterModal,
		folderModal,
		setFolderModal,
		addFolderModal,
		folders,
		addTodos,
		folderClicked,
		themeMode,
	} = useContext(StatesManagerCtx);
	const mainTodoListRef = useRef();
	const [docLoaded, setDocLoaded] = useState(false);

	useEffect(() => {
		document.readyState ? setDocLoaded(true) : setDocLoaded(false);
	}, [setDocLoaded]);

	const tailwindGSAP = "opacity-0";
	const addBtnTailwind = "opacity-0";
	useEffect(() => {
		const ctx = gsap.context(() => {
			if (!folderModal && folders.length > 0) {
				const folderLine = gsap.timeline();
				const addBtnLine = gsap.timeline();
				folderLine.to(".folder-icon", {
					scrollTrigger: {
						scrub: true,
						// markers: true,
						trigger: ".main-content-section",
						start: "top 60%",
						end: "top 60%",
					},
					opacity: 1,
				});

				addBtnLine.to(".add-btn", {
					scrollTrigger: {
						scrub: true,
						// markers: true,
						trigger: ".filter-bar",
						start: "55% top",
						end: "bottom top",
					},
					opacity: 1,
				});
			}
		});

		return () => ctx.revert();
	}, [folderModal]);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			{!docLoaded && (
				<div
					className={`fixed top-0 left-0 z-[9999] bg-[rgba(0,0,0,0.7)] backdrop-blur-md w-full h-full flex justify-center items-center`}
				>
					<div className="border-4 w-20 h-20 border-t-transparent rounded-full animate-spin" />
				</div>
			)}
			<>
				{/* MODAL COMPONTENTS */}
				{uploadModal && <UploadModal />}
				{filterModal && <FilterModal />}
				{addFolderModal && <FolderModal />}
			</>
			<div
				className={`${addBtnTailwind} flex justify-center items-center add-btn fixed top-10 right-0 ${
					themeMode[0]?.mode ? "bg-black" : "bg-white border sm:border-none"
				} sm:bg-transparent rounded-l-lg sm:rounded-none px-2 py-1 sm:px-0 sm:left-10 z-40 w-fit`}
			>
				<button
					onClick={() => {
						addTodos(folderClicked, false);
					}}
				>
					<svg
						className="relative btn"
						width="25"
						height="31"
						viewBox="0 0 31 31"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M29.333 15.1665C29.333 7.34541 22.9876 1 15.1665 1C7.34541 1 1 7.34541 1 15.1665C1 22.9876 7.34541 29.333 15.1665 29.333C22.9876 29.333 29.333 22.9876 29.333 15.1665Z"
							stroke={themeMode[0]?.mode ? `white` : `black`}
							strokeWidth="2"
							strokeMiterlimit="10"
						/>
						<path
							d="M15.1665 9.26376V21.0692"
							stroke={themeMode[0]?.mode ? `white` : `black`}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M21.069 15.1665H9.26355"
							stroke={themeMode[0]?.mode ? `white` : `black`}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
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
			<main className="main-content-section relative flex flex-col justify-center items-center gap-16 my-32 mx-auto w-[90%] lg:w-[800px] 2xl:w-[1200px]">
				{folders.length > 0 && <FilterBar />}
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
