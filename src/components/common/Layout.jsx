import React, { useContext } from "react"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import { AuthContext } from "../../App"

const Layout = ({ onClick, children }) => {
  const { theme } = useContext(AuthContext);

  return (
    <div>
      <Header onClick={onClick} />
      <main className={[theme, 'row', 'm-column'].join(' ')} style={{ justifyContent: 'space-around' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
