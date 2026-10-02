/**
 * Configuración de "Cerca a pesar de la distancia"
 * Dedicado con todo el amor de Simón para Ali ❤️
 */

const CONFIG = {
  // Información de la pareja
  couple: {
    from: "Simón",
    to: "Ali",
    nickname: "Mi Niña Hermosa",
    princesa: "Princesa (Pug)",
    abril: "Abril (Llama)",
    subtitle: "Cerca a pesar de la distancia",
    dedication: "Aunque existan kilómetros entre nosotros, cada latido de mi corazón lleva tu nombre. Esta semana cada día tendrás un detalle, videos, audios y cartas especiales solo para ti."
  },

  // Enlace a la Carpeta Madre de Google Drive
  masterDriveFolder: "https://drive.google.com/drive/folders/12ICMoPJpIoeE8QrPMrNJz5WxQzzTY0zj?usp=sharing",

  // Frases de amor interactivas flotantes
  lovePhrases: [
    { text: "Te amo con toda mi alma ❤️", emoji: "💖" },
    { text: "Te adoro mi princesa 👑", emoji: "✨" },
    { text: "Me vas a hacer mucha falta 🥺", emoji: "🌸" },
    { text: "Siempre en mi corazón 🕊️", emoji: "💫" },
    { text: "Eres mi lugar seguro 🏡", emoji: "💕" },
    { text: "Contigo cada día es mágico 🌟", emoji: "🥰" },
    { text: "Princesa y Abril te mandan amor 🐾", emoji: "🐶" },
    { text: "Mi amor por ti es infinito ♾️", emoji: "💌" }
  ],

  // Stickers especiales
  stickers: [
    { id: "princesa", name: "Princesa", label: "Princesa 🐶👑", image: "assets/stickers/princesa_pug.svg", color: "#FF6B8B" },
    { id: "abril", name: "Abril", label: "Abril 🦙🌸", image: "assets/stickers/abril_llama.svg", color: "#A78BFA" },
    { id: "carta", name: "Carta", label: "Carta de Amor 💌", image: "assets/stickers/sobre_carta.svg", color: "#F43F5E" }
  ],

  // 7 Días de sorpresas, cartas, contraseñas y enlaces de Drive
  days: [
    {
      id: 1,
      dayNumber: 1,
      title: "Día 1: El Comienzo del Viaje",
      subtitle: "Un pedacito de mi corazón se queda contigo",
      icon: "🌅",
      coverEmoji: "💌",
      dateLabel: "Día 1",
      password: "Teamomiamor",
      hint: "Pista: Lo que más te digo con todo el corazón (tres palabras juntas: Te amo...)",
      driveUrl: "https://drive.google.com/drive/folders/1Joh-dGU3l5ic6hQx_Ojb_oOc0LNvyQnJ?usp=sharing",
      letter: `Mi Ali hermosa,\n\nHoy es el primer día y ya siento que te extraño más de lo que las palabras pueden explicar. Quiero que sepas que aunque la distancia nos separe físicamente por estos días, mi pensamiento, mi cariño y mi devoción están 100% contigo.\n\nEn este primer día te dejé videos y audios preparados con muchísimo amor para que los escuches cuando quieras y sientas que estoy a tu ladito. Eres mi niña hermosa y la princesa de mi vida.\n\nTe amo con todo mi ser,\nSimón ❤️`
    },
    {
      id: 2,
      dayNumber: 2,
      title: "Día 2: Tu Sonrisa que Ilumina Mi Vida",
      subtitle: "La luz que me acompaña en cada momento",
      icon: "✨",
      coverEmoji: "🌟",
      dateLabel: "Día 2",
      password: "Teadoromiprincesa",
      hint: "Pista: Te adoro + cómo te llamo con corona (todo junto)",
      driveUrl: "https://drive.google.com/drive/folders/1MvF754TXjNGKP2ThLPk8u9DrtfqyNUQL?usp=sharing",
      letter: `Hola mi vida preciosa,\n\nHoy me desperté pensando en tu sonrisa, esa que tiene la magia de calmar cualquier tormenta y llenar mi mundo de felicidad. No hay un solo momento de mi día donde no vea algo y piense en ti.\n\nRevisa la carpeta de hoy: tienes un audio grabado con mucho cariño y un video que te recordará lo increíble y valiosa que eres para mí.\n\nTe adoro inmensamente,\nSimón 💕`
    },
    {
      id: 3,
      dayNumber: 3,
      title: "Día 3: Recordando Nuestros Momentos",
      subtitle: "Cada recuerdo contigo es mi tesoro favorito",
      icon: "📸",
      coverEmoji: "💖",
      dateLabel: "Día 3",
      password: "Teextrañopreciosa",
      hint: "Pista: Lo que siento ahora mismo por ti + preciosa (junto)",
      driveUrl: "https://drive.google.com/drive/folders/1DI8281IDKvLCl2iTZpNRonqkpKpongHA?usp=sharing",
      letter: `Mi princesa consentida,\n\nYa vamos por el tercer día. Hoy me puse a repasar nuestras fotos y momentos juntos, y se me llena el pecho de una gratitud inmensa por tenerte a mi lado. Princesa y Abril también te mandan sus buenas vibras.\n\nEn la carpeta de hoy tienes memorias y un mensaje muy especial que grabé pensando en lo felices que somos juntos.\n\nSiempre tuyo,\nSimón 🕊️`
    },
    {
      id: 4,
      dayNumber: 4,
      title: "Día 4: Eres Mi Mayor Alegría",
      subtitle: "Mitad de camino: cada vez más cerca de abrazarte",
      icon: "👑",
      coverEmoji: "🏰",
      dateLabel: "Día 4",
      password: "Mefascinas",
      hint: "Pista: Una sola palabra que describe el efecto que causas en mí (Me f...)",
      driveUrl: "https://drive.google.com/drive/folders/1VCZ7IX1JcZRPviaR9mL9DF7TrBbXMZqX?usp=drive_link",
      letter: `¡Hola mi Princesa Ali!\n\n¡Mitad de semana completada! Cada segundo que pasa es un segundo menos para volver a tenerte entre mis brazos, oler tu perfume y darte ese abrazo apretado que tengo guardado para ti.\n\nNo olvides lo inteligente, hermosa y única que eres. Hoy prepárate para los videos y audios que te preparé con tanta ilusión.\n\nCon amor eterno,\nSimón 👑`
    },
    {
      id: 5,
      dayNumber: 5,
      title: "Día 5: Todo lo que Eres para Mí",
      subtitle: "Amor del bueno, bonito y verdadero",
      icon: "🐾",
      coverEmoji: "🐶",
      dateLabel: "Día 5",
      password: "Meencantasbienbastante",
      hint: "Pista: Me encantas + bien + bastante (tres palabras unidas)",
      driveUrl: "https://drive.google.com/drive/folders/110wvkxBt91lUwamkwbwhSuM94AOcaLO7?usp=drive_link",
      letter: `Mi reina hermosa,\n\nHoy le dedico este día a la calidez de nuestro amor y a todo lo que construimos día a día con cariño, paciencia y alegría. \n\nTe preparé un audio muy tierno con anécdotas y detalles que solo tú y yo comprendemos. ¡Disfrútalo mucho!\n\nTe amo con locura,\nSimón 🌸`
    },
    {
      id: 6,
      dayNumber: 6,
      title: "Día 6: La Cuenta Regresiva",
      subtitle: "Casi listos para el mejor reencuentro del mundo",
      icon: "⏳",
      coverEmoji: "💫",
      dateLabel: "Día 6",
      password: "Yacasinosvemos",
      hint: "Pista: La frase que resume que la espera casi termina (Ya casi nos...)",
      driveUrl: "https://drive.google.com/drive/folders/1UHo8ijEi95oJt_EsdkAW5MDoVGbaXkWX?usp=drive_link",
      letter: `¡Mi cielito lindo!\n\n¡Falta muy poco! Mañana es el último día de esta espera y no te imaginas la emoción que tengo en el corazón. He aprendido en este viaje que no importa dónde esté, mi hogar siempre es donde estés tú.\n\nAbre los videos de hoy, te van a llenar de emoción y ternura.\n\nContando los minutos para verte,\nSimón 🚀💖`
    },
    {
      id: 7,
      dayNumber: 7,
      title: "Día 7: Por Fin Juntos Otra Vez",
      subtitle: "El amor todo lo puede y todo lo supera",
      icon: "🎉",
      coverEmoji: "🏆",
      dateLabel: "Día 7",
      password: "31032026",
      hint: "Pista: Una fecha muy especial en números (8 dígitos)",
      driveUrl: "https://drive.google.com/drive/folders/1s_lCa4DhywsbR5fSjymMUNQRMzMMC_qj?usp=drive_link",
      letter: `¡Llegó el gran día mi amor!\n\nCompletamos los 7 días. Esta prueba de distancia solo demostró una cosa: que lo nuestro es fuerte, genuino y a prueba de todo. Gracias por tu paciencia, por tus mensajes y por hacerme el hombre más afortunado del universo.\n\nPrepárate para recibirme porque no te voy a soltar en todo el día.\n\n¡Te amo con toda mi alma para siempre!\nTu Simón ❤️✨`
    }
  ]
};

// Exportar globalmente para su uso en el navegador
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
