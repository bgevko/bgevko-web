import { NextResponse } from 'next/server';
import sendEmail from '@/lib/mailer';

export async function POST(request) {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;
		const formattedFirstName = body.firstName.charAt(0).toUpperCase() + body.firstName.slice(1);
		const formattedLastName = body.lastName.charAt(0).toUpperCase() + body.lastName.slice(1);

    const text = `Hello, ${formattedFirstName} ${formattedLastName}! This is an auto-reply, but I'll get back to you soon!

Best,
Bogdan
Sent with NodeMailer
https://www.bgevko.com

------------------------
From: ${email}
Date: ${new Date().toLocaleString()}

${message}`;

    try {
        await sendEmail(email, `Hello, ${formattedFirstName}!`, text);
        return new Response(JSON.stringify({ message: 'Email sent' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
				console.error(error);
        return new Response(JSON.stringify({ message: 'Error sending email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
