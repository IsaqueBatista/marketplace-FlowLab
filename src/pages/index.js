import Head from "next/head";
import PageHome from "./Home/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Marketplace Flow Lab</title>
        <meta name="description" content="Marketplace Flow Lab" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      < PageHome/>
    </>
  );
}
