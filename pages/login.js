import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import styles from "../styles/Login.module.css";
import { TailSpin } from "react-loader-spinner";
import Head from "next/head";

function Login({ authenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    if (authenticated) Router.push("/admin");
  }, [authenticated]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setFetching(true);
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
        { email, password }
      );
      setFetching(false);
      Router.push("/admin");
    } catch {
      setError(true);
      setFetching(false);
    }
  }

  return (
    <>
      <Head>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | login</title>
      </Head>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formTitle}>Welcome Admin</div>
          <div className={styles.formGroup}>
            <div className={styles.formLabel}>email:</div>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formLabel}>password:</div>
            <input
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
            />
          </div>
          <div>
            <div className={styles.centeredRow}>
              <button
                className={styles.submit}
                stye={{ cursor: isFetching ? "not-allowed" : "pointer" }}
                disabled={isFetching}
              >
                submit
              </button>
            </div>
          </div>
        </form>
        <div className={styles.loaderContainer}>
          {isFetching && (
            <TailSpin
              height="80"
              width="80"
              color="#08fdd8"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getServerSideProps(ctx) {
  const authtoken = ctx.req.cookies.authtoken;
  let authenticated = false;

  try {
    await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
      authtoken,
    });
    authenticated = true;
  } catch {
    authenticated = false;
  }

  return {
    props: {
      authenticated,
    },
  };
}
