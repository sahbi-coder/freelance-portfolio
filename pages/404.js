import React from "react";
import Link from "next/link";

export default function notFound() {
  return (
    <din
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: "100vh",
      }}
    >
      Opps page not Foud{" "}
      <span style={{ color: "#08fdd8",marginLeft:10 }}>
        <Link href="/"> wanna go back to home page ?</Link>
      </span>
    </din>
  );
}
