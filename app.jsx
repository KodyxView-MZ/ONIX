```react
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  Flame, 
  TrendingDown, 
  CheckCircle2, 
  Wind, 
  ShieldAlert,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';

// --- Componentes de Interface Premium ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 shadow-2xl transition-all duration-300 hover:border-blue-500/30 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
    <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
    {children}
  </h3>
);

// --- Componentes Funcionais ---

const BreathingExercise = () => {
  const [phase, setPhase] = useState('Pronto');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(0);
      setPhase('Pronto');
    }

    if (phase === 'Inspirar' && seconds >= 4) { setPhase('Reter'); setSeconds(0); }
    if (phase === 'Reter' && seconds >= 7) { setPhase('Expirar'); setSeconds(0); }
    if (phase === 'Expirar' && seconds >= 8) { setPhase('Inspirar'); setSeconds(0); }

    return () => clearInterval(interval);
  }, [isActive, seconds, phase]);

  return (
    <GlassCard className="text-center flex flex-col items-center">
      <h4 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-xs">Respiração Deliberada</h4>
      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
        <div className={`absolute inset-0 rounded-full border-2 border-blue-500/20 ${isActive ? 'animate-ping' : ''}`} />
        <div className="text-4xl font-black text-white">{isActive ? seconds : <Wind size={40} className="text-blue-500"/>}</div>
      </div>
      <p className="text-lg text-white font-medium h-8">{isActive ? phase : 'Técnica 4-7-8'}</p>
      <button 
        onClick={() => setIsActive(!isActive)}
        className={`mt-4 px-8 py-2 rounded-full font-bold transition-all ${isActive ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
      >
        {isActive ? 'Parar' : 'Começar'}
      </button>
    </GlassCard>
  );
};

