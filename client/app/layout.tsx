import { Providers } from '../app/providers'
import { fonts } from '../app/fonts'
import "./globals.css"
import theme from '../app/theme'
import Nav from '../components/Nav'
import Breadcrumbs from '../components/Breadcrumbs'
import SideBar from "../components/Sidebar"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
    return (
        <html lang='en'>
            <body style={{backgroundColor: "#ffffff"}} className='h-screen'>
                <Nav />
                <Providers>
                    <div className="grid grid-flow-row grid-cols-6">
                        <div className="col-span-1">
                            <SideBar />
                        </div>
                        <div className="col-span-5">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}