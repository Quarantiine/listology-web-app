import React, { useContext, useEffect, useRef, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const SearchSystem = ({}) => {
	const { seachQuery, setSeachQuery, searched, setSearched, todoLists } = useContext(StatesManagerCtx);
	const inputSearch = useRef();
	const [openSearchDropdown, setOpenSearchDropdown] = useState(false);

	useEffect(() => {
		const closeSearchDropdown = (e) => {
			if (!e.target.closest(".search-dropdown")) {
				setOpenSearchDropdown(false);
			}
		};

		document.addEventListener("mousedown", closeSearchDropdown);
		return () => document.removeEventListener("mousedown", closeSearchDropdown);
	});

	const handleEnter = (key) => {
		if (key === "Enter") {
			if (seachQuery.length > 0) {
				setSearched(true);
				inputSearch.current.blur();
				window.scrollTo(0, 650);
			}
		}
	};

	const handleSearch = () => {
		if (seachQuery.length > 0) {
			setSearched(true);
			inputSearch.current.blur();
			window.scrollTo(0, 650);
		}
	};

	const clearingSearch = () => {
		setSeachQuery(``);
		setSearched(false);
		setOpenSearchDropdown(true);
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
					ref={inputSearch}
					className={`pl-12 pr-1 py-2 border bg-transparent rounded-md w-full outline-none`}
					placeholder="Search todos and folders"
					autoComplete="off"
					type="search"
					name="search"
					value={seachQuery}
					onFocus={clearingSearch}
					onChange={(e) => setSeachQuery(e.target.value)}
					onKeyDown={(e) => handleEnter(e.key)}
				/>

				{openSearchDropdown && !searched && (
					<div className="search-dropdown flex flex-col gap-3 absolute top-12 left-0 w-full h-[100px] p-3 text-black bg-white shadow-md rounded-md overflow-y-scroll overflow-x-hidden z-10">
						<h1 className="text-base font-bold">Most Recent Todos</h1>
						{todoLists.map((todolist) => {
							if (
								todolist.todo
									.normalize("NFD")
									.replace(/\p{Diacritic}/gu, "")
									.toLowerCase()
									.includes(seachQuery.toLowerCase())
							) {
								return (
									<React.Fragment key={todolist.id}>
										<p
											onClick={() => {
												setSeachQuery(todolist.todo);
											}}
											className="btn text-sm"
										>
											{todolist.todo}
										</p>
									</React.Fragment>
								);
							}
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default SearchSystem;
