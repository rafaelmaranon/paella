// Global variables
let currentMeasurement = 'metric';
let currentPaellaType = 'valenciana';
let currentPeople = 4;

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

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateIngredients();
    updateRecipe();
    updatePaelleraSize();
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
