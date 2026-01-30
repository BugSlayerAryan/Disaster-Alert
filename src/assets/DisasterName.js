import IndustrialOrChemicalDisaster from "./Industrial or Chemical Disaster.jpg";
import NuclearDisaster from "./Nuclear Disaster.jpg";
import TerrorAttack from "./Terror Attack OR Explosion.jpg";
import Earthquake from "./Earthquake.webp";
import Cyclone from "./Cyclone 1.png";
import Flood from "./Flood.webp";
import VolcanicEruption from "./Volcanic Eruption.jpg";
import Wildfire from "./Wildfire.avif";
import Drought from "./Drought.webp";
import HeatWave from "./Heat Wave.webp";
import ColdWave from "./Cold Wave or Blizzard.webp";
import Avalanche from "./Avalanche.webp";
import Pandemic from "./Pandemic or Epidemic.jpg";
import Landslide from "./Landslide.jpg";
import Tsunami from "./Tsunami.webp";
export const disasters = [
  {
    title: "Earthquake",
    image: Earthquake,
    dos: [
      "Drop, Cover, and Hold On",
      "Anchor heavy furniture",
      "Follow BIS/ISO building codes",
    ],
    donts: ["Do not panic", "Do not use elevators"],
  },
  {
    title: "Landslide",
    image: Landslide,
    dos: [
      "Move away from slope-prone areas",
      "Follow weather department alerts",
    ],
    donts: ["Do not stay near hills", "Do not ignore warning signs"],
  },
  {
    title: "Tsunami",
    image: Tsunami,
    dos: [
      "Move to higher ground immediately",
      "Know evacuation routes",
    ],
    donts: ["Do not wait for official announcements"],
  },
  {
    title: "Cyclone / Hurricane",
    image: Cyclone,
    dos: [
      "Secure windows and doors",
      "Keep emergency supplies ready",
    ],
    donts: ["Do not step outside during calm eye"],
  },
  {
    title: "Flood",
    image: Flood,
    dos: [
      "Move to higher ground",
      "Turn off electricity",
    ],
    donts: ["Do not walk through flood water"],
  },
  {
    title: "Volcanic Eruption",
    image: VolcanicEruption,
    dos: [
      "Wear masks and goggles",
      "Follow evacuation orders",
    ],
    donts: ["Do not approach lava zones"],
  },
  {
    title: "Wildfire",
    image: Wildfire,
    dos: [
      "Evacuate early",
      "Keep emergency kits ready",
    ],
    donts: ["Do not return until cleared"],
  },
  {
    title: "Drought",
    image: Drought,
    dos: [
      "Conserve water",
      "Store food supplies",
    ],
    donts: ["Do not waste water"],
  },
  {
    title: "Heat Wave",
    image: HeatWave,
    dos: [
      "Stay hydrated",
      "Avoid outdoor activity",
    ],
    donts: ["Do not stay in direct sun"],
  },
  {
    title: "Cold Wave / Blizzard",
    image: ColdWave,
    dos: [
      "Stay indoors",
      "Wear layered clothing",
    ],
    donts: ["Do not travel unnecessarily"],
  },
  {
    title: "Avalanche",
    image: Avalanche,
    dos: [
      "Follow avalanche warnings",
      "Carry safety equipment",
    ],
    donts: ["Do not ski in restricted areas"],
  },
  {
    title: "Pandemic / Epidemic",
    image: Pandemic,
    dos: [
      "Maintain hygiene",
      "Follow health advisories",
    ],
    donts: ["Do not spread misinformation"],
  },
  {
    title: "Industrial / Chemical Disaster",
    image: IndustrialOrChemicalDisaster,
    dos: [
      "Cover nose and mouth",
      "Evacuate immediately",
    ],
    donts: ["Do not touch chemicals"],
  },
  {
    title: "Nuclear Disaster",
    image: NuclearDisaster,
    dos: [
      "Follow radiation safety instructions",
      "Stay indoors",
    ],
    donts: ["Do not consume exposed food"],
  },
  {
    title: "Terror Attack / Explosion",
    image: TerrorAttack,
    dos: [
      "Move to a safe location",
      "Follow emergency services",
    ],
    donts: ["Do not gather at blast site"],
  },
];

