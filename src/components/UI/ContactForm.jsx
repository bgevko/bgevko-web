'use client'
import { useState } from 'react'
import TextArea from '@/components/UI/TextArea'
import Input from '@/components/UI/TextInput'
import { ButtonCyan } from '@/components/UI/Buttons'
import {motion} from 'framer-motion'

const ContactForm = () => {
	const [loading, setLoading] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	async function onSubmit(data) {
		e.preventDefault()


		// if (!firstName || !lastName || !email || !message) {
		// 	console.log(data)
		// 	alert('Please fill out all fields')
		// 	return
		// }

		setLoading(true)
		// await sendCofirmMessage(data)
		// await sendNotification(data)
		await simulatedRequest(3000)
		setLoading(false)
	}

	const comingSoonModal = (
		<motion.div className="rounded-lg absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center"
			animate={{ backgroundColor: ['#555', '#444', '#555'] }}
			transition={{ duration: 5, repeat: Infinity }}
		>
			<div className="rounded-lg p-8">	
				<h2 className="text-2xl text-white font-bold mb-4">Coming Soon</h2>

				<div className="flex items-center justify-center">
					<motion.div className="w-2 h-2 bg-white rounded-full mr-1"
						animate={{ scale: [0.2, 1, 0.2] }}
						transition={{ duration: 1, repeat: Infinity }}
					></motion.div>

					<motion.div className="w-2 h-2 bg-white rounded-full mr-1"
						animate={{ scale: [0.2, 1, 0.2] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
					></motion.div>

					<motion.div className="w-2 h-2 bg-white rounded-full mr-1"
						animate={{ scale: [0.2, 1, 0.2] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
					></motion.div>
				</div>
			</div>
		</motion.div>
	)

	return (
		<form 
			onSubmit={onSubmit}
			className="flex flex-col items-center justify-center w-full relative"
		>
			{comingSoonModal}

			<fieldset className="mb-4 gap-4 flex flex-col sm:flex-row items-center justify-center w-full">
				<Input
					label="First Name"
					type="email"
					name="first-name"
					placeholder="First Name"
					onChange={(e) => setFirstName(e.target.value)}
					// disabled={loading}
					disabled={true}
					required={true}
				/>
				<Input
					label="Last Name"
					type="text"
					name="last-name"
					placeholder="Last Name"
					onChange={(e) => setLastName(e.target.value)}
					// disabled={loading}
					disabled={true}
					required={true}
				/>
			</fieldset>
			<Input
				label="Email"
				type="email"
				name="email"
				placeholder="Email"
				className="mb-4"
				onChange={(e) => setEmail(e.target.value)}
				// disabled={loading}
				disabled={true}
				required={true}
			/>
			<TextArea
				label="Message"
				type="textarea"
				name="message"
				placeholder="Message"
				className="mb-6"
				onChange={(e) => setMessage(e.target.value)}
				// disabled={loading}
				disabled={true}
				required={true}
			/>
			{/* <ButtonCyan disabled={true}>Send message</ButtonCyan> */}
		</form>
	)
}
export default ContactForm

async function sendCofirmMessage(data) {
	const confirmed = await fetch('https://dev.bgevko.com/confirm', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			adminEmail: 'bgevko@bgevko.com',
			adminName: 'Bogdan Gevko',
			userEmail: data.email
		})
	})

	if (confirmed.ok) {
		const data = await confirmed.json();
		console.log(data.message);
	} else {
		const data = await confirmed.json();
		console.log(data.error);
		return;
	}
}

async function sendNotification(data) {
// Send the notification email (to the developer)
	const notified = await fetch('https://dev.bgevko.com/notify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			adminEmail: 'bgevko@bgevko.com',
			userEmail: data.email,
			userName: `${data.firsName} ${data.lastName}`, //Inputs: "first-name" and "last-name"
			userText: data.message // Assuming there's an input with the name "message"
		})
	})

	if (notified.ok) {
		const data = await notified.json();
		console.log(data.message);
		form.reset();
	} else {
		const data = await notified.json();
		console.log(data.error);
		return;
	}
}

function simulatedRequest(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout); 
  });
}
