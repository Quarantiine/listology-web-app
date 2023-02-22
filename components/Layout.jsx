import React, { createContext, useState } from "react";

const StatesManagerCtx = createContext();
const Layout = ({ children }) => {
	const [bodyBgColor, setBodyBgColor] = useState(false);
	const [seachQuery, setSeachQuery] = useState(``);
	const [searched, setSearched] = useState(false);
	const [positionImage, setPositionImage] = useState(false);
	const [openGalleryModal, setOpenGalleryModal] = useState(false);
	const [heroImgSrc, setHeroImgSrc] = useState(``);

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
				openGalleryModal,
				setOpenGalleryModal,
				heroImgSrc,
				setHeroImgSrc,
			}}
		>
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
