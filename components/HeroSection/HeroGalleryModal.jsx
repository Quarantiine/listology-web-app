import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import heroImages from "../../database/hero-images.json";
import solidImages from "../../database/solid-colors.json";
import ImagePlaceholder from "../Loaders/ImagePlaceholder";

const HeroGalleryModal = () => {
	const { setOpenGalleryModal, setHeroImgSrc, setPositionImage } = useContext(StatesManagerCtx);
	const [galleryImages, setGalleryImages] = useState();

	useEffect(() => {
		fetch("https://picsum.photos/v2/list?page=2&limit=200")
			.then((res) => res.json())
			.then((json) => {
				setGalleryImages(json);
			});
	}, []);
	console.log(galleryImages?.slice(0, 10)?.map((img) => img.url));

	useEffect(() => {
		const closeGalleryModal = (e) => {
			if (!e.target.closest(".hero-gallery-modal")) {
				setOpenGalleryModal(false);
			}
		};

		document.addEventListener("mousedown", closeGalleryModal);
		return () => document.removeEventListener("mousedown", closeGalleryModal);
	}, [setOpenGalleryModal]);

	return (
		<>
			<div
				className={`bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center backdrop-blur-md fixed w-full h-full z-50`}
			>
				<div className="hero-gallery-modal relative w-full sm:w-[80%] h-full sm:h-[80%] bg-white rounded-xl">
					<Image
						className={`ml-auto absolute top-10 sm:-top-10 right-10 sm:right-0 bg-black p-1 rounded-full btn`}
						src="/icons/simple-icons/close.svg"
						alt="close btn"
						width={30}
						height={30}
						onClick={(e) => {
							setOpenGalleryModal(false);
						}}
					/>
					<div className="mx-auto w-full sm:w-fit h-[95%] flex flex-wrap justify-center items-start gap-4 p-5 overflow-y-scroll overflow-x-hidden">
						{galleryImages?.slice(0, 10)?.map((img, i) => {
							return (
								<React.Fragment key={i}>
									<Image src={img.url} alt={`img ${i + 1}`} width={200} height={200} />
								</React.Fragment>
							);
						})}

						{/* {galleryImages.slice(0, 10)?.map((imgs, i) => (
							<HeroBgImages
								key={i}
								i={i}
								imgs={imgs.url}
								setOpenGalleryModal={setOpenGalleryModal}
								setHeroImgSrc={setHeroImgSrc}
								setPositionImage={setPositionImage}
							/>
						))} */}
						{/* {solidImages.map((imgs, i) => (
							<SolidBgImages
								key={i}
								i={i}
								imgs={imgs}
								setOpenGalleryModal={setOpenGalleryModal}
								setHeroImgSrc={setHeroImgSrc}
								setPositionImage={setPositionImage}
							/>
						))} */}
					</div>
				</div>
			</div>
		</>
	);
};

const HeroBgImages = ({ imgs, i, setOpenGalleryModal, setHeroImgSrc, setPositionImage }) => {
	const [loaded, setLoaded] = useState(false);
	return (
		<>
			<button
				className="btn relative"
				onClick={(e) => {
					setOpenGalleryModal(false);
				}}
			>
				{!loaded && <ImagePlaceholder removeAnimation={true} />}
				<Image
					className={`w-auto h-auto`}
					onClick={() => {
						setHeroImgSrc(imgs.image);
						setPositionImage(true);
					}}
					src={`${imgs.image}`}
					alt={`img ${i}`}
					sizes="(max-width: 1200px) 30vw"
					width={200}
					height={150}
					onLoad={() => setLoaded(true)}
				/>
			</button>
		</>
	);
};

const SolidBgImages = ({ imgs, i, setOpenGalleryModal, setHeroImgSrc, setPositionImage }) => {
	const [loaded, setLoaded] = useState(false);
	return (
		<>
			<button
				className="btn relative"
				onClick={(e) => {
					setOpenGalleryModal(false);
				}}
			>
				{!loaded && <ImagePlaceholder removeAnimation={true} />}
				<Image
					className={`w-auto h-auto`}
					onClick={() => {
						setHeroImgSrc(imgs.solidImg);
						setPositionImage(true);
					}}
					src={`${imgs.solidImg}`}
					alt={`img ${i}`}
					sizes="(max-width: 1200px) 30vw"
					width={200}
					height={150}
					onLoad={() => setLoaded(true)}
				/>
			</button>
		</>
	);
};

export default HeroGalleryModal;
