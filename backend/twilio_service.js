const twilio = require('twilio');

/**
 * Send a WhatsApp message using Twilio
 * @param {string} to - The recipient's phone number with country code (e.g. +919000000000)
 * @param {string} message - The message body to send
 * @returns {Promise} - Resolves with the Twilio message response or rejects on error
 */
const sendWhatsAppMessage = async (to, message, mediaUrl = null) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Twilio Sandbox default

        if (!accountSid || !authToken) {
            console.warn("Twilio credentials are not set. Skipping WhatsApp message.");
            return { success: false, error: 'Credentials not configured' };
        }

        const client = twilio(accountSid, authToken);

        // Twilio requires numbers start with 'whatsapp:'
        const fromFormatted = fromNumber.startsWith('whatsapp:') ? fromNumber : 'whatsapp:' + fromNumber;
        const toFormatted = to.startsWith('whatsapp:') ? to : 'whatsapp:' + to;

        const messageOptions = {
            body: message,
            from: fromFormatted,
            to: toFormatted
        };

        if (mediaUrl) {
            messageOptions.mediaUrl = [mediaUrl];
        }

        const twilioMessage = await client.messages.create(messageOptions);

        console.log('✅ WhatsApp message sent to ' + toFormatted + '. SID: ' + twilioMessage.sid);
        return { success: true, sid: twilioMessage.sid };
    } catch (error) {
        console.error('❌ Failed to send WhatsApp message via Twilio:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendWhatsAppMessage
};