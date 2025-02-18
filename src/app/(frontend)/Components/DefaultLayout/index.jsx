import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  )
}

export default DefaultLayout
