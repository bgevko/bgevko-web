import SectionTags from '@/components/UI/SectionTags'
import ProjectsList from '@/components/UI/ArticlesList'

export const metadata = {
	title: "Bogdan's Projects",
	description: "Bogdan Gevko's coding projects.",
}


export default function Projects() {
	const projects = [
		{
			date: "1 day ago",
			title: "I remade my website in Next.js 13",
			content: "I rewrote my previous website, which was written in React with NextJS. In this article, I talk my process and the challenges I faced along the way.",
			tags: ['NextJS', 'React', 'TailwindCSS'],
			href: "#"
		}, 
		{
			date: "24 Oct 2023",
			title: "I built a 3D renderer in C++",
			content: "In this article, I talk about how I built an openGL renderer with the help of GLFW library.",
			tags: ['C++', 'OpenGL'],
			href: "#"
		},
		{
			date: "20 Sep 2023",
			title: "I rolled my own content management system",
			content: "I created a command line tool that automatically pushes my Obsidian notes to the blog on this website. I can edit my notes in Obsidian and push all the changes to the blog with a single command.",
			tags: ['Python', 'Git', 'Markdown'],
			href: "#"
		},
		{
			date: "20 Feb 2023",
			title: "I built a static website for my Biology Final",
			content: "I created this static website to host an assignment for a biology class. I used Figma to make the initial design and implemented it using the Jekyll framework. I deployed it using GitHub pages.",
			tags: ['Jekyll', 'Figma', 'GitHub Pages'],
			href: "#"
		},
		{
			date: "20 Dec 2022",
			title: "I built a web hosted data generator",
			content: "I designed an open-source random data generator web tool (www.randomdatagen.com) using React. The interface updates dynamically in real-time, and the tool is blazing fast because it doesn't need to make any external requests; all data logic is handled by frontend JavaScript.",
			tags: ['React', 'JavaScript'],
			href: "#",
		},
	]

  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<ProjectsList 
				articles={projects}
			/>
		</main>
	)
}
