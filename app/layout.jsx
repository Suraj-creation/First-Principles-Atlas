import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'First Principles Atlas',
    template: '%s | First Principles Atlas'
  },
  description:
    'A living first-principles knowledge infrastructure for technology, research, and original insight.'
}

const navbar = (
  <Navbar
    logo={<span className="atlas-logo">First Principles Atlas</span>}
    projectLink="https://github.com/Suraj-creation/First-Principles-Atlas"
  />
)

const footer = (
  <Footer>
    <span>First Principles Atlas. Built as an evolving public knowledge system.</span>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Suraj-creation/First-Principles-Atlas/tree/main"
          footer={footer}
          editLink="Edit this scaffold"
          sidebar={{ autoCollapse: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
