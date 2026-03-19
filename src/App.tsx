import { useState, useEffect } from 'react';

const C = {
  bg: '#FEF9F0',
  white: '#FFFFFF',
  primary: '#FF8C42',
  primaryDark: '#D97030',
  teal: '#3EC9C0',
  tealDark: '#2BA8A0',
  purple: '#A89AF8',
  purpleDark: '#8070D8',
  orange: '#FF9F59',
  orangeDark: '#D97A30',
  green: '#5DC87A',
  greenDark: '#3FA85C',
  yellow: '#FFD93D',
  yellowDark: '#D4AF20',
  red: '#FF6B6B',
  text: '#2E2E2E',
  textMid: '#5A5A5A',
  textLight: '#9A9A9A',
  border: '#E8E0D4',
  cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
};

const MODULE_COLORS = {
  story: { bg: C.teal, dark: C.tealDark },
  sentences: { bg: C.purple, dark: C.purpleDark },
  soundspy: { bg: C.orange, dark: C.orangeDark },
  memory: { bg: C.green, dark: C.greenDark },
};

const T = {
  it: {
    subtitle: 'Il Mondo di Lulu',
    tagline: 'Ogni tentativo conta! 🌟',
    dinoSay: 'Ciao Lulu! Sei pronta a giocare? 🦕',
    storyTitle: 'Racconto Magico',
    storySubtitle: 'Guarda e racconta!',
    sentenceTitle: 'Frasi Magiche',
    sentenceSubtitle: 'Trova la parola!',
    soundTitle: 'Spy dei Suoni',
    soundSubtitle: 'Ascolta e trova!',
    memoryTitle: 'Giardino Magico',
    memorySubtitle: "Ricorda l'ordine!",
    loading: ['Preparo il gioco', 'Dino ci pensa', 'Quasi pronto'],
    storyLabel: '📖 Racconta',
    sentenceLabel: '✨ Frase magica',
    soundLabel: '🔊 Spy dei Suoni',
    memoryLabel: '🧠 Giardino',
    correctMsg: 'Ecco la risposta giusta!',
    next: 'Avanti →',
    done: 'Finito! 🎉',
    bravo: 'Bravissima Lulu!',
    starsEarned: 'stelle guadagnate!',
    pickSticker: 'Scegli il tuo adesivo! 🎁',
    again: 'Ancora!',
    againSub: 'Un nuovo gioco ti aspetta',
    backHome: '🏠 Torna a casa',
    pronoun: '👤 pronome',
    verb: '🔤 verbo',
    defaultPraise: 'Bravissima!',
    memoryWatch: 'Guarda bene!',
    memoryGo: "Tocca nell'ordine giusto!",
    memoryRight: 'Perfetto! 🌸',
    memoryWrong: 'Riprova! 💪',
    memoryLevel: 'Livello',
    blend: '🔤 unisci',
    elision: '✂️ togli',
    match: '🔍 trova',
  },
  fr: {
    subtitle: 'Le Monde de Lulu',
    tagline: 'Chaque essai compte ! 🌟',
    dinoSay: 'Salut Lulu ! Prête à jouer ? 🦕',
    storyTitle: 'Histoire Magique',
    storySubtitle: 'Regarde et raconte !',
    sentenceTitle: 'Phrases Magiques',
    sentenceSubtitle: 'Trouve le bon mot !',
    soundTitle: 'Espion des Sons',
    soundSubtitle: 'Écoute et trouve !',
    memoryTitle: 'Jardin Magique',
    memorySubtitle: "Souviens-toi de l'ordre !",
    loading: ['Je prépare le jeu', 'Dino réfléchit', 'Presque prêt'],
    storyLabel: '📖 Raconte',
    sentenceLabel: '✨ Phrase magique',
    soundLabel: '🔊 Espion des Sons',
    memoryLabel: '🧠 Jardin',
    correctMsg: 'Voici la bonne réponse !',
    next: 'Suivant →',
    done: 'Fini ! 🎉',
    bravo: 'Bravo Lulu !',
    starsEarned: 'étoiles gagnées !',
    pickSticker: 'Choisis ton autocollant ! 🎁',
    again: 'Encore !',
    againSub: "Un nouveau jeu t'attend",
    backHome: '🏠 Retour',
    pronoun: '👤 pronom',
    verb: '🔤 verbe',
    defaultPraise: 'Bravo !',
    memoryWatch: 'Regarde bien !',
    memoryGo: 'Touche dans le bon ordre !',
    memoryRight: 'Parfait ! 🌸',
    memoryWrong: 'Réessaie ! 💪',
    memoryLevel: 'Niveau',
    blend: '🔤 assemble',
    elision: '✂️ enlève',
    match: '🔍 trouve',
  },
  en: {
    subtitle: "Lulu's Story World",
    tagline: 'Every try counts! 🌟',
    dinoSay: 'Hi Lulu! Ready to play? 🦕',
    storyTitle: 'Magic Story',
    storySubtitle: 'Look and tell!',
    sentenceTitle: 'Magic Sentences',
    sentenceSubtitle: 'Find the word!',
    soundTitle: 'Sound Spy',
    soundSubtitle: 'Listen and find!',
    memoryTitle: 'Memory Garden',
    memorySubtitle: 'Remember the order!',
    loading: ['Getting the game ready', 'Dino is thinking', 'Almost ready'],
    storyLabel: '📖 Tell the story',
    sentenceLabel: '✨ Magic sentence',
    soundLabel: '🔊 Sound Spy',
    memoryLabel: '🧠 Memory Garden',
    correctMsg: "Here's the right answer!",
    next: 'Next →',
    done: 'Done! 🎉',
    bravo: 'Well done Lulu!',
    starsEarned: 'stars earned!',
    pickSticker: 'Choose your sticker! 🎁',
    again: 'Again!',
    againSub: 'A new game awaits',
    backHome: '🏠 Home',
    pronoun: '👤 pronoun',
    verb: '🔤 verb',
    defaultPraise: 'Well done!',
    memoryWatch: 'Watch carefully!',
    memoryGo: 'Tap in the right order!',
    memoryRight: 'Perfect! 🌸',
    memoryWrong: 'Try again! 💪',
    memoryLevel: 'Level',
    blend: '🔤 blend',
    elision: '✂️ remove',
    match: '🔍 find',
  },
};

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.map((b) => b.text || '').join('');
  return JSON.parse(text.replace(/```json\n?|```\n?/g, '').trim());
}

