import SectionTags from '@/components/UI/SectionTags'
import Category from '@/components/UI/NoteCategory.jsx'
import NoteLink from '@/components/UI/NoteLink.jsx'
import NotesList from '@/components/UI/NotesList.jsx'
import { getPostsMeta } from '@/lib/posts'

export const metadata = {
	title: "Bogdan's Notes",
	description: "Bogdan's Gevko's technical notes and snippets.",
}

async function getMetadata() {
	try {
		const posts = await getPostsMeta('notes')
		if (!posts) return []
		return posts
	} catch (err) {
		console.log("getMetadata:error: ", err)
		return []
	}
}

function getFormattedNotes(data) {
	const categories = new Set()
	data.forEach(note => categories.add(note.category))

	const notes = []
	categories.forEach(category => {
		const note = {
			category: category,
			notes: [],
		}

		data.forEach(item => {
			if (item.category === category) {
				note.notes.push({
					title: item.title,
					tags: item.tags,
					href: item.href,
				})
			}
		})
		notes.push(note)
	})

	return notes
}

export default async function Projects() {
	const data = await getMetadata()
	const notes = getFormattedNotes(data)
  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<NotesList notes={notes}/>
		</main>
	)
}
