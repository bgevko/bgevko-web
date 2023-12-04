import { notFound } from "next/navigation"

import Article from '@/components/UI/Article'

export default async function ArticlePage({ params }) {
	const post = await getBlogPostFromParams(params.slug)
  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			{/*TODO: Render article*/}
		</main>
	)
}
