import {  motion } from "framer-motion";
import imgMessage from './img/message-icon.png'
import { Link } from 'react-router-dom'


export default function Hero() {
    return (
        <section
            className="w-full min-h-screen bg-gradient-to-bl from-[rgba(106,44,192,0.8)] sm:text-center
        to-[#121920] px-5 py-40 pb-5 relative overflow-x-hidden lg:px-20 text-balance text-left">

            {/* Conteúdo da página */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    delay: 2.0,
                    stiffness: 50,
                    duration: 0.7,
                }}
                className="font-bold bg-clip-text text-transparent bg-gradient-to-b
            from-gray-50 to-gray-400  text-4xl lg:text-5xl md:text-4xl ">
                Criando Soluções De Atendimento <br />
                Ao Cliente De Forma Moderna.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    delay: 2.2,
                    stiffness: 50,
                    duration: 0.7,
                }}
                className="mt-7 text-sm text-gray-400 ">
                Torne o Atendimento ao cliente da sua empresa mais rápido, eficiente e poderoso. <br />
                Não é apenas um serviço, é o futuro das empresas em Angola e no Mundo.
            </motion.p>

            <Link to={'/clientePedido'}>
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        type: "spring",
                        delay: 2.5,
                        stiffness: 50,
                        damping: 25,
                        duration: 0.7,
                    }}
                    className="inline-flex items-center text-[#121920] bg-white
            hover:bg-[#121920] hover:text-white space-x-2 mt-5 cursor-pointer
            font-medium md:text-2xl text-xl p-2 rounded-full hover:scale-95
            transition-all duration-300">
                    <span>Fazer pedido</span>
                    <img src={imgMessage} alt="" className="md:w-auto md:h-auto object-cover h-6 w-6" />
                </motion.button>
            </Link>

            <div className="mt-10">
                <div className="flex items-center justify-center flex-wrap space-x-8 text-left">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: "tween",
                            delay: 2.8,
                            stiffness: 50,
                            duration: 0.7,
                        }}
                    >
                        <h4 className="text-3xl font-medium"
                        >350 +</h4>
                        <span className="text-sm font-normal">Empresas Angolanas</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: "tween",
                            delay: 2.8,
                            stiffness: 50,
                            duration: 0.7,
                        }}
                    >
                        <h4 className="text-3xl font-medium"
                        >15863 +</h4>
                        <span className="text-sm font-normal">Atendimentos por dia</span>
                    </motion.div>
                </div>
                <div className="flex items-center flex-col mt-4 animate-bounce transition-transform duration-300">
                    <div className="h-0.5 w-10 bg-white"></div>
                    <div className="h-0.5 w-7 mt-1 bg-white"></div>
                </div>

            </div>


        </section>
    )
}