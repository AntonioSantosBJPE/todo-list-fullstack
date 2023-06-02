import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-500 flex items-center  p-2.5 ">
      <main className="relative w-full max-w-screen-md h-full mx-auto my-0 bg-zinc-100  flex flex-col md:flex-row items-center justify-center gap-7 px-3 py-12 rounded-lg">
        <Image
          src={"/shape-img.svg"}
          alt="img-shape"
          width={200}
          height={200}
          priority={true}
          className="absolute top-0 left-0 rounded-lg"
        />

        <div className="w-full md:w-1/2 h-full my-5 flex flex-col items-center justify-center gap-1 ">
          <h2 className="text-zinc-950 text-2xl font-bold text-center leading-8 relative z-40">
            Aumente sua Produtividade:
          </h2>
          <h3 className="text-zinc-950 text-base font-semibold text-center leading-8 relative z-40">
            Estando no controle do seua dia!!
          </h3>
          <h3 className="text-zinc-950 text-sm font-medium text-justify leading-8">
            Bem-vindo ao nosso aplicativo de lista de tarefas, o seu parceiro
            perfeito para organizar e gerenciar suas atividades diárias de
            maneira eficiente. Com a nossa interface intuitiva e recursos
            poderosos, nunca foi tão fácil acompanhar suas tarefas e alcançar
            seus objetivos.
          </h3>
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-8">
          <Image
            src={"/page-home-img.svg"}
            alt="img-page-home"
            width={180}
            height={180}
            priority={true}
            className=" relative z-40"
          />
          <div className=" flex flex-col gap-1 w-full">
            <p className="text-base text-zinc-800 font-semibold text-center leading-5">
              Já possui conta?{" "}
              <Link
                className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
                href={"/login"}
              >
                Entre agora!
              </Link>
            </p>
            <p className="text-base text-teal-700 font-semibold text-center leading-5">
              --------------
            </p>
            <p className="text-base text-zinc-800 font-semibold text-center leading-5">
              Ainda não tem conta?{" "}
              <Link
                className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
                href={"/register"}
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
