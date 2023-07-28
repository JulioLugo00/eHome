import {Nunito} from "next/font/google"
import './globals.css'
import Navbar from "./components/navbar/Navbar"
import ClientOnly from "./components/ClientOnly"

import RegisterModal from "./components/modals/RegisterModal"
import LoginModal from "./components/modals/LoginModal"
import RentModal from "./components/modals/RentModal"
import TranslateModal from "./components/modals/TranslateModal"

import ToasterProvider from "./providers/ToasterProvider"
import getCurrentUser from "../actions/getCurrentUser"
import SearchModal from "./components/modals/SearchModal"

import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import fetchExchangeRates from "../actions/getChange"
import getListings from "../actions/getListings"

export const metadata = {
  title: 'eHome',
  description: 'eHome app',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({children, params: {locale}}: {children: React.ReactNode,params: {locale: string}}) {
  const currentUser = await getCurrentUser(); // const currentUser = await prisma?.user.find({})
  const userId = currentUser ? {userId: currentUser.id} : {}
  let listings = await getListings(userId);
  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  
  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientOnly>
              <ToasterProvider />
              <SearchModal/>
              <RentModal/>
              <TranslateModal />
              <LoginModal/>
              <RegisterModal/>
              <Navbar currentUser={currentUser} listings={listings}/>
            </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

