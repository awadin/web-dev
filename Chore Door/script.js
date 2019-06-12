const doorImage1 = document.getElementById("door1");
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";

const doorImage2 = document.getElementById("door2");
const doorImage3 = document.getElementById("door3");
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const startButton = document.getElementById("start");

let currentlyPlaying = true;

function isBot(door) {
  if(door.src === botDoorPath)
    {
      return true;
    }
  else
    {
      return false;
    }
}

doorImage1.onclick = () => {
  if(!isClicked(doorImage1) && currentlyPlaying)
    {
  doorImage1.src = openDoor1;
  playDoor(doorImage1);
		}
}

doorImage2.onclick = () => {
  if(!isClicked(doorImage2)&& currentlyPlaying)
    {
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
  if(!isClicked(doorImage3)&& currentlyPlaying)
    {
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
    }
}

startButton.onClick = () => {
  if(!currentlyPlaying)
    {
  startRound();
    }
}

function startRound() {
  doorImage1 = closedDoorPath;
  doorImage2 = closedDoorPath;
  doorImage3 = closedDoorPath;
  numClosedDoor = 3;
  startButton.innerHTML = "Good luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

function gameOver(status) {
  if(status === "win")
    {
      startButton.innnerHTML = "You win! Play again?";
    }
  else
    {
      startButton.innerHTML = "Game over! Play again?";
    }
  currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0)
    {
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    }
  else if(choreDoor === 1)
    {
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    }
  else
    {
      openDoor3 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor1 = spaceDoorPath;
    }
}


function isClicked(door) {
  if(door.src === closedDoorPath)
    {
      return false;
    }
  else
    {
      return true;
    }
}
function playDoor(door) {
  numClosedDoors--;
  if(numClosedDoors === 0)
    {
      gameOver("win");
    }
  else if (isBot(door))
    {
      gameOver();
    }
}

startRound();