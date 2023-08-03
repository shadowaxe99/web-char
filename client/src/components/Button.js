import React, { useState } from 'react';
import twilio from 'twilio';

const Button = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('');

  const handleButtonClick = async () => {
    if (isCalling) return;

    setIsCalling(true);
    setCallStatus('Calling...');

    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const call1 = await client.calls.create({
        url: 'http://example.com/twiml',
        to: '+1234567890', // Participant 1
        from: '+0987654321',
      });
      const call2 = await client.calls.create({
        url: 'http://example.com/twiml',
        to: '+9876543210', // Participant 2
        from: '+0123456789',
      });

      setCallStatus('Call initiated');
    } catch (error) {
      console.error('Error initiating call:', error);
      setCallStatus('Call failed');
    }
  };

  return (
    <button onClick={handleButtonClick} disabled={isCalling}>
      {isCalling ? 'Calling...' : 'Make Conference Call'}
    </button>
  );
};

export default Button;
