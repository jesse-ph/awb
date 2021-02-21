export default {
  methods: {
    horizontal: (arr) => {
      const first = arr.includes(0) && arr.includes(1) && arr.includes(2);
      const second = arr.includes(3) && arr.includes(4) && arr.includes(5);
      const third = arr.includes(6) && arr.includes(7) && arr.includes(8);
  
      return first || second || third;
    },
    vertical: (arr) => {
      const first = arr.includes(0) && arr.includes(3) && arr.includes(6);
      const second = arr.includes(1) && arr.includes(4) && arr.includes(7);
      const third = arr.includes(2) && arr.includes(5) && arr.includes(8);
  
      return first || second || third;
    },
    diagonal: (arr) => {
      const first = arr.includes(0) && arr.includes(4) && arr.includes(8);
      const second = arr.includes(2) && arr.includes(4) && arr.includes(6);
  
      return first || second;
    }
  }
}