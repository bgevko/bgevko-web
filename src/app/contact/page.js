import ContactForm from '@/components/ContactForm'
export const metadata = {
	title: 'Contact Bogdan',
	description: 'Contact Bogdan Gevko',
}

export default function Contact() {
	return (
		<main className="mt-24 mb-8 flex flex-col items-center justify-center w-full h-full">
			<section className="flex flex-col items-center justify-center w-full max-w-prose">
				<header className="max-w-[300px] md:max-w[366px] mb-8 flex flex-col items-center justify-center w-full">
					<h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900">Get in <span className="text-cyan-500">Touch</span></h1>
					<p className="mt-4 text-sm sm:text-base text-center text-gray-600">I do not store personal data. All information goes directly to my inbox.</p>
				</header>
					<ContactForm />
			</section>
		</main>
	)
}