const ChecklistHabits = () => {
  const [checked, setChecked] = useState({ m: false, d: false, t: false, n: false });
  const count = Object.values(checked).filter(Boolean).length;
  
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-white font-bold uppercase tracking-tight text-sm">Plano de Acção Diário</h4>
        <span className="text-[10px] bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-600/30 font-bold">21 DIAS</span>
      </div>
      <div className="space-y-3">
        {[
          { id: 'm', label: 'Manhã: 5 min', desc: 'Silêncio e intenção' },
          { id: 'd', label: 'Dia: Pausas', desc: 'Consciência plena' },
          { id: 't', label: 'Tarde: Movimento 20m', desc: 'Caminhada/Treino' },
          { id: 'n', label: 'Noite: Gratidão', desc: 'Reflexão positiva' }
        ].map((item) => (
          <div 
            key={item.id}
            onClick={() => setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border ${checked[item.id] ? 'bg-blue-600/10 border-blue-500/40' : 'bg-white/5 border-transparent'}`}
          >
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${checked[item.id] ? 'bg-blue-600 border-blue-600' : 'border-white/20'}`}>
              {checked[item.id] && <CheckCircle2 size={14} className="text-white" />}
            </div>
            <div>
              <p className="text-white text-sm font-bold">{item.label}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(count/4)*100}%` }} />
        </div>
        <p className="text-right text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Consistência: {count}/4</p>
      </div>
    </GlassCard>
  );
};

const ComparisonTable = ({ title, columns, data }) => (
  <div className="overflow-hidden rounded-2xl border border-white/10 my-8 bg-zinc-950">
    <div className="bg-zinc-900 p-4 text-center border-b border-white/10">
      <h5 className="text-white font-black text-xs uppercase tracking-[0.2em]">{title}</h5>
    </div>
    <div className="grid grid-cols-2 bg-zinc-900/50">
      <div className="p-4 border-r border-white/10 text-rose-500 font-bold text-[10px] uppercase text-center">{columns[0]}</div>
      <div className="p-4 text-blue-400 font-bold text-[10px] uppercase text-center">{columns[1]}</div>
    </div>
    {data.map((row, idx) => (
      <div key={idx} className="grid grid-cols-2 border-t border-white/5 transition-colors hover:bg-white/5">
        <div className="p-4 border-r border-white/5 text-white/50 text-xs italic leading-tight">{row[0]}</div>
        <div className="p-4 text-white text-xs font-medium leading-tight">{row[1]}</div>
      </div>
    ))}
  </div>
);

const VisualCycle = ({ title, steps, colorClass }) => (
  <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/10 my-6">
    <h5 className="text-white font-bold mb-8 text-center uppercase tracking-widest text-xs">{title}</h5>
    <div className="flex flex-col items-center gap-3">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className={`p-4 rounded-xl border border-white/10 text-center w-full max-w-sm ${colorClass} shadow-lg`}>
            <p className="text-xs font-black text-white uppercase tracking-tighter">{step}</p>
          </div>
          {idx < steps.length - 1 && <ChevronDown className="text-white/20 animate-bounce" size={16} />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- Conteúdo dos Módulos ---

const Module1 = () => (
  <div className="animate-in fade-in duration-1000">
    <header className="mb-12">
      <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-2">MENTE OU DESTRUIÇÃO</h2>
      <p className="text-blue-500 italic text-sm">"Ou você domina sua mente... ou sua mente continuará destruindo seu corpo todos os dias."</p>
    </header>

    <div className="grid lg:grid-cols-2 gap-6 mb-12">
      <ChecklistHabits />
      <BreathingExercise />
    </div>

    <GlassCard>
      <SectionTitle>1. A Verdade Que Ninguém Quer Ouvir</SectionTitle>
      <p className="text-white/70 text-sm leading-relaxed">
        "Existe uma guerra acontecendo dentro de você. Silenciosa, invisível mas devastadoramente real. Cada pensamento negativo que você aceita sem questionar se torna um comando para o seu corpo. Tensão nos ombros. Aperto no peito. Insônia. Fadiga sem explicação. Não é fraqueza. É fisiologia. A ciência confirma: o estado mental crônico de estresse, ansiedade e autopunição desencadeia inflamações, compromete o sistema imunológico e acelera o envelhecimento celular. Ignorar sua saúde mental não é força é o caminho mais rápido para o colapso físico e emocional."
      </p>
    </GlassCard>

    <VisualCycle 
      title="O Ciclo Que Te Prende"
      colorClass="bg-rose-500/10 border-rose-500/30"
      steps={[
        "Pensamento negativo recorrente",
        "Ativação do estresse no cérebro",
        "Resposta física no corpo (dor, tensão, fadiga)",
        "Sensação de impotência",
        "Mais pensamentos negativos"
      ]}
    />

    <GlassCard>
      <SectionTitle>2. Como a Mente Destrói o Corpo</SectionTitle>
      <div className="space-y-4">
        <p className="text-white/80 text-sm italic">"O elo entre mente e corpo não é metáfora é neurociência. Quando a mente entra em modo de ameaça constante, o corpo paga a conta."</p>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
            <p className="text-white/70 text-sm font-light"><strong className="text-white">Cortisol Elevado:</strong> O estresse crônico mantém o cortisol alto, destruindo tecidos musculares, aumentando a gordura abdominal e prejudicando a memória.</p>
          </li>
          <li className="flex gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
            <p className="text-white/70 text-sm font-light"><strong className="text-white">Inflamação Sistêmica:</strong> Pensamentos de medo e raiva ativam respostas inflamatórias que atacam órgãos vitais quando não há ameaça real presente.</p>
          </li>
          <li className="flex gap-4">
            <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
            <p className="text-white/70 text-sm font-light"><strong className="text-white">Sono Destruído:</strong> Uma mente sem controle invade suas noites, fragmenta seu sono e priva o corpo da recuperação essencial que só o descanso profundo oferece.</p>
          </li>
        </ul>
      </div>
    </GlassCard>

    <ComparisonTable 
      title="Realidade vs Ilusão"
      columns={["O Que Pensas Precisar", "O Que Realmente Precisas"]}
      data={[
        ["Condições perfeitas de vida", "Uma decisão consciente agora"],
        ["Ausência total de problemas", "Prática diária de 10 minutos"],
        ["Mais força de vontade", "Autocompaixão sem fraqueza"],
        ["Mais tempo no dia", "Consistência, não perfeição"]
      ]}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GlassCard>
        <SectionTitle>As 4 Ferramentas</SectionTitle>
        <div className="space-y-3 text-xs text-white/60">
          <p><strong className="text-blue-400">1. Consciência Plena:</strong> Observe pensamentos como espectador.</p>
          <p><strong className="text-blue-400">2. Respiração Deliberada:</strong> Active o parassimpático (4-7-8).</p>
          <p><strong className="text-blue-400">3. Movimento Intencional:</strong> 20 min de caminhada diária.</p>
          <p><strong className="text-blue-400">4. Diálogo Interno:</strong> Questione: é facto ou interpretação?</p>
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle>Métricas de Risco</SectionTitle>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-tighter">Doenças Psicossomáticas</span>
            <span className="text-xl font-black text-rose-500">80%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-tighter">Risco Cardíaco (Depressão)</span>
            <span className="text-xl font-black text-rose-500">7X+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-tighter">Expectativa de Vida</span>
            <span className="text-xl font-black text-rose-500">-10 Anos</span>
          </div>
        </div>
      </GlassCard>
    </div>

    <div className="p-8 border border-white/5 bg-zinc-950 rounded-2xl text-center">
      <h4 className="text-white font-black mb-4 uppercase tracking-tighter text-xl">A Escolha É Tua e É Agora</h4>
      <p className="text-white/50 text-sm italic mb-6">"Sua mente é o órgão mais poderoso do seu corpo. Usada contra você, é a arma mais destrutiva que existe. Usada a seu favor, é a fonte de toda cura, toda força, toda transformação."</p>
      <div className="flex flex-wrap justify-center gap-4">
        {['Decide', 'Pratica', 'Transforma'].map(t => (
          <span key={t} className="px-4 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black uppercase text-blue-500">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const Module2 = () => (
  <div className="animate-in fade-in duration-1000">
    <header className="mb-12 text-center">
      <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">21. O ESPELHO COMEÇA A MUDAR</h2>
      <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
    </header>

    <div className="space-y-8">
      <GlassCard>
        <SectionTitle>O Início da Mudança</SectionTitle>
        <p className="text-white/70 text-sm leading-relaxed mb-4">"Você olha no espelho e algo diferente aparece. Não é perfeição é progresso. É a prova viva de que cada repetição, cada gota de suor, cada dia que você escolheu aparecer quando poderia ter desistido, valeu a pena."</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h6 className="text-blue-400 font-black text-[10px] uppercase mb-1">Primeiros Sinais</h6>
            <p className="text-white/50 text-[10px]">A silhueta muda. Os números na balança começam a contar uma nova história.</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h6 className="text-blue-400 font-black text-[10px] uppercase mb-1">Confiança de Volta</h6>
            <p className="text-white/50 text-[10px]">A cabeça ergue-se sozinha. O passo fica mais firme.</p>
          </div>
        </div>
      </GlassCard>

      <VisualCycle 
        title="Ciclo da Persistência"
        colorClass="bg-blue-600/20 border-blue-600/40"
        steps={["Dificuldade", "Escolha", "Consistência", "Resultado Visível", "Respeito"]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <SectionTitle>Mente Perigosa</SectionTitle>
          <p className="text-xs text-white/50 leading-relaxed italic">"Quando a mente endurece, tudo muda. Você para de negociar com a fraqueza. A desculpa morre antes de nascer. A disciplina vira identidade, não esforço."</p>
        </GlassCard>
        <GlassCard>
          <SectionTitle>Resistência Total</SectionTitle>
          <p className="text-xs text-white/50 leading-relaxed">"Nenhuma transformação real acontece na zona de conforto. Músculos crescem na ruptura. A mente que sobreviveu à dificuldade não teme o próximo desafio."</p>
        </GlassCard>
      </div>

      <ComparisonTable 
        title="A Nova Identidade"
        columns={["Quem Eras", "Quem És Agora"]}
        data={[
          ["Adiava tudo para amanhã", "Age hoje, sem negociar"],
          ["Aceitava qualquer desculpa", "Não aceita mediocridade"],
          ["Vivia no piloto automático", "Vive com intenção total"],
          ["Temia o esforço", "Busca o desconforto"]
        ]}
      />

      <GlassCard className="border-rose-500/20 bg-rose-500/5">
        <SectionTitle>29. Nunca Mais</SectionTitle>
        <p className="text-white/80 text-sm leading-relaxed italic">"Voltar para a antiga vida não é uma opção é uma ideia que te enche de pavor. Você sabe demais agora. Sabe do que é capaz."</p>
      </GlassCard>
    </div>
  </div>
);

const Module3 = () => (
  <div className="animate-in fade-in duration-1000">
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <Flame className="text-rose-500" size={32} />
        <h2 className="text-5xl font-black text-white tracking-tighter">O TREINO VAI DOER</h2>
      </div>
      <p className="text-rose-500 font-black text-xs tracking-widest uppercase">Transgressão Física Total</p>
    </header>

    <div className="space-y-8">
      <GlassCard>
        <SectionTitle>A Dor é o Sinal</SectionTitle>
        <p className="text-white/70 text-sm leading-relaxed mb-4">"A dor não é o inimigo é o sinal de que você está crescendo. Cada repetição que queima, cada série que parece impossível, é exatamente onde a transformação acontece."</p>
        <div className="flex flex-col gap-2">
          <p className="text-rose-500 text-xs font-bold uppercase tracking-tighter">A sua mente vai implorar para parar.</p>
          <p className="text-white/40 text-xs italic">O cérebro mente. Ele quer conforto. Não obedece.</p>
        </div>
      </GlassCard>

      <div className="bg-zinc-950 p-6 rounded-2xl border border-rose-500/20 mb-8">
        <h4 className="text-white font-black text-xl mb-4 flex items-center gap-2">
          <ShieldAlert className="text-rose-600" /> A Preguiça Rouba a Vida
        </h4>
        <div className="space-y-4 text-xs text-white/50">
          <p><strong className="text-rose-500">1. Dias viram semanas:</strong> Um dia pulado vira hábito.</p>
          <p><strong className="text-rose-500">2. Semanas viram meses:</strong> O progresso some silenciosamente.</p>
          <p><strong className="text-rose-500">3. Meses viram anos:</strong> E nada muda. Nada evolui.</p>
          <p className="text-white font-bold italic mt-4 text-sm">"A preguiça não é descanso é a versão disfarçada do fracasso."</p>
        </div>
      </div>

      <GlassCard>
        <SectionTitle>O Filtro Natural</SectionTitle>
        <p className="text-white/70 text-sm leading-relaxed">"O processo elimina os que não estão prontos. Cada semana difícil é uma peneira. Quem fica do outro lado é quem merece ver os resultados. E eles chegam sempre."</p>
      </GlassCard>

      <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
        <h4 className="text-white font-black mb-4 uppercase text-xs tracking-widest text-center">A Disciplina que Assusta</h4>
        <p className="text-white/60 text-xs leading-relaxed text-center mb-6 italic">"Existe um nível de comprometimento que a maioria nunca vai entender. As pessoas ao redor vão questionar. Vão chamar de obsessão. Continue em silêncio."</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-900 rounded-xl text-center border border-white/5">
            <h6 className="text-rose-500 font-black text-[10px] mb-1">LIMITE REAL</h6>
            <p className="text-white/30 text-[9px]">Sinal de parada aos 40% da capacidade.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl text-center border border-white/5">
            <h6 className="text-rose-500 font-black text-[10px] mb-1">MANTRA</h6>
            <p className="text-white/30 text-[9px]">Apenas faça mais 5.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Module4 = () => (
  <div className="animate-in fade-in duration-1000">
    <header className="mb-12 text-center">
      <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-2 italic">EMAGRECIMENTO EXTREMO</h2>
      <p className="text-rose-600 font-black text-xs tracking-[0.4em] uppercase">O Guia Proibido</p>
    </header>

    <div className="space-y-8">
      <GlassCard className="border-rose-600/30">
        <SectionTitle>Confronto Directo</SectionTitle>
        <p className="text-rose-100 text-sm font-bold italic leading-relaxed">"Este não é um livro sobre dieta. É um confronto direto com a versão mais fraca de você mesmo. Chega de desculpas, chega de adiamentos. O momento de mudar é agora e vai doer do jeito certo."</p>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
          <h5 className="text-white font-black mb-4 text-xs uppercase flex items-center gap-2"><ArrowRightLeft size={16} className="text-rose-500" /> Vício Neurológico</h5>
          <p className="text-white/50 text-[11px] leading-relaxed italic">"O ciclo do açúcar hackeia seu cérebro: pico de prazer, queda brutal, desejo intenso. Você troca saúde a longo prazo por gratificação imediata. Esse é o contrato que você assina toda vez que cede."</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
          <h5 className="text-white font-black mb-4 text-xs uppercase flex items-center gap-2"><ShieldAlert size={16} className="text-rose-500" /> Fome Falsa</h5>
          <p className="text-white/50 text-[11px] leading-relaxed italic">"A comida resolve a fome - não a ansiedade, não a solidão, não o vazio existencial. Você come para sentir algo diferente por cinco minutos. A geladeira não é terapeuta."</p>
        </div>
      </div>

      <ComparisonTable 
        title="O Investimento da Dor"
        columns={["Dor da Vergonha", "Dor da Disciplina"]}
        data={[
          ["Dói agora e continua doendo", "Dói agora, transforma depois"],
          ["Destrói a imagem de si mesmo", "Constrói autoestima real"],
          ["Produz mais do mesmo", "Produz resultado visível"],
          ["Você não escolhe quando para", "Você escolhe quando começa"]
        ]}
      />

      <GlassCard>
        <SectionTitle>Viciado em Conforto</SectionTitle>
        <div className="grid grid-cols-2 gap-4 text-[10px] text-white/50 uppercase font-bold tracking-tighter">
          <div className="p-3 bg-white/5 rounded border border-white/5">Dormir Demais = Fuga</div>
          <div className="p-3 bg-white/5 rounded border border-white/5">Comer Demais = Fraqueza</div>
          <div className="p-3 bg-white/5 rounded border border-white/5">Reclamar = Sem Culpa</div>
          <div className="p-3 bg-white/5 rounded border border-white/5">Fazer Menos = O Problema</div>
        </div>
      </GlassCard>

      <div className="p-8 bg-zinc-950 border-t-4 border-rose-600 rounded-2xl">
        <SectionTitle>O Asco Genuíno</SectionTitle>
        <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"Seu corpo não confia mais em você - e com razão. Mas hoje pode ser diferente. A mudança real começa com asco. O asco genuíno da própria fraqueza. Enxergue a verdade. Tome a decisão. Aja sem condições."</p>
        <p className="text-white font-black uppercase tracking-tighter text-center border-t border-white/10 pt-4">O próximo capítulo começa agora.</p>
      </div>
    </div>
  </div>
);

// --- Navegação e App Principal ---

export default function App() {
  const [tab, setTab] = useState(0);

  const navItems = [
    { label: 'Mente', icon: <Brain size={20} />, comp: <Module1 /> },
    { label: '21 Dias', icon: <Target size={20} />, comp: <Module2 /> },
    { label: 'O Treino', icon: <Flame size={20} />, comp: <Module3 /> },
    { label: 'Extremo', icon: <TrendingDown size={20} />, comp: <Module4 /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white pb-24 md:pb-0 md:pl-20">
      
      {/* Sidebar Desktop */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-zinc-950 border-r border-white/10 hidden md:flex flex-col items-center py-12 gap-8 z-50">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl mb-8">A</div>
        {navItems.map((item, i) => (
          <button 
            key={i} 
            onClick={() => setTab(i)}
            className={`p-3 rounded-2xl transition-all ${tab === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/20 hover:text-white/50'}`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed bottom-6 left-6 right-6 h-16 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:hidden flex items-center justify-around z-50 shadow-2xl">
        {navItems.map((item, i) => (
          <button 
            key={i} 
            onClick={() => setTab(i)}
            className={`flex flex-col items-center gap-1 transition-all ${tab === i ? 'text-blue-500 scale-110' : 'text-white/30'}`}
          >
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="max-w-4xl mx-auto p-6 md:p-20 relative">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="relative z-10">
          {navItems[tab].comp}
        </div>
      </main>
    </div>
  );
}

```

