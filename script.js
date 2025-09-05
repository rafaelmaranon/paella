// Global variables
let currentMeasurement = 'metric';
let currentPaellaType = 'valenciana';
let currentPeople = 4;
let currentTapasSearch = '';
let activeAllergenFilters = [];

// Paella data
const paellaData = {
    valenciana: {
        name: 'Valenciana Paella',
        description: 'The traditional paella from Valencia, made with chicken, rabbit, green beans, and white beans. This is the original paella recipe that started it all.',
        ingredients: {
            rice: { metric: 500, imperial: 1, unit: 'g/lb' },
            tomatoes: { metric: 5, imperial: 0.01, unit: 'g/lb' },
            peppers: { metric: 1.7, imperial: 0.003, unit: 'g/lb' },
            water: { metric: 1250, imperial: 2.5, unit: 'ml/cups' },
            chicken: { metric: 500, imperial: 1, unit: 'g/lb' },
            rabbit: { metric: 500, imperial: 1, unit: 'g/lb' },
            greenBeans: { metric: 200, imperial: 0.4, unit: 'g/lb' },
            whiteBeans: { metric: 100, imperial: 0.2, unit: 'g/lb' },
            oliveOil: { metric: 75, imperial: 0.16, unit: 'ml/cups' },
            saffron: { metric: 0.1, imperial: 0.0002, unit: 'g/lb' },
            sweetPaprika: { metric: 5, imperial: 0.01, unit: 'g/lb' },
            salt: { metric: 10, imperial: 0.02, unit: 'g/lb' }
        },
        recipe: [
            {
                title: 'Prepare the Sofrito',
                description: 'Heat olive oil in the paella pan over medium heat. Add chopped tomatoes and peppers, cook until softened and the mixture becomes a thick sauce.',
                tips: 'This is the foundation of flavor - don\'t rush this step!'
            },
            {
                title: 'Add Meat',
                description: 'Add chicken and rabbit pieces, season with salt and paprika. Cook until golden brown on all sides.',
                tips: 'High heat is key for browning, not boiling the meat.'
            },
            {
                title: 'Add Beans',
                description: 'Add green beans and white beans, stir to combine with the meat and sofrito.',
                tips: 'Traditional Valencian paella uses fresh green beans and white beans.'
            },
            {
                title: 'Add Rice',
                description: 'Add the rice and stir to coat with oil. Add saffron and mix well.',
                tips: 'Don\'t stir the rice after this point - this is crucial for proper paella texture.'
            },
            {
                title: 'Add Water',
                description: 'Add hot water (2x the volume of rice). Bring to a boil and cook on high heat for 8-10 minutes.',
                tips: 'The water should be hot to maintain cooking temperature.'
            },
            {
                title: 'Reduce Heat',
                description: 'Reduce heat to low and cook for another 10-15 minutes until rice is tender and liquid is absorbed.',
                tips: 'Listen for the crackling sound - this indicates the socarrat is forming.'
            },
            {
                title: 'Create Socarrat',
                description: 'Increase heat for the last 2-3 minutes to create the crispy bottom layer (socarrat).',
                tips: 'Watch carefully - you want crispy, not burnt!'
            }
        ]
    },
    seafood: {
        name: 'Seafood & Meat Paella',
        description: 'A rich paella combining the best of land and sea - chicken, ribs, shrimp, and mixed seafood for a truly indulgent experience.',
        ingredients: {
            rice: { metric: 500, imperial: 1, unit: 'g/lb' },
            tomatoes: { metric: 5, imperial: 0.01, unit: 'g/lb' },
            peppers: { metric: 1.7, imperial: 0.003, unit: 'g/lb' },
            water: { metric: 1250, imperial: 2.5, unit: 'ml/cups' },
            chicken: { metric: 500, imperial: 1, unit: 'g/lb' },
            ribs: { metric: 500, imperial: 1, unit: 'g/lb' },
            shrimp: { metric: 600, imperial: 1.2, unit: 'g/lb' },
            seafoodMix: { metric: 500, imperial: 1, unit: 'g/lb' },
            oliveOil: { metric: 75, imperial: 0.16, unit: 'ml/cups' },
            saffron: { metric: 0.1, imperial: 0.0002, unit: 'g/lb' },
            sweetPaprika: { metric: 5, imperial: 0.01, unit: 'g/lb' },
            salt: { metric: 10, imperial: 0.02, unit: 'g/lb' }
        },
        recipe: [
            {
                title: 'Prepare the Base',
                description: 'Heat olive oil in the paella pan. Add chopped tomatoes and peppers, cook until softened.',
                tips: 'This creates the flavor foundation for your seafood paella.'
            },
            {
                title: 'Cook the Meat',
                description: 'Add chicken wings and back ribs. Cook on high heat until golden brown, about 8-10 minutes for chicken, longer for ribs.',
                tips: 'Avoid overcrowding the pan - cook in batches if necessary.'
            },
            {
                title: 'Add Rice and Seasonings',
                description: 'Add rice, saffron, and paprika. Stir to coat the rice with oil and seasonings.',
                tips: 'This is the last time you\'ll stir the rice - remember this!'
            },
            {
                title: 'Add Water and Cook Rice',
                description: 'Add hot water and bring to a boil. Cook on high heat for 8-10 minutes, then reduce to low for 10-15 minutes.',
                tips: 'The rice should be almost done before adding seafood.'
            },
            {
                title: 'Add Seafood',
                description: 'Add shrimp and seafood mix on top of the rice. Cook for 3-5 minutes until seafood is done.',
                tips: 'Shrimp cook quickly - watch for them to turn pink and curl.'
            },
            {
                title: 'Final Touch',
                description: 'Increase heat for the last 2-3 minutes to create socarrat. Garnish with lemon wedges.',
                tips: 'The socarrat is the prized crispy bottom layer - don\'t skip this step!'
            }
        ]
    },
    'squid-ink': {
        name: 'Squid Ink Paella',
        description: 'A dramatic and flavorful paella made with squid ink, giving it a striking black color and unique umami taste. Perfect for seafood lovers.',
        ingredients: {
            rice: { metric: 500, imperial: 1, unit: 'g/lb' },
            tomatoes: { metric: 5, imperial: 0.01, unit: 'g/lb' },
            peppers: { metric: 1.7, imperial: 0.003, unit: 'g/lb' },
            water: { metric: 1250, imperial: 2.5, unit: 'ml/cups' },
            squid: { metric: 400, imperial: 0.8, unit: 'g/lb' },
            shrimp: { metric: 300, imperial: 0.6, unit: 'g/lb' },
            squidInk: { metric: 4, imperial: 0.008, unit: 'g/lb' },
            oliveOil: { metric: 75, imperial: 0.16, unit: 'ml/cups' },
            garlic: { metric: 10, imperial: 0.02, unit: 'g/lb' },
            salt: { metric: 10, imperial: 0.02, unit: 'g/lb' }
        },
        recipe: [
            {
                title: 'Prepare the Sofrito',
                description: 'Heat olive oil in the paella pan. Add chopped tomatoes, peppers, and garlic. Cook until softened.',
                tips: 'The sofrito will be the base for your squid ink paella.'
            },
            {
                title: 'Add Squid',
                description: 'Add squid pieces and cook for 2-3 minutes until they start to release their liquid.',
                tips: 'Squid cooks quickly - don\'t overcook or it will become rubbery.'
            },
            {
                title: 'Add Rice and Ink',
                description: 'Add rice and squid ink. Stir carefully to distribute the ink evenly throughout the rice.',
                tips: 'Squid ink is very concentrated - a little goes a long way!'
            },
            {
                title: 'Add Water',
                description: 'Add hot water and bring to a boil. Cook on high heat for 8-10 minutes.',
                tips: 'The water will turn black from the squid ink - this is normal!'
            },
            {
                title: 'Add Shrimp',
                description: 'Add shrimp on top of the rice. Reduce heat and cook for 10-15 minutes.',
                tips: 'Shrimp should be added when the rice is almost done to prevent overcooking.'
            },
            {
                title: 'Create Socarrat',
                description: 'Increase heat for the final 2-3 minutes to create the crispy bottom layer.',
                tips: 'The socarrat will be black due to the squid ink - this is the signature of this paella!'
            }
        ]
    }
};

