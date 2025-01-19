const binderCards = document.querySelectorAll(".binder-card");
const binderContainer = document.querySelector(".binder-container");

const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card");
const styleTag = document.createElement("style");
document.head.appendChild(styleTag);

let resetTimeout;
let isDragging = false;
let startX = 0;
let startY = 0;
const movementThreshold = 5;

const phases = [
  {
    "phase": "Kanto",
    "cards": [
      { "name": "Officer Draco (Arcanine)" },
      { "name": "Gengar Spike", "image": "assets/img/cards/gengar.png", "type": "rare" },
      { "name": "Electrode Meeple" },
      { "name": "Lickitung Leon", "image": "assets/img/cards/lickitung.png", "type": "common" },
      { "name": "Porygon(?) Sprout" },
      { "name": "Snorlax Sandy" }
    ]
  },
  {
    "phase": "Johto",
    "cards": [
      { "name": "Pichu Bonnie" },
      { "name": "Togepi Darryl", "image": "assets/img/cards/togepi.png", "type": "common" },
      { "name": "Suicune Otis" }
    ]
  },
  {
    "phase": "Hoenn",
    "cards": [
      { "name": "Blaziken Fang" },
      { "name": "Swampert Sam" },
      { "name": "Gardevoir Piper" },
      { "name": "Mawile Chester" },
      { "name": "Banette Colette" },
      { "name": "Glalie Ollie", "image": "assets/img/cards/glalie.png", "type": "uncommon" },
      { "name": "Salamence Janet", "image": "assets/img/cards/salamence.png", "type": "rare" },
      { "name": "Registeel Pearl", "image": "assets/img/cards/registeel.png", "type": "rare" },
      { "name": "Team Magma Buzz" },
      { "name": "Team Aqua Hank", "image": "assets/img/cards/kyogre.png", "type": "rare" },
      { "name": "Deoxys Lily", "image": "assets/img/cards/deoxys.png", "type": "rare" }
    ]
  },
  {
    "phase": "Sinnoh",
    "cards": [
      { "name": "Drifloon/Drifblim Tick" },
      { "name": "Mismagius Chuck" },
      { "name": "Mamoswine Gale" },
      { "name": "R-o-T-o-m", "image": "assets/img/cards/rotom.png", "type": "uncommon" },
      { "name": "Darkrai Gray", "image": "assets/img/cards/darkrai.png", "type": "rare" }
    ]
  },
  {
    "phase": "Unova",
    "cards": [
      { "name": "Buster Emboar" },
      { "name": "Liepard Kit" },
      { "name": "Drillbur/Excadrill Moe" },
      { "name": "Reuniclus Squeak", "image": "assets/img/cards/reuniclus.png", "type": "rare" },
      { "name": "Vanillite Lou" },
      { "name": "Frillish Willow", "image": "assets/img/cards/frillish.png", "type": "uncommon" },
      { "name": "Joltik Charlie" , "image": "assets/img/cards/joltik.png", "type": "common"},
      { "name": "ChandeLola", "image": "assets/img/cards/chandelure.png", "type": "rare" },
      { "name": "Volcarona Charlie" },
      { "name": "Reshiram Larry", "image": "assets/img/cards/reshiram.png", "type": "promo" },
      { "name": "Zekrom Lawrie", "image": "assets/img/cards/zekrom.png", "type": "promo"}
    ]
  },
  {
    "phase": "Kalos",
    "cards": [
      { "name": "Braixen Mandy" },
      { "name": "Aegislash Rico" },
      { "name": "Zygarde Surge", "image": "assets/img/cards/zygarde.png", "type": "rare" },
      { "name": "Diancie Jacky", "image": "assets/img/cards/diancie.png", "type": "promo" },
      { "name": "Hoopa Gene" }
    ]
  },
  {
    "phase": "Alola",
    "cards": [
      { "name": "Decidueye Angelo" },
      { "name": "Incineroar El Primo" },
      { "name": "Charja-Bit", "image": "assets/img/cards/charjabug.png", "type": "uncommon" },
      { "name": "Mareanie E.M.Z." },
      { "name": "Mimikyu Shade" },
      { "name": "Hakamo-o Colette", "image": "assets/img/cards/hakamo-o.png", "type": "uncommon"  },
      { "name": "Dhelmise Penny" },
      { "name": "Tapu Koko Eve" },
      { "name": "Stakataka Ash" }
    ]
  },
  {
    "phase": "Galar",
    "cards": [
      { "name": "Inteleon Belle" },
      { "name": "Toxtricity Draco" },
      { "name": "Polteageist Hank" },
      { "name": "Alcremie Berry" },
      { "name": "MoePeko" }
    ]
  },
  {
    "phase": "Paldea & Beyond",
    "cards": [
      { "name": "Meowscarada Chester" },
      { "name": "Quaxly Gus" },
      { "name": "Lokix Fang", "image": "assets/img/cards/lokix.png", "type": "rare" },
      { "name": "Ceruledge Kenji" },
      { "name": "Tinkaton Bibi" },
      { "name": "Gimmighoul Griff" },
      { "name": "Miraidon Stu" },
      { "name": "Hydrapple Rosa" },
      { "name": "Pecharunt Willow", "image": "assets/img/cards/pecharunt.png" , "type": "doublerare"}
    ]
  },
];

