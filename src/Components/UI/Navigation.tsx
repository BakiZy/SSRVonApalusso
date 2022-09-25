import styles from "./Navigation.module.css";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../public/poodle.svg";
import Image from "next/image";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <Navbar variant="dark" expand="lg" className={styles.navMain}>
      <Container>
        <Navbar.Brand className={styles.logoDivLeft}>
          <Image src={logo} alt="poodle" className={styles.logo} />
          <p
            id="C logo"
            className="col-sm"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            © Poodle Kennel Von Apalusso
          </p>
          <Image src={logo} alt="poodle" className={styles.logo} />
        </Navbar.Brand>
      </Container>
      <Container className={styles.mainMenu}>
        <Nav className="ml-auto">
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
        </Nav>
      </Container>
      <Nav className={styles.social}>
        <Link href="tel:+381646149512">
          <a>
            <FaWhatsapp className={styles.faWhatsapp} size={40} />
          </a>
        </Link>
        <Link
          href="https://www.facebook.com/milos.petrov.10/photos_by"
          target="_blank"
          rel="noreferrer"
        >
          <a>
            <FaFacebook className={styles.faFacebook} size={40} />
          </a>
        </Link>
        <Link
          href="https://www.instagram.com/vonappalusso/"
          target="_blank"
          rel="noreferrer"
        >
          <a>
            <FaInstagram className={styles.faInstagram} size={40} />
          </a>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