// Paellera size data
const paelleraSizes = {
    1: { thin: '30-32 cm', medium: 'X', full: 'X' },
    2: { thin: '34-36-38-40-42 cm', medium: 'X', full: 'X' },
    3: { thin: '38-40-42-46 cm', medium: '30-32-34-36 cm', full: 'X' },
    4: { thin: '40-42-46-50-55 cm', medium: '32-34-36-38 cm', full: '30 cm' },
    6: { thin: '55-60 cm', medium: '38-40-42-46-50 cm', full: '34-36 cm' },
    8: { thin: '60-65 cm', medium: '46-50-55 cm', full: '38-40 cm' },
    10: { thin: '65-70-80 cm', medium: '46-50-55-60 cm', full: '42 cm' },
    12: { thin: '65-70 cm', medium: '65 cm', full: '46-50 cm' },
    14: { thin: '80 cm', medium: '60-65-75 cm', full: '50-55 cm' },
    16: { thin: '90 cm', medium: '65-70-80 cm', full: '55-60 cm' },
    18: { thin: '90 cm', medium: '65-70-80 cm', full: '60 cm' },
    20: { thin: '90-100 cm', medium: '70-80 cm', full: '60-65 cm' },
    30: { thin: '100 cm', medium: '80-90 cm', full: '70 cm' },
    40: { thin: '115 cm', medium: '90-100 cm', full: '80 cm' },
    50: { thin: '115 cm', medium: '100 cm', full: '90 cm' },
    60: { thin: '115-130 cm', medium: '100-115 cm', full: '90-100 cm' },
    70: { thin: '130 cm', medium: '100-115 cm', full: '90-100 cm' },
    80: { thin: 'X', medium: '115 cm', full: '100 cm' },
    90: { thin: 'X', medium: '115-130 cm', full: '115 cm' },
    100: { thin: 'X', medium: '130 cm', full: '115 cm' }
};

