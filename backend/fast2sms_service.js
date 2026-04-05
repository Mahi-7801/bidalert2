const axios = require('axios');

/**
 * Send an SMS using Fast2SMS API
 * @param {string} phone - The recipient's 10-digit phone number
 * @param {string} message - The message body to send
 * @returns {Promise} - Resolves with the Fast2SMS response or rejects on error
 */
const sendSMS = async (phone, message) => {
    try {
        const apiKey = process.env.FAST2SMS_API_KEY;

        if (!apiKey) {
            console.warn("Fast2SMS API key is not set. Skipping SMS.");
            return { success: false, error: 'API key not configured' };
        }

        // Clean phone number: remove any non-digit characters
        let cleanPhone = String(phone).replace(/\D/g, '');
        
        // Basic India number validation/format: 
        // If it's 10 digits, it's a standard Indian number.
        // Fast2SMS Bulk V2 'q' route usually expects 10 digits.
        if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
            cleanPhone = cleanPhone.substring(2); // Strip 91 if present for 'q' route
        }

        if (cleanPhone.length !== 10) {
            console.error(`❌ Invalid phone number format: ${phone}`);
            return { success: false, error: 'Invalid phone number' };
        }

        // Fast2SMS Bulk V2 API
        // Route 'q' = Quick SMS (non-DLT)
        // Using POST handles complex formatting, newlines, and long lengths better
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            route: 'q',
            message: message, // Preserve newlines for natural reading and avoiding spam filters
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
            console.error(`❌ Fast2SMS API error: ${response.data.message || JSON.stringify(response.data)}`);
            return { success: false, error: response.data.message };
        }
    } catch (error) {
        const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error('❌ Failed to send SMS via Fast2SMS:', errorMsg);
        return { success: false, error: errorMsg };
    }
};

/**
 * Check Fast2SMS Wallet Balance
 * @returns {Promise} - Resolves with the balance amount
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
