import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";

const GallerySystem = () => {
	const { positionImage, setPositionImage, setUploadModal } = useContext(StatesManagerCtx);
	const [galleryOpen, setGalleryOpen] = useState(false);

	useEffect(() => {
		const closeGallleryDropdown = (e) => {
			if (!e.target.closest(".gallery-dropdown")) {
				setGalleryOpen(false);
			}
		};

		document.addEventListener("mousedown", closeGallleryDropdown);
		return () => document.removeEventListener("mousedown", closeGallleryDropdown);
	}, [setGalleryOpen]);

	return (
		<>
			<div
				className={`z-10 w-fit h-fit px-4 sm:px-5 py-1.5 sm:py-3 gap-5 grid ${
					positionImage ? "" : "grid-cols-2"
				} justify-center items-center bg-white rounded-b-2xl sm:rounded-full absolute right-5 top-0 sm:bottom-4 sm:top-auto ${
					positionImage ? "opacity-70" : ""
				}`}
			>
				{!positionImage ? (
					<>
						<Image
							className={`btn ${positionImage ? "opacity-30" : ""}`}
							src="/icons/simple-icons/move-image.svg"
							alt="positioning picture btn"
							width={20}
							height={20}
							onClick={(e) => setPositionImage(!positionImage)}
						/>
						<Image
							className={`btn gallery-dropdown w-[20px] h-[20px] ${galleryOpen ? "opacity-30" : ""}`}
							src="/icons/simple-icons/change-picture.svg"
							alt="changing picture btn"
							width={20}
							height={20}
							onClick={(e) => setGalleryOpen(!galleryOpen)}
						/>
					</>
				) : (
					<div className="flex justify-center items-center gap-4 w-fit text-center">
						<button
							onClick={() => {
								setPositionImage(!positionImage);
							}}
							className="btn text-center bg-[#0E51FF] rounded-2xl px-3 text-white"
						>
							Save
						</button>
					</div>
				)}
				{galleryOpen && (
					<div className="gallery-dropdown flex flex-col justify-center items-center gap-0 w-full h-fit bg-white shadow-lg rounded-md absolute left-0 top-12 overflow-hidden">
						<p
							onClick={(e) => {
								setUploadModal(true);
							}}
							className="py-1 px-1 hover:bg-[#0E51FF] hover:text-white cursor-pointer transition-all w-full text-center"
						>
							Upload
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default GallerySystem;
