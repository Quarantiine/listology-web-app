import React, { useContext } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const SearchSystem = ({}) => {
	const { seachQuery, setSeachQuery, searched, setSearched } = useContext(StatesManagerCtx);

	const handleEnter = (key) => {
		if (key === "Enter") {
			if (seachQuery.length > 0) {
				setSearched(true);
				setTimeout(() => {
					setSeachQuery(``);
					setSearched(false);
				}, 3000);
			}
		}
	};

	const handleSearch = () => {
		if (seachQuery.length > 0) {
			setSearched(true);
			setTimeout(() => {
				setSeachQuery(``);
				setSearched(false);
			}, 3000);
		}
	};

	return (
		<>
			<div
				className={`${
					searched ? "opacity-30 cursor-not-allowed select-none" : ""
				} relative w-full h-auto flex flex-col justify-center items-center lg:items-start`}
			>
				<Image
					className="absolute top-1/2 -translate-y-1/2 left-4 w-[20px] h-[20px] btn"
					src="/icons/simple-icons/search.svg"
					alt="search icon"
					width={20}
					height={20}
					onClick={(e) => {
						e.preventDefault();
						handleSearch();
					}}
				/>
				<input
					className={`pl-12 pr-1 py-2 border bg-transparent rounded-md w-full outline-none`}
					placeholder="Search todos and folders"
					autoComplete="off"
					type="search"
					name="search"
					value={seachQuery}
					onChange={(e) => setSeachQuery(e.target.value)}
					onKeyDown={(e) => handleEnter(e.key)}
					disabled={searched ? true : false}
				/>
			</div>
		</>
	);
};

export default SearchSystem;
