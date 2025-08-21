import { div } from "framer-motion/client";
import { Link } from 'react-router-dom';
import CosmosBackground from './cosmoBackground'
import Logo from './img/logo.png'
import { FiSkipBack } from 'react-icons/fi'

export default function Login() {
    return (
        <div className="w-full h-screen flex items-center justify-between relative">

            {/* Left Login Page */}
            <div className="h-full bg-[#121920]/80 backdrop-blur-sm lg:w-2/5 w-full py-8 px-5
            z-10">
                <form action="">
                    <h2 className="w-full flex flex-wrap items-center justify-between
                    text- font-medium sm-[345px]:text-right mb-8">
                        <img src={Logo} alt="" />
                        <span>
                            RCS
                            <p className="text-xs text-gray-400">Somente pessoas autorizadas</p>
                        </span>
                    </h2>

                    <div className="w-full flex flex-col gap-1 mb-6">
                        <label htmlFor="nome" 
                        className="text-base font-medium text-gray-300"
                        >E-mail</label>
                        {/* Input */}
                        <input type="email" 
                        placeholder="exemplo@exemplo.com"
                        className="w-full px-3 h-12 rounded-md bg-[#121920] shadow-sm"
                        id="nome"/>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="pass" 
                        className="text-base font-medium text-gray-300 "
                        >Palavra-passe</label>
                        {/* Input */}
                        <input type="email" 
                        placeholder="*****************"
                        className="w-full px-3 h-12 rounded-md bg-[#121920] shadow-sm"
                        id="pass"/>
                    </div>

                    {/* REMEMBER ME */}
                    <div className="mt-5 w-full flex items-center justify-between mb-8">
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                            <input type="checkbox" 
                            name="" 
                            id="remember" 
                            className="w-3 h-3"/>

                            <label 
                            htmlFor="remember"
                            className="cursor-pointer">Lembra-me</label>
                        </div>

                        <button
                        className="text-xs hover:underline transition-all duration-300">
                            Esqueceu sua senha?
                        </button>
                    </div>

                    <button
                    className="w-full font-medium text-lg py-2
                    bg-gray-300 text-[#121920] rounded-md shadow-lg">
                        Entrar
                    </button>

                    <Link to={'/'}
                    className="flex justify-center">
                        <p className="mt-4 text-lg">
                            Voltar
                        </p>
                    </Link>
                </form>

            </div>

            {/* Fundo animado */}
            <CosmosBackground />

        </div>
    )
}