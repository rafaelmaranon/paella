export type Allergen =
  | "peanut"
  | "tree_nut"
  | "milk"
  | "egg"
  | "wheat_gluten"
  | "soy"
  | "fish"
  | "shellfish"
  | "sesame";

// Enhanced lexicon for Spanish cuisine
const LEXICON: Record<Allergen, RegExp[]> = {
  peanut: [
    /\bpeanut(s)?\b/i, 
    /\bpeanut\s*butter\b/i,
    /\bcacahuete(s)?\b/i,
    /\bmaní(es)?\b/i
  ],
  tree_nut: [
    /\b(almond|walnut|pecan|hazelnut|pistachio|cashew|macadamia|pine\s*nuts?)\b/i,
    /\b(almendra|nuez|nueces|avellana|pistacho|anacardo|piñones?)\b/i,
    /\bpraline(s)?\b/i
  ],
  milk: [
    /\b(milk|butter|cream|yogurt|cheese|whey|ghee|buttermilk)\b/i,
    /\b(leche|mantequilla|nata|yogur|queso|suero|ghee|suero\s*de\s*leche)\b/i,
    /\b(manchego|parmesano|roquefort|gorgonzola|mozzarella)\b/i
  ],
  egg: [
    /\b(egg|eggs|albumen|mayonnaise|mayo)\b/i,
    /\b(huevo|huevos|albúmina|mayonesa|mahonesa)\b/i
  ],
  wheat_gluten: [
    /\b(wheat|flour|semolina|farina|spelt|kamut|seitan|bread)\b/i, 
    /\b(gluten)\b/i,
    /\b(trigo|harina|sémola|farina|espelta|kamut|seitán|pan)\b/i,
    /\b(gluten)\b/i
  ],
  soy: [
    /\b(soy|soya|tofu|tempeh|edamame|soy\s*sauce)\b/i,
    /\b(soja|tofu|tempeh|edamame|salsa\s*de\s*soja)\b/i
  ],
  fish: [
    /\b(salmon|tuna|cod|trout|anchovy|anchovies|haddock|mackerel|snapper)\b/i, 
    /\bfish\b/i,
    /\b(salmón|atún|bacalao|trucha|anchoa|anchoas|merluza|caballa|pargo)\b/i,
    /\bpescado\b/i
  ],
  shellfish: [
    /\b(shrimp|prawn|crab|lobster|clam|mussel|oyster|scallop)\b/i,
    /\b(gamba|langostino|cangrejo|langosta|almeja|mejillón|ostra|vieira)\b/i,
    /\bmarisco(s)?\b/i
  ],
  sesame: [
    /\b(sesame|tahini|benne)\b/i,
    /\b(sésamo|ajonjolí|tahini)\b/i
  ]
};

export function detectAllergens(ingredients: string[]): Allergen[] {
  const text = ingredients.join("\n");
  const found: Allergen[] = [];
  
  (Object.keys(LEXICON) as Allergen[]).forEach((k) => {
    if (LEXICON[k].some((rx) => rx.test(text))) {
      found.push(k);
    }
  });
  
  return found;
}

// Spanish cuisine specific allergen mapping
export function getSpanishAllergenNames(allergen: Allergen): string {
  const spanishNames: Record<Allergen, string> = {
    peanut: "Cacahuetes",
    tree_nut: "Frutos secos",
    milk: "Lácteos",
    egg: "Huevos",
    wheat_gluten: "Gluten",
    soy: "Soja",
    fish: "Pescado",
    shellfish: "Mariscos",
    sesame: "Sésamo"
  };
  
  return spanishNames[allergen];
}
