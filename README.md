# Grid-Pong!
Pong on the monome grid. Uses the grid as the view and controller with p5.js running visual processes.

# Goals
1. Make a playable game on the grid.
2. Decouple the game from the interaction.
   1. Make it possible to translate any p5.js sketch into the grid
3. Streamline the process of making a Node app with a browser interface.

# Structure

## Backend / Kitchen


# Types
If you want intellisense for p5, download the p5.vsCode extension and add this to the top of your main file:

`
/// <reference path="../node_modules/@types/p5/global.d.ts" />
`

Be warned: it often adds squigglies where it shouldn't, so it's not totally recommended.