const storyPrompt = (lang) => {
  const L = { it: 'Italian', fr: 'French', en: 'English' }[lang];
  return `Create a Story Builder activity in ${L} for Louise age 6, DLD. She loves horses, animals, drawing, dinosaurs.
Return ONLY raw JSON no markdown:
{"title":"short title","emoji":"one emoji","scene":"one simple sentence in ${L}","questions":[{"prompt":"short question in ${L}","hint_emoji":"emoji","choices":["A","B","C"],"correct":1,"encouragement":"warm praise in ${L}"}]}
Rules: exactly 4 questions targeting (1)who (2)action (3)where (4)feeling. Vary correct index 0,1,2. Keep language very simple.`;
};

const sentencePrompt = (lang) => {
  const L = { it: 'Italian', fr: 'French', en: 'English' }[lang];
  return `Create a Magic Sentences activity in ${L} for Louise age 6, DLD. Targets: pronoun confusion, verb agreement.
Return ONLY raw JSON no markdown:
{"sentences":[{"before":"text before blank","after":"text after or empty string","hint_emoji":"emoji","choices":["A","B","C"],"correct":0,"category":"pronoun","encouragement":"warm praise in ${L}"}]}
Rules: exactly 4 sentences. Mix 2 pronoun + 2 verb. Vary correct index 0,1,2. Short concrete sentences about animals family food play. category must be pronoun or verb exactly.`;
};

const soundSpyPrompt = (lang) => {
  const L = { it: 'Italian', fr: 'French', en: 'English' }[lang];
  return `Create a Sound Spy phonological awareness activity in ${L} for Louise age 6, DLD. Targets: blending sounds, elision, sound matching.
Return ONLY raw JSON no markdown:
{"tasks":[{"type":"blend","instruction":"short instruction in ${L}","hint_emoji":"emoji","choices":["A","B","C"],"correct":0,"encouragement":"warm praise in ${L}"}]}
Rules: exactly 4 tasks mixing types blend/elision/match. Use very short 1-2 syllable words Louise knows (animals, body, food, colours). Vary correct index 0,1,2.
Example blend instruction in Italian: "Unisci i suoni: /c/ + /ane/ =" with choices pane/cane/luna correct:1
Example elision: "Dì 'sole' senza /s/ =" with choices ole/sole/mole correct:0
Example match: "Quale parola comincia come 'gatto'?" with choices fiore/gallo/naso correct:1`;
};

