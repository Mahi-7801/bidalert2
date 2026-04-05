import { NextResponse } from 'next/server';
import twilio from 'twilio';

// This is a generic endpoint to send WhatsApp notifications via Twilio
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, message } = body;

        if (!to || !message) {
            return NextResponse.json({ success: false, error: 'Phone number "to" and "message" are required.' }, { status: 400 });
        }

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // default twilio Sandbox number

        if (!accountSid || !authToken) {
            return NextResponse.json({
                success: false,
                error: 'Twilio credentials not configured. Please add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to .env.local'
            }, { status: 500 });
        }

        const client = twilio(accountSid, authToken);

        // Format numbers for whatsapp if they aren't already formatted
        const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
        const formattedFrom = fromNumber.startsWith('whatsapp:') ? fromNumber : `whatsapp:${fromNumber}`;

        const twilioResponse = await client.messages.create({
            body: message,
            from: formattedFrom,
            to: formattedTo
        });

        return NextResponse.json({
            success: true,
            message: 'WhatsApp message sent successfully',
            messageSid: twilioResponse.sid
        });

    } catch (error: any) {
        console.error('Error sending WhatsApp message:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to send WhatsApp message'
        }, { status: 500 });
    }
}
