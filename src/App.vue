<template>
  <div id="app">
    <div class="container">
      <h1>Tic Tac Toe</h1>
      <h3>{{ winnerMessage || drawMessage || message }}</h3>
      <GameBoard
        :reset="reset"
        @turn="player=$event"
        @reset="reset=$event"
        @winner="getWinner($event)"
        @draw="setDraw()"
      />
      <div class="group">
        <button type="button" class="btn" @click="resetBoard()">New Game</button>
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';

export default {
  name: 'App',
  components: {
    GameBoard
  },
  data: () => ({
    reset: false,
    player: '',
    winnerMessage: '',
    drawMessage: ''
  }),
  computed: {
    message() {
      return this.player + '\'s' + ' turn.'
    }
  },
  methods: {
    resetBoard() {
      this.reset = true;
      this.winnerMessage = '';
      this.drawMessage = '';
    },
    getWinner(player) {
      this.winnerMessage = `Winner: Player ${player}!`;
    },
    setDraw() {
      this.drawMessage = `Draw Game!`;
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#app {
  width: 100vw;
  height: 100vh;
}
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.group {
  margin-top: 10px;
}
.group > .btn {
  padding: 10px 20px;
}
</style>
