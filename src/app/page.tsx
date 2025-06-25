"use client";
import React from "react";
import Image from "next/image";
import TwisterCard from "../components/TwisterCard";

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: 'url("/images/bg2.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          marginBottom: "0.5rem",
        }}
      >
        👂🏻... TwisterTalk ...🗣️
      </h1>
      <div style={{ marginBottom: "1.5rem", position: "relative", width: 100, height: 100 }}>
        <Image
          src="/images/logo.gif"
          alt="TwisterTalk Logo"
          width={100}
          height={100}
          priority={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <TwisterCard />
     
    </main>
  );
}