// Tapas data - 100 authentic Andalusian tapas recipes
const tapasData = [
    {
        id: 1,
        name: "Jamón Ibérico",
        description: "Premium cured ham from Iberian pigs, served thinly sliced",
        ingredients: ["jamón ibérico", "olive oil"],
        allergens: ["dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 2,
        name: "Aceitunas Aliñadas",
        description: "Marinated green olives with herbs and spices",
        ingredients: ["green olives", "garlic", "oregano", "olive oil", "vinegar"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 3,
        name: "Tortilla Española",
        description: "Classic Spanish potato omelet",
        ingredients: ["potatoes", "eggs", "onion", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 4,
        name: "Gambas al Ajillo",
        description: "Garlic shrimp cooked in olive oil with chili",
        ingredients: ["shrimp", "garlic", "olive oil", "chili pepper", "parsley"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 5,
        name: "Patatas Bravas",
        description: "Fried potatoes with spicy tomato sauce and aioli",
        ingredients: ["potatoes", "tomato sauce", "garlic", "olive oil", "paprika"],
        allergens: ["eggs"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 6,
        name: "Croquetas de Jamón",
        description: "Creamy ham croquettes, breaded and fried",
        ingredients: ["jamón", "flour", "milk", "eggs", "breadcrumbs", "butter"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 7,
        name: "Boquerones en Vinagre",
        description: "Fresh anchovies marinated in vinegar",
        ingredients: ["anchovies", "vinegar", "garlic", "parsley", "olive oil"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 8,
        name: "Pimientos de Padrón",
        description: "Small green peppers fried in olive oil and sea salt",
        ingredients: ["padrón peppers", "olive oil", "sea salt"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 9,
        name: "Chorizo a la Sidra",
        description: "Chorizo sausage cooked in cider",
        ingredients: ["chorizo", "cider", "onion"],
        allergens: ["dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 10,
        name: "Ensaladilla Rusa",
        description: "Russian salad with tuna, potatoes, and mayonnaise",
        ingredients: ["potatoes", "tuna", "carrots", "peas", "mayonnaise", "eggs"],
        allergens: ["eggs", "seafood"],
        category: "salad",
        region: "Andalusia"
    },
    {
        id: 11,
        name: "Pulpo a la Gallega",
        description: "Galician-style octopus with potatoes and paprika",
        ingredients: ["octopus", "potatoes", "paprika", "olive oil", "salt"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 12,
        name: "Queso Manchego",
        description: "Aged sheep's milk cheese from La Mancha",
        ingredients: ["manchego cheese", "olive oil"],
        allergens: ["dairy"],
        category: "cheese",
        region: "Andalusia"
    },
    {
        id: 13,
        name: "Albóndigas en Salsa",
        description: "Meatballs in tomato sauce",
        ingredients: ["ground beef", "breadcrumbs", "eggs", "tomato sauce", "onion", "garlic"],
        allergens: ["gluten", "eggs"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 14,
        name: "Calamares a la Romana",
        description: "Fried squid rings with lemon",
        ingredients: ["squid", "flour", "eggs", "olive oil", "lemon"],
        allergens: ["gluten", "eggs", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 15,
        name: "Espinacas con Garbanzos",
        description: "Spinach with chickpeas, a traditional Andalusian dish",
        ingredients: ["spinach", "chickpeas", "garlic", "cumin", "olive oil"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 16,
        name: "Salmorejo",
        description: "Cold tomato soup from Córdoba",
        ingredients: ["tomatoes", "bread", "garlic", "olive oil", "vinegar", "jamón"],
        allergens: ["gluten", "dairy"],
        category: "soup",
        region: "Andalusia"
    },
    {
        id: 17,
        name: "Gazpacho",
        description: "Cold tomato and vegetable soup",
        ingredients: ["tomatoes", "cucumber", "bell pepper", "onion", "garlic", "olive oil", "vinegar"],
        allergens: [],
        category: "soup",
        region: "Andalusia"
    },
    {
        id: 18,
        name: "Rabo de Toro",
        description: "Braised oxtail stew",
        ingredients: ["oxtail", "red wine", "tomatoes", "onion", "carrots", "garlic"],
        allergens: [],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 19,
        name: "Carrillada de Cerdo",
        description: "Braised pork cheeks in red wine sauce",
        ingredients: ["pork cheeks", "red wine", "onion", "carrots", "garlic", "tomato"],
        allergens: [],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 20,
        name: "Pescaíto Frito",
        description: "Mixed fried fish, typical of Cádiz",
        ingredients: ["white fish", "flour", "olive oil", "lemon", "salt"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 21,
        name: "Cazón en Adobo",
        description: "Marinated dogfish, fried and served with alioli",
        ingredients: ["dogfish", "vinegar", "garlic", "paprika", "flour", "olive oil"],
        allergens: ["gluten", "seafood", "eggs"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 22,
        name: "Huevos a la Flamenca",
        description: "Baked eggs with vegetables and chorizo",
        ingredients: ["eggs", "tomatoes", "bell peppers", "chorizo", "peas", "olive oil"],
        allergens: ["eggs", "dairy"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 23,
        name: "Migas",
        description: "Fried breadcrumbs with chorizo and peppers",
        ingredients: ["bread", "chorizo", "bell peppers", "garlic", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "bread",
        region: "Andalusia"
    },
    {
        id: 24,
        name: "Ajoblanco",
        description: "Cold almond and garlic soup from Málaga",
        ingredients: ["almonds", "garlic", "olive oil", "vinegar", "grapes"],
        allergens: ["nuts"],
        category: "soup",
        region: "Andalusia"
    },
    {
        id: 25,
        name: "Porra Antequerana",
        description: "Cold tomato soup similar to salmorejo",
        ingredients: ["tomatoes", "bread", "garlic", "olive oil", "vinegar", "jamón", "eggs"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "soup",
        region: "Andalusia"
    },
    {
        id: 26,
        name: "Tortillitas de Camarones",
        description: "Shrimp fritters from Cádiz",
        ingredients: ["shrimp", "flour", "onion", "parsley", "olive oil"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 27,
        name: "Urta a la Roteña",
        description: "Sea bream cooked with tomatoes and peppers",
        ingredients: ["sea bream", "tomatoes", "bell peppers", "onion", "garlic", "olive oil"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 28,
        name: "Carrillada de Ternera",
        description: "Braised veal cheeks in red wine",
        ingredients: ["veal cheeks", "red wine", "onion", "carrots", "garlic", "tomato"],
        allergens: [],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 29,
        name: "Alcachofas con Jamón",
        description: "Artichokes with ham",
        ingredients: ["artichokes", "jamón", "garlic", "olive oil", "white wine"],
        allergens: ["dairy"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 30,
        name: "Espárragos Trigueros",
        description: "Wild asparagus with olive oil and salt",
        ingredients: ["wild asparagus", "olive oil", "salt", "garlic"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 31,
        name: "Habas con Jamón",
        description: "Broad beans with ham",
        ingredients: ["broad beans", "jamón", "onion", "garlic", "olive oil"],
        allergens: ["dairy"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 32,
        name: "Revuelto de Setas",
        description: "Scrambled eggs with wild mushrooms",
        ingredients: ["eggs", "wild mushrooms", "garlic", "parsley", "olive oil"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 33,
        name: "Cochinillo Asado",
        description: "Roasted suckling pig",
        ingredients: ["suckling pig", "garlic", "thyme", "olive oil", "salt"],
        allergens: [],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 34,
        name: "Cordero al Chilindrón",
        description: "Lamb stew with peppers and tomatoes",
        ingredients: ["lamb", "bell peppers", "tomatoes", "onion", "garlic", "olive oil"],
        allergens: [],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 35,
        name: "Berenjenas con Miel",
        description: "Fried eggplant with honey",
        ingredients: ["eggplant", "flour", "honey", "olive oil", "salt"],
        allergens: ["gluten"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 36,
        name: "Coliflor Frita",
        description: "Fried cauliflower with garlic and parsley",
        ingredients: ["cauliflower", "garlic", "parsley", "olive oil", "vinegar"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 37,
        name: "Pisto",
        description: "Ratatouille-style vegetable stew",
        ingredients: ["tomatoes", "bell peppers", "zucchini", "onion", "garlic", "olive oil"],
        allergens: [],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 38,
        name: "Tortilla de Patatas",
        description: "Spanish potato omelet",
        ingredients: ["potatoes", "eggs", "onion", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 39,
        name: "Croquetas de Bacalao",
        description: "Salt cod croquettes",
        ingredients: ["salt cod", "flour", "milk", "eggs", "breadcrumbs", "onion"],
        allergens: ["gluten", "dairy", "eggs", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 40,
        name: "Bacalao con Tomate",
        description: "Salt cod with tomato sauce",
        ingredients: ["salt cod", "tomatoes", "onion", "garlic", "olive oil", "parsley"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 41,
        name: "Atún en Escabeche",
        description: "Tuna marinated in vinegar and spices",
        ingredients: ["tuna", "vinegar", "garlic", "bay leaves", "olive oil", "onion"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 42,
        name: "Sardinas a la Plancha",
        description: "Grilled sardines with lemon",
        ingredients: ["sardines", "olive oil", "lemon", "salt", "parsley"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 43,
        name: "Mejillones en Escabeche",
        description: "Mussels marinated in vinegar",
        ingredients: ["mussels", "vinegar", "garlic", "bay leaves", "olive oil"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 44,
        name: "Almejas a la Marinera",
        description: "Clams in white wine sauce",
        ingredients: ["clams", "white wine", "garlic", "parsley", "olive oil"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 45,
        name: "Navajas a la Plancha",
        description: "Grilled razor clams with garlic",
        ingredients: ["razor clams", "garlic", "parsley", "olive oil", "lemon"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 46,
        name: "Cigalas a la Plancha",
        description: "Grilled langoustines with garlic",
        ingredients: ["langoustines", "garlic", "parsley", "olive oil", "lemon"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 47,
        name: "Bogavante a la Plancha",
        description: "Grilled lobster with garlic and parsley",
        ingredients: ["lobster", "garlic", "parsley", "olive oil", "lemon"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 48,
        name: "Cangrejo de Río",
        description: "River crab with garlic sauce",
        ingredients: ["river crab", "garlic", "olive oil", "vinegar", "paprika"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 49,
        name: "Percebes",
        description: "Goose barnacles, simply boiled",
        ingredients: ["goose barnacles", "salt", "bay leaves"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 50,
        name: "Ostras",
        description: "Fresh oysters with lemon",
        ingredients: ["oysters", "lemon", "salt"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 51,
        name: "Vieiras a la Plancha",
        description: "Grilled scallops with garlic",
        ingredients: ["scallops", "garlic", "parsley", "olive oil", "lemon"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 52,
        name: "Chipirones en su Tinta",
        description: "Baby squid in their own ink",
        ingredients: ["baby squid", "squid ink", "onion", "garlic", "tomato", "olive oil"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 53,
        name: "Sepia a la Plancha",
        description: "Grilled cuttlefish with garlic",
        ingredients: ["cuttlefish", "garlic", "parsley", "olive oil", "lemon"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 54,
        name: "Pulpo a la Plancha",
        description: "Grilled octopus with paprika",
        ingredients: ["octopus", "paprika", "olive oil", "salt", "garlic"],
        allergens: ["seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 55,
        name: "Caracoles",
        description: "Snails in spicy tomato sauce",
        ingredients: ["snails", "tomato", "garlic", "chili", "olive oil", "thyme"],
        allergens: [],
        category: "snails",
        region: "Andalusia"
    },
    {
        id: 56,
        name: "Huevos Rotos",
        description: "Broken eggs with potatoes and jamón",
        ingredients: ["eggs", "potatoes", "jamón", "olive oil", "salt"],
        allergens: ["eggs", "dairy"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 57,
        name: "Huevos Estrellados",
        description: "Fried eggs with potatoes",
        ingredients: ["eggs", "potatoes", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 58,
        name: "Revuelto de Espárragos",
        description: "Scrambled eggs with asparagus",
        ingredients: ["eggs", "asparagus", "garlic", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 59,
        name: "Revuelto de Ajetes",
        description: "Scrambled eggs with young garlic",
        ingredients: ["eggs", "young garlic", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 60,
        name: "Revuelto de Perrechicos",
        description: "Scrambled eggs with wild mushrooms",
        ingredients: ["eggs", "wild mushrooms", "garlic", "olive oil", "parsley"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 61,
        name: "Tortilla de Espinacas",
        description: "Spinach omelet",
        ingredients: ["eggs", "spinach", "onion", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 62,
        name: "Tortilla de Acelgas",
        description: "Swiss chard omelet",
        ingredients: ["eggs", "swiss chard", "onion", "olive oil", "salt"],
        allergens: ["eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 63,
        name: "Tortilla de Bacalao",
        description: "Salt cod omelet",
        ingredients: ["eggs", "salt cod", "potatoes", "onion", "olive oil"],
        allergens: ["eggs", "seafood"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 64,
        name: "Tortilla de Atún",
        description: "Tuna omelet",
        ingredients: ["eggs", "tuna", "onion", "olive oil", "salt"],
        allergens: ["eggs", "seafood"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 65,
        name: "Tortilla de Gambas",
        description: "Shrimp omelet",
        ingredients: ["eggs", "shrimp", "onion", "olive oil", "parsley"],
        allergens: ["eggs", "seafood"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 66,
        name: "Croquetas de Pollo",
        description: "Chicken croquettes",
        ingredients: ["chicken", "flour", "milk", "eggs", "breadcrumbs", "onion"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 67,
        name: "Croquetas de Setas",
        description: "Mushroom croquettes",
        ingredients: ["mushrooms", "flour", "milk", "eggs", "breadcrumbs", "onion"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 68,
        name: "Croquetas de Espinacas",
        description: "Spinach croquettes",
        ingredients: ["spinach", "flour", "milk", "eggs", "breadcrumbs", "onion"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 69,
        name: "Croquetas de Queso",
        description: "Cheese croquettes",
        ingredients: ["cheese", "flour", "milk", "eggs", "breadcrumbs"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "cheese",
        region: "Andalusia"
    },
    {
        id: 70,
        name: "Croquetas de Verduras",
        description: "Mixed vegetable croquettes",
        ingredients: ["mixed vegetables", "flour", "milk", "eggs", "breadcrumbs"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 71,
        name: "Empanadillas de Atún",
        description: "Tuna empanadas",
        ingredients: ["tuna", "onion", "tomato", "flour", "olive oil", "eggs"],
        allergens: ["gluten", "eggs", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 72,
        name: "Empanadillas de Pollo",
        description: "Chicken empanadas",
        ingredients: ["chicken", "onion", "tomato", "flour", "olive oil", "eggs"],
        allergens: ["gluten", "eggs"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 73,
        name: "Empanadillas de Verduras",
        description: "Vegetable empanadas",
        ingredients: ["mixed vegetables", "onion", "flour", "olive oil", "eggs"],
        allergens: ["gluten", "eggs"],
        category: "vegetables",
        region: "Andalusia"
    },
    {
        id: 74,
        name: "Empanadillas de Jamón",
        description: "Ham empanadas",
        ingredients: ["jamón", "onion", "flour", "olive oil", "eggs"],
        allergens: ["gluten", "eggs", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 75,
        name: "Empanadillas de Queso",
        description: "Cheese empanadas",
        ingredients: ["cheese", "onion", "flour", "olive oil", "eggs"],
        allergens: ["gluten", "dairy", "eggs"],
        category: "cheese",
        region: "Andalusia"
    },
    {
        id: 76,
        name: "Montaditos de Lomo",
        description: "Pork tenderloin sandwiches",
        ingredients: ["pork tenderloin", "bread", "olive oil", "garlic"],
        allergens: ["gluten"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 77,
        name: "Montaditos de Jamón",
        description: "Ham sandwiches",
        ingredients: ["jamón", "bread", "olive oil", "tomato"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 78,
        name: "Montaditos de Queso",
        description: "Cheese sandwiches",
        ingredients: ["cheese", "bread", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "cheese",
        region: "Andalusia"
    },
    {
        id: 79,
        name: "Montaditos de Atún",
        description: "Tuna sandwiches",
        ingredients: ["tuna", "bread", "olive oil", "onion"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 80,
        name: "Montaditos de Tortilla",
        description: "Omelet sandwiches",
        ingredients: ["tortilla", "bread", "olive oil"],
        allergens: ["gluten", "eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 81,
        name: "Pan con Tomate",
        description: "Bread with tomato and olive oil",
        ingredients: ["bread", "tomato", "olive oil", "salt", "garlic"],
        allergens: ["gluten"],
        category: "bread",
        region: "Andalusia"
    },
    {
        id: 82,
        name: "Pan con Aceite",
        description: "Bread with olive oil and salt",
        ingredients: ["bread", "olive oil", "salt"],
        allergens: ["gluten"],
        category: "bread",
        region: "Andalusia"
    },
    {
        id: 83,
        name: "Pan con Jamón",
        description: "Bread with ham",
        ingredients: ["bread", "jamón", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 84,
        name: "Pan con Queso",
        description: "Bread with cheese",
        ingredients: ["bread", "cheese", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "cheese",
        region: "Andalusia"
    },
    {
        id: 85,
        name: "Pan con Atún",
        description: "Bread with tuna",
        ingredients: ["bread", "tuna", "olive oil", "onion"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 86,
        name: "Pan con Anchoas",
        description: "Bread with anchovies",
        ingredients: ["bread", "anchovies", "olive oil", "tomato"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 87,
        name: "Pan con Boquerones",
        description: "Bread with fresh anchovies",
        ingredients: ["bread", "fresh anchovies", "olive oil", "vinegar"],
        allergens: ["gluten", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 88,
        name: "Pan con Salmón",
        description: "Bread with salmon",
        ingredients: ["bread", "smoked salmon", "olive oil", "cream cheese"],
        allergens: ["gluten", "dairy", "seafood"],
        category: "seafood",
        region: "Andalusia"
    },
    {
        id: 89,
        name: "Pan con Huevo",
        description: "Bread with egg",
        ingredients: ["bread", "fried egg", "olive oil", "salt"],
        allergens: ["gluten", "eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 90,
        name: "Pan con Tortilla",
        description: "Bread with omelet",
        ingredients: ["bread", "tortilla", "olive oil"],
        allergens: ["gluten", "eggs"],
        category: "eggs",
        region: "Andalusia"
    },
    {
        id: 91,
        name: "Pan con Paté",
        description: "Bread with pâté",
        ingredients: ["bread", "pâté", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 92,
        name: "Pan con Sobrasada",
        description: "Bread with sobrasada",
        ingredients: ["bread", "sobrasada", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 93,
        name: "Pan con Chorizo",
        description: "Bread with chorizo",
        ingredients: ["bread", "chorizo", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 94,
        name: "Pan con Morcilla",
        description: "Bread with blood sausage",
        ingredients: ["bread", "morcilla", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 95,
        name: "Pan con Lomo",
        description: "Bread with pork tenderloin",
        ingredients: ["bread", "pork tenderloin", "olive oil", "garlic"],
        allergens: ["gluten"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 96,
        name: "Pan con Salchichón",
        description: "Bread with salami",
        ingredients: ["bread", "salchichón", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 97,
        name: "Pan con Fuet",
        description: "Bread with fuet sausage",
        ingredients: ["bread", "fuet", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 98,
        name: "Pan con Longaniza",
        description: "Bread with longaniza sausage",
        ingredients: ["bread", "longaniza", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 99,
        name: "Pan con Butifarra",
        description: "Bread with butifarra sausage",
        ingredients: ["bread", "butifarra", "olive oil"],
        allergens: ["gluten", "dairy"],
        category: "meat",
        region: "Andalusia"
    },
    {
        id: 100,
        name: "Pan con Cecina",
        description: "Bread with cured beef",
        ingredients: ["bread", "cecina", "olive oil"],
        allergens: ["gluten"],
        category: "meat",
        region: "Andalusia"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    setupEventListeners();
    updateIngredients();
    updateRecipe();
    updatePaelleraSize();
    updateTapasResults();
    console.log('App initialized successfully');
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });

    // Measurement toggle
    document.getElementById('metricBtn').addEventListener('click', function() {
        currentMeasurement = 'metric';
        updateMeasurementButtons();
        updateIngredients();
    });

    document.getElementById('imperialBtn').addEventListener('click', function() {
        currentMeasurement = 'imperial';
        updateMeasurementButtons();
        updateIngredients();
    });

    // People count
    document.getElementById('peopleCount').addEventListener('input', function() {
        currentPeople = parseInt(this.value) || 1;
        updateIngredients();
        updatePaelleraSize();
    });

    // Paella type buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentPaellaType = this.dataset.type;
            updateTypeButtons();
            updatePaellaOverview();
            updateIngredients();
            updateRecipe();
        });
    });

    // Expandable sections
    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const target = this.dataset.target;
            toggleSection(target, this);
        });
    });

    // Tapas search
    const tapasSearchInput = document.getElementById('tapasSearch');
    if (tapasSearchInput) {
        tapasSearchInput.addEventListener('input', function() {
            currentTapasSearch = this.value.toLowerCase();
            updateTapasResults();
        });
    }

    // Allergen filter buttons
    document.querySelectorAll('.allergen-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const allergen = this.dataset.allergen;
            const index = activeAllergenFilters.indexOf(allergen);
            
            if (index > -1) {
                activeAllergenFilters.splice(index, 1);
                this.classList.remove('active');
            } else {
                activeAllergenFilters.push(allergen);
                this.classList.add('active');
            }
            
            updateTapasResults();
        });
    });
}

function switchSection(sectionName) {
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');
}

function updateMeasurementButtons() {
    document.querySelectorAll('.measurement-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(currentMeasurement === 'metric' ? 'metricBtn' : 'imperialBtn').classList.add('active');
}

function updateTypeButtons() {
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${currentPaellaType}"]`).classList.add('active');
}

function updatePaellaOverview() {
    const overview = document.getElementById('paellaOverview');
    const paella = paellaData[currentPaellaType];
    
    overview.innerHTML = `
        <h3>${paella.name}</h3>
        <p>${paella.description}</p>
    `;
}

function updateIngredients() {
    const ingredientsList = document.getElementById('ingredientsList');
    const paella = paellaData[currentPaellaType];
    
    let html = '';
    
    // Group ingredients by category
    const categories = {
        'Rice & Base': ['rice', 'water', 'oliveOil'],
        'Vegetables': ['tomatoes', 'peppers', 'greenBeans', 'whiteBeans'],
        'Meat': ['chicken', 'rabbit', 'ribs'],
        'Seafood': ['shrimp', 'seafoodMix', 'squid'],
        'Seasonings': ['saffron', 'sweetPaprika', 'salt', 'squidInk', 'garlic']
    };
    
    Object.entries(categories).forEach(([categoryName, ingredients]) => {
        const categoryIngredients = ingredients.filter(ingredient => paella.ingredients[ingredient]);
        
        if (categoryIngredients.length > 0) {
            html += `
                <div class="ingredient-category">
                    <div class="category-header">${categoryName}</div>
                    ${categoryIngredients.map(ingredient => {
                        const data = paella.ingredients[ingredient];
                        const quantity = calculateQuantity(data, currentPeople);
                        const unit = getUnit(data.unit);
                        const name = formatIngredientName(ingredient);
                        
                        return `
                            <div class="ingredient-item">
                                <span class="ingredient-name">${name}</span>
                                <span class="ingredient-quantity">${quantity} ${unit}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    });
    
    ingredientsList.innerHTML = html;
}

function calculateQuantity(ingredientData, people) {
    const baseQuantity = currentMeasurement === 'metric' ? ingredientData.metric : ingredientData.imperial;
    const scaledQuantity = baseQuantity * (people / 4); // Base recipe is for 4 people
    
    // Round to appropriate decimal places
    if (scaledQuantity < 1) {
        return scaledQuantity.toFixed(3);
    } else if (scaledQuantity < 10) {
        return scaledQuantity.toFixed(2);
    } else {
        return Math.round(scaledQuantity);
    }
}

function getUnit(unitString) {
    const [metricUnit, imperialUnit] = unitString.split('/');
    return currentMeasurement === 'metric' ? metricUnit : imperialUnit;
}

function formatIngredientName(ingredient) {
    const names = {
        rice: 'Rice (Bomba or Arborio)',
        tomatoes: 'Tomatoes',
        peppers: 'Sweet Peppers',
        water: 'Water',
        chicken: 'Chicken Wings',
        rabbit: 'Rabbit',
        ribs: 'Back Ribs',
        greenBeans: 'Green Beans',
        whiteBeans: 'White Beans',
        oliveOil: 'Olive Oil',
        saffron: 'Saffron',
        sweetPaprika: 'Sweet Paprika',
        salt: 'Salt',
        shrimp: 'Shrimp (16/20)',
        seafoodMix: 'Seafood Mix',
        squid: 'Squid',
        squidInk: 'Squid Ink',
        garlic: 'Garlic'
    };
    return names[ingredient] || ingredient;
}

function updateRecipe() {
    const recipeSteps = document.getElementById('recipeSteps');
    const paella = paellaData[currentPaellaType];
    
    let html = '';
    
    paella.recipe.forEach((step, index) => {
        html += `
            <div class="recipe-step">
                <div class="step-header">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-title">${step.title}</div>
                </div>
                <div class="step-content">
                    <div class="step-description">${step.description}</div>
                    <div class="step-tips">
                        <h4>💡 Pro Tip</h4>
                        <p>${step.tips}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    recipeSteps.innerHTML = html;
}

function updatePaelleraSize() {
    const paelleraSize = document.getElementById('paelleraSize');
    
    // Find the closest size in our data
    let sizeData = null;
    let closestPeople = currentPeople;
    
    // If exact match, use it
    if (paelleraSizes[currentPeople]) {
        sizeData = paelleraSizes[currentPeople];
    } else {
        // Find the closest size
        const sizes = Object.keys(paelleraSizes).map(Number).sort((a, b) => a - b);
        closestPeople = sizes.reduce((prev, curr) => 
            Math.abs(curr - currentPeople) < Math.abs(prev - currentPeople) ? curr : prev
        );
        sizeData = paelleraSizes[closestPeople];
    }
    
    let html = `
        <div class="paellera-size">Recommended Paellera Size for ${currentPeople} people</div>
        <div class="paellera-capacity">
            <strong>Thin Capacity:</strong> ${sizeData.thin}<br>
            <strong>Medium Capacity:</strong> ${sizeData.medium}<br>
            <strong>Full Capacity:</strong> ${sizeData.full}
        </div>
    `;
    
    if (closestPeople !== currentPeople) {
        html += `<div class="paellera-capacity" style="margin-top: 0.5rem; font-style: italic; color: #888;">
            (Closest available size for ${closestPeople} people)
        </div>`;
    }
    
    paelleraSize.innerHTML = html;
}

function toggleSection(targetId, toggleButton) {
    const content = document.getElementById(targetId);
    const isActive = content.classList.contains('active');
    
    // Close all other sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.section-toggle').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Toggle current section
    if (!isActive) {
        content.classList.add('active');
        toggleButton.classList.add('active');
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num < 1) {
        return num.toFixed(3);
    } else if (num < 10) {
        return num.toFixed(2);
    } else {
        return Math.round(num);
    }
}

// Tapas search and filtering functions
function updateTapasResults() {
    const tapasResults = document.getElementById('tapasResults');
    if (!tapasResults) {
        console.log('Tapas results element not found');
        return;
    }

    let filteredTapas = tapasData;

    // Filter by search term
    if (currentTapasSearch) {
        filteredTapas = filteredTapas.filter(tapa => 
            tapa.name.toLowerCase().includes(currentTapasSearch) ||
            tapa.description.toLowerCase().includes(currentTapasSearch) ||
            tapa.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(currentTapasSearch)
            )
        );
    }

    // Filter by allergens
    if (activeAllergenFilters.length > 0) {
        filteredTapas = filteredTapas.filter(tapa => {
            // Check if tapa contains any of the filtered allergens
            return !activeAllergenFilters.some(allergen => 
                tapa.allergens.includes(allergen)
            );
        });
    }

    // Display results
    if (filteredTapas.length === 0) {
        tapasResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No tapas found</h3>
                <p>Try adjusting your search terms or allergen filters</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="results-header">
            <h3>Found ${filteredTapas.length} tapas recipes</h3>
        </div>
        <div class="tapas-grid">
    `;

    filteredTapas.forEach(tapa => {
        const allergenBadges = tapa.allergens.map(allergen => 
            `<span class="allergen-badge allergen-${allergen}">${allergen}</span>`
        ).join('');

        html += `
            <div class="tapa-card">
                <div class="tapa-header">
                    <h4 class="tapa-name">${tapa.name}</h4>
                    <div class="tapa-category">${tapa.category}</div>
                </div>
                <div class="tapa-description">${tapa.description}</div>
                <div class="tapa-ingredients">
                    <strong>Ingredients:</strong> ${tapa.ingredients.join(', ')}
                </div>
                ${tapa.allergens.length > 0 ? `
                    <div class="tapa-allergens">
                        <strong>Contains:</strong> ${allergenBadges}
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    tapasResults.innerHTML = html;
}

function getCategoryIcon(category) {
    const icons = {
        'meat': 'fas fa-drumstick-bite',
        'seafood': 'fas fa-fish',
        'vegetables': 'fas fa-carrot',
        'eggs': 'fas fa-egg',
        'cheese': 'fas fa-cheese',
        'bread': 'fas fa-bread-slice',
        'soup': 'fas fa-bowl-food',
        'salad': 'fas fa-leaf',
        'snails': 'fas fa-circle'
    };
    return icons[category] || 'fas fa-utensils';
}
