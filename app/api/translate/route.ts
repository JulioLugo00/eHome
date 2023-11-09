import { NextResponse, NextRequest } from "next/server";

// Initialize your Google Cloud Translate client here
import { Translate } from '@google-cloud/translate/build/src/v2'; // Import the v2 module from @google-cloud/translate
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS || '') ;

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

export  async function POST(request: NextRequest) {
    
    const body = await request.json();
    const {text, targetLanguage} = body;
    
    try {
        const [translatedText] = await translate.translate(text, targetLanguage);
       return new NextResponse( translatedText, { status: 200 } );
    } catch (error: any) {
        return new NextResponse(error, {
          status: 400,
        });
      }
    }