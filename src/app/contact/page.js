import ButtonSecondary from '@/components/UI/ButtonSecondary2'
import Input from '@/components/UI/TextInput'
import TextArea from '@/components/UI/TextArea'

export default function Contact() {
	return (
		<main className="mt-24 flex flex-col items-center justify-center w-full h-full">
			<section className="flex flex-col items-center justify-center w-full max-w-prose">
				<header className="mb-8 flex flex-col items-center justify-center w-full">
					<h1 className="mb-4 text-4xl sm:text-5xl font-bold text-center text-gray-900">Get in <span className="text-cyan-500">Touch</span></h1>
					<p className="mt-4 text-xl text-center text-gray-600">I&apos;d love to hear from you. Let&apos;s connect!</p>
				</header>
				<form className="flex flex-col items-center justify-center w-full">
					<fieldset className="mb-4 gap-4 flex flex-col sm:flex-row items-center justify-center w-full">
						<Input
							label="First Name"
							type="text"
							name="first-name"
							placeholder="First Name"
						/>
						<Input
							label="Last Name"
							type="text"
							name="last-name"
							placeholder="Last Name"
						/>
					</fieldset>
						<Input
							label="Email"
							type="email"
							name="email"
							placeholder="Email"
							className="mb-4"
						/>
						<TextArea
							label="Message"
							type="textarea"
							name="message"
							placeholder="Message"
							className="mb-6"
						/>
						<ButtonSecondary className="max-w-full w-full">Send message</ButtonSecondary>
				</form>
			</section>
		</main>
	)
}
