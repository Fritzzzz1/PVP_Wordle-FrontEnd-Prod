Started work on project : 16.4.22

# COMMIT #1
Liran Friedman, 18.4.22
# Wordle web game complete logic and basic UI

## - Very happy with the game logic:
- works perfectly throughout all of my testing.
- "yellow" case of letters is pretty problematic, i think it's now 100% right -
  good test cases that i used to check the duplicate logic : "EERIE" "ENTER" "CRANE" "EAGLE"
  just checking these words against each other (in App.js line#23, commented out).

## - Graphics are ok:
- There is currently a problem with the flex view,
  depends on browser settings the flex can work really bad in some situations, i will work on a solution.
- I would like to focus more on style, but rather do that when we finish all the most important stuff.
- Iv'e tried to match all functionality on NYTimes display -
  Chained the color of guessed keys to letter in word,
  centered all and created basic display for win / lose.
  (Here we will probably want to add a bunch of stuff regarding social/data analysis)



### - Idea for DB structure:
we can save the final { Board } which is a matrix that contains all attempts and all letters of each. ( the final full gameboard).
this can happen when the game as ended, and only then.
we need to be able to save this both as an anonymous (or guest) user and as an active user.

# COMMIT #2
Liran Friedman, 20.4.22
# Communication with back-end is up and running.

## - Browser warning: 'react app conflict in package.json file:
- A prompt for a warning in the browser itself (visible to user).
- Probably cause by installing axiom by npm while react was installed by yarn...
- For now, no clear solution, probably possible to "make the warning go away" or create a new working environment.

## - Note on App.css:
- Iv'e manipulated the view in order to easily display data coming from the server.
- Of course,** the App.css has to change ** and/or improve before release to match user expectations from the game itself.
- specifically - width and centering of game board is the main issue.



## - Next order of business:
### BackEnd:
- In the short term i will focus here.
- create all models for database, and handling all POST requests for - user, game, word, letter.
- More details in back-end documentation.

### FrontEnd:
** Game Over: **
- Send back essential data - username, board, win/lose, duration (add a timer), secret word.
- create a prompt for guest user.
- create views for data page (and for leaderboard statistics?).

# COMMIT #3
Liran Friedman, 26.4.22

## New clean project

## - Relevant progress:
- json package bug resolved.
- onChange function in create user form had "name" set to "username", therefore it was unable to save "PUT" requests.
- game component encapsulated now, and index.js is clean. 

# COMMIT #4
Liran Friedman, 27.4.22
## Worked on css file to have a decent way to look at the project:
  - components are separated - app is "empty" and can contain all modules - for now: game, leaderboard, data.
  - style is not accurate, but main classes to work on are - letter, board.

## - Relevant progress:
- Fixed a bug where on entering an invalid word on last attempt, game will end.
- fixed player edit, delete functionality (for later use)
- added a data component, for now it will display info about some games.
- i realized that every action happens twice because of <strictMode> in index.js

## ideas for next missions:
- make each row in stats display send us to that specific game board.
- player authentication, validation...
  needed for sending request to save game.
- we need to improve design a little before deployment.
- We will want to make the game save itself and appear on the data tables without needing a refresh.


# COMMIT #5
Liran Friedman, 3.5.22
## - Relevant progress:
- started working on signIn and signUp, got a nice template, working on routing.
- all errors in signUp and SignIn now appear on form window.
- sign in now sends a request for token, signup creates a new user.
- added number of games played to leaderboard

# COMMIT #6
Liran Friedman, 4.5.22
## - Relevant progress:
- new branch for all login items.
- integrated login and logout
- games are now saved to current user.
- tokens are saved in local storage, user check works great.
- still need to integrate signUp component.
- guest user logic is prepared, but for some reason the context provider doesn't help 
  in changing the user directly from SignIn.js. seems identical to everything in game context provider.
- need to organize files.
- need to work more on style.


# COMMIT #6
Liran Friedman, 4.5.22
## - Relevant progress:
- after testing, The only problem i can see is when the guest user wishes to play another game.
  Other than that, "navigation" seems to be working good (signup, signin, logout, continue as guest)
- There are still some unnecessary files, and directories are still a bit messy (first mission in next branch).
- Also, there are still unneeded components on main display.


- ideas : add music, replace edit and delete user with number of games played.
- in the future we can add SSO - (SNAL) with google or facebook   (can add option to share the game).

# COMMIT #7
Liran Friedman, 6.5.22
## - Relevant progress:
- style control improved: 
   the best conclusion for now as for working with css - always wrap with <div> when assigning classname.
- organized files.
- guest play again still goes through signup.
- score bug "fixed" in GameOver with another state - data update.