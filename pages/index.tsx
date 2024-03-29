import Head from "next/head";
import Form from "../components/Form";
import Posts from "../components/Post";
import { Container } from "../styles";

export default function Home() {
  return (
    <>
      <Head>
        <title>Post | Feed</title>
      </Head>
      <Container>
        <Form />
        <Posts />
      </Container>
    </>
  );
}
