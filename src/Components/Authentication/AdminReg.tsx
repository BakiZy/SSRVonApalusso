import React, { useState, useRef, useContext, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import AuthContext from "../../Store/auth-context";
import styles from "./AdminReg.module.css";
import { Button, Spinner } from "react-bootstrap";
import { validEmail, validPassword } from "./Regex";
import { useRouter } from "next/router";

const AdminReg: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const router = useRouter();
  const submitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const enteredUsername = usernameInputRef.current!.value;
      const enteredPassword = passwordInputRef.current!.value;
      const enteredEmail = emailInputRef.current!.value;
      if (
        !validEmail.test(enteredEmail) ||
        !validPassword.test(enteredPassword)
      ) {
        alert(
          "entered values must be valid, password must contain at least 1 number, 1 uppercase and one special character"
        );
        setLoading(false);
        return;
      }
      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      await axios
        .post<AxiosResponse>(
          "https://poodlesvonapalusso.dog/api/Admin/register-admin",
          {
            username: enteredUsername,
            password: enteredPassword,
            email: enteredEmail,
          },
          config
        )
        .then(() => {
          alert("admin registration successful");
          router.push("/profile");
        })
        .catch((error: string) => {
          setLoading(false);
          console.log(error);
        });
    },
    [token, router]
  );

  if (loading) {
    return (
      <Spinner animation="border" variant="info">
        Load
      </Spinner>
    );
  }
  return (
    <section>
      <h1>Register admin account</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">E-mail address</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>

        <div className={styles.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <br></br>
        <div className="col-md-12 text-center">
          <Button
            type="submit"
            variant="dark"
            style={{
              color: "#ffe2ed",
              fontSize: "1.6rem",
            }}
          >
            Create account
          </Button>
          <br />
        </div>
      </form>
    </section>
  );
};

export default AdminReg;
