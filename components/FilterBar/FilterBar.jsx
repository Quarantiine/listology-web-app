import React, { useContext, useEffect, useState } from "react";
import { StatesManagerCtx } from "../Layout";

const FilterBar = () => {
	const {
		bodyBgColor,
		layoutView,
		setLayoutView,
		checkFilterBtnClick,
		setCheckFilterBtnClick,
		setFilterModal,
		allChecked,
		setAllChecked,
		addTodos,
		folderClicked,
		folders,
	} = useContext(StatesManagerCtx);

	const { addTodo, dropdown, completed, activeAssignment, label, heart, grid, list, deselectAll, selectedAll } =
		FilterIcons({
			bodyBgColor,
			layoutView,
		});

	return (
		<div className="flex flex-col justify-center items-start gap-5 w-full">
			<div
				className={`${bodyBgColor ? "text-white" : "text-black"} border w-full h-16 rounded-lg ${
					bodyBgColor ? "bg-[#222] border-[#444]" : "bg-[#e9e9e9] border-[#b8b8b8]"
				} flex flex-col justify-center items-center`}
			>
				<div className="w-full h-fit p-1 flex justify-between items-center gap-5 px-5 sm:px-10">
					{folders.length > 0 && (
						<button
							onClick={() => {
								addTodos(folderClicked);
							}}
						>
							{addTodo}
						</button>
					)}
					<div className="filter-scroll-bar flex justify-start items-center pb-2 lg:pb-0 overflow-x-scroll overflow-y-hidden gap-5">
						<button
							onClick={(e) => {
								setCheckFilterBtnClick(e.currentTarget.id);
								setAllChecked(!allChecked);
							}}
							id={`all`}
							className={`btn text-lg flex justify-center items-center gap-1 ${
								checkFilterBtnClick === "all" ? "text-[#0E51FF]" : ""
							}`}
						>
							<span>All</span>
							{checkFilterBtnClick !== "all" ? selectedAll : deselectAll}
						</button>
						{/* <button
							onClick={(e) => {
								setCheckFilterBtnClick(e.currentTarget.id);
								setFilterModal(true);
							}}
							id="select"
							className={`btn text-lg flex justify-center items-center gap-1 ${
								checkFilterBtnClick === "select" ? "text-[#0E51FF]" : ""
							}`}
						>
							<span>Select</span>
							<span>{dropdown}</span>
						</button> */}
						<button
							onClick={(e) => setCheckFilterBtnClick(e.currentTarget.id)}
							id="completed"
							className={`${
								checkFilterBtnClick === "completed" ? "text-[#0E51FF]" : ""
							} btn text-lg flex justify-center items-center gap-2`}
						>
							<span>Completed</span>
							<span>{completed}</span>
						</button>
						<button
							onClick={(e) => setCheckFilterBtnClick(e.currentTarget.id)}
							id="active"
							className={`${
								checkFilterBtnClick === "active" ? "text-[#0E51FF]" : ""
							} btn text-lg flex justify-center items-center gap-2`}
						>
							<span>Active</span>
							<span>{activeAssignment}</span>
						</button>
						{/* <button
							onClick={(e) => {
								setCheckFilterBtnClick(e.currentTarget.id);
								setFilterModal(true);
							}}
							id="label"
							className={`${
								checkFilterBtnClick === "label" ? "text-[#0E51FF]" : ""
							} btn text-lg flex justify-center items-center gap-2`}
						>
							<span>Labels</span>
							<span>{label}</span>
						</button> */}
						<button
							onClick={(e) => setCheckFilterBtnClick(e.currentTarget.id)}
							id="favorites"
							className={`${
								checkFilterBtnClick === "favorites" ? "text-[#0E51FF]" : ""
							} btn text-lg flex justify-center items-center gap-2`}
						>
							<span>Favorites</span>
							<span>{heart}</span>
						</button>
					</div>
					<div className="flex justify-center items-center gap-2 relative bottom-[2px]">
						<button
							onClick={(e) => setLayoutView(e.currentTarget.id)}
							id="grid"
							className="btn text-lg flex justify-center items-center"
						>
							<span>{grid}</span>
						</button>
						<button
							onClick={(e) => setLayoutView(e.currentTarget.id)}
							id="list"
							className="btn text-lg flex justify-center items-center"
						>
							<span>{list}</span>
						</button>
					</div>
				</div>
			</div>
			<div
				className={`flex flex-col sm:flex-row justify-center items-center gap-3 w-full ${
					bodyBgColor ? "text-white" : "text-black"
				}`}
			>
				{checkFilterBtnClick && (
					<button
						onClick={() => setCheckFilterBtnClick(false)}
						className="text-xl font-semibold btn base-bg px-4 py-1 rounded-md text-white w-full"
					>{`Clear Filters`}</button>
				)}
				{checkFilterBtnClick && (
					<button
						onClick={() => setCheckFilterBtnClick(false)}
						className="text-xl font-semibold btn bg-red-500 px-4 py-1 rounded-md text-white w-full"
					>{`Delete All`}</button>
				)}
				<h1 className="text-xl font-semibold">{layoutView.toUpperCase()}</h1>
			</div>
		</div>
	);
};

