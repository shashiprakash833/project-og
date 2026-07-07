export const navItems = [
  { label: "Shop", page: "shop" },
  { label: "Collections", page: "collections" },
  { label: "Drops", page: "drops" },
  { label: "Archive", page: "archive" },
  { label: "About OG", page: "about" }
];

export const products = [
  // MEN

  {
    id: 1,
    name: "OG Oversized Tee",
    price: 1499,
    type: "oversized",
    color: "black",
    gender: "men",
    tag: "OG",
    image: "/images/collections/mens/over1.jpeg",
    
  },

  {
    id: 2,
    name: "OG Tank",
    price: 999,
    type: "tanks",
    color: "black",
    gender: "men",
    tag: "OG",
    image: "/images/collections/mens/Tanks.png",
  },

  {
    id: 3,
    name: "OG Bottom",
    price: 1999,
    type: "bottoms",
    color: "black",
    gender: "men",
    tag: "OG",
    image: "/images/collections/mens/bottoms.jpeg",
  },

  {
    id: 4,
    name: "OG Tee",
    price: 1299,
    type: "tees",
    color: "black",
    gender: "men",
    tag: "OG",
    image: "/images/collections/mens/tees.jpeg",
  },

  {
    id: 5,
    name: "OG Cap",
    price: 699,
    type: "accessories",
    color: "black",
    gender: "men",
    tag: "OG",
    image: "/images/collections/mens/Accessories.png",
  },

  // WOMEN

  {
    id: 6,
    name: "Women's Oversized Tee",
    price: 1499,
    type: "oversized",
    color: "white",
    gender: "women",
    tag: "OG",
    image: "/images/collections/womens/women-1.png",
  },

  {
    id: 7,
    name: "Women's Tank Top",
    price: 999,
    type: "tanks",
    color: "black",
    gender: "women",
    tag: "OG",
    image: "/images/collections/womens/tanktop.png",
  },

  {
    id: 8,
    name: "Women's Bottom",
    price: 1799,
    type: "bottoms",
    color: "black",
    gender: "women",
    tag: "OG",
    image: "/images/collections/womens/Bottom.png",
  },

  {
    id: 9,
    name: "Women's Tee",
    price: 1299,
    type: "tees",
    color: "black",
    gender: "women",
    tag: "OG",
    image: "/images/collections/womens/Tees.png",
  },

  {
    id: 10,
    name: "Women's Cap",
    price: 699,
    type: "accessories",
    color: "black",
    gender: "women",
    tag: "OG",
    image: "/images/collections/womens/Accessories.png",
  },
];

export const collections = [
  {
    id: 1,
    title: "Oversized",
    type: "tees",
    copy: "Heavy silhouettes with louder backprints.",
    image: "/images/collections/mens/over1.jpeg"
  },
  {
    id: 2,
    title: "Hoodies",
    type: "hoodies",
    copy: "Warm layers built for night streets.",
    image: "/images/collections/mens/hoodies.jpeg"
  },
  {
    id: 3,
    title: "Tees",
    type: "tees",
    copy: "Daily rotation pieces with attitude.",
    image: "/images/collections/mens/tees.jpeg"
  },
  {
    id: 4,
    title: "Bottoms",
    type: "bottoms",
    copy: "Cargo pockets and rugged movement.",
    image: "/images/collections/mens/bottoms.jpeg"
  }
];

const menCollectionImages = [
  "/images/collections/mens/men-1.jpeg",
  "/images/collections/mens/men-2.jpeg",
  "/images/collections/mens/men-3.jpeg",
  "/images/collections/mens/men-4.jpg",
  "/images/collections/mens/men-5.jpg",
  "/images/collections/mens/men-6.jpg",
  "/images/collections/mens/men-7.jpg",
];

const womenCollectionImages = [
  "/images/collections/womens/women-1.png",
  "/images/collections/womens/women-2.png",
  "/images/collections/womens/women-3.png",
  "/images/collections/womens/women-4.png",
  "/images/collections/womens/women-5.png",
  "/images/collections/womens/women-6.png",
  "/images/collections/womens/women-7.png",
  "/images/collections/womens/women-8.png",  
  "/images/collections/womens/women-9.png"
];

export const menCollections = menCollectionImages.map((image, i) => ({
  id: i + 1,
  // title: `Men ${i + 1}`,
  type: "men",
  // copy: "Core menswear pieces.",
  image,
}));

