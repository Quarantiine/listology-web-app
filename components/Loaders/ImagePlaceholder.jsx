import React from "react";

export default function ImagePlaceholder({ removeAnimation }) {
	return (
		<>
			<div
				className={`flex justify-center items-center flex-col w-full h-full absolute top-0 left-0 bg-black ${
					removeAnimation ? "" : "animate-pulse"
				}`}
			>
				<div className="border-4 rounded-full w-12 h-12 mx-auto animate-spin border-t-transparent"></div>
			</div>
		</>
	);
}
