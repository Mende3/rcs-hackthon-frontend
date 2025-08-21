import { animate, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from 'react-router-dom'

{/* Importar imagens */ }
import imgLogo from './img/logo.png'
import BtnLogin from './img/login-icon.png'
import Btnmood from './img/mood.png'
import BtnNavMenu from './img/Group 2.png'
import BtnCloseMenu from './img/close.png'



export default function Header() {
    //Toggle menu buttom
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    //State to track if the contact form is open
    const [contactFormOpen, setContactFormOpen] = useState(false);

    const openContactForm = () => setContactFormOpen(true);
    const closeContactForm = () => setContactFormOpen(false);
    return (
        <header className="w-full fixed top-0 left-0 z-50
        flex items-center justify-between px-8 py-8">

            {/* Logo Page */}
            <motion.a
                href="#"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    delay: 0.3,
                    duration: 0.3
                }}
            >
                <img src={imgLogo} alt="Logo" />
            </motion.a>

            {/* Navbar Links Body */}
            <div className='lg:flex hidden items-center space-x-20'>

                <nav className="space-x-4 flex items-center">
                    {['Início', 'Serviços', 'Comentários', 'Sobre nós'].map((item, index) => (

                        <motion.a
                            href="#"
                            key={item}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                duration: 0.3,
                                stiffness: 100,
                                damping: 20,
                                delay: 0.7 + index * 0.2
                            }}
                            className="relative font-medium text-white opacity-[0.5]
                        hover:opacity-100 transition-opacity duration-300 text-[18px]
                        group ">
                            {item}
                        </motion.a>
                    ))}
                </nav>

                <div className="flex items-center space-x-5">
                    <Link to={'/login'}>
                        <motion.a
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                damping: 10,
                                stiffness: 100,
                                delay: 1.6,
                                duration: 0.3,
                            }}
                            className="bg-gray-100 text-[#121920] px-2 py-1  
                    font-medium flex items-center space-x-2 rounded-xl
                    hover:text-white hover:bg-[#121920] transition-all duration-300
                    "
                        >
                            <span>Iniciar Sessão</span>
                            <img src={BtnLogin} alt="" />
                        </motion.a>
                    </Link>

                    {
                        /*
                        <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 100,
                            delay: 1.9,
                            duration: 0.3,
                        }}
                        className="flex items-center bg-[#121920] 
                        text-white px-2 py-1 rounded-xl font-medium flex items-center space-x-2
                        hover:text-[#121920] hover:bg-white transition-all duration-300 ">
                            <span>Dark</span>
                            <img src={Btnmood} alt="" />
                        </motion.button>
                         */
                    }

                </div>

            </div>

            {/* Menu ICON BAR */}

            {/*mobile navigation */}
            <div className="lg:hidden flex">
                <motion.button
                    whileTap={{ scale: 0.7 }}
                    onClick={toggleMenu}
                >
                    {isOpen ? <img src={BtnCloseMenu} alt="" /> : <img src={BtnNavMenu} alt="" />}
                </motion.button>
            </div>

            {/* Navbar Mobile */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.5 }}
                className="lg:hidden flex flex-col overflow-hidden
            absolute top-20 left-0 h-auto z-50 bg-[#121920]
            w-full px-3 py-4 rounded-b-xl rounded-bl-xl">
                <nav className="space-y-3 flex flex-col items-center">
                    {['Início', 'Serviços', 'Comentários', 'Sobre nós'].map((item, index) => (

                        <a
                            href="#"
                            key={item}
                            className="w-full p-2 relative font-medium text-white opacity-[0.5]
                        hover:opacity-100 transition-opacity duration-300 text-[18px]
                        group hover:bg-gray-800 rounded-lg ">
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col space-y-3 mt-3 text-2xl">
                    <Link to={'/login'}>
                        <div
                            className="bg-gray-100 text-[#121920] px-4 py-4 hover:bg-gray-800
                            font-medium flex items-center space-x-2 rounded-xl justify-between
                            hover:text-white hover:bg-[#121920] transition-all duration-300
                            ">
                            <span>Iniciar Sessão</span>
                            <img src={BtnLogin} alt="" />
                        </div>

                    </Link>

                    {
                        /* 
                        <button
                        className="flex items-center bg-gray-800 justify-between
                        text-white px-4 py-4 rounded-xl font-medium flex items-center space-x-2
                        hover:text-[#121920] hover:bg-white transition-all duration-300  border-dashed
                        border-2">
                            <span>Dark</span>
                            <img src={Btnmood} alt="" />
                        </button>
                        
                         */
                    }
                </div>
            </motion.div>
        </header>
    )
}