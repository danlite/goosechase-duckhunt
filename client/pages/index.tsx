import type { NextPage } from "next";
import Head from "next/head";
import { FaCrosshairs } from "react-icons/fa";
import MissionList from "../components/MissionList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Duckhunt</title>
      </Head>
      <main className="mx-auto max-w-xl bg-white p-4 rounded shadow-xl flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-yellow-500 flex items-center gap-1">
          <FaCrosshairs className="inline text-2xl -rotate-12" />
          <span>Duckhunt</span>
        </h1>
        <MissionList />
      </main>
    </>
  );
};

export default Home;
