export const SHOP_SIDEBAR_CONFIG = {
  mainCategories: [
    { id: "clothes", label: "پوشاک" },
    { id: "digital", label: "کالاهای دیجیتال" },
  ],

  productTypes: {
    clothes: [
      { key: "tshirt", label: "تی‌شرت" },
      { key: "hoodie", label: "هودی" },
      { key: "dours", label: "دورس" },
      { key: "canvas", label: "تابلو" },
    ],
    digital: [
      { key: "summary", label: "خلاصه کتاب" },
      { key: "special-episode", label: "اپیزود ویژه" },
      { key: "course", label: "آموزش" },
    ],
  },

  topics: {
    music: {
      label: "موسیقی",
      children: {
        metal: "متال",
        rock: "راک",
        jazz: "جز",
        hiphop: "هیپ‌هاپ",
      },
    },
    cinema: {
      label: "سینما / سریال",
      children: {
        scifi: "علمی‌تخیلی",
        drama: "درام",
        horror: "ترسناک",
      },
    },
    game: {
      label: "بازی",
      children: {
        dota2: "Dota 2",
        gow: "God of War",
        lol: "League of Legends",
      },
    },
  },
};
