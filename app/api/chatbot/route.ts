import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Safety-focused responses
    const safetyResponses: { [key: string]: string } = {
      "emergency|sos|help|danger": "If you're in immediate danger, please call emergency services (911 or your local emergency number) right away. You can also use the SOS button on your dashboard to alert your emergency contacts with your location.",
      
      "safe|safety tips": "Here are some key safety tips:\n\n1. Always share your location with trusted contacts\n2. Stay in well-lit areas when traveling alone\n3. Keep your phone charged\n4. Trust your instincts - if something feels wrong, leave\n5. Use the buddy system when possible\n6. Keep emergency contacts updated in your profile",
      
      "night|dark|alone": "Safety tips for traveling alone at night:\n\n1. Plan your route in advance\n2. Stay in populated, well-lit areas\n3. Share your location with trusted contacts\n4. Keep phone accessible and charged\n5. Walk confidently and stay alert\n6. Consider using a safety app like this one\n7. Have emergency numbers ready\n8. Trust your instincts",
      
      "contact|emergency contact": "To manage your emergency contacts:\n\n1. Go to the Contacts page from the navigation menu\n2. Click 'Add Contact' to add new emergency contacts\n3. Include their name, phone number, and relationship\n4. You can edit or remove contacts anytime\n5. These contacts will receive alerts when you trigger an SOS",
      
      "sos|alert": "To use the SOS feature:\n\n1. Go to your Dashboard\n2. Press the red SOS button\n3. Your location and alert will be instantly sent to all emergency contacts\n4. They will receive SMS with your GPS coordinates\n5. The primary contact will also receive a call\n6. Use this only in genuine emergencies",
      
      "location|gps|track": "Location tracking features:\n\n1. Your live location is tracked automatically when enabled\n2. Guardian dashboard shows real-time location\n3. Location is shared during SOS alerts\n4. You can view your location history\n5. All location data is encrypted and secure",
      
      "guardian|monitor": "Guardian features allow trusted contacts to:\n\n1. View your real-time location\n2. See your movement history\n3. Receive emergency alerts\n4. Call or message you directly\n5. Get directions to your location\n6. Monitor your device status",
      
      "battery|charge": "Battery and device tips:\n\n1. Keep your phone charged above 20%\n2. Carry a portable charger when traveling\n3. Enable low power mode if needed\n4. Your guardians receive low battery alerts\n5. Consider a solar-powered backup charger",
    };

    // Find matching response
    let responseText = "";
    const lowerMessage = message.toLowerCase();

    for (const [pattern, response] of Object.entries(safetyResponses)) {
      const keywords = pattern.split("|");
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        responseText = response;
        break;
      }
    }

    // Default response if no match
    if (!responseText) {
      responseText = "I'm here to help with safety-related questions. You can ask me about:\n\n• Emergency procedures and SOS alerts\n• Safety tips for various situations\n• How to manage emergency contacts\n• Location tracking and guardian features\n• Battery and device safety\n• General safety advice\n\nWhat would you like to know?";
    }

    return NextResponse.json({
      response: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
