'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VturbPlayer } from '@/components/VturbPlayer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { IMCChart } from '@/components/IMCChart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, Award, BookOpen, Heart, Wind, Star } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

type AnswerKey =
  | 'weightLossGoal'
  | 'ageRange'
  | 'bodyDescription'
  | 'targetArea'
  | 'mainImpediment'
  | 'desiredBenefit'
  | 'currentWeight'
  | 'height'
  | 'desiredWeight'
  | 'dailyRoutine'
  | 'sleepHours'
  | 'waterIntake'
  | 'dreamBody';

const initialAnswers: Record<AnswerKey, any> = {
  weightLossGoal: '',
  ageRange: '',
  bodyDescription: '',
  targetArea: '',
  mainImpediment: '',
  desiredBenefit: '',
  currentWeight: 70,
  height: 165,
  desiredWeight: 60,
  dailyRoutine: '',
  sleepHours: '',
  waterIntake: '',
  dreamBody: '',
};

const PulsatingButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    className={`bg-success text-success-foreground hover:bg-success/90 animate-pulse-green transform transition-transform duration-300 hover:scale-105 shadow-lg ${props.className}`}
  />
);

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [showWelcomeButton, setShowWelcomeButton] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setShowWelcomeButton(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  useEffect(() => {
    if (step === 17) {
      const timer = setTimeout(() => setShowResultButton(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAnswer = (field: AnswerKey, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const handleMeasurements = () => {
    // Basic validation could be added here
    setStep(prev => prev + 1);
  };
  
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 max-w-2xl">
              Novo ritual de 12 Minutos com garrafa PET que congela a gordura e seca até 6kg por semana
            </h1>
            <VturbPlayer playerId="690b96ce1e2607a796dc4b67" />
            {showWelcomeButton && (
              <PulsatingButton size="lg" className="mt-8" onClick={() => setStep(1)}>
                QUERO A AVALIAÇÃO GRATUITA
              </PulsatingButton>
            )}
          </div>
        );

      case 1:
        const q1Options = [
          { icon: '🧊', label: 'Até 5 kg', desc: 'Quero eliminar só o excesso e definir o corpo.', value: 'Até 5 kg' },
          { icon: '❄️', label: 'De 6 a 10 kg', desc: 'Quero um resultado visível em poucas semanas.', value: 'De 6 a 10 kg' },
          { icon: '🔥', label: 'De 11 a 15 kg', desc: 'Quero transformar meu corpo por completo.', value: 'De 11 a 15 kg' },
          { icon: '💧', label: 'De 16 a 20 kg', desc: 'Quero eliminar gordura acumulada há anos.', value: 'De 16 a 20 kg' },
          { icon: '💪', label: 'Mais de 20 kg', desc: 'Quero um resultado extremo e duradouro.', value: 'Mais de 20 kg' },
        ];
        return <QuestionStep title="Quantos quilos você deseja eliminar com o Protocolo da Criolipólise da Garrafa PET?" description="O Ritual da CrioCaseira foi desenvolvido para congelar gordura localizada de forma 100% natural, segura e acelerada, simulando o efeito da criolipólise profissional — mas sem sair de casa." options={q1Options} field="weightLossGoal" onAnswer={handleAnswer} />;
      
      case 2:
        const q2Options = [
          { label: '18 a 29 anos', value: '18 a 29 anos' },
          { label: '30 a 39 anos', value: '30 a 39 anos' },
          { label: '40 a 49 anos', value: '40 a 49 anos' },
          { label: '50 anos ou mais', value: '50 anos ou mais' },
        ];
        return <QuestionStep title="Qual é a sua faixa de idade atual?" description="Cada fase da vida exige um tipo diferente de cuidado com o metabolismo e o acúmulo de gordura. O Protocolo CrioCaseira se adapta de forma personalizada ao seu momento." options={q2Options} field="ageRange" onAnswer={handleAnswer} />;

      case 3:
        const q3Options = [
            { icon: '💪', label: 'Definido', desc: 'Tenho pouca gordura, quero apenas modelar e tonificar.', value: 'Definido' },
            { icon: '🌿', label: 'Magro(a)', desc: 'Quero manter o peso, mas eliminar gordurinhas localizadas.', value: 'Magro(a)' },
            { icon: '🍑', label: 'Cheinha', desc: 'Tenho algumas áreas com gordura que quero reduzir rápido.', value: 'Cheinha' },
            { icon: '🌸', label: 'Plus', desc: 'Quero eliminar gordura acumulada e redefinir meu corpo por completo.', value: 'Plus' },
        ];
        return <QuestionStep title="Como você descreveria o seu corpo hoje?" description="Sua resposta nos ajuda a ajustar o nível ideal de aplicação do frio, garantindo que o Protocolo CrioCaseira atue exatamente onde seu corpo mais precisa." options={q3Options} field="bodyDescription" onAnswer={handleAnswer} />;

      case 4:
        const q4Options = [
            { label: 'Barriga / Abdômen', value: 'Barriga / Abdômen' },
            { label: 'Culotes / Flancos', value: 'Culotes / Flancos' },
            { label: 'Coxas / Pernas', value: 'Coxas / Pernas' },
            { label: 'Glúteos', value: 'Glúteos' },
            { label: 'Braços', value: 'Braços' },
        ];
        return <QuestionStep title="Qual área do seu corpo você mais deseja reduzir gordura?" description="Escolha a região onde você mais quer ver a diferença nas próximas semanas" options={q4Options} field="targetArea" onAnswer={handleAnswer} />;

      case 5:
        const q5Options = [
            { icon: '⏰', label: 'Falta de tempo', desc: 'Minha rotina é corrida e quase não consigo cuidar de mim.', value: 'Falta de tempo' },
            { icon: '😵‍💫', label: 'Falta de foco ou autocontrole', desc: 'Eu começo, mas acabo desistindo no meio do caminho.', value: 'Falta de foco' },
            { icon: '💰', label: 'Falta de dinheiro', desc: 'Tratamentos e academias são caros, quero algo acessível e natural.', value: 'Falta de dinheiro' },
        ];
        return <QuestionStep title="O que mais te impede de eliminar gordura hoje?" description="Sua resposta nos ajuda a entender qual é o principal bloqueio que pode estar travando o seu processo de queima de gordura" options={q5Options} field="mainImpediment" onAnswer={handleAnswer} />;

      case 6:
        return <InfoStep 
          title="A CrioCaseira resolve a falta de tempo e a rotina agitada pra você..."
          image={getImage('info-how-it-works')}
          content={[
            { title: "Aplicação do Frio Localizado", text: "Você utiliza uma garrafa PET com compressa fria na área desejada (barriga, flancos, coxas, braços)." },
            { title: "Reação Térmica na Camada de Gordura", text: "O frio intenso provoca uma resposta chamada apoptose celular, onde as células de gordura começam a se degradar naturalmente." },
            { title: "Eliminação Natural das Células", text: "Nas horas seguintes, o corpo elimina as células destruídas pelas vias linfáticas, reduzindo medidas visivelmente a cada aplicação." },
            { title: "Resultado Progressivo e Seguro", text: "Em poucas semanas, você nota uma barriga mais lisa, cintura afinada e contorno corporal remodelado — sem esforço, sem dor e sem sair de casa." }
          ]}
          onContinue={() => setStep(7)}
          buttonText="Continuar"
        />;

      case 7:
        const q6Options = [
            { icon: '🚺', label: 'Reduzir gordura localizada', desc: 'Quero secar barriga e culotes sem dieta ou academia.', value: 'Reduzir gordura localizada' },
            { icon: '😴', label: 'Dormir melhor', desc: 'Quero acordar leve, com o corpo e a mente descansados.', value: 'Dormir melhor' },
            { icon: '⚡', label: 'Mais energia e disposição', desc: 'Quero sentir meu corpo ativo e cheio de vitalidade.', value: 'Mais energia e disposição' },
            { icon: '😊', label: 'Confiança e autoestima', desc: 'Quero voltar a me sentir bonita, desejada e segura.', value: 'Confiança e autoestima' },
            { icon: '🤐', label: 'Menos ansiedade e compulsão', desc: 'Quero controlar a fome emocional e me sentir em paz.', value: 'Menos ansiedade e compulsão' },
        ];
        return <QuestionStep title="Qual desses benefícios você mais gostaria de sentir nas próximas semanas?" description="Sua resposta vai nos ajudar a personalizar o plano da CrioCaseira, ajustando a intensidade e o foco da fórmula ideal para o seu corpo." options={q6Options} field="desiredBenefit" onAnswer={handleAnswer} />;
        
      case 8:
        return <InfoStep 
          title="Histórias Reais de Transformação com a Criocaseira"
          image={getImage('info-testimonials-header')}
          onContinue={() => setStep(9)}
          buttonText="Continuar"
        />;

      case 9:
        return <MeasurementStep answers={answers} setAnswers={setAnswers} onContinue={handleMeasurements} />;

      case 10:
        const q8Options = [
            { icon: '🏃‍♀️', label: 'Minha rotina é corrida, mal tenho tempo pra mim', value: 'Minha rotina é corrida, mal tenho tempo pra mim' },
            { icon: '🏡', label: 'Fico em casa, mas cuido de tudo e vivo cansada', value: 'Fico em casa, mas cuido de tudo e vivo cansada' },
            { icon: '⏱️', label: 'Tenho horários flexíveis e posso ajustar meu tempo', value: 'Tenho horários flexíveis e posso ajustar meu tempo' },
            { icon: '🏢', label: 'Trabalho fora e chego exausta no fim do dia', value: 'Trabalho fora e chego exausta no fim do dia' },
        ];
        return <QuestionStep title="Como é sua rotina atualmente?" description="Vamos adaptar a CrioCaseira para caber na sua realidade" options={q8Options} field="dailyRoutine" onAnswer={handleAnswer} />;

      case 11:
        const q9Options = [
            { icon: '⏰', label: 'Menos de 5 horas', value: 'Menos de 5 horas' },
            { icon: '⏲️', label: 'Entre 5 e 7 horas', value: 'Entre 5 e 7 horas' },
            { icon: '🕛', label: 'Entre 7 e 9 horas', value: 'Entre 7 e 9 horas' },
            { icon: '⌚', label: 'Mais de 9 horas', value: 'Mais de 9 horas' },
        ];
        return <QuestionStep title="Quantas horas de sono você tem por noite?" description="O sono influencia diretamente na eliminação de gordura e no do metabolismo" options={q9Options} field="sleepHours" onAnswer={handleAnswer} />;

      case 12:
        const q10Options = [
            { icon: '🫖', label: 'Bebo só café ou chá', value: 'Bebo só café ou chá' },
            { icon: '🥤', label: '1 a 2 copos por dia', value: '1 a 2 copos por dia' },
            { icon: '🍶', label: '3 a 5 copos por dia', value: '3 a 5 copos por dia' },
            { icon: '🫙', label: 'Mais de 6 copos por dia', value: 'Mais de 6 copos por dia' },
        ];
        return <QuestionStep title="Quantos copos de água você costuma beber por dia?" description="A hidratação é essencial para que o corpo consiga eliminar as células de gordura destruídas pela Criocaseira" options={q10Options} field="waterIntake" onAnswer={handleAnswer} />;

      case 13:
        return <LoadingScreen title="Analisando Suas Respostas..." subtitle="Estamos verificando suas respostas, isso só leva alguns segundos..." onComplete={() => setStep(14)} />;

      case 14:
        const imc = answers.height > 0 ? (answers.currentWeight / ((answers.height / 100) ** 2)) : 0;
        return <IMCResultStep imc={imc} onContinue={() => setStep(15)} getImage={getImage} />;

      case 15:
        const q11Options = [
          { value: 'Em Forma', image: getImage('dream-body-fit') },
          { value: 'Com Curvas', image: getImage('dream-body-curves') },
          { value: 'Definido', image: getImage('dream-body-defined') },
          { value: 'Natural', image: getImage('dream-body-natural') },
        ];
        return <ImageQuestionStep title="Qual o corpo dos seus sonhos?" description="Escolha o tipo de corpo que você deseja alcançar" options={q11Options} field="dreamBody" onAnswer={handleAnswer} />;

      case 16:
        return <LoadingScreen title="Gerando Sua CrioCaseira..." subtitle="Estamos mapeando seu perfil de acordo com todas suas respostas..." onComplete={() => setStep(17)} />;

      case 17:
        return <ResultPage answers={answers} showButton={showResultButton} getImage={getImage} />;

      default:
        return <div>Fim do quizz</div>;
    }
  };

  return <main className="container mx-auto px-4 py-8">{renderStep()}</main>;
}

interface QuestionStepProps {
  title: string;
  description: string;
  options: { icon?: string; label: string; desc?: string; value: string }[];
  field: AnswerKey;
  onAnswer: (field: AnswerKey, value: string) => void;
}

const QuestionStep = ({ title, description, options, field, onAnswer }: QuestionStepProps) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 max-w-3xl">{title}</h2>
    <p className="text-muted-foreground mb-8 max-w-2xl">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          className="h-auto p-6 text-left justify-start bg-white/50 border-primary/20 hover:bg-primary/10 hover:border-primary"
          onClick={() => onAnswer(field, opt.value)}
        >
          <div className="flex items-start gap-4">
            {opt.icon && <span className="text-3xl mt-1">{opt.icon}</span>}
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-primary">{opt.label}</span>
              {opt.desc && <p className="text-muted-foreground text-sm mt-1 whitespace-normal">{opt.desc}</p>}
            </div>
          </div>
        </Button>
      ))}
    </div>
  </div>
);

