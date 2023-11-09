import { EmailTemplateHostEs } from '@/app/[locale]/components/emails/EmailTemplateHostEs';
import { EmailTemplateHostEn } from '@/app/[locale]/components/emails/EmailTemplateHostEn';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { language, amount, userNameTraveler, userNameHost, titleListing, startDate, endDate, idReservation} = data;
try {
    let emailTemplateComponent;
    
    // Determina qué componente de plantilla de correo electrónico utilizar en función del idioma
    if (language === 'es') {
      emailTemplateComponent = EmailTemplateHostEs;
    } else {
      // Por defecto, utiliza EmailTemplateHostEs para cualquier otro idioma
      emailTemplateComponent = EmailTemplateHostEn;
    }

    const emailData = await resend.emails.send({
        from: 'eHome <onboarding@resend.dev>',
        to: ['jaguarscompany@gmail.com'],
        subject: 'Hello world',
        react: emailTemplateComponent({ amount: amount, userNameTraveler: userNameTraveler, userNameHost: userNameHost, titleListing: titleListing, startDate: startDate, endDate: endDate, idReservation: idReservation}),
    });

    return NextResponse.json(emailData);
} catch (error: any) {
    return new NextResponse(error, {
        status: 400,
      });
  }
};