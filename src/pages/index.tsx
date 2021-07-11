import { Header } from "Elements/header";
import { HomePage } from "Elements/HomePage/HomePage";
import Head from 'next/head';
import React from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Animeover | Home</title>
      </Head>
      <Header />
      <HomePage />
    </div>
  );
}