interface InfoStepProps {
  title: string;
  image?: any;
  content?: { title: string; text: string }[];
  onContinue: () => void;
  buttonText: string;
}

const InfoStep = ({ title, image, content, onContinue, buttonText }: InfoStepProps) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 max-w-3xl">{title}</h2>
    <div className="w-full max-w-lg mx-auto">
      {image && <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} width={600} height={400} className="rounded-lg shadow-xl mb-8" />}
    </div>
    {content && (
       <div className="max-w-2xl text-left space-y-4 mb-8">
         {content.map((item, index) => (
           <div key={index}>
             <h3 className="font-bold text-lg text-primary">💧 {item.title}:</h3>
             <p className="text-muted-foreground">{item.text}</p>
           </div>
         ))}
       </div>
    )}
    <Button size="lg" onClick={onContinue} className="bg-primary hover:bg-primary/90">{buttonText}</Button>
  </div>
);

const MeasurementStep = ({ answers, setAnswers, onContinue }: any) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 max-w-3xl">Com base nessa informação, vamos calcular a quantidade exata de ingredientes da CrioCaseira específica para o seu corpo.</h2>
    <p className="text-muted-foreground mb-8 max-w-2xl">Essa etapa é essencial para ajustarmos sua taxa de gordura corporal e garantir o nível ideal de resfriamento durante o ritual. ❄️</p>
    <div className="grid grid-cols-1 gap-6 w-full max-w-xs">
        <div>
            <Label htmlFor="currentWeight" className="font-semibold">Qual seu peso atual?</Label>
            <div className="relative mt-1">
                <Input id="currentWeight" type="number" value={answers.currentWeight} onChange={(e) => setAnswers({...answers, currentWeight: Number(e.target.value)})} className="pr-10" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">kg</span>
            </div>
        </div>
        <div>
            <Label htmlFor="height" className="font-semibold">Qual a sua altura?</Label>
            <div className="relative mt-1">
                <Input id="height" type="number" value={answers.height} onChange={(e) => setAnswers({...answers, height: Number(e.target.value)})} className="pr-12" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">cm</span>
            </div>
        </div>
        <div>
            <Label htmlFor="desiredWeight" className="font-semibold">Qual é o seu peso desejado?</Label>
            <div className="relative mt-1">
                <Input id="desiredWeight" type="number" value={answers.desiredWeight} onChange={(e) => setAnswers({...answers, desiredWeight: Number(e.target.value)})} className="pr-10" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">kg</span>
            </div>
        </div>
    </div>
    <Button size="lg" onClick={onContinue} className="mt-8 bg-primary hover:bg-primary/90">Continuar</Button>
  </div>
);

