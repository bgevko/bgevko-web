import Article from '@/components/UI/ArticleExample'

export const metadata = {
	title: "Assignment 11: Integration",
	description: "In this short article, I show off my UI design and demonstrate how I used my partner’s microservice to test how my blog will handle images of varying sizes.",
}
export default function ArticlePage() {
  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			<Article metadata={metadata} />
		</main>
	)
}
