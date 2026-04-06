const axios = require('axios');

/**
 * Send an SMS using Fast2SMS Quick SMS route ('q').
 *
 * Quick SMS does NOT require DLT registration.
 * Enable it from the Fast2SMS panel: Login → Quick SMS (left sidebar).
 *
 * @param {string} phone    - Recipient 10-digit Indian mobile number
 * @param {string} message  - The message text to send
 * @returns {Promise<{success: boolean, requestId?: string, error?: string}>}
 */
const sendSMS = async (phone, message) => {
    try {
        const apiKey = process.env.FAST2SMS_API_KEY;

        if (!apiKey) {
            console.warn('⚠️  Fast2SMS API key is not set. Skipping SMS.');
            return { success: false, error: 'API key not configured' };
        }

        // Sanitise phone number
        let cleanPhone = String(phone).replace(/\D/g, '');
        if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
            cleanPhone = cleanPhone.substring(2);
        }
        if (cleanPhone.length !== 10) {
            console.error(`❌ Invalid phone number format: ${phone}`);
            return { success: false, error: 'Invalid phone number' };
        }

        console.log(`📤 Sending Quick SMS to ${cleanPhone}`);

        // Fast2SMS Quick SMS route — no DLT registration needed
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            route: 'q',
            message: message,
            numbers: cleanPhone,
            flash: 0
        }, {
            headers: {
                'authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.return) {
            console.log(`✅ SMS sent to ${cleanPhone}. Request ID: ${response.data.request_id}`);
            return { success: true, requestId: response.data.request_id };
        } else {
            const errMsg = response.data.message || JSON.stringify(response.data);
            console.error(`❌ Fast2SMS API error: ${errMsg}`);
            return { success: false, error: errMsg };
        }
    } catch (error) {
        const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error('❌ Failed to send SMS via Fast2SMS:', errorMsg);
        return { success: false, error: errorMsg };
    }
};

/**
 * Check Fast2SMS Wallet Balance
 * @returns {Promise<{success: boolean, wallet?: number, error?: string}>}
 */
const checkBalance = async () => {
    try {
        const apiKey = process.env.FAST2SMS_API_KEY;
        if (!apiKey) return { success: false, error: 'API key not configured' };

        const response = await axios.get(`https://www.fast2sms.com/dev/wallet?authorization=${apiKey}`);
        return { success: true, wallet: response.data.wallet };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendSMS,
    checkBalance
};
