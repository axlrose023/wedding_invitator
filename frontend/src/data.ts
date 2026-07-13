// Content for the MINIMAL wedding invitation.
// Matches the linkvite.ink MINIMAL reference (Roman & Olena, Lviv, 18.08.26).
// Swap these values for the real couple later.

export const wedding = {
  dateLabel: "29.07.26",
  // ISO date/time of the ceremony start — used for the countdown.
  dateISO: "2026-07-29T13:00:00+03:00",
  // The day the couple got together — "days together" counts up from here.
  togetherSince: "2023-12-30",
  city: "KYIV",
  kicker: "THE WEDDING DAY",
  kickerOf: "OF",
  groom: "Volodymyr",
  bride: "Iryna",
  and: "and",

  greeting: {
    title: "Our big day",
    heading: "ДОРОГІ ГОСТІ!",
    text: "Незабаром у нашому житті відбудеться особлива подія — наше весілля. Ми будемо дуже раді розділити цей день разом з вами.",
  },

  details: {
    title: "Details",
    events: [
      {
        name: "РЕЄСТРАЦІЯ ШЛЮБУ",
        time: "29 липня, 15:00",
        place: "Новий ЗАГС Центральний",
        address: "м. Київ, проспект Берестейський, 42А",
        mapUrl: "https://maps.google.com/?q=Новий+ЗАГС+Центральний+Київ+проспект+Берестейський+42А",
        withPhoto: false,
      },
      {
        name: "СВЯТКУВАННЯ",
        time: "29 липня, 16:00",
        place: "Belkin",
        address: "м. Київ, проспект Берестейський, 40",
        mapUrl: "https://maps.google.com/?q=Belkin+ресторан+проспект+Берестейський+40+Київ",
        withPhoto: true,
      },
    ],
  },

  dressCode: {
    title: "Dress code",
    text: "Одягайтеся так, як вам подобається та комфортно — жодних обмежень по кольору чи стилю!",
    note: "Тільки залиште білий колір нареченій :)",
  },

  timeline: {
    title: "Timeline",
    items: [
      { time: "13:00", label: "Збір гостей" },
      { time: "14:00", label: "Церемонія" },
      { time: "15:30", label: "Початок бенкету" },
      { time: "17:30", label: "Перший танець" },
      { time: "21:00", label: "Весільний торт" },
      { time: "22:00", label: "Танці та розваги" },
    ],
  },

  gifts: {
    title: "Gifts",
    lines: [
      "Ми вважаємо вашу присутність на нашому",
      "святі найкращим подарунком!",
    ],
  },

  connected: {
    title: "Stay connected",
    helpText: "Якщо вам знадобиться допомога або виникнуть запитання, наш координатор завжди на зв'язку:",
    coordinatorName: "Інна",
    coordinatorRole: "КООРДИНАТОР",
    coordinatorTelegram: "@InnaHanzha",
  },

  attendance: {
    title: "Attendance",
    subtitle: "Будь ласка, дайте нам знати про вашу присутність",
    question: "Чи зможете ви розділити з нами цей важливий день?*",
    yes: "ТАК",
    no: "НІ",
  },

  questions: {
    title: "Questions",
    items: [
      {
        q: "Чи можна прийти з дітьми?",
        a: "Звісно! Ми будемо раді бачити вашу родину у повному складі. Для найменших гостей ми підготували спеціальне дитяче меню.",
      },
      {
        q: "Де я можу залишити автомобіль?",
        a: "Біля місця святкування є облаштована парковка для гостей. Радимо приїжджати заздалегідь.",
      },
      {
        q: "Чи передбачається трансфер до місця події?",
        a: "Так, для гостей буде організований трансфер від собору до ресторану після церемонії вінчання.",
      },
      {
        q: "Чи можна брати з собою домашніх улюбленців?",
        a: "На жаль, ми змушені попросити вас залишити домашніх улюбленців вдома, аби свято було комфортним для всіх гостей.",
      },
    ],
  },

  stats: {
    // `value: null` -> computed live (days since togetherSince).
    items: [
      { value: null, label: "ДНІ РАЗОМ" },
      { value: "8", label: "СПІЛЬНИХ ПОДОРОЖЕЙ" },
      { value: "1", label: "НАЙВАЖЛИВІША ВІДПОВІДЬ" },
      { value: "∞", label: "ПЛАНІВ НА МАЙБУТНЄ" },
    ] as { value: string | null; label: string }[],
  },

  countdown: {
    title: "See you soon",
  },
};

export type Wedding = typeof wedding;
