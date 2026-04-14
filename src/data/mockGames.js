// src/data/mockGames.js
// Shape mirrors the RAWG API response so swapping to real API is a one-liner.
// Docs: https://rawg.io/apidocs  (GET /games)

export const GENRES = [
  { id: 4,   name: "Action" },
  { id: 51,  name: "Indie" },
  { id: 3,   name: "Adventure" },
  { id: 5,   name: "RPG" },
  { id: 10,  name: "Strategy" },
  { id: 2,   name: "Shooter" },
  { id: 7,   name: "Puzzle" },
  { id: 11,  name: "Arcade" },
  { id: 15,  name: "Sports" },
  { id: 14,  name: "Simulation" },
];

export const PLATFORMS = [
  { id: 4,  name: "PC" },
  { id: 187, name: "PlayStation 5" },
  { id: 18,  name: "PlayStation 4" },
  { id: 186, name: "Xbox Series X" },
  { id: 1,   name: "Xbox One" },
  { id: 7,   name: "Nintendo Switch" },
  { id: 3,   name: "iOS" },
  { id: 21,  name: "Android" },
];

// Utility: turns a metacritic score into a color class for Tailwind
// Use: <span className={ratingColor(game.metacritic)}>
export function ratingColor(score) {
  if (!score) return "text-gray-400";
  if (score >= 75) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

// Shape of one game object (matches RAWG /games list response)
// -------------------------------------------------------------
// id           number   Unique game ID
// name         string   Game title
// slug         string   URL-safe name (use for routing if needed)
// background_image  string | null  Cover art URL
// metacritic   number | null  Metacritic score 0-100
// released     string   ISO date "YYYY-MM-DD"
// rating       number   RAWG community rating 0-5
// ratings_count number  Number of RAWG ratings
// genres       Array<{ id, name }>
// platforms    Array<{ platform: { id, name } }>
// esrb_rating  { id, name, slug } | null

export const mockGames = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    slug: "grand-theft-auto-v",
    background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    metacritic: 97,
    released: "2013-09-17",
    rating: 4.47,
    ratings_count: 6823,
    genres: [
      { id: 4,  name: "Action" },
      { id: 3,  name: "Adventure" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 187, name: "PlayStation 5" } },
      { platform: { id: 18,  name: "PlayStation 4" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 4200,
    name: "Portal 2",
    slug: "portal-2",
    background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257sa1a9bdce7d.jpg",
    metacritic: 95,
    released: "2011-04-18",
    rating: 4.61,
    ratings_count: 5912,
    genres: [
      { id: 7, name: "Puzzle" },
      { id: 3, name: "Adventure" },
    ],
    platforms: [
      { platform: { id: 4, name: "PC" } },
      { platform: { id: 1, name: "Xbox One" } },
    ],
    esrb_rating: { id: 2, name: "Everyone 10+", slug: "everyone-10-plus" },
  },
  {
    id: 5679,
    name: "The Witcher 3: Wild Hunt",
    slug: "the-witcher-3-wild-hunt",
    background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    metacritic: 93,
    released: "2015-05-18",
    rating: 4.66,
    ratings_count: 7103,
    genres: [
      { id: 5, name: "RPG" },
      { id: 3, name: "Adventure" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 18,  name: "PlayStation 4" } },
      { platform: { id: 1,   name: "Xbox One" } },
      { platform: { id: 7,   name: "Nintendo Switch" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 802,
    name: "Disco Elysium",
    slug: "disco-elysium",
    background_image: "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815460381fc.jpg",
    metacritic: 91,
    released: "2019-10-15",
    rating: 4.52,
    ratings_count: 2341,
    genres: [
      { id: 5,  name: "RPG" },
      { id: 3,  name: "Adventure" },
      { id: 51, name: "Indie" },
    ],
    platforms: [
      { platform: { id: 4,  name: "PC" } },
      { platform: { id: 18, name: "PlayStation 4" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 1030,
    name: "Hades",
    slug: "hades",
    background_image: "https://media.rawg.io/media/games/1f4/1f47a270b8f241f1b6f4b7a4abc9b4b.jpg",
    metacritic: 93,
    released: "2020-09-17",
    rating: 4.55,
    ratings_count: 3892,
    genres: [
      { id: 4,  name: "Action" },
      { id: 51, name: "Indie" },
      { id: 5,  name: "RPG" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 7,   name: "Nintendo Switch" } },
      { platform: { id: 187, name: "PlayStation 5" } },
    ],
    esrb_rating: { id: 3, name: "Teen", slug: "teen" },
  },
  {
    id: 58175,
    name: "God of War",
    slug: "god-of-war",
    background_image: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be73.jpg",
    metacritic: 94,
    released: "2018-04-20",
    rating: 4.62,
    ratings_count: 4501,
    genres: [
      { id: 4, name: "Action" },
      { id: 3, name: "Adventure" },
    ],
    platforms: [
      { platform: { id: 18,  name: "PlayStation 4" } },
      { platform: { id: 187, name: "PlayStation 5" } },
      { platform: { id: 4,   name: "PC" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 1020,
    name: "Hollow Knight",
    slug: "hollow-knight",
    background_image: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    metacritic: 87,
    released: "2017-02-24",
    rating: 4.41,
    ratings_count: 4120,
    genres: [
      { id: 4,  name: "Action" },
      { id: 51, name: "Indie" },
      { id: 3,  name: "Adventure" },
    ],
    platforms: [
      { platform: { id: 4, name: "PC" } },
      { platform: { id: 7, name: "Nintendo Switch" } },
    ],
    esrb_rating: { id: 2, name: "Everyone 10+", slug: "everyone-10-plus" },
  },
  {
    id: 766,
    name: "Doom Eternal",
    slug: "doom-eternal",
    background_image: "https://media.rawg.io/media/games/a47/a47423fe9c3e8b8e7bdb27e4c3b2bc71.jpg",
    metacritic: 88,
    released: "2020-03-20",
    rating: 4.38,
    ratings_count: 3274,
    genres: [
      { id: 4, name: "Action" },
      { id: 2, name: "Shooter" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 18,  name: "PlayStation 4" } },
      { platform: { id: 1,   name: "Xbox One" } },
      { platform: { id: 187, name: "PlayStation 5" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 99,
    name: "Stardew Valley",
    slug: "stardew-valley",
    background_image: "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    metacritic: 89,
    released: "2016-02-26",
    rating: 4.46,
    ratings_count: 5628,
    genres: [
      { id: 14, name: "Simulation" },
      { id: 51, name: "Indie" },
    ],
    platforms: [
      { platform: { id: 4,  name: "PC" } },
      { platform: { id: 7,  name: "Nintendo Switch" } },
      { platform: { id: 3,  name: "iOS" } },
      { platform: { id: 21, name: "Android" } },
    ],
    esrb_rating: { id: 2, name: "Everyone 10+", slug: "everyone-10-plus" },
  },
  {
    id: 2010,
    name: "Celeste",
    slug: "celeste",
    background_image: "https://media.rawg.io/media/games/594/59487800889ebac294c7c2c070d02356.jpg",
    metacritic: 94,
    released: "2018-01-25",
    rating: 4.5,
    ratings_count: 3019,
    genres: [
      { id: 4,  name: "Action" },
      { id: 7,  name: "Puzzle" },
      { id: 51, name: "Indie" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 7,   name: "Nintendo Switch" } },
      { platform: { id: 186, name: "Xbox Series X" } },
    ],
    esrb_rating: { id: 2, name: "Everyone 10+", slug: "everyone-10-plus" },
  },
  {
    id: 472,
    name: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    background_image: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    metacritic: 76,
    released: "2020-12-10",
    rating: 4.12,
    ratings_count: 5011,
    genres: [
      { id: 5, name: "RPG" },
      { id: 4, name: "Action" },
    ],
    platforms: [
      { platform: { id: 4,   name: "PC" } },
      { platform: { id: 187, name: "PlayStation 5" } },
      { platform: { id: 186, name: "Xbox Series X" } },
    ],
    esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  },
  {
    id: 13536,
    name: "Among Us",
    slug: "among-us",
    background_image: "https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg",
    metacritic: null,
    released: "2018-06-15",
    rating: 3.72,
    ratings_count: 4802,
    genres: [
      { id: 51, name: "Indie" },
      { id: 10, name: "Strategy" },
    ],
    platforms: [
      { platform: { id: 4,  name: "PC" } },
      { platform: { id: 3,  name: "iOS" } },
      { platform: { id: 21, name: "Android" } },
      { platform: { id: 7,  name: "Nintendo Switch" } },
    ],
    esrb_rating: { id: 2, name: "Everyone 10+", slug: "everyone-10-plus" },
  },
];

// Simulated detail data for a single game (matches RAWG GET /games/{id})
// Use this in GameDetailPage until you wire up the real API.
export const mockGameDetail = {
  id: 3498,
  name: "Grand Theft Auto V",
  slug: "grand-theft-auto-v",
  description_raw:
    "Rockstar Games went above and beyond with Grand Theft Auto V. " +
    "An enormous open world, three playable protagonists, a mature narrative, " +
    "and an online mode that has kept players engaged for over a decade. " +
    "Set in the fictional city of Los Santos, the game blends high-octane action " +
    "with satirical commentary on modern American culture.",
  background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  background_image_additional: "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429a9ac625e.jpg",
  metacritic: 97,
  released: "2013-09-17",
  rating: 4.47,
  ratings_count: 6823,
  playtime: 72,
  website: "https://www.rockstargames.com/gta-v",
  genres: [
    { id: 4, name: "Action" },
    { id: 3, name: "Adventure" },
  ],
  platforms: [
    { platform: { id: 4,   name: "PC" },          released_at: "2015-04-14" },
    { platform: { id: 187, name: "PlayStation 5" }, released_at: "2022-03-15" },
    { platform: { id: 18,  name: "PlayStation 4" }, released_at: "2014-11-18" },
  ],
  developers: [{ id: 10202, name: "Rockstar North" }],
  publishers: [{ id: 2155,  name: "Rockstar Games" }],
  esrb_rating: { id: 4, name: "Mature", slug: "mature" },
  tags: [
    { id: 31,  name: "Singleplayer" },
    { id: 7,   name: "Multiplayer" },
    { id: 13,  name: "Open World" },
    { id: 42,  name: "Third Person" },
    { id: 24,  name: "RPG Elements" },
  ],
};

// Convenience export: the shape of one item in mockGames (for prop types / JSDoc)
// Paste this into your component as a JSDoc @typedef if you're not using TypeScript.
//
// @typedef {Object} Game
// @property {number}  id
// @property {string}  name
// @property {string}  slug
// @property {string|null} background_image
// @property {number|null} metacritic
// @property {string}  released
// @property {number}  rating
// @property {number}  ratings_count
// @property {Array<{id:number, name:string}>} genres
// @property {Array<{platform:{id:number,name:string}}>} platforms
// @property {{id:number,name:string,slug:string}|null} esrb_rating
