import Head from "next/head";
import React, { createContext, useState } from "react";

const StatesManagerCtx = createContext();
const Layout = ({ children }) => {
	const {
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
		uploadedImage,
		setUploadedImage,
		uploadModal,
		setUploadModal,
	} = HeroSectionStates();

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
	const [bodyBgColor, setBodyBgColor] = useState(false);
	const [seachQuery, setSeachQuery] = useState(``);
	const [searched, setSearched] = useState(false);
	const [positionImage, setPositionImage] = useState(false);
	const [heroImgSrc, setHeroImgSrc] = useState(``);
	const [uploadedImage, setUploadedImage] = useState(``);
	const [uploadModal, setUploadModal] = useState(false);

	return {
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
		uploadedImage,
		setUploadedImage,
		uploadModal,
		setUploadModal,
	};
};