const IMCResultStep = ({ imc, onContinue, getImage }: { imc: number, onContinue: () => void, getImage: (id: string) => any }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Resultado da Sua Avaliação Individual</h2>
    <IMCChart imc={imc} />
    <div className="max-w-2xl mt-8">
        <h3 className="text-2xl font-bold text-destructive">⚠️ Seu corpo pode estar te sabotando silenciosamente</h3>
        <p className="text-muted-foreground mt-4">Mesmo que você se alimente bem e tente se cuidar, existem fatores ocultos que estão bloqueando sua queima de gordura e fazendo seu corpo reter líquidos todos os dias.</p>
        <p className="font-bold mt-4 text-left">❌ Alguns Sinais de Alerta:</p>
        <ul className="list-disc list-inside text-left text-muted-foreground mt-2 space-y-1">
            <li>Metabolismo lento, mesmo comendo pouco.</li>
            <li>Sensação constante de inchaço e cansaço.</li>
            <li>Gordura que insiste em acumular em áreas específicas (como culotes e flancos).</li>
            <li>Corpo retendo líquido e toxinas diariamente.</li>
        </ul>
        <p className="font-bold mt-6 text-left text-primary">💡 Com a CrioCaseira, o Seu Corpo Volta a Trabalhar a Seu Favor</p>
        <p className="text-muted-foreground mt-2 text-left">Através do frio localizado e da combinação de 2 ingredientes naturais, o corpo ativa um processo chamado Apoptose Celular — que destrói as células de gordura automaticamente, mesmo depois do ritual. <br /> Enquanto você relaxa em casa por apenas 12 minutos, seu corpo continua eliminando gordura de forma natural, segura e progressiva. ❄️</p>
        <h4 className="font-bold mt-6 text-primary">✨ Veja o resultado da Pamela, nossa aluna...</h4>
        <div className="mt-4">
            <Image src={getImage('info-pamela-result')!.imageUrl} alt="Resultado da Pamela" data-ai-hint={getImage('info-pamela-result')!.imageHint} width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
        <PulsatingButton size="lg" onClick={onContinue} className="mt-8 w-full md:w-auto">
            GERAR MINHA CRIOCASEIRA COM PET
        </PulsatingButton>
    </div>
  </div>
);

