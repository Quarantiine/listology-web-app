import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { StatesManagerCtx } from "../Layout";

const ThemeSystem = () => {
	const { positionImage, themeMode, changeTheme } = useContext(StatesManagerCtx);

	return (
		<>
			<div
				className={`grid grid-cols-2 justify-center items-center w-16 overflow-hidden rounded-b-2xl fixed ${
					positionImage ? "right-48" : "right-32"
				} sm:right-5 top-0 z-50`}
			>
				<div
					onClick={() => {
						changeTheme(false, themeMode[0].id);
					}}
					className={`select-none w-full bg-white flex justify-center items-center p-2 btn ${
						themeMode[0]?.mode ? "" : "opacity-60"
					}`}
				>
					<Image
						className="h-auto"
						src={`/icons/simple-icons/${themeMode[0]?.mode ? "light-mode-filled" : "light-mode"}.svg`}
						alt="light mode btn"
						width={20}
						height={20}
					/>
				</div>
				<div
					onClick={() => {
						changeTheme(true, themeMode[0].id);
					}}
					className={`select-none bg-[#222] flex justify-center items-center p-2 btn ${
						themeMode[0]?.mode ? "opacity-60" : ""
					}`}
				>
					<Image
						className="h-auto"
						src={`/icons/simple-icons/${themeMode[0]?.mode ? "night-mode" : "night-mode-filled"}.svg`}
						alt="dark mode btn"
						width={20}
						height={20}
					/>
				</div>
			</div>
		</>
	);
};

export default ThemeSystem;