// Memory garden — procedural, no AI
const GARDEN_EMOJIS = ['🌸', '🌻', '🌿', '🍄', '🦋', '🐝', '🌈', '⭐', '🍓'];
function makeRound(level) {
  const count = Math.min(level + 1, 4);
  return [...GARDEN_EMOJIS].sort(() => Math.random() - 0.5).slice(0, count);
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function PressButton({ children, onClick, bg, shadow, style = {} }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: bg,
        border: 'none',
        borderRadius: 18,
        boxShadow: pressed ? `0 2px 0 ${shadow}` : `0 5px 0 ${shadow}`,
        transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        transition: 'transform 0.08s, box-shadow 0.08s',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function TopBar({ onHome, step, total, sessionStars, modColor }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
      }}
    >
      <button
        onClick={onHome}
        style={{
          background: C.white,
          border: `2px solid ${C.border}`,
          borderRadius: 12,
          padding: '6px 14px',
          cursor: 'pointer',
          fontSize: 17,
          fontWeight: 700,
          color: C.textLight,
        }}
      >
        ←
      </button>
      <div style={{ flex: 1, display: 'flex', gap: 7, margin: '0 14px' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: i === step ? 2 : 1,
              height: 8,
              borderRadius: 4,
              background: i < step ? C.green : i === step ? modColor : C.border,
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          background: C.yellow,
          borderRadius: 14,
          padding: '5px 13px',
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 17,
          boxShadow: `0 3px 0 ${C.yellowDark}`,
        }}
      >
        ⭐ {sessionStars}
      </div>
    </div>
  );
}

