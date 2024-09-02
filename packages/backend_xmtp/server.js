const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { Client } = require('@xmtp/xmtp-js');
const { Wallet } = require('ethers')
const app = express();
const PORT = 3005;
const supabase_url = "https://vfxfcdlgnqcoeaohyqlv.supabase.co/"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGZjZGxnbnFjb2Vhb2h5cWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTYwOTMsImV4cCI6MjA0MDI3MjA5M30.YPSDzisgs9O7xlas2Oer_T_fzcVzDCbEjj1virVPqMI"

const supabase = createClient(supabase_url, supabase_key)

app.use(cors());

app.use(express.json());

const processAddress_post = async (address) => {
  console.log("Address recieved:", address);
  try{
  const { data, error } = await supabase.from("users").select("EOA_privateKey").eq("wallet_address", address)
  if (error & !(data[0].length > 0))
    return new Error.message("wallet_address not found")
  console.log("PrivateKey  :", data[0].EOA_privateKey)
  const wallet = new Wallet(data[0].EOA_privateKey)
  const xmtp = await Client.create(wallet, { env: "production" })
  const existingChats = await xmtp.conversations.list()
  for (const conversation of existingChats) {
    if (conversation.peerAddress == "0x79C00806C60eF8efC2f70070Da3C9Eff356a3CF1")
      conversation.send("subscribe")
  }
  return { success: true, message: "Address processed successfully!" };
}
catch(e){console.log(e)}
};

const processAddress_get = async (address) => {
  console.log("Address received:", address);
  try {
    const { data, error } = await supabase.from("users").select("EOA_privateKey").eq("wallet_address", address);
    if (error || !(data && data.length > 0)) {
      throw new Error("wallet_address not found");
    }
    console.log("PrivateKey:", data[0].EOA_privateKey);
    const wallet = new Wallet(data[0].EOA_privateKey);
    const xmtp = await Client.create(wallet, { env: "production" });
    const existingChats = await xmtp.conversations.list();
    for (const conversation of existingChats) {
      if (conversation.peerAddress === "0x79C00806C60eF8efC2f70070Da3C9Eff356a3CF1") {
        const messages = await conversation.messages();
        

        const simplifiedMessages = messages
          .filter(msg => msg.content != null && msg.content !== '')
          .map(msg => ({
            id: msg.id,
            date: msg.sent.toISOString(), // Convert to ISO string format
            content: msg.content
          }));

        return simplifiedMessages;
      }
    }
    return { success: true, message: "No matching conversation found." };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};


app.get('/get', async (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.status(400).json({ success: false, message: "Address is required." });
  }

  try {
    const result = await processAddress_get(address);
    if (Array.isArray(result)) {
      res.json({ success: true, messages: result });
    } else {
      res.json(result); 
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.post('/subscribe', async (req, res) => {
  const address = req.body.address; // Address from body

  if (!address) {
    return res.status(400).json({ success: false, message: "Address is required." });
  }

  const result = await processAddress_post(address);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

