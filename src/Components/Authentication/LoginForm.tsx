import React, { useState, useRef, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import styles from "./LoginForm.module.css";
import AuthContext from "../../Store/auth-context";
import { ILoginResponse } from "../../Interfaces/IAuthModel";
import { validEmail, validPassword } from "./Regex";
import ErrorModal from "../UI/ErrorModal";
import { useRouter } from "next/router";

const LoginForm = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    title: "",
    popup: false,
  });
  const authContext = useContext(AuthContext);

  const switchLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const loginFetch = async () => {
      setIsLoading(true);
      const enteredUsername = usernameInputRef.current!.value;
      const enteredPassword = passwordInputRef.current!.value;

      if (!validPassword.test(enteredPassword)) {
        setError({
          message: "Entered information is not valid",
          title: "Login error",
          popup: true,
        });
        setIsLoading(false);
        return;
      }

      await axios
        .post<ILoginResponse>(
          "https://poodlesvonapalusso.dog/api/Authentication/login",
          {
            username: enteredUsername,
            password: enteredPassword,
          }
        )
        .then((response) => {
          authContext.login(
            response.data.token,
            response.data.role,
            response.data.expiration
          );
          setIsLogin(true);
          setIsLoading(false);
          router.push("/");
          return response;
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false);
        });
    };

    const registerFetch = async () => {
      setIsLoading(true);
      const enteredUsername = usernameInputRef.current!.value;
      const enteredPassword = passwordInputRef.current!.value;
      const enteredEmail = emailInputRef.current!.value;

      if (
        !validEmail.test(enteredEmail) ||
        !validPassword.test(enteredPassword)
      ) {
        setError({
          message: "Entered information is not valid or username is taken",
          title: "Registration error",
          popup: true,
        });
        setIsLoading(false);
        return;
      }

      await axios
        .post<AxiosResponse>(
          "https://poodlesvonapalusso.dog/api/Authentication/register",
          {
            username: enteredUsername,
            password: enteredPassword,
            email: enteredEmail,
          }
        )
        .then(() => {
          alert("registration successful");
          setIsLoading(false);
          router.push("/");
        })
        .catch((error: string) => {
          setIsLoading(false);
          console.log(error);
        });
    };

    if (isLogin) {
      loginFetch();
    } else {
      registerFetch();
    }
  };

  if (isLoading) {
    return <div>Load</div>;
  }

  const errorHandler = () => {
    setError({
      message: "",
      title: "",
      popup: false,
    });
  };

  return (
    <>
      {error.popup && (
        <ErrorModal
          message={error.message}
          onConfirm={errorHandler}
          title={error.title}
        />
      )}
      <section className={styles.auth}>
        <h1>{isLogin ? "Login" : "Register account"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className={styles.control}>
              <label htmlFor="email">E-mail address</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
          )}
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
            {!isLoading && (
              <button
                type="submit"
                style={{
                  color: "#ffe2ed",
                  fontSize: "1.6rem",
                }}
              >
                {isLogin ? "Login" : "Create account"}
              </button>
            )}
            {isLoading && <div>Loading...</div>}
            <br />
            <button
              type="button"
              onClick={switchLoginHandler}
              style={{
                color: "#ffe2ed",
                fontSize: "1.6rem",
              }}
            >
              {isLogin ? "Create a new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