function ChoiceList({ choices, correct, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [flashIdx, setFlashIdx] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handle = (i) => {
    if (answered || flashIdx !== null) return;
    if (i === correct) {
      setSelected(i);
      setAnswered(true);
      onAnswer(true);
    } else {
      const nw = wrongCount + 1;
      setWrongCount(nw);
      if (nw >= 2) {
        setSelected(i);
        setAnswered(true);
        onAnswer(false);
      } else {
        setFlashIdx(i);
        setTimeout(() => {
          setFlashIdx(null);
        }, 750);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {choices.map((ch, i) => {
        const isFlash = flashIdx === i,
          isSel = selected === i,
          isCorr = i === correct;
        let bg = C.white,
          border = `2px solid ${C.border}`,
          shadow = `0 3px 0 ${C.border}`;
        let iconBg = '#F0EDE8',
          iconColor = C.textLight,
          icon = ['A', 'B', 'C'][i],
          textColor = C.text,
          anim = '';
        if (isFlash) {
          bg = '#FFF0F0';
          border = `2px solid ${C.red}`;
          shadow = `0 3px 0 ${C.red}`;
          iconBg = C.red;
          iconColor = 'white';
          icon = '✗';
          anim = 'shakeX 0.4s ease';
        } else if (answered && isCorr) {
          bg = '#EDFAF1';
          border = `2px solid ${C.green}`;
          shadow = `0 3px 0 ${C.green}`;
          iconBg = C.green;
          iconColor = 'white';
          icon = '✓';
        } else if (answered && isSel) {
          bg = '#FFF0F0';
          border = `2px solid ${C.red}`;
          shadow = `0 3px 0 ${C.red}`;
          iconBg = C.red;
          iconColor = 'white';
          icon = '✗';
          textColor = C.textLight;
        } else if (answered) {
          textColor = C.textLight;
        }
        return (
          <button
            key={i}
            onClick={() => handle(i)}
            style={{
              background: bg,
              border,
              borderRadius: 16,
              padding: '14px 18px',
              cursor: answered ? 'default' : 'pointer',
              boxShadow: shadow,
              fontWeight: 700,
              fontSize: 16,
              color: textColor,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transition: 'all 0.15s',
              animation: anim,
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
                color: iconColor,
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              {icon}
            </span>
            {ch}
          </button>
        );
      })}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ language, setLanguage, totalStars, startModule }) {
  const t = T[language];
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const modules = [
    {
      id: 'story',
      emoji: '📖',
      title: t.storyTitle,
      sub: t.storySubtitle,
      ...MODULE_COLORS.story,
    },
    {
      id: 'sentences',
      emoji: '✨',
      title: t.sentenceTitle,
      sub: t.sentenceSubtitle,
      ...MODULE_COLORS.sentences,
    },
    {
      id: 'soundspy',
      emoji: '🔊',
      title: t.soundTitle,
      sub: t.soundSubtitle,
      ...MODULE_COLORS.soundspy,
    },
    {
      id: 'memory',
      emoji: '🧠',
      title: t.memoryTitle,
      sub: t.memorySubtitle,
      ...MODULE_COLORS.memory,
    },
  ];

  return (
    <div
      style={{
        padding: '28px 22px 36px',
        minHeight: '100vh',
        animation: 'fadeUp 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 26,
        }}
      >
        <div
          style={{
            background: C.yellow,
            borderRadius: 22,
            padding: '7px 18px',
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 800,
            fontSize: 20,
            boxShadow: `0 4px 0 ${C.yellowDark}`,
            color: C.text,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ⭐ {totalStars}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['it', 'fr', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                border:
                  language === l
                    ? `3px solid ${C.primary}`
                    : `2px solid ${C.border}`,
                background: language === l ? '#FFF0E5' : C.white,
                cursor: 'pointer',
                fontSize: 19,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.18s',
                boxShadow:
                  language === l ? `0 2px 10px rgba(255,140,66,0.3)` : 'none',
              }}
            >
              {l === 'it' ? '🇮🇹' : l === 'fr' ? '🇫🇷' : '🇬🇧'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1,
            marginBottom: 10,
            display: 'inline-block',
            animation: bounce ? 'bounce 0.55s ease' : 'none',
            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.12))',
          }}
        >
          🦕
        </div>
        <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800 }}>
          <div
            style={{
              fontSize: 13,
              color: C.textLight,
              letterSpacing: 0.5,
              marginBottom: 2,
            }}
          >
            {language === 'it'
              ? 'Benvenuta in'
              : language === 'fr'
              ? 'Bienvenue dans'
              : 'Welcome to'}
          </div>
          <div style={{ fontSize: 27, color: C.text, lineHeight: 1.15 }}>
            {t.subtitle}
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            display: 'inline-block',
            background: C.white,
            borderRadius: 12,
            padding: '5px 16px',
            fontSize: 12,
            fontWeight: 700,
            color: C.textLight,
            boxShadow: C.cardShadow,
          }}
        >
          {t.tagline}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 18,
        }}
      >
        {modules.map((m) => (
          <PressButton
            key={m.id}
            bg={m.bg}
            shadow={m.dark}
            onClick={() => startModule(m.id)}
            style={{
              padding: '18px 14px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontSize: 38,
                marginBottom: 8,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              }}
            >
              {m.emoji}
            </span>
            <div
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              {m.title}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.85)',
                marginTop: 3,
                fontWeight: 600,
              }}
            >
              {m.sub}
            </div>
          </PressButton>
        ))}
      </div>

      <div
        style={{
          background: C.white,
          borderRadius: 18,
          padding: '14px 16px',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          boxShadow: C.cardShadow,
        }}
      >
        <span style={{ fontSize: 26, flexShrink: 0 }}>🦕</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: C.textMid,
            lineHeight: 1.5,
          }}
        >
          {t.dinoSay}
        </span>
      </div>
    </div>
  );
}

// ─── LOADING ──────────────────────────────────────────────────────────────────
function LoadingScreen({ module, language }) {
  const t = T[language];
  const [msgIdx, setMsgIdx] = useState(0);
  const [dots, setDots] = useState(1);
  const ICONS = { story: '📖', sentences: '✨', soundspy: '🔊', memory: '🧠' };
  useEffect(() => {
    const d = setInterval(() => setDots((n) => (n >= 3 ? 1 : n + 1)), 450);
    const m = setInterval(
      () => setMsgIdx((n) => (n + 1) % t.loading.length),
      1600
    );
    return () => {
      clearInterval(d);
      clearInterval(m);
    };
  }, []);
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 88,
          marginBottom: 22,
          animation: 'pulse 1.8s ease infinite',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
        }}
      >
        {ICONS[module]}
      </div>
      <div
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: C.text,
          marginBottom: 8,
        }}
      >
        {t.loading[msgIdx]}
        {'.'.repeat(dots)}
      </div>
      <div style={{ fontSize: 15, color: C.textLight, fontWeight: 700 }}>
        🦕 Dino
      </div>
    </div>
  );
}

