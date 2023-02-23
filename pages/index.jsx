import Head from "next/head";
import MainHeroSection from "../components/HeroSection/MainHeroSection";
import { useContext } from "react";
import { StatesManagerCtx } from "@/components/Layout";
import UploadModal from "@/components/HeroSection/UploadModal";

export default function Home() {
	const { uploadModal } = useContext(StatesManagerCtx);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				{uploadModal && <UploadModal />}
				<MainHeroSection />
			</main>
		</>
	);
}
