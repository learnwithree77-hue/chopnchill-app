# Chop n Chill Ignite

Build a bold, high-energy, Gen-Z street-food restaurant web app for "Chop n Chill" located in Kinassery, Thottummaram, Kozhikode, Kerala 673007.

Key design & feature requirements:
1. Visual identity & styling:
   - Deep charcoal / near-black canvas with fiery orange/red accents and electric yellow highlights.
   - Massive, high-impact display headlines ("CHOP. CHILL. CRAVE.", "CRISPY. LOUD. UNAPOLOGETIC."), clean readable sans body text, subtle background grain texture, and high-contrast layered cards.
   - Smooth micro-interactions, magnetic/interactive buttons, and floating badge elements (4.3★ Google Rating from 19 reviews, ₹1–200 per person, Open Until 1 AM, Big Flavour).

2. Hero Section:
   - Huge headline: "CHOP. CHILL. CRAVE."
   - Subhead: "Loaded fries. Crispy chicken. Insane shakes. Big flavour without the big bill."
   - Dual CTAs: [ORDER NOW 🍟] (opens ordering modal/drawer) and [EXPLORE MENU].
   - Visually striking hero food showcase breaking out of its container, flanked by floating badges.

3. Scrolling Marquee:
   - Animated ticker: "CHOP • CHILL • CRUNCH • REPEAT • LOADED FRIES • BROASTED CHICKEN • COLD SHAKES".

4. Editorial Food Showcase:
   - Asymmetric magazine/campaign layout highlighting Loaded Fries, Broasted Chicken, Smash Burgers, and Thick Shakes.
   - Bold typography overlays ("LOADED.", "CRISPY.", "CHEESY.", "NO BORING BITES.").

5. Interactive Food Menu:
   - Categories with horizontal scroll & quick filter pills: 🔥 Loaded Fries, 🍗 Fried Chicken, 🍔 Burgers, 🥪 Sandwiches, 🍟 Fries, 🥤 Shakes, 🧋 Drinks.
   - Visual food cards with realistic photography, item names, short descriptions, authentic ₹ prices (₹1–200 range), and an "Add / Order" action.
   - Interactive ordering drawer / cart or order modal where customers can select Delivery or Pickup, view summary, and trigger WhatsApp order or platform redirect (fully customizable).

6. "Why Chop n Chill" Section:
   - Numbered brutalist cards: 01 BIG PORTIONS ("More food. Less damage to your wallet."), 02 AFFORDABLE PRICES ("₹1–200 range with zero compromise on taste."), 03 FAST SERVICE ("Hot and fresh without the endless waiting."), 04 LATE-NIGHT CRAVINGS ("Open until 1 AM for when hunger hits after hours.").

7. Late-Night Feature:
   - "THE CRAVING DOESN'T SLEEP." featuring dark night-owl vibes, glowing accents, and neon "OPEN UNTIL 1 AM" styling.

8. Social Proof & Reviews:
   - Authentic 4.3★ Google rating badge with "Based on 19 Google reviews".
   - Curated real customer review highlights focusing on the loaded fries, generous portions, affordability, and fast service.

9. Location & Hours:
   - Kinassery, Thottummaram, Kozhikode, Kerala 673007.
   - Interactive map embed/card with [GET DIRECTIONS] linking to Google Maps.
   - Timings, contact info, and clear delivery/takeaway options.

10. Mobile First:
    - Sticky bottom bar on mobile with quick "ORDER NOW 🍟" CTA and category navigation.
    - Large touch targets and snappy performance.

11. Architecture:
    - Store all restaurant details, menu items, categories, hours, location coordinates, and review quotes in a centralized config file (e.g., `src/data/restaurantData.ts`) so the restaurant owner can easily update items and prices.
    - Include LocalBusiness JSON-LD schema markup for Kozhikode / Kerala local SEO.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fe2c7e98-a4c4-4d10-b076-61d277198e08).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
