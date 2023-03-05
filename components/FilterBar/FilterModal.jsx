import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";
import Image from "next/image";

const FilterModal = () => {
	const { checkFilterBtnClick, setCheckFilterBtnClick, filterModal, setFilterModal } = useContext(StatesManagerCtx);

	useEffect(() => {
		const closeFilterModal = (e) => {
			if (!e.target.closest(".filter-modal")) {
				setFilterModal(false);
			}
		};

		document.addEventListener(`mousedown`, closeFilterModal);
		return () => document.removeEventListener(`mousedown`, closeFilterModal);
	}, [setFilterModal]);

	const todoList = [
		{ selection: "completed" },
		{ selection: "active" },
		{ selection: "label" },
		{ selection: "favorites" },
	];

	const labels = [{ label: "School" }, { label: "Homework" }, { label: "Life Lessons" }, { label: "Misc" }];

	return (
		<>
			<div className="bg-[rgba(0,0,0,0.8)] backdrop-blur-lg w-full h-full fixed z-50 flex justify-center items-center">
				<div className="filter-modal mx-auto w-full sm:w-fit h-full sm:h-fit bg-white sm:rounded-lg relative p-10 transition-all duration-300">
					<Image
						className={`ml-auto absolute top-10 sm:-top-10 right-10 sm:right-0 bg-black p-1 rounded-full btn`}
						src="/icons/simple-icons/close.svg"
						alt="close btn"
						width={30}
						height={30}
						onClick={() => {
							setFilterModal(false);
						}}
					/>
					<>
						{checkFilterBtnClick === "select" ? (
							<>
								<h1 className="text-4xl mb-5">Select:</h1>
								{todoList.map((selections, i) => (
									<div key={i} className="w-full h-fit rounded-md overflow-x-hidden overscroll-y-scroll">
										<SelectionContainer selections={selections} />
									</div>
								))}
							</>
						) : (
							<>
								<h1 className="text-4xl mb-5">Labels:</h1>
								{labels.map((labels, i) => (
									<div key={i} className="w-full h-fit rounded-md overflow-x-hidden overscroll-y-scroll">
										<LabelsContainer labels={labels} />
									</div>
								))}
							</>
						)}
					</>
				</div>
			</div>
		</>
	);
};

const SelectionContainer = ({ selections }) => {
	const [checkedBox, setCheckedBox] = useState(false);
	return (
		<>
			<div className="w-fit h-fit gap-2 flex justify-center items-center">
				{!checkedBox ? (
					<Image
						onClick={() => setCheckedBox(!checkedBox)}
						className="btn"
						src="/icons/simple-icons/check_box_outline.svg"
						alt="checkbox"
						width={25}
						height={25}
					/>
				) : (
					<Image
						onClick={() => setCheckedBox(!checkedBox)}
						className="btn"
						src="/icons/simple-icons/indeterminate_check_box.svg"
						alt="checkbox"
						width={25}
						height={25}
					/>
				)}
				<p className={`text-xl`}>{selections.selection}</p>
			</div>
		</>
	);
};

const LabelsContainer = ({ labels }) => {
	const [checkedBox, setCheckedBox] = useState(false);
	return (
		<>
			<div className="w-fit h-fit gap-2 flex justify-center items-center">
				{!checkedBox ? (
					<Image
						onClick={() => setCheckedBox(!checkedBox)}
						className="btn"
						src="/icons/simple-icons/check_box_outline.svg"
						alt="checkbox"
						width={25}
						height={25}
					/>
				) : (
					<Image
						onClick={() => setCheckedBox(!checkedBox)}
						className="btn"
						src="/icons/simple-icons/indeterminate_check_box.svg"
						alt="checkbox"
						width={25}
						height={25}
					/>
				)}
				<p className={`text-xl`}>{labels.label}</p>
			</div>
		</>
	);
};

export default FilterModal;
