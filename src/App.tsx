/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingCart,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Flame,
  Lock,
  Mail,
  Building2,
  Loader2,
} from 'lucide-react';

interface Mascot {
  name: string;
  club: string;
  img: string;
}

interface Stadium {
  name: string;
  club: string;
  img: string;
}

interface Bonus {
  id: string;
  num: string;
  title: string;
  desc: string;
  img: string;
  fallback: string;
}

interface ValidationItem {
  id: string;
  img: string;
  fallback: string;
  alt: string;
}

interface TestimonialItem {
  id: number;
  img: string;
  fallback: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const BRANDS = [
  'CREALITY',
  'ELEGOO',
  'BAMBU LAB',
  'ANYCUBIC',
  'PRUSA 3D',
  'FLASHFORGE',
  'ARTILLERY',
  'VORON DESIGN',
];

const CATEGORIES = [
  { id: 'todos', name: 'Todos os Modelos', count: '500+' },
  { id: 'brasileirao', name: 'Futebol Brasileiro (Série A & B)', count: '180+' },
  { id: 'europeu', name: 'Futebol Europeu & Mundial', count: '120+' },
  { id: 'selecoes', name: 'Seleções & Copa do Mundo', count: '65+' },
  { id: 'trofeus', name: 'Taças, Troféus & Estádios 3D', count: '45+' },
  { id: 'acessorios', name: 'Canecas, Porta Copos & Chaveiros', count: '90+' },
];

const MASCOTS: Mascot[] = [
  { name: 'Palmeiras (Porco)', club: 'Palmeiras', img: '/assets/mascots/mascote-palmeiras-porco.webp' },
  { name: 'São Paulo', club: 'São Paulo', img: '/assets/mascots/mascote-sao-paulo.webp' },
  { name: 'Santos', club: 'Santos', img: '/assets/mascots/mascote-santos.webp' },
  { name: 'Botafogo', club: 'Botafogo', img: '/assets/mascots/mascote-botafogo.webp' },
  { name: 'Flamengo', club: 'Flamengo', img: '/assets/mascots/mascote-flamengo.webp' },
  { name: 'Palmeiras', club: 'Palmeiras', img: '/assets/mascots/mascote-palmeiras.webp' },
  { name: 'Atlético-MG', club: 'Atlético-MG', img: '/assets/mascots/mascote-atletico-mg.webp' },
  { name: 'Cruzeiro', club: 'Cruzeiro', img: '/assets/mascots/mascote-cruzeiro.webp' },
  { name: 'Grêmio', club: 'Grêmio', img: '/assets/mascots/mascote-gremio.webp' },
  { name: 'Internacional', club: 'Internacional', img: '/assets/mascots/mascote-internacional.webp' },
  { name: 'Vasco', club: 'Vasco', img: '/assets/mascots/mascote-vasco.webp' },
];

const STADIUMS: Stadium[] = [
  { name: 'Vila Belmiro', club: 'Santos', img: '/assets/stadiums/estadio-santos.webp' },
  { name: 'Neo Química Arena', club: 'Corinthians', img: '/assets/stadiums/estadio-corinthians.webp' },
  { name: 'Allianz Parque', club: 'Palmeiras', img: '/assets/stadiums/estadio-palmeiras.webp' },
  { name: 'Beira-Rio', club: 'Internacional', img: '/assets/stadiums/estadio-internacional.webp' },
  { name: 'São Januário', club: 'Vasco', img: '/assets/stadiums/estadio-vasco.webp' },
  { name: 'Morumbi', club: 'São Paulo', img: '/assets/stadiums/estadio-sao-paulo.webp' },
  { name: 'Arena MRV', club: 'Atlético-MG', img: '/assets/stadiums/estadio-arena-mrv.webp' },
  { name: 'Maracanã', club: 'Rio de Janeiro', img: '/assets/stadiums/estadio-maracana.webp' },
  { name: 'Arena do Grêmio', club: 'Grêmio', img: '/assets/stadiums/estadio-arena-gremio.webp' },
  { name: 'Maracanã Rubro-Negro', club: 'Flamengo', img: '/assets/stadiums/estadio-flamengo.webp' },
  { name: 'Couto Pereira', club: 'Coritiba', img: '/assets/stadiums/estadio-couto-pereira.webp' },
  { name: 'Aflitos – Náutico', club: 'Náutico', img: '/assets/stadiums/estadio-aflitos.webp' },
  { name: 'Mineirão', club: 'Cruzeiro / Minas', img: '/assets/stadiums/estadio-mineirao.webp' },
  { name: 'Nilton Santos', club: 'Botafogo', img: '/assets/stadiums/estadio-nilton-santos.webp' },
];

const BONUSES: Bonus[] = [
  {
    id: '1',
    num: '01',
    title: 'RÉPLICAS DE ESTÁDIOS DE FUTEBOL EM 3D',
    desc: 'Coleção especial de maquetes e réplicas de grandes estádios e arenas do futebol modelados para impressão 3D, com riqueza de detalhes para decoração e colecionadores.',
    img: '/assets/kMoygo7.webp',
    fallback: 'https://i.imgur.com/kMoygo7.png',
  },
  {
    id: '2',
    num: '02',
    title: 'CANECAS MONSTER 3D',
    desc: 'Modelos de canecas 3D exclusivas no estilo Monster com texturas agressivas e empunhaduras de alto impacto visual para personalização e venda rápida.',
    img: '/assets/2IhgTo5.webp',
    fallback: 'https://i.imgur.com/2IhgTo5.png',
  },
  {
    id: '3',
    num: '03',
    title: 'CANECA ESTILO MOLETOM 3D',
    desc: 'Design inovador e criativo de canecas 3D vestindo mini moletom com capuz e detalhes têxteis modelados, grande sucesso de procura para presentes.',
    img: '/assets/zuajik7.webp',
    fallback: 'https://i.imgur.com/zuajik7.png',
  },
  {
    id: '4',
    num: '04',
    title: 'CANECAS DE GAMES 3D',
    desc: 'Projetos de canecas 3D temáticas inspiradas nos maiores clássicos do universo gamer e cultura geek, com detalhes em alto relevo e altíssima demanda comercial.',
    img: '/assets/VcahILv.webp',
    fallback: 'https://i.imgur.com/VcahILv.png',
  },
  {
    id: '5',
    num: '05',
    title: 'CANECAS DE TIME EM RELEVO 3D',
    desc: 'Coleção de canecas 3D personalizadas dos maiores clubes de futebol, com escudos em alto relevo e empunhaduras temáticas para torcedores apaixonados.',
    img: '/assets/dSC6te6.webp',
    fallback: 'https://i.imgur.com/dSC6te6.png',
  },
];

const VALIDATION_ITEMS: ValidationItem[] = [
  {
    id: '1',
    img: '/assets/k8NGhmh.webp',
    fallback: 'https://i.imgur.com/k8NGhmh.png',
    alt: 'Mercado Comprovado - Vendas de Produtos de Times em Impressão 3D (1)',
  },
  {
    id: '2',
    img: '/assets/USQ9ivu.webp',
    fallback: 'https://i.imgur.com/USQ9ivu.png',
    alt: 'Mercado Comprovado - Vendas de Produtos de Times em Impressão 3D (2)',
  },
  {
    id: '3',
    img: '/assets/7Vejky0.webp',
    fallback: 'https://i.imgur.com/7Vejky0.png',
    alt: 'Mercado Comprovado - Vendas de Produtos de Times em Impressão 3D (3)',
  },
];

const GALLERY_ROW_1 = [
  '/assets/gallery/playstation.webp',
  '/assets/gallery/mortal_kombat.webp',
  '/assets/gallery/call_of_duty.webp',
  '/assets/gallery/gta.webp',
  '/assets/gallery/g_item_1.webp',
  '/assets/gallery/g_item_2.webp',
  '/assets/gallery/g_item_3.webp',
  '/assets/gallery/g_item_4.webp',
  '/assets/gallery/g_item_5.webp',
  '/assets/gallery/g_item_6.webp',
];

const GALLERY_ROW_2 = [
  '/assets/gallery/g_item_7.webp',
  '/assets/gallery/g_item_8.webp',
  '/assets/gallery/g_item_9.webp',
  '/assets/gallery/g_item_10.webp',
  '/assets/gallery/g_item_11.webp',
  '/assets/gallery/g_item_12.webp',
  '/assets/gallery/g_item_13.webp',
  '/assets/gallery/g_item_14.webp',
  '/assets/gallery/g_item_15.webp',
  '/assets/gallery/g_item_16.webp',
];

const TESTIMONIALS: TestimonialItem[] = [
  { id: 1, img: '/assets/6m6ZBlW.webp', fallback: 'https://i.imgur.com/6m6ZBlW.png' },
  { id: 2, img: '/assets/u6Ni9cj.webp', fallback: 'https://i.imgur.com/u6Ni9cj.png' },
  { id: 3, img: '/assets/ClBxb0D.webp', fallback: 'https://i.imgur.com/ClBxb0D.png' },
  { id: 4, img: '/assets/Mpywmfj.webp', fallback: 'https://i.imgur.com/Mpywmfj.png' },
  { id: 5, img: '/assets/jpBrWyK.webp', fallback: 'https://i.imgur.com/jpBrWyK.png' },
  { id: 6, img: '/assets/Ys2ErTe.webp', fallback: 'https://i.imgur.com/Ys2ErTe.png' },
];

const FAQ_DATA: FaqItem[] = [
  {
    q: 'Os mascotes são compatíveis com a minha impressora 3D?',
    a: 'Sim! Todos os mais de 500 arquivos estão em formato STL padrão universal e funcionam em qualquer fatiador (Bambu Studio, Cura, PrusaSlicer, OrcaSlicer, Chitubox, Anycubic Workshop) e em qualquer impressora 3D FDM (Filamento) ou Resina (Bambu Lab, Creality K1/Ender, Elegoo, Anycubic, Sovol, Flashforge, etc.).',
  },
  {
    q: 'Posso vender as peças físicas que eu imprimir?',
    a: 'Com certeza! No Pacote Completo VIP do Acervo de Mascotes 3D você recebe a Licença Comercial inclusa, que te dá autorização total para imprimir e vender as peças físicas prontas para clientes, em lojas, no Mercado Livre, Shopee, Instagram ou sob encomenda. O que não é permitido é revender ou redistribuir os arquivos digitais STL.',
  },
  {
    q: 'Os modelos já vêm divididos com pinos e encaixes?',
    a: 'Sim! Os modelos do acervo contam com divisão inteligente para peças de encaixe perfeito. Isso permite que você imprima cada parte com a cor desejada ou pinte com facilidade, sem a necessidade de suportes excessivos e evitando desperdício de filamento.',
  },
  {
    q: 'Como e quando recebo o acesso ao acervo?',
    a: 'O envio é imediato e 100% automático! Assim que o seu pagamento for aprovado (no Pix ou Cartão de Crédito é instantâneo), você receberá no seu e-mail cadastrado as credenciais de login para a Área de Membros VIP com todos os arquivos prontos para download em nuvem de alta velocidade.',
  },
  {
    q: 'O acesso ao catálogo tem prazo ou mensalidade?',
    a: 'Não! O pagamento é único, sem nenhuma taxa mensal ou anuidade. Seu acesso ao Acervo de Mascotes 3D é vitalício e você receberá gratuitamente todas as novas adições e atualizações de novos mascotes que forem adicionados.',
  },
  {
    q: 'Como funciona a Garantia de 14 Dias?',
    a: 'Você tem 14 dias de garantia incondicional e risco zero. Acesse a plataforma, baixe os arquivos de teste e confira a qualidade de perto. Se por qualquer motivo você não ficar satisfeito, basta solicitar o reembolso na plataforma que devolvemos 100% do valor pago.',
  },
];

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const trackInitiateCheckout = (contentName: string, value: number) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: contentName,
      value: value,
      currency: 'BRL',
    });
  }
};

