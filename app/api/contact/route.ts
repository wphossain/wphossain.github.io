import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, websiteUrl, monthlyAdSpend, message, formType } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required fields.' },
        { status: 400 }
      );
    }

    console.log('[LEAD SUBMISSION RECEIVED]:', {
      formType: formType || 'contact',
      fullName,
      email,
      phone,
      websiteUrl,
      monthlyAdSpend,
      message,
      submittedAt: new Date().toISOString(),
    });

    // 1. Dispatch Telegram Webhook Notification (If Token/Chat ID configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = `🚨 *NEW HVAC AUDIT LEAD* 🚨\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Website:* ${websiteUrl || 'N/A'}\n*Ad Spend:* ${monthlyAdSpend || 'N/A'}\n*Message:* ${message || 'N/A'}`;
      
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: 'Markdown',
        }),
      }).catch(err => console.error('Telegram notification error:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for booking an audit! Mikail will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