const FilterIcons = ({ bodyBgColor, layoutView }) => {
	// stroke={bodyBgColor ? `white` : `black`}

	const addTodo = (
		<svg
			className="relative bottom-[2px] btn"
			width="25"
			height="31"
			viewBox="0 0 31 31"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M29.333 15.1665C29.333 7.34541 22.9876 1 15.1665 1C7.34541 1 1 7.34541 1 15.1665C1 22.9876 7.34541 29.333 15.1665 29.333C22.9876 29.333 29.333 22.9876 29.333 15.1665Z"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeMiterlimit="10"
			/>
			<path
				d="M15.1665 9.26376V21.0692"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M21.069 15.1665H9.26355"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const dropdown = (
		<svg
			className="relative top-[2px]"
			width="15"
			height="10"
			viewBox="0 0 19 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 1L9.5 11L18 1"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const completed = (
		<svg width="17" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M19 1L6.4 14L1 9.125"
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const activeAssignment = (
		<svg width="15" height="20" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.66667 23C1.2037 23 0.810185 22.8323 0.486111 22.4969C0.162037 22.1615 0 21.7542 0 21.275V4.025C0 3.54583 0.162037 3.13854 0.486111 2.80312C0.810185 2.46771 1.2037 2.3 1.66667 2.3H7.36111C7.4537 1.62917 7.75 1.07812 8.25 0.646875C8.75 0.215625 9.33333 0 10 0C10.6667 0 11.25 0.215625 11.75 0.646875C12.25 1.07812 12.5463 1.62917 12.6389 2.3H18.3333C18.7963 2.3 19.1898 2.46771 19.5139 2.80312C19.838 3.13854 20 3.54583 20 4.025V21.275C20 21.7542 19.838 22.1615 19.5139 22.4969C19.1898 22.8323 18.7963 23 18.3333 23H1.66667ZM1.66667 21.275H18.3333V4.025H1.66667V21.275ZM4.44444 18.4H12.0278V16.675H4.44444V18.4ZM4.44444 13.5125H15.5556V11.7875H4.44444V13.5125ZM4.44444 8.625H15.5556V6.9H4.44444V8.625ZM10 3.53625C10.2593 3.53625 10.4861 3.43562 10.6806 3.23437C10.875 3.03312 10.9722 2.79833 10.9722 2.53C10.9722 2.26167 10.875 2.02688 10.6806 1.82563C10.4861 1.62438 10.2593 1.52375 10 1.52375C9.74074 1.52375 9.51389 1.62438 9.31944 1.82563C9.125 2.02688 9.02778 2.26167 9.02778 2.53C9.02778 2.79833 9.125 3.03312 9.31944 3.23437C9.51389 3.43562 9.74074 3.53625 10 3.53625Z"
				fill={bodyBgColor ? `white` : `black`}
			/>
		</svg>
	);

	const label = (
		<svg width="18" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M25 8.5L19.1319 15.7554C18.831 16.1196 18.4722 16.4182 18.0556 16.6509C17.6389 16.8836 17.1759 17 16.6667 17H2.08333C1.50463 17 1.01273 16.8229 0.607639 16.4688C0.202546 16.1146 0 15.6845 0 15.1786V1.82143C0 1.31548 0.202546 0.885417 0.607639 0.53125C1.01273 0.177083 1.50463 0 2.08333 0H16.6667C17.1759 0 17.6389 0.116369 18.0556 0.349107C18.4722 0.581845 18.831 0.880357 19.1319 1.24464L25 8.5ZM22.3958 8.5L17.0486 1.82143H2.08333V15.1786H17.0486L22.3958 8.5ZM2.08333 8.5V15.1786V1.82143V8.5Z"
				fill={bodyBgColor ? `white` : `black`}
			/>
		</svg>
	);

	const heart = (
		<svg width="17" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.5377 21.849L11.5398 21.8505C11.6791 21.9492 11.8395 21.9996 12.0003 22C12.161 21.9996 12.3214 21.9494 12.4607 21.8508L12.4623 21.8496C16.9228 18.7058 18.8144 16.5801 19.8337 15.2906C22.0202 12.523 23.0281 9.7422 22.9994 6.75626C22.9678 3.5258 20.4833 1 17.5912 1C15.4733 1 13.967 2.23294 13.0318 3.36329L13.0284 3.36748C12.9046 3.51547 12.7493 3.63685 12.5715 3.72102C12.3936 3.80525 12.1986 3.84958 12 3.84958C11.8014 3.84958 11.6064 3.80525 11.4285 3.72102C11.2507 3.63685 11.0954 3.51547 10.9716 3.36748L10.9685 3.36367L10.9685 3.36366C10.0329 2.23384 8.52643 1 6.40876 1C3.5166 1 1.03224 3.52586 1.00059 6.75566L11.5377 21.849ZM11.5377 21.849C7.07731 18.7053 5.18572 16.5796 4.16638 15.2901L11.5377 21.849ZM4.1663 15.29C1.97886 12.522 0.971984 9.7413 1.00059 6.75584L4.1663 15.29Z"
				fill={bodyBgColor ? `#222` : `white`}
				stroke={bodyBgColor ? `white` : `black`}
				strokeWidth="2"
			/>
		</svg>
	);

	const grid = (
		<svg width="20" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.69308 1H2.1145C1.49898 1 1 1.49898 1 2.1145V9.69308C1 10.3086 1.49898 10.8076 2.1145 10.8076H9.69308C10.3086 10.8076 10.8076 10.3086 10.8076 9.69308V2.1145C10.8076 1.49898 10.3086 1 9.69308 1Z"
				stroke={
					bodyBgColor
						? `${layoutView === "grid" ? "#0E51FF" : "white"}`
						: `${layoutView === "grid" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M23.0672 1H15.4886C14.8731 1 14.3741 1.49898 14.3741 2.1145V9.69308C14.3741 10.3086 14.8731 10.8076 15.4886 10.8076H23.0672C23.6827 10.8076 24.1817 10.3086 24.1817 9.69308V2.1145C24.1817 1.49898 23.6827 1 23.0672 1Z"
				stroke={
					bodyBgColor
						? `${layoutView === "grid" ? "#0E51FF" : "white"}`
						: `${layoutView === "grid" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.69308 14.374H2.1145C1.49898 14.374 1 14.873 1 15.4885V23.0671C1 23.6826 1.49898 24.1816 2.1145 24.1816H9.69308C10.3086 24.1816 10.8076 23.6826 10.8076 23.0671V15.4885C10.8076 14.873 10.3086 14.374 9.69308 14.374Z"
				stroke={
					bodyBgColor
						? `${layoutView === "grid" ? "#0E51FF" : "white"}`
						: `${layoutView === "grid" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M23.0672 14.374H15.4886C14.8731 14.374 14.3741 14.873 14.3741 15.4885V23.0671C14.3741 23.6826 14.8731 24.1816 15.4886 24.1816H23.0672C23.6827 24.1816 24.1817 23.6826 24.1817 23.0671V15.4885C24.1817 14.873 23.6827 14.374 23.0672 14.374Z"
				stroke={
					bodyBgColor
						? `${layoutView === "grid" ? "#0E51FF" : "white"}`
						: `${layoutView === "grid" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const list = (
		<svg width="28" height="23" viewBox="0 0 33 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8.72717 2.28787H31.9087"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.72717 11.3029H31.9087"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.72717 20.3179H31.9087"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.28786 3.57573C2.99913 3.57573 3.57573 2.99913 3.57573 2.28786C3.57573 1.5766 2.99913 1 2.28786 1C1.5766 1 1 1.5766 1 2.28786C1 2.99913 1.5766 3.57573 2.28786 3.57573Z"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.28786 12.5908C2.99913 12.5908 3.57573 12.0142 3.57573 11.3029C3.57573 10.5917 2.99913 10.0151 2.28786 10.0151C1.5766 10.0151 1 10.5917 1 11.3029C1 12.0142 1.5766 12.5908 2.28786 12.5908Z"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.28786 21.6058C2.99913 21.6058 3.57573 21.0292 3.57573 20.3179C3.57573 19.6067 2.99913 19.0301 2.28786 19.0301C1.5766 19.0301 1 19.6067 1 20.3179C1 21.0292 1.5766 21.6058 2.28786 21.6058Z"
				stroke={
					bodyBgColor
						? `${layoutView === "list" ? "#0E51FF" : "white"}`
						: `${layoutView === "list" ? "#0E51FF" : "black"}`
				}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const deselectAll = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="23"
			viewBox="0 96 960 960"
			width="23"
			fill={bodyBgColor ? `white` : `black`}
		>
			<path d="M280 604h401q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T681 544H280q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T280 604ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0 0V276v600Z" />
		</svg>
	);

	const selectedAll = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="23"
			viewBox="0 96 960 960"
			width="23"
			fill={bodyBgColor ? `white` : `black`}
		>
			<path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Z" />
		</svg>
	);

	return { addTodo, dropdown, completed, activeAssignment, label, heart, grid, list, deselectAll, selectedAll };
};

export default FilterBar;
