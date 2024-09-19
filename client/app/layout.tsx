import { Providers } from './providers'
import { fonts } from './fonts'
import "./globals.css"
import theme from './theme'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}