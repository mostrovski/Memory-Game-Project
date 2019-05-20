# Match Pairs, Memory Game Project

## Intro: the game itself

There are **eight pairs** of cards (**16** cards in total) laid face down. Two
cards are flipped face up over each move. The object of the game is to turn over
pairs of matching cards. The game is over when all the pairs are found.

## User interface

The game is played on the webpage, which contains:

- the name of the game;
- the star rating;
- the number of moves;
- the timer;
- the 'Restart' button;
- the particular area where cards are placed;
- the cards;
- the popup modal.

## Implementation of the project

- `index.html` contains the structure and static elements of the page;
- `app.css` defines the style of the page elements;
- `app.js` performs the DOM-manipulation in response to specific events.

## Dependencies (built with)

- [HTML](https://www.w3.org/html/)
- [CSS](https://www.w3.org/Style/CSS/)
- [Javascript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [JQuery](http://jquery.com/)
- [Font Awesome](https://fontawesome.com/)

## Stages of the game

### Page load/reload

1. `index.html` shows the name of the game, the special area for cards (*deck*),
   and the score panel, which contains:
 - the star rating area;
 - the number of moves that shows '0 Moves';
 - the timer in the initial position (00:00);
 - the restart button.
2. The `loadGame` function is called:
 - `shuffle` function shuffles the cards;
 - `cardList.append` adds these cards to the deck and shows them to the user
  laid face down;
 - `starList.append` adds three 'solid' stars to the score panel.

### Start of the game

The game starts when the timer is switched on. It happens once the very first
card is *touched*. `addTime` and `timer` functions start changing the time on
the score panel.

### Opening the first card

When the user clicks on the card, The `cardOpen` function changes the class of
this card, which looks like it is being *flipped face-up*.

### Opening the second card

This calls the `matchCheck` function:
1. Two matching cards get a new class and lay *face up* until the end of the
   game.
2. If the cards don't match, they get the initial class, which looks like they
   are being *flipped face-down*.
3. The `movesStars` function changes the number of moves.
4. Every *twelve moves*, it also changes the star rating replacing the 'solid'
   star with the 'empty' one.

### End of the game

Once all the pairs are found, and all the cards lay face up, the game is over.
It stops the `timer` and activates the popup `modal` that contains the summary:
- the time spent on the game;
- the number of moves made;
- the star rating.

The modal also includes the *play again* button. Pressing it reloads the page
(see above) and thus helps start a new game.

## Outro: comments

For more information on classes, the logic of functions and events explore the
comments to `index.html`, `app.css`, and `app.js`.