import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ImagePlaceholder from "../Loaders/ImagePlaceholder";
import ThemeSystem from "./ThemeSystem";
import GallerySystem from "./GallerySystem";
import SearchSystem from "./SearchSystem";
import { StatesManagerCtx } from "../Layout";

const MainHeroSection = () => {
	const { positionImage, heroImgSrc } = useContext(StatesManagerCtx);

	const [imageSizeChange, setImageSizeChange] = useState(false);
	const [imgFailed, setImgFailed] = useState(false);

	const [topArrow, setTopArrow] = useState(0);
	const [rightArrow, setRightArrow] = useState(0);

	useEffect(() => {
		const imagesSizeChanges = () => {
			window.innerWidth > 1550 ? setImageSizeChange(true) : setImageSizeChange(false);
		};

		window.addEventListener("resize", imagesSizeChanges);
		return () => window.removeEventListener("resize", imagesSizeChanges);
	}, [setImageSizeChange]);

	return (
		<div className="relative w-full h-full">
			<ThemeSystem />
			<GallerySystem />
			<div
				className={`w-full ${
					imageSizeChange ? "h-[550px]" : "h-[400px]"
				} flex flex-col justify-center items-center relative overflow-hidden`}
			>
				{imgFailed && (
					<>
						<div className="absolute w-full h-full bg-gray-400 flex justify-center items-center">
							<p>IMAGE FAILED TO LOAD</p>
						</div>
					</>
				)}
				{heroImgSrc && <ImagePlaceholder removeAnimation={true} />}
				<Image
					className={`object-cover w-full h-[300%] transition-all duration-150`}
					style={{
						transform: `translate(${rightArrow}px, ${topArrow}px)`,
					}}
					src={heroImgSrc ? URL.createObjectURL(heroImgSrc) : `/images/bg-images/img-bg-1.jpg`}
					alt="hero bg"
					width={1000}
					height={1000}
					priority={true}
					quality={100}
					onError={() => setImgFailed(true)}
				/>
				{positionImage && (
					<div className="flex justify-between items-center gap-2 absolute w-full h-full bg-transparent px-5 opacity-50">
						{/* <Image
							src="/icons/simple-icons/dropdown-btn.svg"
							className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 sm:p-2 border-4 btn text-center -rotate-90"
							alt="arrow"
							width={10}
							height={10}
							onClick={(e) => setRightArrow(rightArrow + 50)}
						/> */}
						<div className="mx-auto flex flex-col justify-evenly sm:justify-between items-center gap-32 h-full py-5">
							<Image
								src="/icons/simple-icons/dropdown-btn.svg"
								className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 sm:p-2 border-4 btn text-center"
								alt="arrow"
								width={10}
								height={10}
								onClick={(e) => setTopArrow(topArrow + 50)}
							/>
							<Image
								src="/icons/simple-icons/dropdown-btn.svg"
								className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 sm:p-2 border-4 btn text-center rotate-180"
								alt="arrow"
								width={10}
								height={10}
								onClick={(e) => setTopArrow(topArrow - 50)}
							/>
						</div>
						{/* <Image
							src="/icons/simple-icons/dropdown-btn.svg"
							className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 sm:p-2 border-4 btn text-center rotate-90"
							alt="arrow"
							width={10}
							height={10}
							onClick={(e) => setRightArrow(rightArrow - 50)}
						/> */}
					</div>
				)}
				{!positionImage && (
					<div
						className={`flex flex-col lg:flex-row justify-center lg:justify-evenly items-center absolute top-0 left-0 bg-gradient-to-l to-black from-transparent w-full h-full text-white`}
					>
						{/* TODO: Change the sizes of the logo and text after 2xl-width */}
						<div className="flex flex-col justify-center items-center px-10">
							<div className="flex flex-col justify-center items-center lg:items-start gap-6">
								<div className="flex flex-col justify-center items-center lg:items-start gap-1 text-center lg:text-start">
									<Image
										className="w-auto h-[70px]"
										src={"/icons/simple-icons/logo.svg"}
										alt="Logo Title"
										width={400}
										height={50}
									/>
									<p>MAKE YOUR TODO LIST THE SMARTER WAY</p>
								</div>
								<SearchSystem />
							</div>
						</div>
						<div className="flex justify-center items-center">
							<h1 className="relative top-16 lg:top-0 text-base sm:text-xl lg:text-6xl w-full sm:w-96 text-transparent bg-clip-text bg-gradient-to-l to-[white] from-[#eee] text-center lg:text-start">
								WELCOME, USER
							</h1>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainHeroSection;
