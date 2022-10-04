import styles from "./Navigation.module.css";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../../../public/poodle.svg";
import Image from "next/image";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className={styles.logoDivLeft}>
        <Image src={logo} alt="poodle" className={styles.logo} />
        <p
          id="C logo"
          className="col-sm"
          style={{ color: "rgba(255, 255, 255, 0.75)" }}
        >
          © Poodle Kennel Von Apalusso
        </p>
        <Image src={logo} alt="poodle" className={styles.logo} />
      </div>
      <div className={styles.mainMenu}>
        <Link href="/">
          <a>Home</a>
        </Link>
        {authContext.isLoggedIn ? (
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        ) : (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}
        <Link href="/about">
          <a>About</a>
        </Link>
        {authContext.isAdmin && <Link href="/admin">Admin</Link>}
        {authContext.isAdmin && <Link href="/new-poodle">New Poodle</Link>}
        {authContext.isAdmin && <Link href="/images">Images</Link>}
      </div>
      <div className={styles.social}>
        <a href="tel:+381646149512">
          <FaWhatsapp className={styles.faWhatsapp} size={40} />
        </a>
        <a
          href="https://www.facebook.com/milos.petrov.10/photos_by"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook className={styles.faFacebook} size={40} />
        </a>
        <a
          href="https://www.instagram.com/vonappalusso/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram className={styles.faInstagram} size={40} />
        </a>
      </div>
    </>
  );
};

export default Navigation;
