import Head from "next/head";
import MainHeroSection from "../components/HeroSection/MainHeroSection";
import HeroGalleryModal from "@/components/HeroSection/HeroGalleryModal";
import { useContext } from "react";
import { StatesManagerCtx } from "@/components/Layout";

export default function Home() {
	const { openGalleryModal } = useContext(StatesManagerCtx);

	return (
		<>
			<Head>
				<title>Listology</title>
				<meta name="description" content="Welcome to Listology, The Todo List Web Application" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icons/simple-icons/icon logo.svg" />
			</Head>
			<main>
				{openGalleryModal && <HeroGalleryModal />}
				<MainHeroSection />
			</main>
		</>
	);
}
