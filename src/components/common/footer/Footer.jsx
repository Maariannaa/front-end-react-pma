import React from "react"
import { FaHeart } from "react-icons/fa"
import './footer.css';

export default function Footer() {
  return(
    <footer className={['m-column'].join(' ')}>
      <h3>{new Date().getFullYear()}&nbsp;</h3>
        made with
        <FaHeart
          style={{ margin: "5px" }}
          color="#fa4a4a"
          size="1rem"
        />
        by PMA Team ®
    </footer>
  )
}