interface ImageQuestionStepProps {
  title: string;
  description: string;
  options: { value: string, image: any }[];
  field: AnswerKey;
  onAnswer: (field: AnswerKey, value: string) => void;
}

const ImageQuestionStep = ({ title, description, options, field, onAnswer }: ImageQuestionStepProps) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 max-w-3xl">{title}</h2>
    <p className="text-muted-foreground mb-8 max-w-2xl">{description}</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {options.map((opt) => (
        <Card key={opt.value} className="overflow-hidden cursor-pointer hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-300" onClick={() => onAnswer(field, opt.value)}>
          <CardContent className="p-0">
            <Image src={opt.image.imageUrl} alt={opt.value} data-ai-hint={opt.image.imageHint} width={400} height={400} className="aspect-square object-cover" />
            <p className="font-semibold p-4 text-primary">{opt.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);


const ResultPage = ({ answers, showButton, getImage }: { answers: typeof initialAnswers, showButton: boolean, getImage: (id: string) => any }) => {
    const testimonialImages = ['testimonial-1', 'testimonial-2', 'testimonial-3', 'testimonial-4', 'testimonial-5'];
    const testimonials = [
        "“Perdi 8kg em 3 semanas! Minhas roupas estão largas e meu marido não para de me elogiar. Estou me sentindo outra mulher!” - Joana L.",
        "“Nunca imaginei que uma garrafa PET poderia fazer isso. A CrioCaseira mudou minha vida e minha autoestima!” - Carla S.",
        "“Adeus, pochete! Em 15 dias já vi uma diferença absurda. Recomendo pra todas as minhas amigas.” - Maria P.",
        "“Simplesmente incrível! Fácil de fazer e os resultados aparecem muito rápido. Estou amando!” - Fernanda R.",
        "“Finalmente algo que funciona de verdade e que eu consigo manter. Perdi medidas e ganhei confiança.” - Sofia M."
    ];
    
    const faqs = [
        { q: "A CrioCaseira é segura?", a: "Sim, 100% segura. O método utiliza princípios naturais de resfriamento para estimular o corpo a eliminar gordura, sem procedimentos invasivos, agulhas ou químicos. É como uma versão caseira e suave da criolipólise profissional." },
        { q: "Em quanto tempo vou conseguir resultados?", a: "Muitas alunas relatam sentir o corpo mais desinchado e as roupas mais soltas já na primeira semana. Resultados mais expressivos, como a redução de até 6kg, são comuns dentro de 3 a 4 semanas, seguindo o protocolo corretamente." },
        { q: "Quanto tempo por dia preciso?", a: "Apenas 12 minutos por dia. Esse é o tempo ideal para ativar o processo de apoptose (destruição da célula de gordura) sem sobrecarregar o corpo. Perfeito para quem tem uma rotina corrida." },
        { q: "Funciona pra qualquer tipo de corpo?", a: "Sim! O protocolo é personalizado com base na sua avaliação individual. Ele se adapta às suas metas, idade e tipo de corpo, garantindo que a CrioCaseira atue de forma eficaz para você." },
        { q: "Como funciona a garantia de 30 dias?", a: "É simples: ou você ama os resultados, ou recebe seu dinheiro de volta. Você tem 30 dias para testar o protocolo. Se não ficar satisfeita, basta nos enviar um e-mail ou WhatsApp para receber o reembolso total, sem burocracia." },
        { q: "Como faço para acessar o curso depois da compra?", a: "O acesso é imediato. Assim que o pagamento for confirmado, você receberá um e-mail com seu login e senha para acessar a área de membros exclusiva, onde todo o material está disponível." },
        { q: "E se eu tiver dúvidas durante o curso?", a: "Você terá suporte completo via WhatsApp e dentro da nossa comunidade exclusiva de alunas. Nossa equipe está pronta para te ajudar a alcançar os melhores resultados." }
    ];

    const bonus = [
        { title: "CHÁ TURBOSECA", desc: "Uma receita simples, com ingredientes naturais que aceleram o metabolismo, reduz o inchaço e ACELERA a queima de gordura localizada.", price: "97,00" },
        { title: "DIETA PERSONALIZADA", desc: "Um plano alimentar totalmente ajustado ao seu perfil, rotina e respostas da avaliação.", price: "197,00" },
        { title: "MODO ANTISANFONA", desc: "Uma técnica prática para garantir que o peso perdido não volte mais.", price: "97,00" },
        { title: "PLANO BARRIGA LIVRE", desc: "Ative seu intestino como um relógio e diga adeus ao inchaço e desconforto.", price: "147,00" },
        { title: "LIBIDO EM ALTA", desc: "Recupere o prazer de se sentir desejada. Com os 20 alimentos naturais que ativam a sua sensualidade.", price: "197,00" }
    ];

    return (
        <div className="flex flex-col items-center text-center p-4 space-y-12">
            <section className="w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-primary">Sua CrioCaseira Está Pronta</h1>
                <p className="text-xl md:text-2xl text-muted-foreground mt-2">Elimine {answers.weightLossGoal.toLowerCase()} em 3 Semanas...</p>
                <p className="mt-6 mb-4 font-semibold">Assista o Vídeo Abaixo de 1 Minuto para Liberar o Acesso a sua CrioCaseiro Personalizada 👇</p>
                <VturbPlayer playerId="690ba39e1e2607a796dc5d41" />
                {showButton && (
                <div id="call-to-action" className="mt-8">
                  <PulsatingButton size="lg" className="w-full max-w-md">COMEÇAR AGORA</PulsatingButton>
                  <div className="mt-12 text-left max-w-4xl mx-auto space-y-12">
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-center">Daqui 3 Semanas Você Vai Agradecer por Ter Começado Hoje...</h2>
                    <p className="text-xl text-center text-muted-foreground">De acordo com Suas Respostas Esses Poderão Ser Seus Resultados...</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-destructive">Sem a CRIO</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image src={getImage('info-without-crio')!.imageUrl} alt="Sem Crio" width={400} height={400} className="rounded-lg mx-auto" />
                                <p className="font-bold mt-4">Capacidade de eliminar gordura</p>
                                <div className="w-full bg-gray-200 rounded-full h-4 mt-2"><div className="bg-destructive h-4 rounded-full" style={{width: '19%'}}></div></div>
                                <p className="text-sm text-muted-foreground mt-2">Seu corpo está trabalhando com apenas 19% da capacidade de queimar gordura</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-success">Com a CRIO</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image src={getImage('info-with-crio')!.imageUrl} alt="Com Crio" width={400} height={400} className="rounded-lg mx-auto" />
                                <p className="font-bold mt-4">Capacidade de eliminar gordura</p>
                                <div className="w-full bg-gray-200 rounded-full h-4 mt-2"><div className="bg-success h-4 rounded-full" style={{width: '100%'}}></div></div>
                                <p className="text-sm text-muted-foreground mt-2">Com a CrioCaseira, seu corpo trabalhará com 100% da capacidade de destruir gordura</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-primary/10 border-primary">
                        <CardHeader>
                            <CardTitle className="text-primary text-3xl">Seu Protocolo Personalizado CrioCaseiro...</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                            <div className="flex items-start gap-3"><Star className="text-primary mt-1 w-5 h-5 shrink-0" /><p><span className="font-bold">Meta de Perda de Peso:</span> Perca {answers.weightLossGoal.toLowerCase()} em 3 Semanas</p></div>
                            <div className="flex items-start gap-3"><Star className="text-primary mt-1 w-5 h-5 shrink-0" /><p><span className="font-bold">Faixa de Idade Ideal:</span> Feito pra você que tem de {answers.ageRange.toLowerCase()}</p></div>
                            <div className="flex items-start gap-3"><Star className="text-primary mt-1 w-5 h-5 shrink-0" /><p><span className="font-bold">Objetivo Principal:</span> Reduza na Região de {answers.targetArea.toLowerCase()}</p></div>
                            <div className="flex items-start gap-3"><Star className="text-primary mt-1 w-5 h-5 shrink-0" /><p><span className="font-bold">Corpo dos Sonhos:</span> Conquiste um Corpo {answers.dreamBody.toLowerCase()}</p></div>
                            <div className="flex items-start gap-3 col-span-1 md:col-span-2"><Star className="text-primary mt-1 w-5 h-5 shrink-0" /><p><span className="font-bold">Benefício Principal:</span> Para Você que quer {answers.desiredBenefit.toLowerCase()}</p></div>
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-3xl font-bold mb-6">O que nossas alunas dizem...</h2>
                        <Carousel className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto" opts={{ loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}>
                            <CarouselContent>
                                {testimonialImages.map((imgId, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                                                    <Image src={getImage(imgId)!.imageUrl} alt={`Depoimento ${index + 1}`} width={500} height={500} className="rounded-lg" />
                                                    <p className="text-sm text-muted-foreground italic">"{testimonials[index]}"</p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex" />
                            <CarouselNext className="hidden sm:flex" />
                        </Carousel>
                        <p className="mt-8 text-xl font-semibold">E o melhor? Tudo isso custa menos do que um lanche que só te afasta do corpo que você quer 🥪👇</p>
                        <PulsatingButton size="lg" className="mt-4">COMEÇAR AGORA</PulsatingButton>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold">Volte a Ser Tratada Como Realmente Merece...</h2>
                        <ul className="mt-6 space-y-3 text-left">
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0 mt-1" />Redescubra o prazer de se olhar no espelho e sorrir com orgulho</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0 mt-1" />Sinta suas roupas preferidas voltarem a servir como se fossem novas</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0 mt-1" />Acorde mais leve, com o corpo desinchado e a autoestima lá em cima</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0 mt-1" />Perca o medo da balança e da câmera, e volte a se mostrar pro mundo</li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0 mt-1" />Escute das amigas: “Você fez lipo? Tá irreconhecível!”</li>
                        </ul>
                    </div>

                    <div className="max-w-3xl mx-auto">
                         <h2 className="text-3xl font-bold mb-6">Sua Jornada de Transformação Com a CrioCaseira</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                           <Card><CardContent className="p-4"> <h3 className="font-bold text-primary">7 Dias - Primeira Semana</h3><p className="text-sm text-muted-foreground mt-2">Você acorda e sente sua calça jeans escorregando pela cintura. A gordura da região de {answers.targetArea.toLowerCase()} já diminuiu significativamente.</p></CardContent></Card>
                           <Card><CardContent className="p-4"> <h3 className="font-bold text-primary">14 Dias - Segunda Semana</h3><p className="text-sm text-muted-foreground mt-2">Seu marido te abraça por trás e sussurra “Nossa, você está diferente… O que você fez?”</p></CardContent></Card>
                           <Card><CardContent className="p-4"> <h3 className="font-bold text-primary">21 Dias - Terceira Semana</h3><p className="text-sm text-muted-foreground mt-2">Suas Amigas param a conversa quando você chega “Gente, você fez lipo? Está irreconhecível!”</p></CardContent></Card>
                        </div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold">🎁 Ganhe 5 Bônus Exclusivos que Aceleram Sua Evolução</h2>
                        <p className="text-lg text-destructive font-semibold mt-2">Últimas 3 Vagas</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-left">
                            {bonus.map((b, i) => (
                                <Card key={i} className="bg-white">
                                    <CardHeader>
                                        <Award className="w-8 h-8 text-yellow-500" />
                                        <CardTitle>BÔNUS {i+1} - {b.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{b.desc}</p>
                                        <p className="mt-2 text-sm"><span className="line-through">DE R$ {b.price}</span> <span className="font-bold text-success">GRATUITO</span></p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg font-bold">Todos esses bônus somam mais de R$735,00! E hoje para as 3 próximas que finalizarem a inscrição receberão totalmente GRATUITO junto com o plano personalizado CrioCaseira</p>
                        <div className="grid grid-cols-2 text-left gap-x-8 gap-y-2 mt-4 text-muted-foreground text-sm">
                            <p>➜ CrioCaseira Personalizada (R$297,00)</p><p>➜ Chá Turbo Seca (R$97,00)</p>
                            <p>➜ Dieta Personalizada (R$197,00)</p><p>➜ Modo AnriReganho (R$97,00)</p>
                            <p>➜ Libido em Alta (R$197,00)</p><p>➜ Plano Barriga Livre (R$147,00)</p>
                            <p>➜ Suporte (R$97,00)</p><p>➜ Material Passo a Passo (R$97,00)</p>
                            <p>➜ 4 Bônus Premium (R$735,00)</p><p>➜ Material Premium (R$297,00)</p>
                            <p>➜ Acesso ao App (R$97,00)</p><p>➜ Grupo Exclusivo (R$47,00)</p>
                        </div>
                        <div className="border-2 border-destructive rounded-lg p-6 mt-8 relative bg-white">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-4 py-1 rounded-full text-sm font-bold">93% OFF</span>
                            <p className="text-muted-foreground line-through">VALOR TOTAL: R$ 2.405</p>
                            <p className="text-lg mt-2">SOMENTE HOJE</p>
                            <p className="text-sm text-muted-foreground">Por apenas 7x de</p>
                            <p className="text-6xl font-bold text-success">R$ 6,16</p>
                            <PulsatingButton size="lg" className="w-full mt-4">QUERO MINHA VAGA</PulsatingButton>
                            <p className="text-xs text-muted-foreground mt-2">🎯 30 Dias de Garantia</p>
                        </div>
                    </div>

                    <div className="max-w-lg mx-auto text-left p-6 bg-white rounded-lg shadow-xl">
                        <p className="text-center text-xl font-bold mb-4">Imagine se daqui 3 semanas você olha no espelho e mal se reconhece... Só porque decidiu começar HOJE.</p>
                        <p className="text-muted-foreground">Você tem 30 dias completos para colocar a CrioCaseira em prática. Se, por qualquer motivo, não perceber resultado ou não se sentir satisfeita, é só enviar um e-mail ou WhatsApp e devolvemos 100% do seu dinheiro.</p>
                        <p className="font-bold mt-2">💰 Sem pegadinhas, sem burocracia, sem letras miúdas.</p>
                        <p className="text-primary font-bold mt-2 text-center">🎯 É simples assim: ou você vê seu corpo começar a mudar, ou não paga absolutamente nada.</p>
                        <PulsatingButton className="w-full mt-4">COMEÇAR AGORA</PulsatingButton>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Compare os Custos de Emagrecer</h3>
                        <div className="text-left space-y-2 text-muted-foreground">
                            <p>Ozempic (1 mês): <span className="font-bold">R$3.000</span></p>
                            <p>Nutri particular: <span className="font-bold">R$400/Consulta</span></p>
                            <p>Academia + Personal: <span className="font-bold">R$600/mês</span></p>
                            <p>Cirurgia Bariatrica: <span className="font-bold">R$20.000 a R$50.000</span></p>
                            <p className="text-success font-bold mt-2 text-lg">✅ CrioCaseira: Só R$43,12 (com garantia de 30 dias!)</p>
                        </div>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Agora Você Tem 2 Escolhas...</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className="border border-destructive p-4 rounded-lg">
                                <h4 className="font-bold">1. Continuar lutando</h4>
                                <p className="text-sm text-muted-foreground mt-2">Continuar lutando contra a balança, testando dietas malucas, gastando dinheiro com produtos caros, se frustrando a cada roupa que não entra e sentindo que nada funciona pra você.</p>
                            </div>
                            <div className="border border-success p-4 rounded-lg">
                                <h4 className="font-bold">2. Começar hoje com a Criocaseira</h4>
                                <p className="text-sm text-muted-foreground mt-2">Usando uma técnica caseira, natural e acessível, que já ajudou centenas de mulheres a eliminar gordura localizada em poucos minutos por dia, sem sair de casa.</p>
                            </div>
                        </div>
                        <PulsatingButton size="lg" className="mt-6">QUERO MINHA VAGA</PulsatingButton>
                    </div>

                    <div className="max-w-3xl mx-auto text-left">
                        <h2 className="text-3xl font-bold text-center mb-6">❓Dúvidas Frequentes</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, i) => (
                                <AccordionItem value={`item-${i}`} key={i}>
                                    <AccordionTrigger className="font-semibold text-primary">🔹 {i+1}. {faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                  </div>
                </div>
                )}
            </section>
        </div>
    );
};
