import StyledTag from '../../components/UI/StyledTag'

export const metadata = {
	title: "Assignment 11: Integration",
	description: "In this short article, I show off my UI design and demonstrate how I used my partner’s microservice to test how my blog will handle images of varying sizes.",
}
export default function Article() {
	const tags = ['CS 361', 'Microservices', 'Web Design']
  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			<section className="w-full max-w-7xl flex flex-col items-center">
				<header className="flex py-8 max-w-prose flex-col items-center">
					<p className="mb-8 font-bold text-blue-600"> Published 2 Dec 2023 </p>
					<h1 className="mb-8 text-4xl font-bold text-gray-900" style={{ textWrap: 'balance' }}> {metadata.title} </h1>
					<p className="mb-8 text-lg text-gray-700 text-center" style={{ textWrap: 'balance' }}> {metadata.description} </p>
					<span className="flex w-full gap-4 flex-wrap justify-center">
						{ tags.map((tag, index) => (
								<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
							))
						}
					</span>
				</header>
			</section>
		</main>
	)
}