export const womenCollections = womenCollectionImages.map((image, i) => ({
  id: i + 1,
  // title: `Women ${i + 1}`,
  type: "women",
  // copy: "Core womenswear pieces.",
  image,
}));

export const menCategories = [
  {
    key: "oversized",
    title: "Oversized",
    image: "/images/collections/mens/over1.jpeg",
  },
  {
    key: "tanks",
    title: "Tank Tops",
    image: "/images/collections/mens/Tanks.png",
  },
  {
    key: "bottoms",
    title: "Bottoms",
    image: "/images/collections/mens/bottoms.jpeg",
  },
  {
    key: "tees",
    title: "Tees",
    image: "/images/collections/mens/tees.jpeg",
  },
  {
    key: "accessories",
    title: "Accessories",
    image: "/images/collections/mens/Accessories.png",
  },
];

export const womenCategories = [
  {
    key: "oversized",
    title: "Oversized",
    image: "/images/collections/womens/women-1.png",
  },
  {
    key: "tanks",
    title: "Tank Tops",
    image: "/images/collections/womens/tanktop.png",
  },
  {
    key: "bottoms",
    title: "Bottoms",
    image: "/images/collections/womens/Bottom.png",
  },
  {
    key: "tees",
    title: "Tees",
    image: "/images/collections/womens/Tees.png",
  },
  {
    key: "accessories",
    title: "Accessories",
    image: "/images/collections/womens/Accessories.png",
  },
];

export const archiveItems = [
  "Concrete Fits",
  "Backprint Series",
  "No Rules Drop",
  "Shadow Capsule"
];

export const archiveCards = [
  {
    title: "Concrete Fits",
    image: "/images/archive/concrete-fits.jpeg",
    video: "/videos/archive/concrete-fits.mp4"
  },
  {
    title: "Backprint Series",
    image: "/images/archive/backprint-series.jpeg",
    video: "/videos/archive/backprint-series.mp4"
  },
  {
    title: "No Rules Drop",
    image: "/images/archive/no-rules-drop.jpeg",
    video: "/videos/archive/no-rules-drop.mp4"
  },
  {
    title: "Shadow Capsule",
    image: "/images/archive/shadow-capsule.jpeg",
    video: "/videos/archive/shadow-capsule.mp4"
  }
];

export const communityCards = [
  {
    title: "Backprint",
    image: ""
  },
  {
    title: "Concrete",
    image: ""
  },
  {
    title: "Cap Drop",
    image: ""
  },
  {
    title: "Alley Fit",
    image: ""
  },
  {
    title: "Poster Wall",
    image: ""
  }
];

export const lookbookPoster = {
  title: "Be OG",
  image: ""
};

export const pageCopy = {
  shop: {
    eyebrow: "All Products",
    title: "Shop The Street.",
    copy: "Filter drops, add pieces to cart, and build your OG rotation.",
    image: ""
  },
  collections: {
    eyebrow: "Explore",
    title: "Collections.",
    copy: "Each collection has its own attitude, fit, and street language.",
    image: ""
  },
  "collections-men": {
    eyebrow: "Explore",
    title: "Men's Collections.",
    copy:"signature fits,bold outwear, and street-ready pieces for men.",
    image: "/images/collections/mens/men-hero@2x.png"
  },
  "collections-women": {
    eyebrow: "Explore",
    title: "Women's Collections.",
    copy: "signature fits, bold outwear, and street-ready pieces for women.",
    image: "/images/collections/womens/women-hero@2x.png"
  },
  drops: {
    eyebrow: "Limited",
    title: "Current Drop.",
    copy: "The newest OG pieces are available in low quantity.",
    image: ""
  },
  archive: {
    eyebrow: "Past Heat",
    title: "Archive.",
    copy: "A record of the graphic stories and fits that shaped the brand.",
    image: ""
  },
  wishlist: {
    eyebrow: "Saved",
    title: "Your Wishlist.",
    copy: "These are the OG pieces you want to keep an eye on.",
    image: ""
  },
  cart: {
    eyebrow: "Bag",
    title: "Your Cart.",
    copy: "Review your selected products and get ready to checkout.",
    image: ""
  },
  about: {
    eyebrow: "Original Gangster",
    title: "About OG.",
    copy: "OG Street Wear is made for people who do not follow trends. They set them.",
    image: ""
  }
};