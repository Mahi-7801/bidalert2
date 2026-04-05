const axios = require('axios');

/**
 * ============================================================
 *  BidAlert WhatsApp Service
 *  Supports two providers:
 *    1. Twilio  (already configured in .env)
 *    2. Meta WhatsApp Cloud API (add keys when ready)
 * ============================================================
 *
 *  .env keys needed:
 *  -- Twilio (existing) --
 *    TWILIO_ACCOUNT_SID=...
 *    TWILIO_AUTH_TOKEN=...
 *    TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
 *
 *  -- Meta Cloud API (add when you get keys) --
 *    META_WA_TOKEN=...           (Permanent Access Token from Meta)
 *    META_WA_PHONE_ID=...        (Phone Number ID from Meta Business dashboard)
 */

// ──────────────────────────────────────────────
// PROVIDER 1: Twilio WhatsApp
// ──────────────────────────────────────────────
const sendWhatsAppTwilio = async (toPhone, message) => {
    try {
        const twilio = require('twilio');
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken  = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

        if (!accountSid || !authToken) {
            return { success: false, error: 'Twilio credentials not configured' };
        }

        const client      = twilio(accountSid, authToken);
        const toFormatted = toPhone.startsWith('whatsapp:') ? toPhone : `whatsapp:+91${toPhone}`;

        const msg = await client.messages.create({
            body: message,
            from: fromNumber,
            to:   toFormatted
        });

        console.log(`✅ [Twilio] WhatsApp sent to ${toFormatted}. SID: ${msg.sid}`);
        return { success: true, sid: msg.sid, provider: 'twilio' };
    } catch (error) {
        console.error('❌ [Twilio] WhatsApp failed:', error.message);
        return { success: false, error: error.message };
    }
};

// ──────────────────────────────────────────────
// PROVIDER 2: Meta WhatsApp Cloud API
// ──────────────────────────────────────────────
const sendWhatsAppMeta = async (toPhone, message) => {
    try {
        const token   = process.env.META_WA_TOKEN;
        const phoneId = process.env.META_WA_PHONE_ID;

        if (!token || !phoneId) {
            return { success: false, error: 'Meta WhatsApp credentials not configured. Add META_WA_TOKEN and META_WA_PHONE_ID to .env' };
        }

        // Format: country code + number (no + sign)
        const toFormatted = toPhone.replace(/\D/g, '');
        const phone = toFormatted.startsWith('91') ? toFormatted : `91${toFormatted}`;

        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${phoneId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'text',
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(`✅ [Meta] WhatsApp sent to +${phone}. ID: ${response.data.messages?.[0]?.id}`);
        return { success: true, messageId: response.data.messages?.[0]?.id, provider: 'meta' };
    } catch (error) {
        const errMsg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error('❌ [Meta] WhatsApp failed:', errMsg);
        return { success: false, error: errMsg };
    }
};

// ──────────────────────────────────────────────
// MAIN: Auto-select provider (Meta preferred, fallback to Twilio)
// ──────────────────────────────────────────────
const sendWhatsApp = async (toPhone, message) => {
    // Use Meta if configured (cheaper & more reliable for India)
    if (process.env.META_WA_TOKEN && process.env.META_WA_PHONE_ID) {
        return await sendWhatsAppMeta(toPhone, message);
    }
    // Fallback to Twilio
    return await sendWhatsAppTwilio(toPhone, message);
};

// ──────────────────────────────────────────────
// Send Tender Alert via WhatsApp
// ──────────────────────────────────────────────
const sendTenderAlertWhatsApp = async (toPhone, userName, keyword, tenders) => {
    const topTenders = tenders.slice(0, 5);
    const tenderLines = topTenders.map((t, i) => {
        const title   = t.title?.substring(0, 60) || 'N/A';
        const closing = t.closing_date
            ? new Date(t.closing_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
            : 'N/A';
        return `${i + 1}) ${title}... | Closes: ${closing}`;
    }).join('\n');

    const moreCount = tenders.length > 5 ? `\n+${tenders.length - 5} more tenders` : '';

    const message = [
        `🔔 *BidAlert Tender Alert*`,
        `Hi ${userName}!`,
        ``,
        `📋 *${tenders.length} tenders* found for: *"${keyword}"*`,
        ``,
        `*Top Matches:*`,
        tenderLines,
        moreCount,
        ``,
        `🌐 View all: bidalert.in`,
        `📞 Support: support@bidalert.in`,
        ``,
        `_-BidAlert Team_`
    ].filter(Boolean).join('\n');

    return await sendWhatsApp(toPhone, message);
};

module.exports = {
    sendWhatsApp,
    sendWhatsAppTwilio,
    sendWhatsAppMeta,
    sendTenderAlertWhatsApp
};
