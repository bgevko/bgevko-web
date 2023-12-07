import ContactForm from '@/components/UI/ContactForm'
export const metadata = {
	title: 'Contact Bogdan',
	description: 'Contact Bogdan Gevko',
}

export default function Contact() {
	return (
		<main className="mt-24 mb-8 flex flex-col items-center justify-center w-full h-full">
			<section className="flex flex-col items-center justify-center w-full max-w-prose">
				<header className="mb-8 flex flex-col items-center justify-center w-full">
					<h1 className="mb-4 text-4xl sm:text-5xl font-bold text-center text-gray-900">Get in <span className="text-cyan-500">Touch</span></h1>
					<p className="mt-4 mb-16 text-xl text-center text-gray-600">I&apos;d love to hear from you. Let&apos;s connect!</p>
				</header>
					<ContactForm />
			</section>
		</main>
	)
}
