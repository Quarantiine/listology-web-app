import Head from "next/head";
import React, { createContext, useState } from "react";

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
		layoutView,
		setLayoutView,
		checkFilterBtnClick,
		setCheckFilterBtnClick,
		filterModal,
		setFilterModal,
		allChecked,
		setAllChecked,
	} = FilterStates();

	const { checked, setChecked } = FoldersStates();

	return (
		<StatesManagerCtx.Provider
			value={{
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

	return {
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

	return { checked, setChecked };
};
