// Animation and Sound Configuration
let playSound = false;  // Set to true to enable sound
let selectedToken = null;
let targetToken = null;
let targetTokenDamage = null;
let rollResult = null;

let weaponEffects = {
  // Define your weapon effects here
  "Broadsword": { 
    melee: { animation: "jb2a.greatsword.melee.standard.white", sound: "path/to/your/sword_sound.mp3" }
  },
  "Fist": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Grapple": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.two_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Kick": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Claw": { 
    melee: { animation: "jb2a.claws.200px.red", sound: "path/to/your/sword_sound.mp3" }
  },
  "Composite Bow": { 
    ranged: { animation: "jb2a.arrow.cold.blue", sound: "path/to/your/bow_sound.mp3" }
  },
  "miss": { 
    animation: "jb2a.ui.miss"
  },
  "override": { 
    animation: "jb2a.hammer.throw", sound: "path/to/your/override_sound.mp3"
  }
};

// Function to perform initial checks
function performInitialChecks() {
  selectedToken = canvas.tokens.controlled[0];
  if (!selectedToken) {
    return null;
  }

  let selectedTargets = Array.from(game.user.targets);
  if (selectedTargets.length !== 1) {
    return null;
  }

  targetToken = selectedTargets[0];
  if (targetToken.id === selectedToken.id) {
    return null;
  }

  return { selectedToken, targetToken };
}

// Function to trigger animations and sounds
async function triggerEffects(chatMessage, selectedToken, targetToken) {
  let flavorText = chatMessage.flavor || "";

  let weaponUsed = null;
  let maxLength = 0;
  Object.keys(weaponEffects).forEach(weapon => {
    let regex = new RegExp(`\\b${weapon}\\b`, 'i');
    if (regex.test(flavorText) && weapon.length > maxLength) {
      weaponUsed = weapon;
      maxLength = weapon.length;
    }
  });

  let isMeleeAttack = weaponUsed && weaponEffects[weaponUsed].melee !== undefined;
  let isRangedAttack = weaponUsed && weaponEffects[weaponUsed].ranged !== undefined;

  if (isMeleeAttack && isRangedAttack) {
    isRangedAttack = true;
    isMeleeAttack = false;
  }

  let isSuccess = flavorText.includes("Success");
  let isSpecial = flavorText.includes("Special");
  let isCritical = flavorText.includes("Critical");
  let isFailure = flavorText.includes("Failure");
  let isFumble = flavorText.includes("Fumble");

  console.log(`Weapon Used: ${weaponUsed}`);
  console.log(`Is Melee Attack: ${isMeleeAttack}`);
  console.log(`Is Ranged Attack: ${isRangedAttack}`);
  console.log(`Flavor Text: ${flavorText}`);

  let sourcePosition = {
    x: selectedToken.center.x,
    y: selectedToken.center.y
  };
  let targetPosition = {
    x: targetToken.center.x,
    y: targetToken.center.y
  };

  if (weaponUsed && (isSuccess || isSpecial || isCritical)) {
    let attackType = isMeleeAttack ? "melee" : "ranged";

    console.log(`Attack Type: ${attackType}`);

    if (!weaponEffects[weaponUsed]) {
      console.error(`No weapon effects found for weapon: ${weaponUsed}`);
      return;
    }

    if (!weaponEffects[weaponUsed][attackType]) {
      console.error(`No ${attackType} effects found for weapon: ${weaponUsed}`);
      return;
    }

    if (attackType === "melee") {
      // Calculate the direction vector
      let direction = {
        x: targetPosition.x - sourcePosition.x,
        y: targetPosition.y - sourcePosition.y
      };

      // Normalize the direction vector
      let length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      let unitDirection = {
        x: direction.x / length,
        y: direction.y / length
      };

      // Scale the direction vector to the grid size
      let gridSize = canvas.grid.size;
      let stretchPosition = {
        x: sourcePosition.x + unitDirection.x * gridSize,
        y: sourcePosition.y + unitDirection.y * gridSize
      };

      new Sequence()
        .effect()
        .file(weaponEffects[weaponUsed][attackType].animation)
        .atLocation(sourcePosition)
        .stretchTo(stretchPosition)  // Stretch to one grid unit away
        .play();
    } else if (attackType === "ranged") {
      new Sequence()
        .effect()
        .file(weaponEffects[weaponUsed][attackType].animation)
        .atLocation(sourcePosition)
        .stretchTo(targetPosition)
        .play();
    }

    if (playSound) {
      let audio = new Audio(weaponEffects[weaponUsed][attackType].sound);
      audio.volume = 0.8;
      audio.play();
    }
  }

  if (isFailure || isFumble) {
    if (isRangedAttack) {
      let missShift = Math.random() > 0.5 ? 100 : -100;
      let missPosition = {
        x: targetPosition.x,
        y: targetPosition.y + missShift
      };
      new Sequence()
        .effect()
        .file(weaponEffects[weaponUsed].ranged.animation)
        .atLocation(sourcePosition)
        .stretchTo(missPosition)
        .effect()
        .file(weaponEffects.miss.animation)
        .atLocation(targetPosition)
        .play();
    } else if (isMeleeAttack) {
      new Sequence()
        .effect()
        .file(weaponEffects.miss.animation)
        .atLocation(targetPosition)
        .play();
    }
  }

  if (chatMessage.flavor && chatMessage.flavor.includes("Damage:")) {
    targetTokenDamage = parseInt(chatMessage.content, 10);
    console.log(targetTokenDamage); 
  }

  // Additional functionality: Display hit location as a styled chat message
  if (chatMessage.flavor && chatMessage.flavor.includes("Hit Location Roll")) {
    // Convert chatMessage.content to an integer
    rollResult = parseInt(chatMessage.content, 10);

    // Log the original chat message content for debugging
    console.log("Original Chat Message Content:", chatMessage.content);
    console.log("Roll Result Integer:", rollResult);

    // Get the target's items
    const targetItems = targetToken.actor.items;

    // Look through items of type hitLocation
    const hitLocation = targetItems.find(item => {
      return item.type === "hitLocation" &&
             rollResult >= item.system.dieFrom &&
             rollResult <= item.system.dieTo;
    });

    if (hitLocation) {
      // Create the styled message content
      const messageContent = `
        <div style="border: 2px solid #000; padding: 10px; margin: 5px 0; text-align: center;">
          <div style="font-size: 1.5em; font-weight: bold;">takes ${targetTokenDamage} to: ${hitLocation.name}</div>
        </div>`;

      // Display the hit location name as a styled chat message
      ChatMessage.create({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ token: targetToken }),
        content: messageContent
      });
    } else {
      console.log("No hit location found for the roll result.");
    }
  }

  selectedToken = null;
  targetToken = null;
  game.user.updateTokenTargets([]);
}

// Function to handle changes in token selection and target
function handleTokenChanges() {
  let checkResults = performInitialChecks();
  if (!checkResults) return;

  ({ selectedToken, targetToken } = checkResults);

  Hooks.on("createChatMessage", (chatMessage) => {
    triggerEffects(chatMessage, selectedToken, targetToken);
  });
}

// Function to reset listeners every 5 seconds
function resetListeners() {
  Hooks.off("controlToken", handleTokenChanges);
  Hooks.off("targetToken", handleTokenChanges);

  Hooks.on("controlToken", handleTokenChanges);
  Hooks.on("targetToken", handleTokenChanges);

  handleTokenChanges();
}

// Start by setting up the token change handlers
resetListeners();

// Set an interval to reset listeners every 5 seconds
setInterval(resetListeners, 5000);
