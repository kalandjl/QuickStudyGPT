import { Providers } from './providers'
import { fonts } from './fonts'
import "./globals.css"
import theme from './theme'
import Nav from '../components/Nav'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body style={{backgroundColor: "#ffffff"}}>
        <Nav />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}