import '@/lib/style/globals.css'
import { getServerSession } from 'next-auth'
import { Theme } from "@/components/providers/Theme"
import Session from "@/components/providers/Session"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Type AI: Revolutionize Your AI Integration Experience",
  description: "Type AI is your ultimate app for seamless AI API requests. Craft personalized templates and output schemas effortlessly, allowing you to streamline your workflow by creating and managing clusters and templates. Test your configurations directly on our platform, ensuring smooth functionality. Once satisfied, generate an API key for secure access to your customized AI resources. Explore the future of AI integration with Type AI today."
}

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito" />
        <link rel="icon" href="/icon.svg" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='h-[100svh] w-screen p-0 m-0 bg-background overflow-x-hidden'>
        <Analytics />
        <Theme
          attribute="class"
          defaultTheme="dark"
        >
          <Session session={session}>
            <Toaster />
            {children}
          </Session>
        </Theme>
      </body>
    </html >
  )
}
