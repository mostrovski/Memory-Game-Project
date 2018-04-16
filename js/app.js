/* 
 * Creating cards and the array that holds all of them. These cards are added 
 * to the cards deck by appending list elements to the relevant cards list when 
 * index.html is loaded:
 */
let card1 = '<li class="card"><i class="fa fa-diamond"></i></li>';
let card2 = '<li class="card"><i class="fa fa-diamond"></i></li>';
let card3 = '<li class="card"><i class="fa fa-paper-plane-o"></i></li>';
let card4 = '<li class="card"><i class="fa fa-paper-plane-o"></i></li>';
let card5 = '<li class="card"><i class="fa fa-anchor"></i></li>';
let card6 = '<li class="card"><i class="fa fa-anchor"></i></li>';
let card7 = '<li class="card"><i class="fa fa-bolt"></i></li>';
let card8 = '<li class="card"><i class="fa fa-bolt"></i></li>';
let card9 = '<li class="card"><i class="fa fa-cube"></i></li>';
let card10 = '<li class="card"><i class="fa fa-cube"></i></li>';
let card11 = '<li class="card"><i class="fa fa-leaf"></i></li>';
let card12 = '<li class="card"><i class="fa fa-leaf"></i></li>';
let card13 = '<li class="card"><i class="fa fa-bicycle"></i></li>';
let card14 = '<li class="card"><i class="fa fa-bicycle"></i></li>';
let card15 = '<li class="card"><i class="fa fa-bomb"></i></li>';
let card16 = '<li class="card"><i class="fa fa-bomb"></i></li>';
let cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, 
             card10, card11, card12, card13, card14, card15, card16];
/* 
 * The star rating is changed by replacing a 'solid' star with an 'empty' one.
 * Therefore, there are two types of stars:
 */
let solidStar = '<li><i class="fa fa-star"></i></li>';
let emptyStar = '<li><i class="fa fa-star-o"></i></li>';
/*
 * Catching DOM elements of the index.html for future manipulations:
 */
let starList = $('ul.stars'); // the list that will contain the stars;
let cardList = $('ul.deck'); // the list that will contain the cards;
let restart = $('.restart'); // the restart button;
let moves = $('.moves'); // the <span> showing the number of moves;
let gameTime = $('#stopwatch'); // the timer.
/*
 * Variables that will be used in functions:
 */
let openCards = []; // the array that will store the cards opened at some point; 
let matchCards = []; // the array that will store the matched cards;
let cardsToCheck = 2; // the number of cards to check if they are matching;
let allCards = 16; // the number of cards used in the game;
let timeToWait = 200; // the time of showing not matching cards;
let timerSecond = 1000; // one second for the timer;
let timerOut; // setTimeout will be assigned to this variable;
let seconds = 0; // initial value of seconds on the timer;
let minutes = 0; // initial value of minutes on the timer.
/*
 * Shuffle function from http://stackoverflow.com/a/2450976 to change the 
 * placement of the cards on the deck:
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * The very first function that is called whenever the index.html is loaded or
 * reloaded. It performs three actions: 1) shuffles the cards with the help of
 * the 'shuffle' function; 2) adds these cards to the deck by appending <li>'s
 * of cards to the <ul class="deck">; 3) adds stars to the score panel by 
 * appending <li>'s of 'solid' stars to the <ul class="stars">:   
 */
function loadGame() {
    shuffle(cards);
	
    cards.forEach(function(element,index,array) {
	    cardList.append(array[index]);
    });
	
    let maxStars = 3;
    for (let i=0; i<maxStars; i++) {
        starList.append(solidStar);
    }
}
/*
 * The 'movesStars' deals with the number of moves and the star rating. It saves
 * the number of moves in the variable and changes the <span class="moves"> to
 * show the current number on the page. The star rating changes every 12 moves
 * until it equals one 'solid' star:   
 */
function movesStars () {
    let move = Number(moves.text());
    let starChanger = 12;
    let starChangeLim = 25;
    let targetStar = $(starList).children().first();
    
    move += 1;
    moves.text(move);
    
    if ((move < starChangeLim) && (move % starChanger === 0)) {
        targetStar.remove();
        starList.append(emptyStar);
    }
}
/*
 * 'addTime' and 'timer' are slightly modified timer functions from 
 * https://jsfiddle.net/Daniel_Hug/pvk6p/ to show and track the time spent on 
 * the game:
 */
