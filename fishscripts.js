// create the players

var players = {
            starfish: {
                name: "Orion",
                image: 'Starfish.jpg',
                base: 8,
                hp: 120,
                counter: 14
            },
            crab: {
                name: "Pinch",
                image: 'Crab.jpg',
                base: 5,
                hp: 100,
                counter: 12
            },
            turtle: {
                name: "Chomp",
                image: 'turtle.jpg',
                base: 20,
                hp: 150,
                counter: 15
            },
            dolphin: {
                name: "Flipper",
                image: 'dolphin.jpg',
                base: 25,
                hp: 180,
                counter: 19
            }
        };

var enemies = {};
var attacker = {};
var defender = {};

// 
function displayPlayers() {
  var num = 1;
  for (var player in players) {
    var tracker = "#player" + num;
    var inner = "<img class='playerImage'" + "src=" + players[player].image + " id=" + player +">";
    console.log(inner);
    $(tracker).append(inner);
    num++;
  }
}

function displayAttacker() {
  var html = "<img src=" + attacker[Object.keys(attacker)[0]].image + ">";
  console.log(html);
  $("#attacker").append(html);
}

function displayEnemies() {
  for (var enemy in enemies) {
    var html = "<img class='enemyImage' src=" + enemies[enemy].image + " id=" + enemy + ">";
    $("#enemies").append(html);
  }
}

function chooseDefender() {
  $('#enemies').on("click", '.enemyImage', function() {
    var enemyIdValue = $(this).attr('id');
    defender[enemyIdValue] = enemies[enemyIdValue];
    delete enemies[enemyIdValue];
    displayDefender();
    $(this).fadeOut();
  });
}

function displayDefender() {
  var html = "<img src=" + defender[Object.keys(defender)[0]].image + ">";
  $("#defender").append(html);
}

function chooseAttackerEnemies() {
  $('.playerImage').on("click", function() {
    var playerIdValue = $(this).attr('id');
    attacker[playerIdValue] = players[playerIdValue];
    console.log("this is attacker", attacker);
    for (var player in players) {
      if (player !== playerIdValue) {
        enemies[player] = players[player];
      }
    }
    displayAttacker();
    displayEnemies();
    $("#players").fadeOut();
    console.log("this is enemies", enemies);
  });
}



function attack() {
  var multiplier = 1;
  $("#attackButton").on("click", function() {
    var defenderObject = defender[Object.keys(defender)];
    var attackerObject = attacker[Object.keys(attacker)];
    console.log(defenderObject, attackerObject);
    defenderObject.hp -= attackerObject.base * multiplier;
    attackerObject.hp -= defenderObject.counter;
    var attackerHtml = attackerObject.name + " bubbled with " + attackerObject.base * multiplier + " power.";
    attackerHtml += "<br> Current HP is " + attackerObject.hp;
    var defenderHtml = defenderObject.name + " counter-bubbled with " + defenderObject.counter + " power.";
    defenderHtml += "<br> Current HP is " + defenderObject.hp;
    $("#attackerDescription").html(attackerHtml);
    $("#defenderDescription").html(defenderHtml);
    console.log("this is attacker hp: ", attackerObject.hp);
    console.log("attacker attacked with ", attackerObject.base * multiplier);
    console.log("this is defender hp: ", defenderObject.hp);
    console.log("defender attacked with ", defenderObject.counter);
    multiplier++;
  });


// why doesn't this work??
if ($("#attackerObject.hp") <= 0) {
alert("You lose! The other player out bubbled you!");
              } 
if ($("#defenderObject.hp") <= 0) {
alert("You win! You out-bubbled the other player!");
              }
            };
  

            

function game() {
}

$(document).ready(function() {
  displayPlayers();
  chooseAttackerEnemies();
  chooseDefender();
  attack();
});