// ─── MCQ ACTIVITY (story / sentences / soundspy) ──────────────────────────────
function McqActivity({ module, language, activityData, onFinish, onHome }) {
  const t = T[language];
  const mc = MODULE_COLORS[module];
  const items =
    activityData?.questions ||
    activityData?.tasks ||
    activityData?.sentences ||
    [];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [stars, setStars] = useState(0);
  const [key, setKey] = useState(0);
  const current = items[step];

  const handleAnswer = (correct) => {
    setAnswered(true);
    setWasCorrect(correct);
    if (correct) setStars((s) => s + 1);
  };
  const handleNext = () => {
    if (step + 1 >= items.length) {
      onFinish(stars + (wasCorrect ? 0 : 0));
    } else {
      setStep((s) => s + 1);
      setAnswered(false);
      setWasCorrect(false);
      setKey((k) => k + 1);
    }
  };

  if (!current) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px 28px',
      }}
    >
      <TopBar
        onHome={onHome}
        step={step}
        total={items.length}
        sessionStars={stars}
        modColor={mc.bg}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: mc.bg,
          marginBottom: 14,
        }}
      >
        {module === 'story'
          ? t.storyLabel
          : module === 'sentences'
          ? t.sentenceLabel
          : t.soundLabel}
      </div>

      <div
        key={`card-${key}`}
        style={{
          background: C.white,
          borderRadius: 24,
          padding: 22,
          boxShadow: C.cardShadow,
          marginBottom: 16,
          animation: 'fadeUp 0.35s ease',
          flex: 1,
        }}
      >
        {module === 'story' && (
          <StoryCard
            current={current}
            activityData={activityData}
            step={step}
          />
        )}
        {module === 'sentences' && <SentenceCard current={current} t={t} />}
        {module === 'soundspy' && <SoundCard current={current} t={t} />}
      </div>

      <div key={`choices-${key}`} style={{ animation: 'fadeUp 0.4s ease' }}>
        <ChoiceList
          choices={current.choices}
          correct={current.correct}
          onAnswer={handleAnswer}
        />
      </div>

      {answered && (
        <div
          style={{
            marginTop: 14,
            animation: 'pop 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div
            style={{
              background: wasCorrect ? '#EDFAF1' : '#FFF5E6',
              border: `2px solid ${wasCorrect ? C.green : C.primary}`,
              borderRadius: 16,
              padding: '12px 18px',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 22 }}>{wasCorrect ? '🌟' : '💪'}</span>
            <span
              style={{
                fontWeight: 800,
                color: wasCorrect ? '#3CAF60' : C.primary,
                fontSize: 15,
                lineHeight: 1.3,
              }}
            >
              {wasCorrect
                ? current.encouragement || t.defaultPraise
                : t.correctMsg}
            </span>
          </div>
          <PressButton
            bg={mc.bg}
            shadow={mc.dark}
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '16px',
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 800,
              fontSize: 19,
              color: 'white',
            }}
          >
            {step + 1 >= items.length ? t.done : t.next}
          </PressButton>
        </div>
      )}
    </div>
  );
}

function StoryCard({ current, activityData, step }) {
  return (
    <div>
      {step === 0 && (
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontSize: 56,
              textAlign: 'center',
              marginBottom: 10,
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.1))',
            }}
          >
            {activityData.emoji}
          </div>
          <div
            style={{
              background: '#FFF8ED',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 14,
              color: C.textMid,
              fontWeight: 700,
              lineHeight: 1.6,
              borderLeft: `3px solid ${C.yellow}`,
            }}
          >
            {activityData.scene}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span
          style={{
            fontSize: 44,
            flexShrink: 0,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          {current.hint_emoji}
        </span>
        <div
          style={{
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 800,
            fontSize: 21,
            color: C.text,
            lineHeight: 1.45,
            paddingTop: 4,
          }}
        >
          {current.prompt}
        </div>
      </div>
    </div>
  );
}

