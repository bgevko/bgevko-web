import SectionTags from '../components/UI/SectionTags'
import Category from '../components/UI/NoteCategory.jsx'
import NoteLink from '../components/UI/NoteLink.jsx'
import NotesList from '../components/UI/NotesList.jsx'

export const metadata = {
	title: "Bogdan's Notes",
	description: "Bogdan's Gevko's technical notes and snippets.",
}

export default function Projects() {
	const Notes = [
		{
			category: 'Web Development',
			notes: [
				{
					title: 'HTTP Status Codes',
					tags: ['HTTP'],
					href: '#',
				},
				{
					title: 'HTTPS using Certbot',
					tags: ['Linux'],
					href: '#',
				},
			],
		},
		{
			category: 'Python',
			notes: [
				{
					title: 'Python Cheatsheet',
					tags: ['Python'],
					href: '#',
				},
				{
					title: 'Python Snippets',
					tags: ['Python'],
					href: '#',
				},
			],
		},
		{
			category: 'Unix/Linux',
			notes: [
				{
					title: 'Linux Cheatsheet',
					tags: ['Linux'],
					href: '#',
				},
				{
					title: 'Symlink a tool',
					tags: ['Linux'],
					href: '#',
				},
				{
					title: 'Vim Shortcuts',
					tags: ['VIM'],
					href: '#',
				},
				{
					title: 'TMUX Cheatsheet',
					tags: ['TMUX'],
					href: '#',
				},
			],
		},
		{
			category: 'C/C++',
			notes: [
				{
					title: 'CMake Starter File',
					tags: ['CMake', 'C++'],
					href: '#',
				},
				{
					title: 'Build Script',
					tags: ['C', 'C++'],
					href: '#',
				},
				{
					title: 'GCC Snippets',
					tags: ['C', 'GCC'],
					href: '#',
				},
			],
		},
	]

  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<NotesList notes={Notes}/>
			{/* <section className="w-full max-w-prose lg:max-w-5xl mx-auto"> */}
			{/* 	<Category title="Web Development"> */}
			{/* 		<NoteLink href="#" tags={['HTTP']}>HTTP Status Codes</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['Linux']}>HTTPS using Certbot</NoteLink> */}
			{/* 	</Category> */}
			{/* 	<Category title="Python"> */}
			{/* 		<NoteLink href="#" tags={['Python']}>Python Cheatsheet</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['Python']}>Python Snippets</NoteLink> */}
			{/* 	</Category> */}
			{/* 	<Category title="Unix/Linux"> */}
			{/* 		<NoteLink href="#" tags={['Linux']}>Linux Cheatsheet</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['Linux']}>Symlink a tool</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['VIM']}>Vim Shortcuts</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['TMUX']}>TMUX Cheatsheet</NoteLink> */}
			{/* 	</Category> */}
			{/* 	<Category title="C/C++"> */}
			{/* 		<NoteLink href="#" tags={['CMake', 'C++']}>CMake Starter File</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['C', 'C++']}>Build Script</NoteLink> */}
			{/* 		<NoteLink href="#" tags={['C', 'GCC']}>GCC Snippets</NoteLink> */}
			{/* 	</Category> */}
			{/* </section> */}
		</main>
	)
}