function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
        }
    }
    
    gameTime.text(function(){
        return (minutes ? (minutes > 9 ? minutes : "0" + minutes) : 
            "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }); 

    timer();
}
function timer() {
    timerOut = setTimeout(addTime, timerSecond);
}
/*
 * The 'cardOpen' function takes a specific card's <li> as input and is called 
 * when a user clicks on the card.
 * 
 * The first action it performs is adding the card to the 'openCards' array, 
 * which happens when the card has no 'card show open' class yet. The idea is  
 * to avoid cases of appending the card to the array when a player accidentally  
 * clicks on the card, which is already open.
 *
 * The second action is to 'open' the card, which is done by changing the class 
 * of the card to the "card show open":   
 */
function cardOpen (card) {
    if (card.hasClass('show open') !== true) {
        openCards.push(card.html());
    }
    card.addClass('show open');
}
/*
 * The 'matchCheck' function takes a specific card's <li> as input and is  
 * called when a user clicks on the card.
 * 
 * The code is executed when the 'openCards' array contains two cards, which 
 * means that two cards are open. It compares these two cards.
 * 
 * If they don't match, the class 'show open' is being removed. These leaves
 * cards with the class 'card', which visually looks like closing the cards.
 * 
 * In case the cards match, the class 'show open' is changed to 'match', which
 * means that the cards change the color and stay open on the deck. It's not 
 * possible to click on these type of cards. They are appended to the relevant
 * array - 'matchCards'.
 *
 * After the check, the cards are erased from the 'openCards' array. The move 
 * is counted by calling the 'movesStars' function.
 *
 * Finally, when all the cards are matched, it stops the timer and activates 
 * the popup modal:      
 */
function matchCheck(card) {
    if (openCards.length === cardsToCheck) {
        if (openCards[0] != openCards[1]) {
            window.setTimeout(function() {
                $('.show.open').removeClass('show open').fadeOut().fadeIn();
            }, timeToWait);
        } else {
            $('.show.open').removeClass('show open').addClass('match');
            $('.match').off('click');
            openCards.forEach(function (element,index,array) {
                matchCards.push(array[index]);
            });
        }
        
        openCards.splice(0,cardsToCheck);
        movesStars();
    }
    if (matchCards.length === allCards) {
        clearTimeout(timerOut);
        modal();
    }
}
/*
 * The 'modal' function collects the final data on time spent, moves made, and 
 * the star rating to append it to the popup modal, which is shown to a user  
 * when all the cards are matched, and the function is called. It also manages
 * the clicks on 'playagain' and 'modalclose' buttons: 
 */
function modal() {
    let gTime, gMvs, gRating, gSummary, summaryToShow, ratingToShow;
    
    gTime = '<li><i class="fa fa-clock-o"></i> ' + gameTime.text() + '</li>'; 
    gMvs = '<li><i class="fa fa-clone"></i> ' + moves.text() + ' moves</li>'; 
    gRating = starList.html();
    gSummary = [gTime, gMvs];
    
    summaryToShow = $('.summary');
    ratingToShow = $('.finalstars');
    
    gSummary.forEach(function(element,index,array){
        summaryToShow.append(array[index]);
    });
    ratingToShow.append(gRating);
    
    $('#modalopen').fadeIn();
    $('#playagain').on('click', function(e) {
        location.reload(true);
        e.preventDefault();
    });
    $('#modalclose').on('click', function(e) {
        $('#modalopen').fadeOut();
        e.preventDefault();
    });
}

loadGame();
let cardInPlay = $('li.card');

/*
 * The restart-button-click event:
 */ 
restart.on('click', function() {
    location.reload();
});
/*
 * The timer is activated once a user 'touches' one of the cards:
 */
cardInPlay.on('mousedown', function() {
    timer();
    cardInPlay.off('mousedown');
});
/*
 * The card-click event:
 */
cardInPlay.on('click', function() {
    cardOpen($(this));
    matchCheck($(this));
});
