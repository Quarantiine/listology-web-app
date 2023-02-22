import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImagePlaceholder from "../Loaders/ImagePlaceholder";
import ThemeSystem from "./ThemeSystem";
import GallerySystem from "./GallerySystem";
import SearchSystem from "./SearchSystem";

const MainHeroSection = () => {
	const [imageSizeChange, setImageSizeChange] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgFailed, setImgFailed] = useState(false);

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
					imageSizeChange ? "h-[700px]" : "h-[400px]"
				} flex flex-col justify-center items-center relative`}
			>
				{imgFailed && (
					<>
						<div className="absolute w-full h-full bg-gray-400 flex justify-center items-center">
							<p>IMAGE FAILED TO LOAD</p>
						</div>
					</>
				)}
				{imgLoaded && !imgFailed && <ImagePlaceholder removeAnimation={true} />}
				<Image
					className="object-cover object-center h-auto"
					src="/images/bg-images/img-bg-1.jpg"
					alt="hero bg"
					fill
					sizes="true"
					priority="true"
					quality={100}
					onLoadingComplete={() => setImgLoaded(true)}
					onError={() => setImgFailed(true)}
				/>
				<div
					className={`flex flex-col lg:flex-row justify-center lg:justify-evenly items-center absolute top-0 left-0 bg-gradient-to-l to-black from-transparent w-full h-full text-white`}
				>
					{/* TODO: Change the sizes of the logo and text after 2xl-width */}
					<div className="flex flex-col justify-center items-center px-10">
						<div className="flex flex-col justify-center items-center lg:items-start gap-6">
							<div className="flex flex-col justify-center items-center lg:items-start gap-1 text-center lg:text-start">
								<Image
									className="h-auto"
									src={"/icons/simple-icons/logo.svg"}
									alt="Logo Title"
									width={400}
									height={150}
								/>
								<p>MAKE YOUR TODO LIST THE SMARTER WAY</p>
							</div>
							<SearchSystem />
						</div>
					</div>
					<div className="flex justify-center items-center">
						<h1 className="relative top-20 lg:top-0 text-base sm:text-xl lg:text-6xl w-full sm:w-96 text-transparent bg-clip-text bg-gradient-to-l to-[#777] from-[#eee] text-center lg:text-end">
							WELCOME, DANIEL
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainHeroSection;
