import Link from "next/link";

const Home = () => {
  return (
    <main>
      <h1>Pagina HOME</h1>
      <div>
        <Link href={"/login"}>Login</Link>
        <br></br>
        <Link href={"/register"}>Registro</Link>
      </div>
    </main>
  );
};

export default Home;
