// bgc.js

function readyFn(jQuery) {
	console.log("ready");
	playIntroMusic();
	setupLoop();
}; // /function readyFn

function reloadGame() {
	location.reload();
}

function playIntroMusic() {
	console.log("Playing:  Retro Beat");
	audio = new Audio();
	audio.setAttribute('src', 'audio/Retro Beat.ogg');
	audio.load();
	audio.play();
	audio.setAttribute('loop', 'loop');
}

function setupLoop() {
	console.log("display intro");
	$('#intro').css('display', 'block');
	console.log("hide outro");
	$('#outro').css('display', 'none');
	initializeScores();
	$('#start').on('click', displayGame);
	$('#continue').on('click', displayGame);
	$('#quit').on('click', endGame);
	$('#play_again').on('click', reloadGame);
}

function initializeScores() {
	console.log("initialize scores");
	playerScore = 0;
	cpuScore = 0;
	renderScores();
}

function displayGame() {
	console.log("display game");
	playGameMusic();
	$('#intro').css('display', 'none');
	$('#again').css('display', 'none');
	$('#results').css('display', 'none');
	$('#computer_picks').css('display', 'none');
	$('#main_game').css('display', 'block');
	addHandlers();
}

function addHandlers() {
	$('#bunny').on('click', {
		name: "Bunny"
	}, judge);
	$('#gun').on('click', {
		name: "Gun"
	}, judge);
	$('#carrot').on('click', {
		name: "Carrot"
	}, judge);
}

function judge( event ) {
	console.log("Judging..." + event.data.name);
	player = event.data.name;
	//$('.player-choice').css('display', 'none');
	var playerSelection = "#" + player;
	console.log(playerSelection);
	$(playerSelection).css('border', '5px solid green');
	audio.pause();
	removeHandlers();
	cpu = cpuSelect();

	console.log("CPU selection:  " + cpu);
	// TODO - logic routine
	var result = compare( player, cpu );
	if (result == 1) {
		console.log("Player win");
		$('#results p').html("You win!").css('color', '#33cc33');
		playerScore++;
	} else if (result == -1) {
		console.log("CPU win");
		$('#results p').html("You lose...").css('color', '#cc3333');
		cpuScore++;
	} else {
		console.log("Tie");
		$('#results p').html("It's a tie!").css('color', '#3333cc');
	}
	renderScores();
	$('#results').css('display', 'block');
	$('#again').css('display', 'block');
}

function compare( player, cpu ) {
	var comparison = null;
	var soundEffectSrc = null;
	if (player == 'Bunny') {
		if (cpu == 'Carrot') {
			comparison = 1;
			soundEffectSrc = "audio/Carrot.ogg";
		} else if (cpu == 'Gun') {
			comparison = -1;
			soundEffectSrc = "audio/laser.ogg";
		} else {
			comparison = 0;
			soundEffectSrc = "audio/jingles_STEEL03.ogg";
		}
	} else if (player == 'Gun') {
		if (cpu == 'Bunny') {
			comparison = 1;
			soundEffectSrc = "audio/laser.ogg";
		} else if (cpu == 'Carrot') {
			comparison = -1;
			soundEffectSrc = "audio/rumble3.ogg";
		} else {
			comparison = 0;
			soundEffectSrc = "audio/jingles_STEEL03.ogg";
		}
	} else {
		if (cpu == 'Gun') {
			comparison = 1;
			soundEffectSrc = "audio/rumble3.ogg";
		} else if (cpu == 'Bunny') {
			comparison = -1;
			soundEffectSrc = "audio/Carrot.ogg";
		} else {
			comparison = 0;
			soundEffectSrc = "audio/jingles_STEEL03.ogg";
		}
	}
	playResultMusic(soundEffectSrc);
	return comparison;
}

function playResultMusic( src ) {
	audio = new Audio();
	audio.setAttribute('src', src);
	audio.load();
	audio.play();
}

function removeHandlers() {
	console.log("Remove Handlers...")
	$('#bunny').unbind();
	$('#gun').unbind();
	$('#carrot').unbind();
}

function cpuSelect() {
	console.log("Selecting for CPU...");
	var choiceSeed = getRandomIntInclusive( 0, 2 );
	console.log("CPU choice seed:  " + choiceSeed);
	var choice;
	$('#computer_picks').css('display', 'block');
	if (choiceSeed == 0) {
		choice = 'Bunny';
		$('#cpubunny').css('display', 'block');
		$('#cpugun').css('display', 'none');
		$('#cpucarrot').css('display', 'none');
	} else if (choiceSeed == 1) {
		choice = 'Gun';
		$('#cpubunny').css('display', 'none');
		$('#cpugun').css('display', 'block');
		$('#cpucarrot').css('display', 'none');
	} else {
		choice = 'Carrot';
		$('#cpubunny').css('display', 'none');
		$('#cpugun').css('display', 'none');
		$('#cpucarrot').css('display', 'block');
	}
	return choice;
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
// Source:  MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
function getRandomIntInclusive(min, max) {
 	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGameMusic() {
	audio.pause();
	console.log("Playing:  Mission Plausible");
	audio = new Audio();
	audio.setAttribute('src', 'audio/Mission Plausible.ogg');
	audio.load();
	audio.play();
	audio.setAttribute('loop', 'loop');
}

function renderScores() {
	console.log("rendering scores  " + "Player: " + playerScore + " Computer: " + cpuScore);
	$('#player').html(playerScore);
	$('#cpu').html(cpuScore);
}

function endGame() {
	$('#main_game').css('display', 'none');
	audio.pause();
	console.log("Playing:  Sad Town");
	audio = new(Audio);
	audio.setAttribute('src', 'audio/Sad Town.ogg');
	audio.load();
	audio.play();
	if (playerScore > cpuScore) {
		$('#outro h2').html("Congratulations on your victory!");
	} else if (playerScore < cpuScore) {
		$('#outro h2').html("Better luck next time!");
	} else {
		$('#outro h2').html("It doesn't get any closer than that!");
	}
	console.log("display outro");
	$('#outro').css('display', 'block');
	console.log('Quitting game...');
	// location.reload();
}

var player, cpu, playerScore, cpuScore, audio;

$(document).ready(readyFn);