'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { redirect } from 'next/navigation'
import { ButtonCyan } from '@/ui/Buttons.jsx';
import { useState } from 'react'

import { Button } from "@/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/TextArea"
import { useToast } from "@/ui/use-toast"

const formSchema = z.object({	
	firstName: z.string()
		.min(1, { message: "Please enter your first name" })
		.max(50, { message: "Name is too long" }),
	lastName: z.string()
		.min(1, { message: 'Please enter your last name' })
		.max(50, { message: 'Name is too long' }),
	email: z.string()
		.email({ message: 'Please enter a valid email' }),
	message: z.string()
		.min(1, { message: 'Please enter a message' })
		.max(2000, { message: 'Message is too long' }),
})

const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			message: '',
		},
	})

	async function onSubmit(values) {
		setIsLoading(true)
		
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})

		setIsLoading(false)

		if (response.status !== 200) {
			toast({
				title: "Something went wrong.",
				description: 'You can reach me directly at bgevko@gmail.com.',
				variant: "destructive"
			})
			return
		}
		toast({
			title: 'Message Sent.',
			description: 'Check your email for a confirmation.',
			status: 'success',
		})
		form.reset()
	}

	return (
		<Form {...form}>
			<form 
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-[300px] md:max-w-[366px] flex flex-col items-center justify-center w-full relative" >
				<span className="flex flex-col sm:gap-2 sm:flex-row items-start justify-enter w-full">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="sr-only">First Name</FormLabel>
							<FormControl>
								<Input
									disabled={isLoading}
									placeholder="First Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="sr-only">Last Name</FormLabel>
							<FormControl>
								<Input
									disabled={isLoading}
									placeholder="Last Name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
						)}
					/>
				</span>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
					<FormItem className="w-full" >
						<FormLabel htmlFor="email" className="sr-only">Email</FormLabel>
						<FormControl>
							<Input
								disabled={isLoading}
								placeholder="Email"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel htmlFor="message" className="sr-only">Message</FormLabel>
						<FormControl>
							<Textarea
								disabled={isLoading}
								className="resize-none h-40"
								placeholder="Message"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
				/>
				{/* <Button type="submit" className="mt-2 text-white font-bold bg-primary hover:bg-primaryDark">Send</Button> */}
				<ButtonCyan 
					disabled={isLoading}
					className="mt-2" 
					type="submit">Send</ButtonCyan>
			</form>
		</Form>
	)
}

export default ContactForm

