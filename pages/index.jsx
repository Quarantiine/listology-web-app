import Head from "next/head";
import MainHeroSection from "../components/HeroSection/MainHeroSection";

export default function Home() {
	return (
		<>
			<Head>
				<title>Listology</title>
				<meta name="description" content="Welcome to Listology, The Advanced Todo List Web Application" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icons/simple-icons/icon logo.svg" />
			</Head>
			<main>
				<MainHeroSection />
			</main>
		</>
	);
}
