<template>
  <div class="game-board">
    <div class="box" v-for="(box, index) in boxes" :key="index" @click="onClick(index)">
      <span>{{ box }}</span>
    </div>
  </div>
</template>

<script>
import checkWinnerMixin from '../mixins/checkWinnerMixin';

export default {
  props: {
    reset: Boolean
  },
  data: () => ({
    p1: 'X',
    p2: 'O',
    currentPlayer: '',
    boxes: ['','','','','','','','',''],
    numberOfInput: 0,
    p1Inputs: [],
    p2Inputs: [],
    isWinner: false,
    isDraw: false
  }),
  mixins: [checkWinnerMixin],
  mounted() {
    this.currentPlayer = this.p1;
  },
  watch: {
    reset(newVal) {
      if(newVal) {
        this.resetBoxes();
      }
    },
    currentPlayer(newVal) {
      if(newVal === 'O') {
        this.turn('Player 2');
      } else {
        this.turn('Player 1');
      }
    },
    numberOfInput(newVal) {
      if(newVal === 9 && !this.isWinner) {
        this.isDraw = true;
        this.$emit('draw');
      }
    }
  },
  methods: {
    onClick(index) {
      if(!this.boxes[index] && !this.isWinner && !this.isDraw) {
        this.$set(this.boxes, index, this.currentPlayer);
        this.numberOfInput++;

        if(this.currentPlayer === 'X') {
          this.p1Inputs.push(index);
          this.currentPlayer = this.p2;
          this.checkP1();
        } else if(this.currentPlayer === 'O') {
          this.p2Inputs.push(index);
          this.currentPlayer = this.p1;
          this.checkP2();
        }
      }
    },
    resetBoxes() {
      this.boxes = ['','','','','','','','',''];
      this.p1Inputs.length = 0;
      this.p2Inputs.length = 0;
      this.currentPlayer = this.p1;
      this.numberOfInput = 0;
      this.isWinner = false;
      this.isDraw = false;
      
      this.$emit('reset', false);
    },
    turn(p) {
      this.$emit('turn', p);
    },
    checkP1() {
      let isWinner = false;

      if(this.p1Inputs.length > 2) {
        this.p1Inputs.sort(function(a, b){return a-b});
        isWinner = this.horizontal(this.p1Inputs) || this.vertical(this.p1Inputs) || this.diagonal(this.p1Inputs) || false;
      }

      if(isWinner) {
        this.$emit('winner', 1);
        this.isWinner = true;
      }
    },
    checkP2() {
      let isWinner = false;

      if(this.p2Inputs.length > 2) {
        this.p2Inputs.sort(function(a, b){return a-b});
        isWinner = this.horizontal(this.p2Inputs) || this.vertical(this.p2Inputs) || this.diagonal(this.p2Inputs) || false;
      }

      if(isWinner) {
        this.$emit('winner', 2);
        this.isWinner = true;
      }
    },
    // horizontal(arr) {
    //   const first = arr.includes(0) && arr.includes(1) && arr.includes(2);
    //   const second = arr.includes(3) && arr.includes(4) && arr.includes(5);
    //   const third = arr.includes(6) && arr.includes(7) && arr.includes(8);

    //   return first || second || third;
    // },
    // vertical(arr) {
    //   const first = arr.includes(0) && arr.includes(3) && arr.includes(6);
    //   const second = arr.includes(1) && arr.includes(4) && arr.includes(7);
    //   const third = arr.includes(2) && arr.includes(5) && arr.includes(8);

    //   return first || second || third;
    // },
    // diagonal(arr) {
    //   const first = arr.includes(0) && arr.includes(4) && arr.includes(8);
    //   const second = arr.includes(2) && arr.includes(4) && arr.includes(6);

    //   return first || second;
    // }
  }
}
</script>

<style scoped>
.game-board {
  background: #aaa;
	display: flex;
	flex-wrap: wrap;
  width: 300px;
}
.box {
  flex-grow: 1;
	width: 33%;
	height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
}
.game-board > div:nth-child(even) {
	background: #23a;
}
.game-board  > div:nth-child(odd) {
	background: #49b;
}
</style>