import Head from "next/head";
import React, { createContext, useState } from "react";
import FirebaseAPI from "./FirebaseAPI";

const StatesManagerCtx = createContext();
const Layout = ({ children }) => {
	const [bodyBgColor, setBodyBgColor] = useState(false);
	const [folderModal, setFolderModal] = useState(false);

	const {
		seachQuery,
		setSeachQuery,
		searched,
		setSearched,
		positionImage,
		setPositionImage,
		heroImgSrc,
		setHeroImgSrc,
		uploadedImage,
		setUploadedImage,
		uploadModal,
		setUploadModal,
		saved,
		setSaved,
	} = HeroSectionStates();

	const {
		folderClicked,
		setFolderClicked,
		layoutView,
		setLayoutView,
		checkFilterBtnClick,
		setCheckFilterBtnClick,
		filterModal,
		setFilterModal,
		allChecked,
		setAllChecked,
	} = FilterStates();

	const {
		checked,
		setChecked,
		addFolderModal,
		setAddFolderModal,
		folderName,
		setFolderName,
		todoTitle,
		setTodoTitle,
		description,
		setDescription,
	} = FoldersStates();

	const { addTodos, editTodos, deleteTodos, todoLists, folders, addFolders, deleteFolders, setValue } = FirebaseAPI();

	return (
		<StatesManagerCtx.Provider
			value={{
				setValue,
				folderName,
				setFolderName,
				todoTitle,
				setTodoTitle,
				description,
				setDescription,
				folderClicked,
				setFolderClicked,
				addFolders,
				deleteFolders,
				folders,
				addFolderModal,
				setAddFolderModal,
				editTodos,
				deleteTodos,
				todoLists,
				addTodos,
				bodyBgColor,
				setBodyBgColor,
				seachQuery,
				setSeachQuery,
				searched,
				setSearched,
				positionImage,
				setPositionImage,
				heroImgSrc,
				setHeroImgSrc,
				uploadModal,
				setUploadModal,
				uploadedImage,
				setUploadedImage,
				saved,
				setSaved,
				layoutView,
				setLayoutView,
				checkFilterBtnClick,
				setCheckFilterBtnClick,
				filterModal,
				setFilterModal,
				folderModal,
				setFolderModal,
				checked,
				setChecked,
				allChecked,
				setAllChecked,
			}}
		>
			<Head>
				<title>Listology</title>
				<meta name="description" content="Welcome to Listology, The Todo List Web Application" />
				<link rel="icon" href="/icons/simple-icons/icon-logo.svg" />
			</Head>
			<div
				className={`${
					bodyBgColor ? "bg-[#111]" : "bg-white"
				} transition duration-500 z-[-100] fixed top-0 left-0 w-full h-full`}
			></div>
			<div>{children}</div>
		</StatesManagerCtx.Provider>
	);
};
export { StatesManagerCtx };
export default Layout;

const HeroSectionStates = () => {
	const [seachQuery, setSeachQuery] = useState(``);
	const [searched, setSearched] = useState(false);
	const [positionImage, setPositionImage] = useState(false);
	const [heroImgSrc, setHeroImgSrc] = useState(``);
	const [uploadedImage, setUploadedImage] = useState(``);
	const [uploadModal, setUploadModal] = useState(false);
	const [saved, setSaved] = useState(false);

	return {
		seachQuery,
		setSeachQuery,
		searched,
		setSearched,
		positionImage,
		setPositionImage,
		heroImgSrc,
		setHeroImgSrc,
		uploadedImage,
		setUploadedImage,
		uploadModal,
		setUploadModal,
		saved,
		setSaved,
	};
};

const FilterStates = () => {
	const [checkFilterBtnClick, setCheckFilterBtnClick] = useState(``);
	const [layoutView, setLayoutView] = useState(`grid`);
	const [filterModal, setFilterModal] = useState(false);
	const [allChecked, setAllChecked] = useState(false);
	const [folderClicked, setFolderClicked] = useState(``);

	return {
		folderClicked,
		setFolderClicked,
		layoutView,
		setLayoutView,
		checkFilterBtnClick,
		setCheckFilterBtnClick,
		filterModal,
		setFilterModal,
		allChecked,
		setAllChecked,
	};
};

const FoldersStates = () => {
	const [checked, setChecked] = useState(false);
	const [addFolderModal, setAddFolderModal] = useState(false);
	const [folderName, setFolderName] = useState(``);
	const [todoTitle, setTodoTitle] = useState(``);
	const [description, setDescription] = useState(``);

	return {
		checked,
		setChecked,
		addFolderModal,
		setAddFolderModal,
		folderName,
		setFolderName,
		todoTitle,
		setTodoTitle,
		description,
		setDescription,
	};
};
