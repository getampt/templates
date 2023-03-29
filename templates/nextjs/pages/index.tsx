import { data } from "@ampt/data";
import Head from "next/head";
import Image from "next/image";

import DataViewer from "@components/DataViewer";

export default function HomePage({ users }) {
  return (
    <div className="root">
      <Head>
        <title>Ampt Next.js template</title>
      </Head>
      <main>
        <h1>Welcome to Ampt!</h1>
        <h1>Image Optimization</h1>
        <Image src="/image.png" width={412} height={240} alt="image" />
        <h1>Server-side data</h1>
        {users?.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
        <h1>Client-side data</h1>
        <DataViewer />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const result = (await data.get("user:*", true)) as any;
  return {
    props: {
      users: result.items.map(({ value }) => value),
    },
  };
}
