import Image from "next/image";
import React, { useContext } from "react";
import { StatesManagerCtx } from "../Layout";

const ThemeSystem = () => {
	const { bodyBgColor, setBodyBgColor } = useContext(StatesManagerCtx);

	return (
		<>
			<div
				className={`grid grid-cols-2 justify-center items-center w-16 overflow-hidden rounded-b-2xl fixed right-5 top-0 z-10`}
			>
				<div
					onClick={() => {
						setBodyBgColor(!bodyBgColor);
					}}
					className={`select-none w-full bg-white flex justify-center items-center p-2 btn ${
						bodyBgColor ? "" : "opacity-60"
					}`}
				>
					<Image
						className="h-auto"
						src={`/icons/simple-icons/${bodyBgColor ? "light-mode-filled" : "light-mode"}.svg`}
						alt="light mode btn"
						width={20}
						height={20}
					/>
				</div>
				<div
					onClick={() => {
						setBodyBgColor(!bodyBgColor);
					}}
					className={`select-none bg-[#222] flex justify-center items-center p-2 btn ${
						bodyBgColor ? "opacity-60" : ""
					}`}
				>
					<Image
						className="h-auto"
						src={`/icons/simple-icons/${bodyBgColor ? "night-mode" : "night-mode-filled"}.svg`}
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