function SentenceCard({ current, t }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 58,
          marginBottom: 18,
          filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.1))',
        }}
      >
        {current.hint_emoji}
      </div>
      <div
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: C.text,
          lineHeight: 1.65,
        }}
      >
        {current.before}{' '}
        <span
          style={{
            display: 'inline-block',
            background: '#F2EFFF',
            border: `2px dashed ${C.purple}`,
            borderRadius: 10,
            padding: '1px 14px',
            color: C.purple,
            minWidth: 64,
            verticalAlign: 'middle',
          }}
        >
          ___
        </span>
        {current.after ? ' ' + current.after : ''}
      </div>
      <div
        style={{
          marginTop: 14,
          display: 'inline-block',
          background: current.category === 'pronoun' ? '#FFF0E5' : '#EEF3FF',
          borderRadius: 10,
          padding: '5px 13px',
          fontSize: 13,
          fontWeight: 800,
          color: current.category === 'pronoun' ? C.primary : '#4A88D9',
        }}
      >
        {current.category === 'pronoun' ? t.pronoun : t.verb}
      </div>
    </div>
  );
}

function SoundCard({ current, t }) {
  const typeLabel = { blend: t.blend, elision: t.elision, match: t.match };
  const typeBg = { blend: '#FFF0E5', elision: '#EEF3FF', match: '#EDFAF1' };
  const typeClr = { blend: C.primary, elision: '#4A88D9', match: C.green };
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 62,
          marginBottom: 14,
          filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.1))',
        }}
      >
        {current.hint_emoji}
      </div>
      <div
        style={{
          display: 'inline-block',
          background: typeBg[current.type] || '#F5F5F5',
          borderRadius: 10,
          padding: '5px 14px',
          fontSize: 13,
          fontWeight: 800,
          color: typeClr[current.type] || C.text,
          marginBottom: 14,
        }}
      >
        {typeLabel[current.type] || current.type}
      </div>
      <div
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 20,
          color: C.text,
          lineHeight: 1.5,
        }}
      >
        {current.instruction}
      </div>
    </div>
  );
}

