import FundoAnimado from '../Login/cosmoBackground';
import Logo from './img/logo.png';
// importando icons
import IconEmail from './img/icon mail.png';
import IconMessage from './img/icon message.png';
import IconTel from './img/icon tel.png';
import IconCompany from './img/icon empresa.png';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import ImgContentEmpresrio from './img/imgSend.png';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function ClientPedido() {
  const [telOn, setTelOn] = useState<string>('');
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeSpaceTel = (e: ChangeEvent<HTMLInputElement>) => {
    const numberOnly = e.target.value.replace(/\D/g, "").slice(0, 9); // só 9 dígitos
    setTelOn(numberOnly);
    setNumber(numberOnly);
  };

  const displayValue = telOn.replace(/(\d{3})(?=\d)/g, "$1 ");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação de todos os campos obrigatórios
    if (content.trim().length === 0 || email.trim().length === 0 || 
        company.trim().length === 0 || number.trim().length === 0) {
      setStatus("empty");
      return;
    }

    setStatus("loading");

    const now = new Date();
    const dateTime = now.toLocaleString("pt-PT");

    const clientData = {
      email,
      company,
      number,
    };

    try {
      const payload = {
        content: content,
        clientData,
        timestamp: dateTime,
      };

      console.log(payload);
      await axios.post(
        "https://webhook-ia-quote.onrender.com/webhookcallback/",
        payload
      );

      setStatus("success");
    } catch (error) {
      console.log("Erro", error);
      setStatus("error");
    } finally {
      setContent("");
      setEmail("");
      setCompany("");
      setNumber("");
      setTelOn("");
    }
  };

  return (
    <div className="min-h-screen w-full select-none flex flex-wrap">
      {/* Fundo animado */}
      <FundoAnimado />

      <div className="min-h-screen md:px-10 px-5 bg-[#121920] lg:w-2/5 w-full py-8">
        <div className="flex items-center w-full justify-between">
          <h2 className="md:text-2xl font-bold">
            Preencha o Formulário De Pedido
          </h2>

          {/* Logo */}
          <img src={Logo} alt="Logo da empresa" className="h-10" />
        </div>
        
        <p className="max-w-80 text-sm opacity-70 mt-4">
          O que precisar nós faremos! Aqui terás um registro do pedido da sua empresa
        </p>

        {/* Mensagens de status */}
        {status === "empty" && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            Por favor, preencha todos os campos obrigatórios.
          </div>
        )}
        {status === "success" && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
            Pedido enviado com sucesso!
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            Ocorreu um erro ao enviar o pedido. Tente novamente.
          </div>
        )}

        <form className="mt-11" onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className="flex w-full flex-col">
            <label htmlFor="email" className="text-sm">
              Email *
            </label>
            <div className="relative w-full">
              <img 
                src={IconEmail} 
                alt="Ícone de email" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5" 
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu email empresarial..."
                className="bg-transparent border-b-2 border-white pl-3 pr-[30px] py-2 mt-1 outline-none w-full h-[45px]"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col mt-[35px]">
            <label htmlFor="company" className="text-sm">
              Nome da Empresa *
            </label>
            <div className="relative w-full">
              <img 
                src={IconCompany} 
                alt="Ícone de empresa" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5" 
              />
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Digite o nome da sua empresa..."
                className="bg-transparent border-b-2 border-white pl-3 pr-[30px] py-2 mt-1 outline-none w-full h-[45px]"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col mt-[35px]">
            <label htmlFor="tel" className="text-sm">
              Número empresarial ou comercial *
            </label>
            <div className="relative w-full flex items-center gap-[10px] h-[45px] border-b-2 border-white">
              <img 
                src={IconTel} 
                alt="Ícone de telefone" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5" 
              />
              <label htmlFor="tel" className="border-r pr-[2%]">
                +244
              </label>
              <input
                type="tel"
                value={displayValue}
                id="tel"
                onChange={handleChangeSpaceTel}
                maxLength={11}
                pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                placeholder="000 000 000"
                className="bg-transparent outline-none w-full"
                required
              />
            </div>
          </div>
          
          <div className="flex w-full flex-col mt-[35px]">
            <label htmlFor="message" className="text-sm">
              Mensagem *
            </label>
            <div className="relative w-full">
              <img 
                src={IconMessage} 
                alt="Ícone de mensagem" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5" 
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="message"
                placeholder="Escreva seu pedido aqui..."
                className="bg-transparent border-b-2 border-white pl-3 pr-[30px] py-2 mt-1 outline-none w-full min-h-[100px]"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={status === "loading"}
            className="mt-5 bg-white text-gray-800 hover:opacity-80 flex justify-center font-medium py-3 px-10 rounded-md text-lg mx-auto w-full disabled:opacity-50"
          >
            {status === "loading" ? "Enviando..." : "Enviar Pedido"}
          </button>

          <Link to="/">
            <button 
              type="button"
              className="mt-5 bg-transparent text-white hover:opacity-80 font-medium py-1 px-5 rounded-md text-sm mx-auto flex"
            >
              Voltar
            </button>
          </Link>
        </form>
      </div>

      <div className="lg:min-h-screen h-auto lg:py-0 py-5 px-10 lg:w-3/5 w-full flex items-center justify-center flex-wrap">
        {/* Conteudo */}
        <div className="text-center lg:text-left">
          <img src={Logo} alt="Logo da empresa" className="mx-auto lg:mx-0 h-16" />
          <h2 className="sm:text-5xl text-4xl mt-3 font-extrabold">
            RCS Angola <br/>
            Melhor Serviço <br/> 
            Para Empresas <br/> 
            E Comércios
          </h2>

          <p className="max-w-80 text-gray-400 text-base mt-2 mx-auto lg:mx-0">
            Atendemos as suas expectativas com um atendimento de qualidade
          </p>
        </div>

        <img 
          src={ImgContentEmpresrio} 
          alt="Ilustração de empresário" 
          className="mt-8 lg:mt-0 max-w-full h-auto"
        />
      </div>
    </div>
  );
}