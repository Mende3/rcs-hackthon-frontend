import { div } from "framer-motion/client";
import { Link } from "react-router-dom";
import VideoBackground from './cosmoBackground'


export default function NotFound () {
    return (
        <div className="flex items-center justify-center min-h-screen">
            {/* Background Video */}
            <VideoBackground/>


            {/* Content */}
            <div className="p-8 bg-[#121920]/50 backdrop-blur-sm text-center">
                <h2 className="lg:text-6xl md:text-5xl text-4xl font-extrabold
                text-transparent bg-clip-text bg-gradient-to-br from-violet-700 to-gray-400">
                    <div className="">:(</div>
                    ERRO 404 Not Found 
                </h2>
                <p className="mt-2 text-lg text-gray-400">
                    Página não encontrada no servidor ou inexistente 
                    de momento por favor tente mais tarde
                </p>
                <br />
                <Link to={'/'}>
                        <div className="text-violet-800 underline hover:opacity-80">
                            voltar para página principal
                        </div>
                </Link>
            </div>
        </div>
    )
}