phases.forEach((category) => {
  // Create the category section
  const section = document.createElement("div");
  section.classList.add("category-section");

  // Add the category title
  const title = document.createElement("h3");
  title.textContent = category.phase;
  section.appendChild(title);

  // Create the row for cards
  const row = document.createElement("div");
  row.classList.add("row", "row-container");

  if (category.cards && category.cards.length > 0) {
    // Add cards to the row
    category.cards.forEach((cardData) => {
      const card = document.createElement("div");
      card.classList.add("binder-card");

      // Set the background image
      const imagePath = cardData.image || "https://cdn2.bulbagarden.net/upload/1/17/Cardback.jpg"; // Default image
      card.style.backgroundImage = `url(${imagePath})`;
      card.style.backgroundSize = "cover"; // Ensure the image covers the card
      card.style.backgroundPosition = "center";

      // Add card name
      const name = document.createElement("p");
      name.textContent = cardData.name;
      name.classList.add("card-name");
      card.appendChild(name);

      const type = cardData.type;

      // Add click event to show the image
      card.addEventListener("click", () => {
        showCard(imagePath, type);
      });

      row.appendChild(card);
    });
  } else {
    // Display "No cards available" message
    const message = document.createElement("p");
    message.textContent = "No cards available";
    message.classList.add("no-cards-message");
    row.appendChild(message);
  }

  // Append row to the section
  section.appendChild(row);

  // Append section to the container
  binderContainer.appendChild(section);
});

// Display individual card
function showCard(card, type) {
  // Get the card container element
  const cardContainer = document.querySelector(".card-container");
  const individualCard = document.querySelector(".card");

  // Show the card container
  cardContainer.classList.remove("hidden");
  individualCard.style.backgroundImage = `url(${card})`;

  // Optional: Close card when clicking on the background (outside the card)
  cardContainer.onclick = function (e) {
    if (e.target === cardContainer) {
      cardContainer.classList.add("hidden");
    }
  };
}

cardContainer.addEventListener("mousedown", (e) => {
  isDragging = false;
  startX = e.clientX;
  startY = e.clientY;

  card.classList.remove("active");
});
cardContainer.addEventListener("touchstart", (e) => {
  isDragging = false;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  card.classList.remove("active");
});

function hideStartupScreen() {
  const startupScreen = document.querySelector(".startup-screen");
  const binderContainer = document.querySelector(".binder-container");

  // Add the hidden class to the startup screen to fade it out
  startupScreen.classList.add("hidden");

  // const audio = document.getElementById('startup-audio');
  // audio.play();

  // Show the binder container after the fade-out effect completes
  setTimeout(() => {
    binderContainer.classList.remove("hidden");
  }, 500);
}

cardContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) {
    const diffX = Math.abs(e.clientX - startX);
    const diffY = Math.abs(e.clientY - startY);
    if (diffX > movementThreshold || diffY > movementThreshold) {
      isDragging = true;
      card.classList.add("active");
    }
  }

  if (isDragging) {
    const rect = cardContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    applyHoverEffect(mouseX, mouseY, rect.width, rect.height);
  }
});

cardContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) {
    const diffX = Math.abs(e.touches[0].clientX - startX);
    const diffY = Math.abs(e.touches[0].clientY - startY);
    if (diffX > movementThreshold || diffY > movementThreshold) {
      isDragging = true;
      card.classList.add("active");
    }
  }

  if (isDragging) {
    const rect = cardContainer.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    applyHoverEffectMobile(touchX, touchY, rect.width, rect.height);
  }
});

cardContainer.addEventListener("mouseup", () => {
  isDragging = false;
  resetGlazeEffect();
});

cardContainer.addEventListener("touchend", () => {
  isDragging = false;
  resetGlazeEffect();
});

// Handle mouse leave to reset styles
cardContainer.addEventListener("mouseleave", () => {
  isDragging = false;
  resetGlazeEffect();
});

function resetGlazeEffect() {
  card.classList.remove("active");
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
  styleTag.textContent = ""; // Clear dynamic styles

  // Add a delay before resetting animation
  resetTimeout = setTimeout(() => {
    card.classList.add("animated");
  }, 2500);
}

function applyHoverEffect(x, y, width, height) {
  // Calculate relative positions and transformations
  const px = Math.abs(Math.floor((100 / width) * x) - 100);
  const py = Math.abs(Math.floor((100 / height) * y) - 100);
  const pa = 50 - px + (50 - py);

  const lp = 50 + (px - 50) / 1.5;
  const tp = 50 + (py - 50) / 1.5;
  const pxSpark = 50 + (px - 50) / 7;
  const pySpark = 50 + (py - 50) / 7;
  const pOpc = 20 + Math.abs(pa) * 1.5;
  const ty = ((tp - 50) / 2) * -1;
  const tx = ((lp - 50) / 1.5) * 0.5;

  // Update card transform for 3D effect
  card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

  // Update dynamic styles for pseudo-elements
  const gradientPosition = `background-position: ${lp}% ${tp}%;`;
  const sparklesPosition = `background-position: ${pxSpark}% ${pySpark}%; opacity: ${
    pOpc / 100
  };`;

  styleTag.textContent = `
    .card:hover::before { ${gradientPosition} }
    .card:hover::after { ${sparklesPosition} }
  `;

  card.style.setProperty("--pointer-x", `${px}%`);
  card.style.setProperty("--pointer-y", `${py}%`);

  // Clear timeout for animations
  clearTimeout(resetTimeout);
}

function applyHoverEffectMobile(x, y, width, height) {
  if (!isDragging) return;

  // Calculate relative positions and transformations
  const px = Math.abs(Math.floor((100 / width) * x) - 100);
  const py = Math.abs(Math.floor((100 / height) * y) - 100);
  const pa = 50 - px + (50 - py);

  const lp = 50 + (px - 50) / 1.5;
  const tp = 50 + (py - 50) / 1.5;
  const pxSpark = 50 + (px - 50) / 7;
  const pySpark = 50 + (py - 50) / 7;
  const pOpc = 20 + Math.abs(pa) * 1.5;
  const ty = ((tp - 50) / 2) * -1;
  const tx = ((lp - 50) / 1.5) * 0.5;

  // Update card transform for 3D effect
  card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

  // Update dynamic styles for pseudo-elements
  const gradientPosition = `background-position: ${lp}% ${tp}%;`;
  const sparklesPosition = `background-position: ${pxSpark}% ${pySpark}%; opacity: ${
    pOpc / 100
  };`;

  styleTag.textContent = `
    .card::before { ${gradientPosition} }
    .card::after { ${sparklesPosition} }
  `;

  card.style.setProperty("--pointer-x", `${px}%`);
  card.style.setProperty("--pointer-y", `${py}%`);

  // Clear timeout for animations
  clearTimeout(resetTimeout);
}