// ─── MEMORY GARDEN ────────────────────────────────────────────────────────────
function MemoryGarden({ language, onFinish, onHome }) {
  const t = T[language];
  const mc = MODULE_COLORS.memory;
  const ROUNDS = 4;
  const SHOW_MS = 850;

  const [round, setRound] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState(() => makeRound(1));
  const [phase, setPhase] = useState('show');
  const [showIdx, setShowIdx] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [userTaps, setUserTaps] = useState([]);
  const [resultOk, setResultOk] = useState(null);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (phase !== 'show') return;
    setShowIdx(0);
    setHiding(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < sequence.length) {
        setShowIdx(i);
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            setPhase('input');
            setUserTaps([]);
          }, 480);
        }, SHOW_MS);
      }
    }, SHOW_MS);
    return () => clearInterval(iv);
  }, [phase, sequence]);

  const handleTap = (e) => {
    if (phase !== 'input') return;
    const next = [...userTaps, e];
    setUserTaps(next);
    if (next.length === sequence.length) {
      const ok = next.every((em, i) => em === sequence[i]);
      setResultOk(ok);
      if (ok) setStars((s) => s + 1);
      setPhase('result');
    }
  };

  const handleNext = () => {
    const nr = round + 1;
    if (nr >= ROUNDS) {
      onFinish(stars);
      return;
    }
    const nl = resultOk ? Math.min(level + 1, 3) : Math.max(level - 1, 1);
    setRound(nr);
    setLevel(nl);
    setSequence(makeRound(nl));
    setPhase('show');
    setResultOk(null);
  };

  const gridEmojis = GARDEN_EMOJIS;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px 28px',
      }}
    >
      <TopBar
        onHome={onHome}
        step={round}
        total={ROUNDS}
        sessionStars={stars}
        modColor={mc.bg}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: mc.bg,
          marginBottom: 12,
        }}
      >
        {t.memoryLabel}
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}
      >
        <div
          style={{
            background: '#EDFAF1',
            borderRadius: 14,
            padding: '6px 18px',
            fontWeight: 800,
            fontSize: 13,
            color: C.green,
            border: `2px solid ${C.green}`,
          }}
        >
          {t.memoryLevel} {level} — {sequence.length}{' '}
          {language === 'it' ? '🌸' : language === 'fr' ? '🌸' : '🌸'}
        </div>
      </div>

      {/* Sequence display */}
      <div
        style={{
          background: C.white,
          borderRadius: 24,
          padding: 22,
          boxShadow: C.cardShadow,
          marginBottom: 18,
          minHeight: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {phase === 'show' && (
          <>
            <div
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: C.textMid,
                marginBottom: 18,
              }}
            >
              {t.memoryWatch}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {sequence.map((e, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 50,
                    width: 68,
                    height: 68,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: i <= showIdx && !hiding ? '#EDFAF1' : '#F5F5F5',
                    borderRadius: 18,
                    border:
                      i <= showIdx && !hiding
                        ? `3px solid ${C.green}`
                        : `3px solid ${C.border}`,
                    transition: 'all 0.3s',
                    opacity: hiding ? 0.05 : i <= showIdx ? 1 : 0.2,
                    transform:
                      i === showIdx && !hiding ? 'scale(1.18)' : 'scale(1)',
                    filter:
                      i <= showIdx && !hiding
                        ? 'drop-shadow(0 4px 8px rgba(93,200,122,0.4))'
                        : 'none',
                  }}
                >
                  {e}
                </div>
              ))}
            </div>
          </>
        )}

        {phase === 'input' && (
          <>
            <div
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: C.textMid,
                marginBottom: 14,
              }}
            >
              {t.memoryGo}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 4,
              }}
            >
              {sequence.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: i < userTaps.length ? C.green : C.border,
                    transition: 'background 0.2s',
                    border: `2px solid ${
                      i < userTaps.length ? C.green : C.border
                    }`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {phase === 'result' && (
          <div
            style={{
              textAlign: 'center',
              animation: 'pop 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 10 }}>
              {resultOk ? '🌸' : '💪'}
            </div>
            <div
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 800,
                fontSize: 21,
                color: resultOk ? C.green : C.primary,
              }}
            >
              {resultOk ? t.memoryRight : t.memoryWrong}
            </div>
            {!resultOk && (
              <div style={{ marginTop: 10, fontSize: 28, letterSpacing: 4 }}>
                {sequence.join(' ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tap grid */}
      {phase === 'input' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {gridEmojis.map((e, i) => {
            const inSeq = sequence.includes(e);
            return (
              <button
                key={i}
                onClick={() => inSeq && handleTap(e)}
                style={{
                  fontSize: 42,
                  height: 76,
                  borderRadius: 18,
                  border: `2px solid ${inSeq ? C.border : 'transparent'}`,
                  background: inSeq ? C.white : '#F5F5F5',
                  cursor: inSeq ? 'pointer' : 'default',
                  boxShadow: inSeq ? `0 4px 0 ${C.border}` : 'none',
                  opacity: inSeq ? 1 : 0.25,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
              >
                {e}
              </button>
            );
          })}
        </div>
      )}

      {phase === 'result' && (
        <PressButton
          bg={mc.bg}
          shadow={mc.dark}
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '16px',
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 800,
            fontSize: 19,
            color: 'white',
            animation: 'fadeUp 0.3s ease',
          }}
        >
          {round + 1 >= ROUNDS ? t.done : t.next}
        </PressButton>
      )}
    </div>
  );
}

// ─── REWARD ───────────────────────────────────────────────────────────────────
function RewardScreen({ sessionStars, module, onHome, onPlayAgain, language }) {
  const t = T[language];
  const mc = MODULE_COLORS[module] || MODULE_COLORS.story;
  const [sticker, setSticker] = useState(null);
  const STICKERS = [
    '🌟',
    '🦋',
    '🌈',
    '🦕',
    '🌺',
    '🎨',
    '🏆',
    '⭐',
    '🎉',
    '🌙',
    '🐴',
    '🦄',
    '🌸',
    '🐸',
    '🍓',
  ];
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 22px',
        textAlign: 'center',
        animation: 'fadeUp 0.4s ease',
      }}
    >
      <div
        style={{
          fontSize: 88,
          marginBottom: 14,
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
        }}
      >
        🎉
      </div>
      <h2
        style={{
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 30,
          color: C.text,
          marginBottom: 16,
        }}
      >
        {t.bravo}
      </h2>
      <div
        style={{
          background: C.yellow,
          borderRadius: 22,
          padding: '12px 28px',
          fontFamily: "'Baloo 2',sans-serif",
          fontWeight: 800,
          fontSize: 24,
          boxShadow: `0 5px 0 ${C.yellowDark}`,
          marginBottom: 28,
        }}
      >
        ⭐ +{sessionStars} {t.starsEarned}
      </div>
      {!sticker ? (
        <>
          <p
            style={{
              fontWeight: 800,
              color: C.textLight,
              marginBottom: 16,
              fontSize: 15,
            }}
          >
            {t.pickSticker}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
              marginBottom: 28,
              maxWidth: 320,
            }}
          >
            {STICKERS.map((s) => (
              <button
                key={s}
                onClick={() => setSticker(s)}
                style={{
                  fontSize: 34,
                  background: C.white,
                  border: `2px solid ${C.border}`,
                  borderRadius: 14,
                  padding: '10px 11px',
                  cursor: 'pointer',
                  boxShadow: `0 4px 0 ${C.border}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            fontSize: 90,
            marginBottom: 28,
            animation: 'pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {sticker}
        </div>
      )}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <PressButton
          bg={mc.bg}
          shadow={mc.dark}
          onClick={onPlayAgain}
          style={{
            padding: '20px 24px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: 42 }}>🔄</span>
          <div>
            <div
              style={{
                fontFamily: "'Baloo 2',sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: 'white',
              }}
            >
              {t.again}
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
              }}
            >
              {t.againSub}
            </div>
          </div>
        </PressButton>
        <button
          onClick={onHome}
          style={{
            background: C.white,
            border: `2px solid ${C.border}`,
            borderRadius: 18,
            padding: '14px',
            cursor: 'pointer',
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: C.textLight,
            boxShadow: `0 3px 0 ${C.border}`,
          }}
        >
          {t.backHome}
        </button>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState('it');
  const [totalStars, setTotalStars] = useState(0);
  const [sessionStars, setSessionStars] = useState(0);
  const [module, setModule] = useState(null);
  const [activityData, setActivityData] = useState(null);

  const startModule = async (mod) => {
    setModule(mod);
    setActivityData(null);
    setSessionStars(0);
    if (mod === 'memory') {
      setScreen('memory');
      return;
    }
    setScreen('loading');
    try {
      const prompt =
        mod === 'story'
          ? storyPrompt(language)
          : mod === 'sentences'
          ? sentencePrompt(language)
          : soundSpyPrompt(language);
      const data = await callClaude(prompt);
      setActivityData(data);
      setScreen('activity');
    } catch (e) {
      console.error(e);
      setScreen('home');
    }
  };

  const handleFinish = (stars) => {
    setSessionStars(stars);
    setTotalStars((t) => t + stars);
    setScreen('reward');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#FEF9F0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pop{0%{transform:scale(0.7);opacity:0;}70%{transform:scale(1.08);}100%{transform:scale(1);opacity:1;}}
        @keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
        @keyframes shakeX{0%,100%{transform:translateX(0);}20%{transform:translateX(-7px);}40%{transform:translateX(7px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
        button{font-family:'Nunito',sans-serif;}
      `}</style>
      <div
        style={{
          minHeight: '100vh',
          background: '#FEF9F0',
          display: 'flex',
          justifyContent: 'center',
          fontFamily: "'Nunito',sans-serif",
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 440,
            minHeight: '100vh',
            background: '#FEF9F0',
          }}
        >
          {screen === 'home' && (
            <HomeScreen
              language={language}
              setLanguage={setLanguage}
              totalStars={totalStars}
              startModule={startModule}
            />
          )}
          {screen === 'loading' && (
            <LoadingScreen module={module} language={language} />
          )}
          {screen === 'activity' && activityData && (
            <McqActivity
              module={module}
              language={language}
              activityData={activityData}
              onFinish={handleFinish}
              onHome={() => setScreen('home')}
            />
          )}
          {screen === 'memory' && (
            <MemoryGarden
              language={language}
              onFinish={handleFinish}
              onHome={() => setScreen('home')}
            />
          )}
          {screen === 'reward' && (
            <RewardScreen
              sessionStars={sessionStars}
              module={module}
              language={language}
              onHome={() => setScreen('home')}
              onPlayAgain={() => startModule(module)}
            />
          )}
        </div>
      </div>
    </>
  );
}
