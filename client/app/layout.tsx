import { Providers } from '../app/providers'
import { fonts } from '../app/fonts'
import "./globals.css"
import theme from '../app/theme'
import Nav from '../components/Nav'
import Breadcrumbs from '../components/Breadcrumbs'



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