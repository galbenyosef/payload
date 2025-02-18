import { Rubik, Poppins } from 'next/font/google'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sass/style.scss'
import DefalultLayout from './(home1)/layout'
import { AuthProvider } from './providers/auth'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--body-font',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--heading-font',
})

export const metadata = {
  title: {
    absolute: '',
    default: 'Medilo- Medical & Health NextJS Template',
    template: '%s | Medilo- Medical & Health NextJS Template',
  },
  description: 'Medilo- Medical & Health NextJS Template',
  openGraph: {
    title: 'Medilo- Medical & Health NextJS Template',
    description: 'Medilo- Medical & Health NextJS Template',
    image: '/openGraphImage.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${rubik.variable} ${poppins.variable}`}>
        <AuthProvider
          // To toggle between the REST and GraphQL APIs,
          // change the `api` prop to either `rest` or `gql`
          api="rest" // change this to `gql` to use the GraphQL API
        >
          <DefalultLayout>{children}</DefalultLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
