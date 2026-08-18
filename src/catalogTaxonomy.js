// src/catalogTaxonomy.js

export const CATALOG_TAXONOMY = {
  WOMEN: {
    name: "WOMEN",
    categories: {
      "Ethnic Wear": {
        name: "Ethnic Wear",
        subcategories: {
          "Kurtis, Sets & Fabrics": [
            "Kurti With Bottomwear",
            "Kurtis",
            "Kurti Fabrics",
            "Kurti With Dupatta & Bottomwear",
            "Kurti With Dupatta"
          ],
          "Sarees, Blouses & Petticoats": [
            "Sarees",
            "Blouses",
            "Petticoats"
          ],
          "Suits & Dress Material": [
            "Unstitched Dress Material",
            "Semi-Stitched Suits",
            "Ready-to-Wear Suits"
          ],
          "Ethnic Bottomwear": [
            "Palazzos",
            "Salwars",
            "Churidars",
            "Ethnic Trousers"
          ],
          "Dupattas & Shawls": [
            "Printed Dupattas",
            "Embroidered Shawls",
            "Silk Dupattas"
          ],
          "Ethnic Jackets": ["Short Jackets", "Longline Jackets"],
          "Gowns & Kaftans": ["Ethnic Gowns", "Printed Kaftans"],
          "Lehenga Choli": ["Semi-Stitched Lehengas", "Bridal Lehengas"],
          "Ethnic Skirts": ["Flared Ethnic Skirts", "Tiered Skirts"],
          "Islamic Wear": ["Abayas", "Hijabs", "Burqas"],
          "Regional Ethnic Wear": ["Bandhani", "Chanderi", "Kalamkari"]
        }
      },
      "Western Wear": {
        name: "Western Wear",
        subcategories: {
          "Capris & Trousers & Pants": ["Formal Trousers", "Casual Pants", "Capris"],
          "Sweaters & Cardigans": ["Pullover Sweaters", "Cardigans"],
          "Jackets": ["Denim Jackets", "Bomber Jackets"],
          "Palazzos, Leggings & Tights": ["Ankle Length Leggings", "Printed Tights"],
          "Skirts & Shorts": ["Denim Shorts", "Mini Skirts", "Midi Skirts"],
          "Hoodies & Sweatshirts": ["Oversized Hoodies", "Zip-Up Sweatshirts"],
          "Raincoat": ["Full Length Raincoats", "Windcheaters"]
        }
      },
      "Women Ethnic Wear": {
        name: "Women Ethnic Wear",
        subcategories: {
          "Ethnic Skirt": ["Ethnic Skirt"]
        }
      },
      "Accessories": {
        name: "Accessories",
        subcategories: {
          "Bags & Wallets": ["Tote Bags", "Clutches", "Sling Bags"],
          "Jewellery": ["Earrings", "Necklaces", "Bangles"]
        }
      },
      "Footwear": {
        name: "Footwear",
        subcategories: {
          "Ethnic Footwear": ["Juttis", "Kolhapuris"],
          "Western Footwear": ["Flats", "Heels", "Sneakers"]
        }
      },
      "Inner & Sleepwear": {
        name: "Inner & Sleepwear",
        subcategories: {
          "Sleepwear": ["Nightsuits", "Nighties"],
          "Shapewear": ["Tummy Tucker", "Saree Shapewear"]
        }
      },
      "Sports & Activewear": {
        name: "Sports & Activewear",
        subcategories: {
          "Gym Wear": ["Sports Bras", "Active Tights", "Track Pants"]
        }
      }
    }
  },
  KIDZ: {
    name: "KIDZ",
    categories: {
      "Girls Clothing": {
        name: "Girls Clothing",
        subcategories: {
          "Dresses & Frocks": ["Party Frocks", "Casual Dresses"],
          "Ethnic Wear": ["Lehenga Choli", "Kurti Sets"]
        }
      },
      "Boys Clothing": {
        name: "Boys Clothing",
        subcategories: {
          "T-Shirts & Shirts": ["Polo Tees", "Casual Shirts"],
          "Ethnic Wear": ["Kurta Pajama", "Sherwani Sets"]
        }
      }
    }
  }
};