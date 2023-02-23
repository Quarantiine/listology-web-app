import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import FirebaseAPI from "../FirebaseAPI";

const UploadModal = () => {
	const { uploadedImage, setUploadedImage, setUploadModal, setHeroImgSrc, saved, setSaved } =
		useContext(StatesManagerCtx);
	const { saveBgImg } = FirebaseAPI();

	const handleSave = useCallback(() => {
		if (uploadedImage) {
			setSaved(true);
			setUploadModal(false);
			setHeroImgSrc(uploadedImage);
			saveBgImg(uploadedImage);
			setTimeout(() => {
				setSaved(false);
			}, 3000);
		}
	}, [setHeroImgSrc, uploadedImage, setUploadModal, setUploadedImage]);

	useEffect(() => {
		const closeUploadModal = (e) => {
			if (!e.target.closest(".upload-modal-container")) {
				setUploadModal(false);
			}
		};

		document.addEventListener("mousedown", closeUploadModal);
		return () => document.removeEventListener("mousedown", closeUploadModal);
	}, [setUploadModal]);

	return (
		<>
			<div className="absolute z-50 flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] backdrop-blur-lg">
				<div className="upload-modal-container relative w-full sm:w-[500px] h-full sm:h-[500px] sm:rounded-lg bg-white flex flex-col gap-4 justify-center items-center">
					<>
						<input
							onChange={(e) => setUploadedImage(e.target?.files[0])}
							className="btn w-[100px]"
							type="file"
							name="file"
						/>
						{uploadedImage ? (
							<Image
								src={URL.createObjectURL(uploadedImage)}
								className={"object-cover max-w-[320px] max-h-[320px] w-auto h-auto rounded-md"}
								alt="uploaded img"
								width={320}
								height={320}
							/>
						) : (
							<>
								<div className={`bg-gray-500 rounded-md flex justify-center items-center w-80 h-80`}>
									<p className="text-xl text-white">IMAGE</p>
								</div>
							</>
						)}
						<div className="flex justify-center items-center gap-4">
							<input
								onClick={() => handleSave()}
								className={`${
									uploadedImage ? "base-bg btn" : "bg-gray-400 cursor-not-allowed"
								} w-24 py-2 rounded-md text-white`}
								type="submit"
								value="Save"
								disabled={uploadedImage ? false : true}
							/>
						</div>
					</>
					<Image
						className={`ml-auto absolute top-10 sm:-top-10 right-10 sm:right-0 bg-black p-1 rounded-full btn`}
						src="/icons/simple-icons/close.svg"
						alt="close btn"
						width={30}
						height={30}
						onClick={(e) => {
							setUploadModal(false);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default UploadModal;
