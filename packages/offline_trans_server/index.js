// const app = require('./app');

// const port = '8888';


// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}...`);
// });


const { createClient } = require('@supabase/supabase-js');
// Supabase setup
const supabaseUrl = 'https://vfxfcdlgnqcoeaohyqlv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGZjZGxnbnFjb2Vhb2h5cWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTYwOTMsImV4cCI6MjA0MDI3MjA5M30.YPSDzisgs9O7xlas2Oer_T_fzcVzDCbEjj1virVPqMI';
const supabase = createClient(supabaseUrl, supabaseKey);

const apiKey = encodeURIComponent('NDIzOTY4NmY3ODY3NjU3MjY1NzkzMTYxMzU2NzU3NzQ=');





// Function to fetch inboxes
async function getInboxes() {
  const response = await fetch(`https://api.textlocal.in/get_inboxes/?apikey=${apiKey}`);
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error('Failed to fetch inboxes');
  }
  // console.log(data.inboxes)
  return data.inboxes;
}

// Function to fetch the last message for a specific inbox
async function getLastMessage(inboxId) {
  const response = await fetch(`https://api.textlocal.in/get_messages/?apikey=${apiKey}&inbox_id=${inboxId}`);
  const data = await response.json();
  // console.log(data)
  if (data.status !== 'success') {
    throw new Error('Failed to fetch messages');
  }
  // console.log(data.messages[9])
  x= data.num_messages-1
  return {msg:data.messages[x],
    from:data.messages[x].number
  } // Return only the last message
}


function parseMessage(message) {
  const parts = message.split(' ');
  if (parts.length === 3 && parts[1]=='1') {
      return {
          value: parts[0],
          number: parts[1],
          otp: parts[2]
      };
  } else if (parts.length === 4 && parts[1]=='2') {
      return {
          value: parts[0],
          number: parts[1],
          to_number: parts[2],
          amount: parts[3]
      };
  }
  // Return null for unexpected input
  return null;
}


async function verifyOTP(otp, sender) {
  // console.log(otp)
  // console.log(sender)
  try {
    // Query the row based on the sender
    const { data, error } = await supabase
      .from('verification')
      .select('otp')
      .eq('PhoneNumber', sender)
      .single();

    if (error) throw error;

    if (!data) {
      console.log('No matching record found for the sender');
      return false;
    }

    if (data.otp === otp) {
      // If OTP matches, update the status to true
      const { error: updateError } = await supabase
        .from('verification')
        .update({ isVerified: true })
        .eq('PhoneNumber', sender);

      if (updateError) throw updateError;

      console.log('OTP verified and status updated to true');
      return true;
    } else {
      console.log('OTP does not match');
      return false;
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    return false;
  }
}



// Main function to fetch inboxes and then the last message from the first inbox
async function fetchLastMessageAndParse() {
  try {
    const inboxes = await getInboxes();
    if (inboxes.length === 0) {
      console.log('No inboxes found');
      return;
    }

    const firstInboxId = inboxes[0].id;
    const lastMessage = ((await getLastMessage(firstInboxId)).msg);
    const from = ((await getLastMessage(firstInboxId)).from);

    if (!lastMessage) {
      console.log('No messages found');
      return;
    }

    console.log(from)
    const Sender_info = from; 
    const parsedMessage = parseMessage(lastMessage.message);

    if (parsedMessage) {
      if(parsedMessage.number=='1'){
        console.log('Parsed message components:');
        console.log(`Value: ${parsedMessage.value}`);
        console.log(`Number: ${parsedMessage.number}`);
        console.log(`OTP: ${parsedMessage.otp}`);
       // Verify OTP with Supabase
       const isVerified = await verifyOTP(parsedMessage.otp,Sender_info);
       console.log(`OTP verification result: ${isVerified}`);
       
       return {
         otp: parsedMessage.otp,
         verified: isVerified
       };}
      else if(parsedMessage.number=='2'){
        console.log('Parsed message components:');
        console.log(`Value: ${parsedMessage.value}`);
        console.log(`Number: ${parsedMessage.number}`);
        console.log(`To Number: ${parsedMessage.to_number}`);
        console.log(`Amount: ${parsedMessage.amount}`);
        // transaction 
        return{
          to:parsedMessage.to_number,
          amount:parsedMessage.amount
        };
      }
    } else {
      console.log('Last message does not match the expected format');
      console.log(`Full message: ${lastMessage.message}`);
      return null;
      
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function poling() {
  while(true){
    await fetchLastMessageAndParse();
    await delay(5000);
}
}


// Run the main function
poling();