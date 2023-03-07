import React, { useContext, useEffect } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const GalleryModal = () => {
	const { setOpenGalleryModal, heroImages, changingHeroImage, heroImgSrc, setHeroImgSrc } =
		useContext(StatesManagerCtx);

	useEffect(() => {
		const closeGalleryModal = (e) => {
			if (!e.target.closest(".gallery-modal")) {
				setOpenGalleryModal(false);
			}
		};

		document.addEventListener("mousedown", closeGalleryModal);
		return () => document.removeEventListener("mousedown", closeGalleryModal);
	}, [setOpenGalleryModal]);

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] backdrop-blur-lg z-50 flex justify-center items-center">
				<div className="gallery-modal bg-white w-[80%] h-[80%] rounded-md relative p-10 sm:p-5">
					<>
						<Image
							className={`ml-auto absolute top-5 sm:-top-10 right-5 sm:right-0 bg-black p-1 rounded-full btn`}
							src="/icons/simple-icons/close.svg"
							alt="close btn"
							width={30}
							height={30}
							onClick={() => {
								setOpenGalleryModal(false);
							}}
						/>
					</>
					<div className="gallery-images-overflow relative w-full h-full grid grid-cols-3 justify-center items-center gap-5 overflow-y-scroll overflow-x-hidden">
						{heroImages &&
							heroImages.map((images, i) => {
								return (
									<React.Fragment key={images.id}>
										<Image
											className="object-cover object-center w-auto btn rounded-md"
											onClick={() => {
												changingHeroImage(images.image, images.id);
											}}
											src={images.image}
											alt={`img ${i + 1}`}
											width={250}
											height={250}
										/>
									</React.Fragment>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
};

export default GalleryModal;
