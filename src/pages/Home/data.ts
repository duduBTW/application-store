export type GameDto = {
  id: string;
  image: string;
  name: string;
  price?: string;
  genre: string;
  studio: string;
  gallery?: string[];
  size: number;
};

export const games: GameDto[] = [
  {
    id: "1",
    genre: "Gacha",
    image:
      "https://play-lh.googleusercontent.com/D4DUUFQDCsH9NIEa8hjMjQSWdtNhGX1Fd_jT-23ogAb5uMMqttqQDUJcUt4K_u8RYOQ=w240-h480-rw",
    name: "Arknights",
    studio: "Yostar Limited",
    gallery: [
      "https://play-lh.googleusercontent.com/-n3IGe2RWAsevJY_bEJ5yJYrirfK1m3LjDw2c2mdBSG9XuYDea5QvtsdhSaOrbbp0w=w526-h296-rw",
      "https://play-lh.googleusercontent.com/NZmtijADebZMS9eAOwAMx2FWH9d6YSYvECjaNy7EoI5-0xPaZ3AqATRrrsCoC5_CyQ=w526-h296-rw",
      "https://play-lh.googleusercontent.com/mYUdRcAaiRrkFyu1U1vi_79JOBaiptw3KX-vjWVQ3gA573aoQxiYcSQig8D6WyBm-dgl=w526-h296-rw",
      "https://play-lh.googleusercontent.com/X1ef52TxxN9UQwFp4n0eNix0tjemOuAImOiap9gdSlH4tfrYVoFU14qMkSSOSgrSYUo=w526-h296-rw",
    ],
    size: 100000000,
  },
  {
    id: "2",
    genre: "Gacha",
    image:
      "https://play-lh.googleusercontent.com/GzE4JkEDmeN3mIzDVZhV-ZcmbMdA0dozyHnrOD38CKMuS-E7HeL7tAr3BHkf3e3Dv-o",
    name: "Blue archive",
    studio: "NEXON",
    gallery: [
      "https://play-lh.googleusercontent.com/n0EfWSnKtEU56Tcuy03p0Awm7dYqwsYGGGRi5IVJMZw9AtvSvXGmyYT-bLHY9E4-00A=w526-h296-rw",
      "https://play-lh.googleusercontent.com/x9gJOsQSkVfAtW3qPz28ApV2h6S1j1DI0eqBO8Dh6igehaJl0F9kJiyO0OjvxEIqIgQ=w526-h296-rw",
      "https://play-lh.googleusercontent.com/zneNYlhOLtWdua4qzXw2hIbx9AjxpzwuR8DvpwJTWdoOWsDP5bRwIyi4o93dGUKkvpdw=w526-h296-rw",
      "https://play-lh.googleusercontent.com/HUhj43x8PxrwOewWv4htL6iP4WkrrHAqhqrYvG6RlFMloRwJ7J0AXvALeB8gQuX18Es=w526-h296-rw",
      "https://play-lh.googleusercontent.com/9jICmU8qQHhDcUg9y8_G-xrVdZlz2S_IZA6PzFopY84qBKn_RaIrMQ-fx5Aoico5lTE=w526-h296-rw",
    ],
    size: 300000000,
  },
  {
    id: "3",
    genre: "Survival",
    image:
      "https://play-lh.googleusercontent.com/BoAvMI_6JGNRBp_3gFaVuLuqW_4J-rjtbR_giKFoJRvZmDiPtDlnLMur9cT7sTTfeos=s52-rw",
    name: "Terraria",
    studio: "505 Games",
    price: "R$ 19,99",
    gallery: [
      "https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_8c03886f214d2108cafca13845533eaa3d87d83f.600x338.jpg?t=1666290860",
      "https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_ae168a00ab08104ba266dc30232654d4b3c919e5.600x338.jpg?t=1666290860",
      "https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_9edd98caaf9357c2f40758f354475a56e356e8b0.600x338.jpg?t=1666290860",
      "https://cdn.akamai.steamstatic.com/steam/apps/105600/ss_75ea9a7e39eb34b40efa1e6dfd2536098dc4734b.600x338.jpg?t=1666290860",
    ],
    size: 30000000,
  },
  {
    id: "4",
    genre: "Survival",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMKS9PgX1_m9jkGsDK-nbwrZcmb5q_ryczmHzU5qP7g&s",
    name: "Stardew Valley",
    studio: "ConcernedApe",
    price: "R$ 19,99",
    gallery: [
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_b887651a93b0525739049eb4194f633de2df75be.600x338.jpg?t=1711128146",
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_9ac899fe2cda15d48b0549bba77ef8c4a090a71c.600x338.jpg?t=1711128146",
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_4fa0866709ede3753fdf2745349b528d5e8c4054.600x338.jpg?t=1711128146",
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_d836f0a5b0447fb6a2bdb0a6ac5f954949d3c41e.600x338.jpg?t=1711128146",
    ],
    size: 550000000,
  },
  {
    id: "5",
    genre: "Survival",
    image:
      "https://play-lh.googleusercontent.com/Mn9NateYFRZQbWnlZvszDPoKZbeuZM2O-Kyn7EKRCZI3D8joecHqytfOx73IyuAwHw=s64-rw",
    name: "Dead Cells",
    studio: "ConcernedApe",
    price: "R$ 19,99",
    gallery: [
      "https://cdn.akamai.steamstatic.com/steam/apps/588650/ss_ac28000ade40cc2fe5c128f32ac98ba33c008a7a.600x338.jpg?t=1678188017",
      "https://cdn.akamai.steamstatic.com/steam/apps/588650/ss_7bde51ea6c8f6289e85ea1d8c1c941e1f8bfee91.600x338.jpg?t=1678188017",
      "https://cdn.akamai.steamstatic.com/steam/apps/588650/ss_e87e72a247918d8493892e035d5e1b4b84470d2f.600x338.jpg?t=1678188017",
      "https://cdn.akamai.steamstatic.com/steam/apps/588650/ss_a099416b9f3e09d47c42f87667e6ad6f394ba652.600x338.jpg?t=1678188017",
    ],
    size: 1550000000,
  },
  {
    id: "6",
    genre: "Survival",
    image:
      "https://play-lh.googleusercontent.com/R1dShZj1HNBQzrHhsAD9_F8BRc2FU-nlDMU7OIAIwnMge04QWvNZR-clnXnEd_v30Qo=w240-h480-rw",
    name: "Vampire Survivors",
    studio: "Poncle",
    gallery: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1794680/ss_6c55afe36be2a7784bf18cb9b3218321ae2d10e5.600x338.jpg?t=1709045148",
      "https://cdn.akamai.steamstatic.com/steam/apps/1794680/ss_6105ad3d6af52593c31d915bf39e91512611ea8e.600x338.jpg?t=1709045148",
      "https://cdn.akamai.steamstatic.com/steam/apps/1794680/ss_054159adc52856d066d48bda02866da524c43439.1920x1080.jpg?t=1709045148",
      "https://cdn.akamai.steamstatic.com/steam/apps/1794680/ss_01ec75b8055dbaa6895a0be127508ff569917a1e.1920x1080.jpg?t=1709045148",
    ],
    size: 400000000,
  },
  {
    id: "7",
    genre: "Music",
    image:
      "https://play-lh.googleusercontent.com/CJpy6_LHwOX93RBdFUvKZ3FG3LR1YXQt_V735QhfMz0TwmpFp415Nit9jBjpDbzBiR-7=s64-rw",
    name: "Muse Dash",
    studio: "hasuhasu",
    gallery: [
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_08637a7ac0fb40479d0ad69c78e49805641644e3.600x338.jpg?t=1706497719",
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_2c2433413895c9d90ce5e7e31d81e963a2238bc3.600x338.jpg?t=1706497719",
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_ab029483f2e7341ac621540794e4d372acd02213.600x338.jpg?t=1706497719",
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_a8d9434bb3ecdfd3100f3d24f4ba7b6ebe36427b.600x338.jpg?t=1706497719",
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_a35acedc51f199976e7941a62369a0d0b5c819d7.600x338.jpg?t=1706497719",
      "https://cdn.akamai.steamstatic.com/steam/apps/774171/ss_e18e7065187ea08ba8574d7c7b3eb9bf8ade2da6.600x338.jpg?t=1706497719",
    ],
    size: 3000000,
  },
];

export async function fetchTopGames() {
  return games.slice(0, 4);
}

export async function fetchRecommendedGames() {
  const size = games.length;
  return games.slice(size - 4, size);
}
