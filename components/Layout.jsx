import Head from "next/head";
import React, { createContext, useState } from "react";
import FirebaseAPI from "./FirebaseAPI";

const StatesManagerCtx = createContext();
const Layout = ({ children }) => {
	const [folderModal, setFolderModal] = useState(false);

	const {
		themeMode,
		addTheme,
		changeTheme,
		heroImages,
		addingHeroImage,
		changingHeroImage,
		addTodos,
		editTodos,
		editCheckmark,
		deleteTodos,
		todoLists,
		folders,
		addFolders,
		completedTodos,
		activeTodos,
		favoritesTodos,
		editCompletion,
		editFolders,
		deleteFolders,
		setValue,
	} = FirebaseAPI();

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
		emoji,
		setEmoji,
		editDescription,
		setEditDscription,
		editTodoListTitle,
		setEditTodoListTitle,
		checkmark,
		setCheckmark,
		disable,
		setDisable,
		folderBtnClicked,
		setFolderBtnClicked,
		checked,
		setChecked,
		addFolderModal,
		setAddFolderModal,
		folderName,
		setFolderName,
	} = FoldersStates();

	const { editModeActive, setEditModeActive } = EditingStates();

	return (
		<StatesManagerCtx.Provider
			value={{
				themeMode,
				addTheme,
				changeTheme,
				heroImages,
				addingHeroImage,
				changingHeroImage,
				editModeActive,
				setEditModeActive,
				emoji,
				setEmoji,
				editDescription,
				setEditDscription,
				editTodoListTitle,
				setEditTodoListTitle,
				checkmark,
				setCheckmark,
				disable,
				setDisable,
				folderBtnClicked,
				setFolderBtnClicked,
				setValue,
				folderName,
				setFolderName,
				folderClicked,
				setFolderClicked,
				addFolders,
				editCheckmark,
				editFolders,
				deleteFolders,
				folders,
				addFolderModal,
				setAddFolderModal,
				completedTodos,
				activeTodos,
				favoritesTodos,
				editCompletion,
				editTodos,
				deleteTodos,
				todoLists,
				addTodos,
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
					themeMode[0]?.mode ? "bg-[#111]" : "bg-white"
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
	const [checkFilterBtnClick, setCheckFilterBtnClick] = useState(`all`);
	const [layoutView, setLayoutView] = useState(`list`);
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
	const [checkmark, setCheckmark] = useState(false);
	const [addFolderModal, setAddFolderModal] = useState(false);
	const [folderName, setFolderName] = useState(``);
	const [editTodoListTitle, setEditTodoListTitle] = useState(``);
	const [editDescription, setEditDscription] = useState(``);
	const [emoji, setEmoji] = useState(``);
	const [folderBtnClicked, setFolderBtnClicked] = useState(false);
	const [disable, setDisable] = useState(false);

	return {
		emoji,
		setEmoji,
		editDescription,
		setEditDscription,
		editTodoListTitle,
		setEditTodoListTitle,
		checkmark,
		setCheckmark,
		disable,
		setDisable,
		checked,
		setChecked,
		addFolderModal,
		setAddFolderModal,
		folderName,
		setFolderName,
		folderBtnClicked,
		setFolderBtnClicked,
	};
};

const EditingStates = () => {
	const [editModeActive, setEditModeActive] = useState(false);

	return { editModeActive, setEditModeActive };
};
