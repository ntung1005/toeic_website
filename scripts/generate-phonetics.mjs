import fs from "node:fs";
import { dictionary } from "cmu-pronouncing-dictionary";

const sourcePath = "data/toeic-starter.json";
const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const arpabetToIpa = {
  AA: "ɑ",
  AE: "æ",
  AH: "ə",
  AO: "ɔ",
  AW: "aʊ",
  AY: "aɪ",
  B: "b",
  CH: "tʃ",
  D: "d",
  DH: "ð",
  EH: "ɛ",
  ER: "ɝ",
  EY: "eɪ",
  F: "f",
  G: "ɡ",
  HH: "h",
  IH: "ɪ",
  IY: "i",
  JH: "dʒ",
  K: "k",
  L: "l",
  M: "m",
  N: "n",
  NG: "ŋ",
  OW: "oʊ",
  OY: "ɔɪ",
  P: "p",
  R: "r",
  S: "s",
  SH: "ʃ",
  T: "t",
  TH: "θ",
  UH: "ʊ",
  UW: "u",
  V: "v",
  W: "w",
  Y: "j",
  Z: "z",
  ZH: "ʒ"
};

const manualPhonetics = {
  "abide by": "/əˈbaɪd baɪ/",
  "water refill": "/ˈwɔtər ˌriːˈfɪl/",
  "customer base": "/ˈkʌstəmər beɪs/",
  "product line": "/ˈprɑdʌkt laɪn/",
  "purchase order": "/ˈpɝtʃəs ˈɔrdər/",
  "online ad": "/ˈɑnˌlaɪn æd/",
  "campaign budget": "/kæmˈpeɪn ˈbʌdʒɪt/",
  "brand awareness": "/brænd əˈwɛrnəs/",
  "job opening": "/dʒɑb ˈoʊpənɪŋ/",
  "raw material": "/rɔ məˈtɪriəl/",
  "quality control": "/ˈkwɑləti kənˈtroʊl/",
  "shipping fee": "/ˈʃɪpɪŋ fi/",
  "supply chain": "/səˈplaɪ tʃeɪn/",
  "health insurance": "/hɛlθ ɪnˈʃʊrəns/",
  "medical form": "/ˈmɛdɪkəl fɔrm/",
  "blood pressure": "/blʌd ˈprɛʃər/",
  "insurance card": "/ɪnˈʃʊrəns kɑrd/",
  "waiting room": "/ˈweɪtɪŋ rum/",
  "parking lot": "/ˈpɑrkɪŋ lɑt/",
  "office space": "/ˈɔfəs speɪs/",
  "case number": "/keɪs ˈnʌmbər/",
  "service desk": "/ˈsɝvəs dɛsk/",
  "follow-up": "/ˈfɑloʊ ʌp/",
  "wait time": "/weɪt taɪm/",
  "return policy": "/rɪˈtɝn ˈpɑləsi/",
  "public transportation": "/ˈpʌblɪk ˌtrænspərˈteɪʃən/",
  "boarding pass": "/ˈbɔrdɪŋ pæs/",
  "window seat": "/ˈwɪndoʊ sit/",
  "waiting area": "/ˈweɪtɪŋ ˈɛriə/",
  "front desk": "/frʌnt dɛsk/",
  "key card": "/ki kɑrd/",
  "room service": "/rum ˈsɝvəs/",
  "wake-up call": "/ˈweɪk ʌp kɔl/",
  "double room": "/ˈdʌbəl rum/",
  "single room": "/ˈsɪŋɡəl rum/",
  minibar: "/ˈmɪniˌbɑr/",
  barcode: "/ˈbɑrˌkoʊd/",
  "price tag": "/praɪs tæɡ/",
  "gift card": "/ɡɪft kɑrd/",
  "fitting room": "/ˈfɪtɪŋ rum/",
  "cash flow": "/kæʃ floʊ/"
};

function normalizeLookup(value) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/\./g, "").trim();
}

function stripVariant(value) {
  return value.replace(/\(\d+\)$/u, "");
}

function lookupPronunciation(word) {
  const normalized = normalizeLookup(word);
  if (dictionary[normalized]) return dictionary[normalized];

  const variantKey = Object.keys(dictionary).find((key) => stripVariant(key) === normalized);
  return variantKey ? dictionary[variantKey] : "";
}

function arpabetPronunciationToIpa(pronunciation) {
  const parts = pronunciation.split(/\s+/u);
  let primaryStressIndex = parts.findIndex((part) => part.endsWith("1"));
  let secondaryStressIndex = parts.findIndex((part) => part.endsWith("2"));

  return parts
    .map((part, index) => {
      const stress = part.match(/[012]$/u)?.[0] ?? "";
      const symbol = arpabetToIpa[part.replace(/[012]$/u, "")] ?? "";
      if (!symbol) return "";
      if (stress === "1" && index === primaryStressIndex) return `ˈ${symbol}`;
      if (stress === "2" && primaryStressIndex === -1 && index === secondaryStressIndex) return `ˌ${symbol}`;
      if (stress === "2" && index === secondaryStressIndex) return `ˌ${symbol}`;
      return symbol;
    })
    .join("");
}

function wordToIpa(word) {
  const pronunciation = lookupPronunciation(word);
  return pronunciation ? arpabetPronunciationToIpa(pronunciation) : "";
}

function termToPhonetic(term) {
  const normalized = term.toLowerCase();
  if (manualPhonetics[normalized]) return manualPhonetics[normalized];

  const pieces = normalized.split(/\s+/u).flatMap((part) => part.split("-"));
  const ipaPieces = pieces.map(wordToIpa);
  if (ipaPieces.every(Boolean)) return `/${ipaPieces.join(" ")}/`;

  return `/${term}/`;
}

data.vocabulary = data.vocabulary.map((item) => ({
  ...item,
  phonetic: termToPhonetic(item.term)
}));

fs.writeFileSync(sourcePath, `${JSON.stringify(data, null, 2)}\n`);

const fallbackCount = data.vocabulary.filter((item) => item.phonetic === `/${item.term}/`).length;
console.log(`Generated phonetics for ${data.vocabulary.length} vocabulary items.`);
console.log(`Fallback phonetics: ${fallbackCount}`);
