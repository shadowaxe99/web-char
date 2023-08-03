import React, { useState } from 'react';
import twilio from 'twilio';

const Button = () => {
  const [isCalling, setIsCalling] = useState(false);

  const handleButtonClick = async () => {
    if (isCalling) return;

    setIsCalling(true);

    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const call = await client.calls.create({
        url: 'http://example.com/twiml',
        to: '+1234567890',
        from: '+0987654321',
      });
      console.log('Call SID:', call.sid);
    } catch (error) {
      console.error('Error making call:', error);
    }

    setIsCalling(false);
  };

  return (
    <button onClick={handleButtonClick} disabled={isCalling}>
      {isCalling ? 'Calling...' : 'Make Call'}
    </button>
  );
};

export default Button;