export default function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);
  const [isHeroVideoBuffering, setIsHeroVideoBuffering] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [viewedTestimonials, setViewedTestimonials] = useState<number[]>([0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'termos' | 'privacidade' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Low-end mobile carousel viewport pause state to eliminate background GPU workload
  const [isBrandsInView, setIsBrandsInView] = useState(true);
  const [isModelosInView, setIsModelosInView] = useState(false);
  const [isGaleriaInView, setIsGaleriaInView] = useState(false);

  useEffect(() => {
    setViewedTestimonials((prev) => (prev.includes(activeTestimonial) ? prev : [...prev, activeTestimonial]));
  }, [activeTestimonial]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsBrandsInView(true);
      setIsModelosInView(true);
      setIsGaleriaInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'brands-marquee') {
            setIsBrandsInView(entry.isIntersecting);
          } else if (entry.target.id === 'modelos-carrossel') {
            setIsModelosInView(entry.isIntersecting);
          } else if (entry.target.id === 'galeria-modelos-carrossel') {
            setIsGaleriaInView(entry.isIntersecting);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    const brandsEl = document.getElementById('brands-marquee');
    const modelosEl = document.getElementById('modelos-carrossel');
    const galeriaEl = document.getElementById('galeria-modelos-carrossel');

    if (brandsEl) observer.observe(brandsEl);
    if (modelosEl) observer.observe(modelosEl);
    if (galeriaEl) observer.observe(galeriaEl);

    return () => observer.disconnect();
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const handlePlayHeroVideo = () => {
    setIsHeroVideoPlaying(true);
    setIsHeroVideoBuffering(true);
    if (heroVideoRef.current) {
      if (!heroVideoRef.current.src) {
        heroVideoRef.current.src = '/assets/hero-video.mp4';
      }
      heroVideoRef.current.play().catch(() => {
        if (heroVideoRef.current && heroVideoRef.current.src.indexOf('imgur') === -1) {
          heroVideoRef.current.src = 'https://i.imgur.com/2CZ8y3Q.mp4';
          heroVideoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    setIsVideoBuffering(true);
    if (videoRef.current) {
      if (!videoRef.current.src) {
        videoRef.current.src = '/assets/video-catalogo.mp4';
      }
      videoRef.current.play().catch(() => {
        if (videoRef.current && videoRef.current.src.indexOf('imgur') === -1) {
          videoRef.current.src = 'https://i.imgur.com/it19bfB.mp4#t=0.001';
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const scrollToOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('oferta-pro')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('validacao-mercado')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080203] text-white relative antialiased selection:bg-[#FF0033] selection:text-white font-sans">
      {/* Background stars and red aura */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-stars opacity-75"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#FF0033]/15 via-transparent to-transparent pointer-events-none z-[-1] blur-2xl"></div>

      {/* Top Banner */}
      <header className="w-full bg-[#180305] border-b border-[#FF0033]/40 py-2.5 px-4 text-center relative z-30">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-display font-black tracking-wider uppercase text-[#FF0033]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0033] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0033]"></span>
          </span>
          <span>⚽ +500 MODELOS STL DOS MAIORES MASCOTES DO FUTEBOL BRASILEIRO E MUNDIAL</span>
          <span className="hidden md:inline text-zinc-400">• LICENÇA COMERCIAL 100% LIBERADA</span>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero-section" className="relative pb-16 overflow-hidden pt-4 md:pt-8">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[700px] md:h-[450px] bg-[#FF0033]/15 rounded-full blur-2xl md:blur-3xl pointer-events-none"></div>
        <div className="w-full relative z-20 flex flex-col items-center pt-4 md:pt-10 pb-2 px-3 sm:px-4 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF0033]/10 border border-[#FF0033]/40 text-[#FF0033] text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(255,0,51,0.3)]">
            <span className="text-yellow-400 tracking-normal text-sm">★★★★★</span>
            <span>CATÁLOGO OFICIAL • ACERVO DE MASCOTES 3D</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-[clamp(18px,4.2vw,38px)] sm:text-3xl md:text-4xl lg:text-[2.65rem] tracking-tight leading-snug sm:leading-[1.2] uppercase inline-block text-center mx-auto select-none">
            <span className="block text-white drop-shadow-md">VOCÊ NÃO COMPROU UMA IMPRESSORA 3D</span>
            <span className="block mt-1 sm:mt-1.5">
              <span className="text-white drop-shadow-md">PARA DEIXÁ-LA PARADA. </span>
              <span className="grad-text">DESCUBRA OS MASCOTES</span>
            </span>
            <span className="block mt-1 sm:mt-1.5 grad-text">DOS MAIORES TIMES DE FUTEBOL PARA IMPRIMIR E</span>
            <span className="block mt-1 sm:mt-1.5 text-[#FF0033] drop-shadow-[0_0_25px_rgba(255,0,51,0.65)]">
              VENDER COM ALTA MARGEM DE LUCRO!
            </span>
          </h1>

          {/* Hero Video (Layout de Celular 9:16) */}
          <div className="w-full relative z-10 flex flex-col items-center mt-6 mb-8">
            <div className="relative w-full max-w-[315px] xs:max-w-[345px] sm:max-w-[380px] md:max-w-[420px] mx-auto flex items-center justify-center">
              {/* Red ambient aura behind the phone */}
              <div className="absolute inset-0 bg-[#FF0033]/25 blur-3xl rounded-full scale-105 pointer-events-none"></div>

              {/* Smartphone Frame Chassis */}
              <div className="relative z-10 w-full rounded-[44px] sm:rounded-[50px] bg-gradient-to-b from-[#380A0E] via-[#1F0508] to-[#0D0204] p-2.5 sm:p-3.5 border-[3px] border-[#FF0033]/60 shadow-[0_25px_65px_rgba(0,0,0,0.95),0_0_45px_rgba(255,0,51,0.35)] ring-1 ring-white/15">
                
                {/* Smartphone Screen (Aspect 9:16) */}
                <div className="relative w-full aspect-[9/16] rounded-[34px] sm:rounded-[40px] overflow-hidden bg-black border border-[#FF0033]/40 shadow-inner flex items-center justify-center group">
                  
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-4.5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md border border-white/5 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-[#200508] border border-white/10 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#FF0033]/70"></div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  </div>

                  {/* 9:16 Video Player */}
                  <video
                    ref={heroVideoRef}
                    id="hero-video-player"
                    src="/assets/hero-video.mp4"
                    playsInline
                    preload="none"
                    poster="/assets/hero-video-poster.webp"
                    controls={isHeroVideoPlaying}
                    onPlaying={() => setIsHeroVideoBuffering(false)}
                    onWaiting={() => setIsHeroVideoBuffering(true)}
                    onCanPlay={() => setIsHeroVideoBuffering(false)}
                    onPause={() => setIsHeroVideoBuffering(false)}
                    className="w-full h-full object-cover select-none"
                    onError={(e) => {
                      if (e.currentTarget.src.indexOf('imgur') === -1) {
                        e.currentTarget.src = 'https://i.imgur.com/2CZ8y3Q.mp4';
                      }
                    }}
                  >
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                    <source src="https://i.imgur.com/2CZ8y3Q.mp4" type="video/mp4" />
                    Seu navegador não suporta a reprodução deste vídeo.
                  </video>

                  {/* Mobile Video Buffering Indicator */}
                  {isHeroVideoPlaying && isHeroVideoBuffering && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 pointer-events-none">
                      <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/80 border border-[#FF0033]/40 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-[#FF0033] animate-spin" />
                        <span className="text-[11px] font-bold tracking-wider text-white uppercase">Carregando...</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Play Button Overlay */}
                  {!isHeroVideoPlaying && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handlePlayHeroVideo}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePlayHeroVideo();
                      }}
                      aria-label="Assistir demonstração dos mascotes 3D"
                      className="absolute inset-0 w-full h-full cursor-pointer flex flex-col items-center justify-center z-20 group/play select-none bg-black/40 hover:bg-black/25 transition-all duration-300"
                    >
                      <div className="relative z-10 flex flex-col items-center gap-3 group-hover/play:scale-105 transition-transform duration-300">
                        <div className="relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0033] opacity-60"></span>
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#B8001F] via-[#FF0033] to-[#B8001F] hover:from-[#D90429] hover:via-[#FF264D] hover:to-[#D90429] flex items-center justify-center shadow-[0_0_35px_rgba(255,0,51,0.9)] border-2 border-white/80">
                            <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1 drop-shadow" />
                          </div>
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#FF0033]/50 text-[#FF0033] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                          Assistir Vídeo
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Home Indicator Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none"></div>
                </div>
              </div>

              {/* Bottom floor shadow reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/90 rounded-[100%] blur-xl pointer-events-none"></div>
            </div>

            <p className="mt-7 mb-2 text-zinc-200 text-base sm:text-lg md:text-xl max-w-2xl text-center font-normal leading-relaxed px-4">
              Tenha acesso a uma Central 3D com mais de 500 modelos de mascotes selecionados, alta demanda comercial e novas ideias para você imprimir, anunciar e vender — sem passar horas procurando arquivos aleatórios pela internet.
            </p>
            <div className="mt-6 w-full max-w-md px-2 flex flex-col items-center">
              <a
                href="#oferta-pro"
                onClick={scrollToOffer}
                className="group w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-base sm:text-lg uppercase tracking-wide py-4 px-6 rounded-2xl text-center shadow-[0_0_40px_rgba(0,255,102,0.8),0_0_20px_rgba(0,255,102,0.5)] hover:shadow-[0_0_55px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              >
                <ShoppingCart className="w-6 h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform" />
                <span>QUERO MEU ACESSO AGORA</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brands Marquee */}
        <div id="brands-marquee" className="w-full overflow-hidden relative mb-4 pointer-events-none select-none">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div
            className="marquee pointer-events-none select-none"
            style={{ animationPlayState: isBrandsInView ? 'running' : 'paused' }}
          >
            <div className="flex items-center gap-16 px-8 shrink-0">
              {BRANDS.map((brand, idx) => (
                <span key={`brand-1-${idx}`} className="text-zinc-500 font-display font-bold text-xl tracking-widest hover:text-[#FF0033] transition-colors">
                  {brand}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-16 px-8 shrink-0" aria-hidden="true">
              {BRANDS.map((brand, idx) => (
                <span key={`brand-2-${idx}`} className="text-zinc-500 font-display font-bold text-xl tracking-widest hover:text-[#FF0033] transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modelos e Estádios Section */}
      <section id="modelos-carrossel" className="pt-0 pb-16 relative section-lazy">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF0033]/10 border border-[#FF0033]/30 text-[#FF0033] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(255,0,51,0.25)]">
              ⚽ COLEÇÃO COMPLETA DE MASCOTES E ESTÁDIOS EM ALTA DEFINIÇÃO
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 leading-tight">
              Mascotes e Estádios que <span className="grad-text">despertam a paixão</span> do torcedor.
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Modelos divididos por partes com geometria limpa para impressão FDM e Resina. Peças perfeitas para estantes, presentes, maquetes e coleções de alto valor comercial.
            </p>
          </div>
        </div>

        {/* Marquee Row 1 - Mascotes */}
        <div className="w-full overflow-hidden relative mb-4 sm:mb-6 pointer-events-none select-none">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div
            className="marquee-cards pointer-events-none select-none"
            style={{ animationPlayState: isModelosInView ? 'running' : 'paused' }}
          >
            {[...MASCOTS, ...MASCOTS].map((m, idx) => (
              <div
                key={`mascot-${idx}`}
                className="marquee-item rounded-2xl overflow-hidden shrink-0 w-40 sm:w-52 md:w-60 aspect-square bg-[#140305] border border-[#FF0033]/35 md:hover:border-[#FF0033] md:hover:shadow-[0_0_20px_rgba(255,0,51,0.45)] transition-all duration-300 mx-2 relative"
              >
                <img
                  alt={m.name}
                  width="260"
                  height="260"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx < 4 ? 'auto' : 'low'}
                  className="w-full h-full object-cover select-none"
                  src={m.img}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Estádios (Reverse) */}
        <div className="w-full overflow-hidden relative pointer-events-none select-none">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div
            className="marquee-cards-reverse pointer-events-none select-none"
            style={{ animationPlayState: isModelosInView ? 'running' : 'paused' }}
          >
            {[...STADIUMS, ...STADIUMS].map((s, idx) => (
              <div
                key={`stadium-${idx}`}
                className="marquee-item rounded-2xl overflow-hidden shrink-0 w-40 sm:w-52 md:w-60 aspect-square bg-[#140305] border border-[#FF0033]/35 md:hover:border-[#FF0033] md:hover:shadow-[0_0_20px_rgba(255,0,51,0.45)] transition-all duration-300 mx-2 relative"
              >
                <img
                  alt={s.name}
                  width="260"
                  height="260"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx < 4 ? 'auto' : 'low'}
                  className="w-full h-full object-cover select-none"
                  src={s.img}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center w-full px-4">
          <a
            href="#oferta-pro"
            onClick={scrollToOffer}
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.8),0_0_15px_rgba(0,255,102,0.5)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform" />
            <span>LIBERAR TODOS OS MASCOTES E ESTÁDIOS 3D</span>
          </a>
        </div>
      </section>

      {/* Mockup Notebook / Central 3D Section */}
      <section id="mockup-notebook" className="py-16 md:py-24 relative bg-[#0A0204] overflow-hidden border-t border-[#FF0033]/25 section-lazy">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0033]/10 text-[#FF0033] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF0033]/30">
              Área de Membros VIP 100% Organizada
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
              Conheça a <span className="grad-text drop-shadow-[0_0_25px_rgba(255,0,51,0.6)]">Central de Mascotes 3D</span> por dentro
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3.5 font-normal leading-relaxed">
              Você não vai precisar perder tempo caçando arquivos sem qualidade pela internet. No <strong className="text-white font-semibold">Acervo de Mascotes 3D</strong>, tudo está catalogado por campeonatos e clubes para você baixar em segundos e imprimir com segurança.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B8001F] via-[#FF0033] to-[#B8001F] text-white font-extrabold shadow-[0_0_15px_rgba(255,0,51,0.6)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                      : 'bg-[#180406] text-zinc-300 border border-[#FF0033]/30 hover:border-[#FF0033]'
                  }`}
                >
                  {cat.name} <span className="text-[10px] opacity-80">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Laptop Mockup */}
          <div className="max-w-4xl md:max-w-5xl mx-auto relative px-2 sm:px-4 md:px-6">
            <div className="relative z-10">
              <div className="relative bg-[#240609] rounded-t-[20px] sm:rounded-t-[26px] md:rounded-t-[32px] rounded-b-[4px] p-2 sm:p-2.5 md:p-3.5 border-2 border-[#FF0033] shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
                {/* Webcam & Top Notch */}
                <div className="flex items-center justify-center relative -mb-1 z-20">
                  <div className="w-10 sm:w-14 h-2 sm:h-2.5 bg-[#0A0E0B] rounded-b-md flex items-center justify-center gap-1.5 shadow-inner">
                    <div className="w-1 h-1 rounded-full bg-[#1A251C] border border-white/20"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-[#FF0033] opacity-75"></div>
                  </div>
                </div>

                {/* Screen Area with Video (Zero bytes loaded until play) */}
                <div
                  id="notebook-screen-area"
                  className="relative rounded-md sm:rounded-lg md:rounded-xl overflow-hidden bg-[#000000] aspect-[16/9] border border-[#FF0033]/40 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] flex items-center justify-center group"
                >
                  <video
                    ref={videoRef}
                    id="video-catalogo-notebook"
                    src="/assets/video-catalogo.mp4"
                    playsInline
                    preload="none"
                    poster="/assets/video-poster.webp"
                    controls={isVideoPlaying}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.currentTarget.src.indexOf('imgur') === -1) {
                        e.currentTarget.src = 'https://i.imgur.com/it19bfB.mp4#t=0.001';
                      }
                    }}
                  >
                    Seu navegador não suporta a reprodução de vídeo.
                  </video>

                  {!isVideoPlaying && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handlePlayVideo}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePlayVideo();
                      }}
                      aria-label="Assistir tour pela Área de Membros"
                      className="absolute inset-0 w-full h-full cursor-pointer flex flex-col items-center justify-center z-20 group select-none bg-black/35 hover:bg-black/20 transition-colors"
                    >
                      <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-2.5 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-11 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-[14px] sm:rounded-[18px] bg-gradient-to-r from-[#B8001F] via-[#FF0033] to-[#B8001F] hover:from-[#D90429] hover:to-[#D90429] flex items-center justify-center shadow-[0_4px_30px_rgba(255,0,51,0.8)] group-hover:shadow-[0_6px_45px_rgba(255,0,51,1)] transition-all duration-300 border border-red-300">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white fill-white ml-1 drop-shadow" />
                        </div>
                        <span className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-[#FF0033]/40 text-[#FF0033] font-display font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                          Tour pela Área de Membros
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Laptop Hinge & Base */}
              <div className="w-32 sm:w-44 md:w-56 h-1.5 sm:h-2 md:h-2.5 bg-[#140305] border-t border-[#2C0C10] mx-auto rounded-b-sm shadow-sm"></div>
              <div className="relative -mt-1 w-[104%] -ml-[2%] h-3.5 sm:h-4.5 md:h-5.5 bg-gradient-to-b from-[#2C0C10] via-[#1A0507] to-[#0A0203] rounded-b-[16px] sm:rounded-b-[22px] md:rounded-b-[26px] shadow-[0_30px_70px_rgba(0,0,0,0.95)] border-t border-white/20 flex justify-center items-start">
                <div className="w-20 sm:w-28 md:w-36 h-1 sm:h-1.5 bg-[#100305] rounded-b-md border-x border-b border-[#3A1015] shadow-inner"></div>
              </div>
              <div className="w-[75%] h-3 bg-gradient-to-r from-transparent via-[#FF0033]/40 to-transparent blur-md mx-auto -mt-2.5 pointer-events-none"></div>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400">
                  <Play className="w-3.5 h-3.5 text-[#FF0033]" />
                  Acesse por computador ou celular, baixe o modelo STL do seu time e imprima!
                </span>
              </div>
            </div>
          </div>

          {/* Por que mascotes vendem tanto */}
          <div className="mt-12 sm:mt-16 md:mt-18 max-w-2xl mx-auto relative z-10 px-4 text-center">
            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight mb-3">
              “POR QUE MASCOTES DE FUTEBOL VENDEM TANTO?”
            </h3>
            <p className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-4">
              O torcedor brasileiro é apaixonado e consome produtos do seu clube o ano todo:
            </p>
            <div className="max-w-xl mx-auto space-y-2.5 sm:space-y-3 my-5 sm:my-6 text-left inline-block">
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Presentes de aniversário, Dia dos Pais e Dia das Crianças
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Finais de campeonato, títulos e clássicos estaduais
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Decoração de mesas de trabalho, escritórios e barzinhos
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Colecionadores fanáticos que compram a coleção inteira do time
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Custo baixíssimo de filamento (R$ 8 a R$ 14 por peça)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF0033] text-xl sm:text-2xl font-black shrink-0">✓</span>
                <p className="text-zinc-200 text-base sm:text-lg font-medium leading-snug">
                  Preço de venda excelente (R$ 65 a R$ 180 a unidade finalizada)
                </p>
              </div>
            </div>
            <p className="text-white font-display font-black text-lg sm:text-xl md:text-2xl mt-6 mb-4 leading-snug">
              Você não precisa convencer ninguém. A torcida já é apaixonada.
            </p>
            <div className="mt-4 mb-2">
              <a
                href="#validacao-mercado"
                onClick={scrollToValidation}
                className="inline-flex items-center gap-1.5 text-[#FF0033] hover:text-[#FF4D6D] text-base sm:text-lg font-bold tracking-wide transition-colors cursor-pointer"
              >
                Ver Demanda de Mercado ↓
              </a>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center w-full px-4 relative z-20">
            <a
              href="#oferta-pro"
              onClick={scrollToOffer}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.7),0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform drop-shadow" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">ACESSAR ACERVO VIP DE MASCOTES</span>
            </a>
          </div>
        </div>
      </section>

      {/* Validação de Mercado (Optimized WebP, 97% payload savings) */}
      <section id="validacao-mercado" className="pt-8 pb-16 relative bg-[#070102] section-lazy">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0033]/10 text-[#FF0033] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF0033]/30">
              Comprovações Reais de Vendas
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-4">
              Existe um <span className="grad-text">mercado milionário</span> para colecionáveis esportivos 3D
            </h2>
            <p className="text-zinc-300 font-light text-base md:text-lg leading-relaxed">
              Veja como produtos criados com impressoras 3D acumulam milhares de vendas nos maiores marketplaces do país com altas avaliações e clientes satisfeitos.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            {VALIDATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl overflow-hidden bg-zinc-950 border-2 border-[#FF0033]/50 shadow-[0_0_35px_rgba(255,0,51,0.3)] relative w-full p-2 sm:p-4"
              >
                <img
                  alt={item.alt}
                  width="800"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[1774/887] object-contain rounded-2xl select-none"
                  src={item.img}
                  onError={(e) => {
                    e.currentTarget.src = item.fallback;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center w-full px-4">
            <a
              href="#oferta-pro"
              onClick={scrollToOffer}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.7),0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform drop-shadow" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">QUERO VENDER MASCOTES DO MEU TIME</span>
            </a>
          </div>
        </div>
      </section>

      {/* Super Bônus (Optimized WebP) */}
      <section id="bonus" className="bg-[#080203] relative border-y border-[#FF0033]/25 overflow-hidden py-16 md:py-24 section-lazy">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 md:w-[700px] md:h-[350px] bg-[#FF0033]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl text-center">
          <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest mb-3 text-[#FF0033]">
            5 SUPER BÔNUS EXCLUSIVOS INCLUSOS NO PACOTE VIP
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-display font-black uppercase tracking-tight mb-5 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] max-w-4xl mx-auto leading-tight">
            AMPLIE SEU CATÁLOGO COM ESTÁDIOS 3D, CANECAS MONSTER, MOLETOM, GAMES E TIMES!
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg lg:text-xl font-normal max-w-3xl mx-auto mb-12 sm:mb-14 leading-relaxed">
            Ao garantir o seu acesso hoje, você não leva apenas os mascotes 3D — você recebe gratuitamente os 5 super bônus exclusivos abaixo para montar uma vitrine completa e altamente lucrativa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-4.5 max-w-7xl mx-auto text-left">
            {BONUSES.map((b) => (
              <div
                key={b.id}
                id={`bonus-card-${b.id}`}
                className="w-full bg-[#160305] border border-[#FF0033]/35 hover:border-[#FF0033] rounded-2xl flex flex-col transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,51,0.35)] group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF0033] to-transparent z-10 pointer-events-none"></div>
                <div className="w-full aspect-square bg-black/60 relative overflow-hidden shrink-0">
                  <img
                    alt={b.title}
                    width="500"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    src={b.img}
                    onError={(e) => {
                      e.currentTarget.src = b.fallback;
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start">
                  <div className="mb-2">
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-[#FF0033] bg-[#FF0033]/10 px-2.5 py-0.5 rounded-full border border-[#FF0033]/30 mb-1.5">
                      🎁 BÔNUS {b.num}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight leading-snug">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-14 flex justify-center w-full px-4">
            <a
              href="#oferta-pro"
              onClick={scrollToOffer}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.7),0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform drop-shadow" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">GARANTIR ACERVO + 5 BÔNUS EXCLUSIVOS</span>
            </a>
          </div>
        </div>
      </section>

      {/* Galeria de Mais Modelos */}
      <section id="galeria-modelos-carrossel" className="py-12 md:py-16 bg-[#080203] relative overflow-hidden border-t border-white/5 section-lazy">
        <div className="container mx-auto px-4 max-w-7xl mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF0033]/10 border border-[#FF0033]/30 text-[#FF0033] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(255,0,51,0.25)]">
            ⚡ MAIS DE 500 PROJETOS PRONTOS PARA IMPRESSÃO 3D
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white">
            VEJA MAIS ARQUIVOS <span className="grad-text">INCLUSOS NO SEU ACERVO</span>
          </h2>
        </div>

        {/* Row 1 */}
        <div className="w-full overflow-hidden relative mb-4 sm:mb-6 pointer-events-none select-none">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-cards pointer-events-none select-none">
            {[...GALLERY_ROW_1, ...GALLERY_ROW_1].map((imgUrl, idx) => (
              <div
                key={`gallery-r1-${idx}`}
                className="marquee-item rounded-2xl overflow-hidden shrink-0 w-40 sm:w-52 md:w-60 aspect-square bg-[#140305] border border-[#FF0033]/35 md:hover:border-[#FF0033] md:hover:shadow-[0_0_20px_rgba(255,0,51,0.45)] transition-all duration-300 mx-2 relative"
              >
                <img
                  alt={`Modelo 3D ${idx + 1}`}
                  width="250"
                  height="250"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                  src={imgUrl}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="w-full overflow-hidden relative pointer-events-none select-none">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#080203] to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-cards-reverse pointer-events-none select-none">
            {[...GALLERY_ROW_2, ...GALLERY_ROW_2].map((imgUrl, idx) => (
              <div
                key={`gallery-r2-${idx}`}
                className="marquee-item rounded-2xl overflow-hidden shrink-0 w-40 sm:w-52 md:w-60 aspect-square bg-[#140305] border border-[#FF0033]/35 md:hover:border-[#FF0033] md:hover:shadow-[0_0_20px_rgba(255,0,51,0.45)] transition-all duration-300 mx-2 relative"
              >
                <img
                  alt={`Modelo 3D ${idx + 1}`}
                  width="250"
                  height="250"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                  src={imgUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Real Phone Mockup (Optimized WebP, Low GPU footprint) */}
      <section id="depoimento" className="bg-[#080203] relative border-t border-white/5 py-16 md:py-24 overflow-hidden section-lazy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[500px] md:h-[500px] bg-[#FF0033]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0033]/10 text-[#FF0033] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF0033]/30">
              Makers e Impressores de Todo o Brasil
            </span>
            <h2 id="depoimento-titulo" className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight mb-3">
              QUEM ACESSOU JÁ ESTÁ <span className="grad-text">IMPRIMINDO E FATURANDO</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              Veja os resultados de quem parou de deixar a máquina desligada e começou a vender colecionáveis de times com fila de pedidos.
            </p>
          </div>

          {/* Celular Mockup with Controls */}
          <div id="celular-depoimento-slider" className="relative w-full max-w-4xl mx-auto flex items-center justify-center gap-1.5 xs:gap-3 sm:gap-6 md:gap-8 px-1 sm:px-4">
            {/* Prev Button */}
            <button
              id="btn-depoimento-anterior"
              type="button"
              onClick={handlePrevTestimonial}
              aria-label="Ver depoimento anterior"
              className="group w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-zinc-950/95 hover:bg-zinc-900 text-white border-2 border-[#FF0033] shadow-[0_0_15px_rgba(255,0,51,0.4)] hover:shadow-[0_0_30px_rgba(255,0,51,0.75)] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer z-30 flex items-center justify-center shrink-0"
            >
              <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#FF0033] group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Smartphone Shell */}
            <div id="celular-depoimento-wrapper" className="relative flex justify-center items-center select-none">
              <div className="absolute inset-0 bg-[#FF0033]/20 blur-2xl rounded-full transform scale-95 pointer-events-none"></div>
              <div
                id="celular-depoimento-frame"
                className="relative w-[295px] xs:w-[330px] sm:w-[380px] md:w-[430px] lg:w-[460px] max-w-[80vw] xs:max-w-[82vw] sm:max-w-[84vw] rounded-[36px] sm:rounded-[48px] pt-2.5 pb-3 px-1.5 xs:pt-3 xs:pb-3.5 xs:px-2 sm:pt-4 sm:pb-4 sm:px-3 bg-gradient-to-b from-[#380A0E] via-[#1F0508] to-[#0D0204] shadow-[0_0_35px_rgba(255,0,51,0.45),0_30px_90px_rgba(0,0,0,0.95)] border-[3px] sm:border-4 border-[#FF0033] ring-2 ring-[#FF0033]/40 flex flex-col"
              >
                {/* Physical buttons on sides */}
                <div className="absolute -left-[3.5px] top-20 sm:top-24 w-[3.5px] h-6 sm:h-8 bg-[#FF0033]/80 rounded-l-sm"></div>
                <div className="absolute -left-[3.5px] top-30 sm:top-36 w-[3.5px] h-10 sm:h-12 bg-[#FF0033]/80 rounded-l-sm"></div>
                <div className="absolute -left-[3.5px] top-44 sm:top-52 w-[3.5px] h-10 sm:h-12 bg-[#FF0033]/80 rounded-l-sm"></div>
                <div className="absolute -right-[3.5px] top-24 sm:top-28 w-[3.5px] h-14 sm:h-16 bg-[#FF0033]/80 rounded-r-sm"></div>

                {/* Speaker & Sensor */}
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
                  <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-zinc-600 rounded-full opacity-80"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF0033]/60 border border-zinc-600"></div>
                </div>

                {/* Inner Screen */}
                <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#efeae2] border border-white/40 shadow-inner aspect-[9/16] w-full">
                  {TESTIMONIALS.map((item, idx) => {
                    const isCurrent = activeTestimonial === idx;
                    return (
                      <img
                        key={`testim-${item.id}`}
                        id={`celular-depoimento-img-${item.id}`}
                        alt={`Depoimento real de aluno - Universo 3D ${item.id}`}
                        width="450"
                        height="800"
                        className={`absolute inset-0 w-full h-full object-cover object-top select-none transition-opacity duration-300 ease-in-out ${
                          isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                        loading="lazy"
                        decoding="async"
                        src={item.img}
                        onError={(e) => {
                          e.currentTarget.src = item.fallback;
                        }}
                      />
                    );
                  })}
                </div>

                {/* Home Indicator bar */}
                <div className="mt-1.5 sm:mt-2.5 flex justify-center">
                  <div className="w-16 sm:w-24 h-1 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              id="btn-depoimento-proximo"
              type="button"
              onClick={handleNextTestimonial}
              aria-label="Ver próximo depoimento"
              className="group w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-zinc-950/95 hover:bg-zinc-900 text-white border-2 border-[#FF0033] shadow-[0_0_15px_rgba(255,0,51,0.4)] hover:shadow-[0_0_30px_rgba(255,0,51,0.75)] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer z-30 flex items-center justify-center shrink-0"
            >
              <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#FF0033] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div id="depoimento-indicadores" className="mt-8 flex flex-col items-center gap-2.5 z-20">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full h-2.5 cursor-pointer ${
                    activeTestimonial === idx
                      ? 'w-8 bg-[#FF0033] shadow-[0_0_12px_rgba(255,0,51,0.9)]'
                      : 'w-2.5 bg-zinc-600 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center w-full px-4">
            <a
              href="#oferta-pro"
              onClick={scrollToOffer}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.7),0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform drop-shadow" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">QUERO TER ESSES RESULTADOS</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing / Oferta Section */}
      <section id="oferta" className="bg-[#080203] relative border-b border-white/5 py-20 md:py-24 section-lazy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[650px] md:h-[650px] bg-[#FF0033]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="text-center mb-10 md:mb-12 w-full flex flex-col items-center justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 md:w-96 md:h-40 bg-[#FF0033]/25 blur-xl md:blur-[70px] rounded-full pointer-events-none"></div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0033]/10 text-[#FF0033] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF0033]/30">
              Pagamento Único • Sem Mensalidades
            </div>
            <h2
              className="relative z-10 font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-4 text-center leading-tight"
              style={{
                textShadow: 'rgba(255, 255, 255, 0.6) 0px 0px 25px, rgba(255, 0, 51, 0.65) 0px 0px 50px',
              }}
            >
              ESCOLHA O PLANO IDEAL<br />
              <span className="inline-block mt-2 md:mt-3 text-[#FF0033]">PARA A SUA PRODUÇÃO</span>
            </h2>
            <p className="relative z-10 text-zinc-300 font-light text-base md:text-xl text-center mx-auto mt-2 max-w-2xl">
              Acesso imediato e vitalício liberado no seu e-mail logo após a confirmação.
            </p>
          </div>

          <div className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10">
            {/* Plano Base */}
            <div className="w-full lg:max-w-[420px] border border-white/10 rounded-3xl py-7 px-6 sm:px-8 opacity-95 hover:opacity-100 transition-opacity flex flex-col bg-black/40 backdrop-blur-md">
              <div className="text-center mb-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3">
                  Plano Inicial
                </span>
                <h3 className="font-display font-black text-lg uppercase tracking-wider text-white">Coleção Base</h3>
              </div>

              <div className="border-b border-white/10 pb-4 mb-5 text-center">
                <p className="text-xs text-zinc-500 line-through mb-0.5">De R$ 47,00</p>
                <div className="flex justify-center items-baseline gap-1 mb-1">
                  <span className="text-lg text-zinc-400 font-bold">R$</span>
                  <span className="text-4xl sm:text-5xl font-display font-black text-white">10,90</span>
                </div>
                <p className="text-zinc-400/80 text-[11px] uppercase tracking-widest font-bold">Pagamento Único</p>
              </div>

              <ul className="space-y-3 mb-6 text-[13px] text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF0033] stroke-[3]" />
                  <span>50 Modelos STL Básicos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF0033] stroke-[3]" />
                  <span>Acesso por 3 Meses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF0033] stroke-[3]" />
                  <span>Garantia de 14 Dias</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-red-400">
                  <X className="w-4 h-4 text-red-400 stroke-[3]" />
                  <span>Sem os 5 Bônus Inclusos</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-red-400">
                  <X className="w-4 h-4 text-red-400 stroke-[3]" />
                  <span>Sem Atualizações Futuras</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setIsUpsellOpen(true)}
                className="block w-full text-center py-4 rounded-xl bg-transparent border-2 border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white hover:bg-white/5 text-sm uppercase tracking-wider transition-all mt-auto font-bold cursor-pointer"
              >
                QUERO O BASE (R$ 10,90)
              </button>

              <div className="mt-4 text-center">
                <p className="font-bold text-[13px] sm:text-[14px] leading-snug px-2 text-[#FF0033]">
                  💡 Recomendação: o Pacote Completo <span className="lg:hidden">logo abaixo</span><span className="hidden lg:inline">ao lado</span> é muito mais vantajoso!
                </p>
              </div>
            </div>

            {/* Plano VIP Pro (R$ 39,90) */}
            <div
              id="oferta-pro"
              className="w-full lg:max-w-[440px] bg-white text-black border-[2px] border-[#FF0033] rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(255,0,51,0.55)] flex flex-col scroll-mt-24"
            >
              <div className="bg-gradient-to-r from-[#B8001F] via-[#FF0033] to-[#B8001F] text-white text-center py-2.5 px-3 border-b border-[#FF0033]/40 shadow-sm">
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  <Flame className="w-4 h-4 fill-white text-white drop-shadow" />
                  MAIS RECOMENDADO — PACOTE COMPLETO VIP
                </p>
              </div>

              <div className="p-6 sm:p-7 h-full flex flex-col items-center">
                <div className="w-full flex items-center justify-center mb-3 relative group">
                  <div className="absolute inset-0 bg-[#FF0033]/20 blur-xl rounded-full scale-90 pointer-events-none opacity-80"></div>
                  <img
                    alt="Pacote Completo VIP Acervo de Mascotes 3D"
                    width="360"
                    height="240"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-auto h-auto max-h-52 sm:max-h-60 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 select-none"
                    src="/assets/hero-mascotes.webp"
                    onError={(e) => {
                      e.currentTarget.src = 'https://i.imgur.com/PrbwJiu.png';
                    }}
                  />
                </div>

                <div className="text-center w-full mb-4">
                  <p className="text-base sm:text-lg text-zinc-500 font-black mb-1 italic">
                    DE R$ <span className="line-through">147,00</span>
                  </p>
                  <p className="text-zinc-800 font-bold text-sm sm:text-base mb-1 leading-none uppercase">Por Apenas</p>
                  <div className="flex justify-center items-start text-black mb-1 drop-shadow-sm">
                    <span className="text-xl font-black mt-1 mr-1 text-black">R$</span>
                    <span className="text-6xl sm:text-7xl font-display font-black tracking-tighter leading-none text-black">
                      39,90
                    </span>
                  </div>
                  <p className="text-zinc-800 font-extrabold text-sm sm:text-base mb-1">
                    ou 6x de <span className="text-[#FF0033] font-black">R$ 6,65</span>
                  </p>
                  <p className="text-zinc-600 font-bold text-xs uppercase tracking-widest">
                    Pagamento Único à Vista ou Parcelado
                  </p>
                </div>

                <div className="w-full bg-zinc-100 rounded-2xl p-4 sm:p-5 mb-5 border border-zinc-200">
                  <ul className="w-full space-y-2.5 text-[13px] text-black font-medium">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                      <strong className="text-xs sm:text-[13px] font-black uppercase tracking-tight text-black">
                        +500 MODELOS STL DE MASCOTES
                      </strong>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                      <strong className="text-black font-bold">
                        Licença Comercial Vitalícia (Liberado para Venda e Edição)
                      </strong>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                      <span className="text-black font-bold">Todos os Times Brasileiros e Internacionais</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                      <span className="text-black font-bold">Acesso Vitalício + Atualizações Sem Custo</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                      <span className="text-black font-bold">Garantia Incondicional de 14 Dias</span>
                    </li>
                    {BONUSES.map((b) => (
                      <li key={`offer-bonus-${b.id}`} className="flex items-start gap-2.5 text-black">
                        <span className="text-[#FF0033] text-base font-black leading-none shrink-0 mt-0.5">✓</span>
                        <span className="text-black font-bold leading-snug">
                          <strong className="text-black font-black">Bônus {b.id}:</strong> {b.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center w-full mt-auto">
                  <a
                    href="https://checkout.wiven.com.br/checkout/cmvai5cgw16d801op9kkqql7u?offer=5XFQGCL"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInitiateCheckout('Acervo Completo de Mascotes VIP', 39.9)}
                    className="block w-full bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black uppercase text-base sm:text-lg py-4 rounded-xl text-center tracking-wider transition-all transform hover:scale-105 shadow-[0_0_35px_rgba(0,255,102,0.7)] hover:shadow-[0_0_50px_rgba(0,255,102,1)] border-2 border-[#80FFB2] cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    QUERO O ACERVO COMPLETO DE MASCOTES
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section id="garantia" className="py-16 md:py-24 relative overflow-hidden bg-[#070102] border-t border-white/10 section-lazy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[650px] md:h-[450px] bg-[#FF0033]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="rounded-3xl border-2 border-[#FF0033]/40 bg-gradient-to-b from-[#1C0508]/95 via-[#120305]/95 to-[#070102] p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_45px_rgba(255,0,51,0.25)] relative overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF0033] to-transparent"></div>
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
              <div className="relative shrink-0 flex items-center justify-center group">
                <div className="absolute inset-0 bg-[#FF0033]/25 blur-2xl rounded-full scale-90 pointer-events-none"></div>
                <img
                  alt="Selo de Garantia Incondicional de 14 Dias"
                  width="240"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain drop-shadow-[0_15px_40px_rgba(255,0,51,0.45)] select-none transition-transform duration-300 group-hover:scale-105"
                  src="/assets/garantia-14-dias.webp"
                  onError={(e) => {
                    e.currentTarget.src = 'https://centralprime3d.com/assets/garantia-14-dias.webp';
                  }}
                />
              </div>

              <div className="text-center lg:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF0033]/10 border border-[#FF0033]/30 text-[#FF0033] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,0,51,0.25)]">
                  <span>🛡️</span> RISCO ZERO PARA VOCÊ
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white mb-4 leading-tight">
                  GARANTIA INCONDICIONAL DE <span className="grad-text drop-shadow-[0_0_25px_rgba(255,0,51,0.6)]">14 DIAS</span>
                </h2>
                <p className="text-zinc-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-3.5">
                  Você tem 14 dias completos para acessar o Acervo de Mascotes 3D™, explorar todos os clubes, baixar os arquivos STL e testar as impressões na sua máquina.
                </p>
                <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6">
                  Se por qualquer motivo você achar que o catálogo não agregou para você, basta solicitar o reembolso na plataforma que devolvemos 100% do seu dinheiro, sem perguntas e sem complicação.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 sm:gap-2.5 bg-black/50 px-3 py-2.5 rounded-xl border border-white/5 shadow-inner">
                    <span className="text-[#FF0033] text-base font-black shrink-0">✓</span>
                    <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight leading-snug">Teste sem riscos</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 bg-black/50 px-3 py-2.5 rounded-xl border border-white/5 shadow-inner">
                    <span className="text-[#FF0033] text-base font-black shrink-0">✓</span>
                    <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight leading-snug">Reembolso simplificado</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 bg-black/50 px-3 py-2.5 rounded-xl border border-white/5 shadow-inner">
                    <span className="text-[#FF0033] text-base font-black shrink-0">✓</span>
                    <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight leading-snug">Suporte dedicado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes (FAQ) */}
      <section id="faq" className="py-16 md:py-20 relative bg-[#080203] border-t border-white/5 section-lazy">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF0033]/10 border border-[#FF0033]/30 text-[#FF0033] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
              Tire suas dúvidas
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white">
              Perguntas <span className="grad-text drop-shadow-[0_0_20px_rgba(255,0,51,0.5)]">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={`faq-${idx}`}
                  className="rounded-xl bg-[#160305]/90 border border-[#FF0033]/25 overflow-hidden transition-colors hover:border-[#FF0033]/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 md:p-5 text-left font-bold flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm md:text-base text-zinc-100">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF0033] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 md:px-5 md:pb-6 text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-[#FF0033]/15 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center w-full px-4">
            <a
              href="#oferta-pro"
              onClick={scrollToOffer}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center shadow-[0_0_35px_rgba(0,255,102,0.7),0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,1),0_0_25px_rgba(0,255,102,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#80FFB2] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white group-hover:scale-110 transition-transform drop-shadow" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">EXPERIMENTAR O ACERVO SEM RISCO</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="main-footer" className="bg-[#060102] pt-12 pb-10 border-t border-[#FF0033]/25 text-zinc-400 font-light text-[11px] sm:text-xs text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="font-display font-black text-white text-lg sm:text-xl tracking-wider mb-2">
            ACERVO DE MASCOTES 3D™
          </p>
          <p className="mb-10 max-w-xl mx-auto text-zinc-400 leading-relaxed text-[13px]">
            O maior catálogo de arquivos STL de mascotes e itens de futebol para impressão 3D do Brasil.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-y border-white/5 py-8 text-zinc-300">
            <div className="flex flex-col items-center justify-center gap-2">
              <Lock className="w-6 h-6 text-[#FF0033] mb-1" />
              <span className="uppercase tracking-widest text-white font-bold text-[11px]">Ambiente 100% Seguro</span>
              <span className="text-[10px] text-zinc-400">Dados criptografados de ponta a ponta</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-[#FF0033] mb-1" />
              <span className="uppercase tracking-widest text-white font-bold text-[11px]">Suporte Especializado</span>
              <span className="text-[10px] text-zinc-300">suporte@acervodemascotes.com.br</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Building2 className="w-6 h-6 text-[#FF0033] mb-1" />
              <span className="uppercase tracking-widest text-white font-bold text-[11px]">Empresa Verificada</span>
              <span className="text-[10px] text-zinc-300">CNPJ: 00.000.000/0001-00</span>
            </div>
          </div>

          <p className="mb-8 max-w-4xl mx-auto text-zinc-400 leading-relaxed text-[10px] sm:text-[11px] text-justify md:text-center">
            Todo o conteúdo e arquivos digitais em STL disponibilizados no Acervo de Mascotes 3D destinam-se à manufatura aditiva. A Licença Comercial autoriza expressamente a confecção e comercialização de itens físicos impressos pelos alunos e membros. A revenda ou compartilhamento público ou privado dos arquivos digitais brutos não é autorizada.
          </p>

          <div className="flex flex-wrap justify-center gap-6 uppercase tracking-widest mb-6 font-bold text-[10px] text-zinc-400">
            <button
              type="button"
              onClick={() => setActiveLegalModal('termos')}
              className="hover:text-[#FF0033] transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacidade')}
              className="hover:text-[#FF0033] transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
          </div>

          <p className="text-zinc-400 tracking-widest text-[10px] uppercase">
            © 2026 ACERVO DE MASCOTES 3D. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>

      {/* Upsell Modal (Pop-up de Oferta Especial Compacto) */}
      {isUpsellOpen && (
        <div
          id="upsellModal"
          onClick={() => setIsUpsellOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
        >
          <div
            id="upsellModalContent"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[320px] sm:max-w-[340px] my-auto transform transition-all duration-300"
          >
            <div className="w-full bg-[#140204] border-[2px] border-[#FF0033] rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(255,0,51,0.55),inset_0_0_10px_rgba(255,0,51,0.25)] flex flex-col mx-auto my-1">
              <button
                type="button"
                onClick={() => setIsUpsellOpen(false)}
                aria-label="Fechar modal"
                className="absolute top-1.5 right-2 sm:top-2 sm:right-2.5 text-white/60 hover:text-white transition-colors z-30 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="py-1.5 sm:py-2 text-center relative bg-gradient-to-b from-[#250508] to-[#140204] pr-7 pl-2">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-tight px-1 whitespace-nowrap">
                  <span className="text-white font-extrabold">ESPERE! LEVE TUDO POR </span>
                  <span className="text-[#FF0033]">R$ 21,90</span>
                </h3>
              </div>

              <div className="bg-gradient-to-r from-[#B8001F] via-[#FF0033] to-[#B8001F] py-1 px-2 shadow-[0_0_12px_rgba(255,0,51,0.4)] border-y border-[#FF0033]/60">
                <p className="font-black text-white text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <span className="block text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.12em] opacity-95 text-white">
                    O PACOTE MAIS COMPLETO DE FUTEBOL
                  </span>
                  <span className="block text-[9.5px] sm:text-[10px] uppercase tracking-tight text-white">
                    +500 MASCOTES STL + ESTÁDIOS 3D + TODOS OS 5 BÔNUS
                  </span>
                </p>
              </div>

              <div className="p-2.5 sm:p-3 flex flex-col items-center">
                <div className="w-full flex items-center justify-center mb-1 relative group">
                  <div className="absolute inset-0 bg-[#FF0033]/20 blur-md rounded-full scale-90 pointer-events-none opacity-50"></div>
                  <img
                    src="/assets/hero-mascotes.webp"
                    onError={(e) => {
                      e.currentTarget.src = 'https://i.imgur.com/PrbwJiu.png';
                    }}
                    alt="Acervo Completo de Mascotes 3D"
                    width="240"
                    height="140"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-auto h-auto max-h-24 sm:max-h-28 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] select-none"
                  />
                </div>

                <div className="text-center w-full mb-1.5">
                  <p className="text-[10px] sm:text-[11px] text-[#FF0033] font-black mb-0.5 italic">
                    DE R$ <span className="line-through text-zinc-400">147,00</span>
                  </p>
                  <p className="text-zinc-200 font-bold text-[10px] sm:text-[11px] mb-0.5 leading-none uppercase">Por Apenas</p>
                  <div className="flex justify-center items-start text-[#FF0033] mb-0.5 drop-shadow-[0_0_12px_rgba(255,0,51,0.6)]">
                    <span className="text-sm sm:text-base font-black mt-0.5 mr-0.5">R$</span>
                    <span className="text-3xl sm:text-4xl font-display font-black tracking-tighter leading-none">
                      21,90
                    </span>
                  </div>
                  <p className="text-zinc-400 font-bold text-[8.5px] sm:text-[9px] uppercase tracking-widest">
                    Pagamento Único • Acesso Vitalício
                  </p>
                </div>

                <div className="w-full bg-[#1F0407] rounded-xl p-2 sm:p-2.5 mb-2 border border-[#FF0033]/30 max-h-28 sm:max-h-32 overflow-y-auto">
                  <ul className="w-full space-y-1 text-[10px] sm:text-[10.5px] text-white/90 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#FF0033] text-xs font-black leading-none shrink-0 mt-0.5">✓</span>
                      <strong className="text-[10px] sm:text-[10.5px] font-black uppercase text-[#FF0033]">
                        + 500 MASCOTES STL COMPLETOS
                      </strong>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#FF0033] text-xs font-bold leading-none shrink-0 mt-0.5">✓</span>
                      <strong className="text-white">Licença Comercial para Vender Peças Físicas</strong>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#FF0033] text-xs font-bold leading-none shrink-0 mt-0.5">✓</span>
                      <span>Acesso Vitalício + Atualizações Gratuitas</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#FF0033] text-xs font-bold leading-none shrink-0 mt-0.5">✓</span>
                      <span>Garantia Incondicional de 14 Dias</span>
                    </li>
                    {BONUSES.map((b) => (
                      <li key={`upsell-bonus-${b.id}`} className="flex items-start gap-1.5 text-zinc-300">
                        <span className="text-[#FF0033] text-[10px] font-black leading-none shrink-0 mt-0.5">✓</span>
                        <span className="text-zinc-200 leading-tight text-[9.5px] sm:text-[10px]">
                          <strong className="text-[#FF0033]">Bônus {b.id}:</strong> {b.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full space-y-1.5 pt-0.5">
                  <a
                    href="https://checkout.wiven.com.br/checkout/cmvai5cgw16d801op9kkqql7u?offer=3ZUYH4P"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInitiateCheckout('Oferta Especial Pop-up', 21.9)}
                    className="block w-full bg-gradient-to-r from-[#00A843] via-[#00CC55] to-[#00A843] hover:from-[#00BD4C] hover:via-[#00E660] hover:to-[#00BD4C] text-white font-display font-black uppercase text-[11px] sm:text-xs py-2.5 rounded-xl text-center tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,102,0.5)] border-2 border-[#80FFB2] cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  >
                    SIM! ACEITAR E LEVAR TUDO POR R$ 21,90
                  </a>
                  <a
                    href="https://checkout.wiven.com.br/checkout/cmvai5cgw16d801op9kkqql7u?offer=ISN17NF"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInitiateCheckout('Plano Básico', 10.9)}
                    className="block w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-display font-bold uppercase text-[10px] sm:text-[11px] py-2 rounded-xl text-center tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(220,38,38,0.3)] border-2 border-red-500/70 cursor-pointer"
                  >
                    RECUSAR E CONTINUAR COM O BÁSICO (R$ 10,90)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Modal (Termos / Privacidade) */}
      {activeLegalModal && (
        <div
          onClick={() => setActiveLegalModal(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#140204] border border-[#FF0033]/40 rounded-2xl p-6 sm:p-8 text-left shadow-2xl my-auto text-zinc-300"
          >
            <button
              type="button"
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLegalModal === 'termos' ? (
              <div>
                <h3 className="text-xl font-display font-black text-white uppercase mb-4">Termos de Uso</h3>
                <div className="space-y-3 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                  <p>
                    Bem-vindo ao <strong>Acervo de Mascotes 3D™</strong>. Ao acessar nosso catálogo e serviços, você concorda em cumprir e sujeitar-se a estes Termos de Uso.
                  </p>
                  <p>
                    <strong>1. Licença de Uso:</strong> Os arquivos digitais em formato .STL disponibilizados destinam-se à impressão tridimensional de peças físicas. Para os planos com Licença Comercial, é expressamente autorizada a comercialização dos produtos físicos impressos.
                  </p>
                  <p>
                    <strong>2. Direitos de Propriedade Intelectual:</strong> É estritamente proibida a revenda, sublicenciamento, doação, redistribuição ou compartilhamento público ou privado dos arquivos digitais .STL propriamente ditos.
                  </p>
                  <p>
                    <strong>3. Garantia:</strong> Oferecemos garantia incondicional de 14 dias para reembolso integral caso o usuário solicite dentro do prazo estipulado através da plataforma de pagamento.
                  </p>
                  <p>
                    <strong>4. Suporte:</strong> Para dúvidas técnicas ou de acesso, entre em contato via nosso e-mail oficial: suporte@acervodemascotes.com.br.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-display font-black text-white uppercase mb-4">Política de Privacidade</h3>
                <div className="space-y-3 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                  <p>
                    A sua privacidade é fundamental para nós. Esta política descreve como tratamos e protegemos suas informações no <strong>Acervo de Mascotes 3D™</strong>.
                  </p>
                  <p>
                    <strong>1. Coleta de Informações:</strong> Coletamos apenas as informações necessárias para liberação do acesso e identificação do usuário, como nome e endereço de e-mail.
                  </p>
                  <p>
                    <strong>2. Segurança dos Dados:</strong> Os pagamentos e dados transacionais são processados com criptografia de ponta a ponta através de gateways seguros e certificados. Não armazenamos números de cartão de crédito.
                  </p>
                  <p>
                    <strong>3. Uso das Informações:</strong> Seus dados nunca serão vendidos ou compartilhados com terceiros para fins publicitários ou spams.
                  </p>
                  <p>
                    <strong>4. Direitos do Titular:</strong> Você pode a qualquer momento solicitar a atualização ou exclusão de seus dados de nossa base de membros.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
