Vue.createApp({
  data() {
    return {
      details: [],
      result: '0',
      operators: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '.'],
      operands: ['÷', '×', '+', '−'],
    };
  },
  methods: {
    updateResult(operator) {
      console.log(this.result);
      if (
        (operator === '0' || operator === '00') &&
        (this.result === '0' || this.result === '')
      )
        return;
      else if (
        (operator !== '0' || operator !== '00') &&
        (this.result === '0' || this.result === '')
      )
        this.result = operator;
      else if (this.result.length >= 10) return;
      // 數字破版排除
      else if (this.result !== '0' && this.result !== '')
        this.result += operator;
    },
    updateDetails(operand) {
      console.log(operand, this.details);
      console.log(isNaN(parseFloat(this.details[this.details.length - 1])));
      if (
        this.details.length !== 0 &&
        this.result === '' &&
        isNaN(parseFloat(this.details[this.details.length - 1]))
      )
        this.details[this.details.length - 1] = operand;
      else
        this.details.push(
          new Intl.NumberFormat('en-US').format(this.result),
          operand
        );

      this.result = '';
    },
    clear() {
      this.details = [];
      this.result = '0';
    },
    back() {
      if (this.result === '') {
        // 如果 result 沒有值
        // 如果 details 最後一個是運算子，先移除運算子後再把數字丟回來處理，並從 details 裡移除
        if (this.details[this.details.length - 1]) this.details.pop();

        this.result = this.details[this.details.length - 1]; // 把
        this.details.pop();
      } else {
        // 如果 result 有值，移除最後一位
        this.result = this.result.substring(0, this.result.length - 1);
        // 如果已經是最後一位就顯示 0
        if (this.result === '') this.result = '0';
      }
    },
    compute() {
      console.log(this.details[this.details.length - 1]);
      if (this.result !== '') this.details.push(this.result, '=');
      else if (this.details[this.details.length - 1] === '=') return;
      else this.details[this.details.length - 1] = '=';

      console.log(this.details);
      let sum = parseFloat(this.details[0].split(',').join(''));
      console.log('SUM', sum);
      for (let i = 1; i < this.details.length; i = i + 2) {
        console.log('OP', this.details[i + 1]);
        switch (this.details[i]) {
          case '÷':
            sum /= parseFloat(this.details[i + 1].split(',').join(''));
            break;
          case '×':
            sum *= parseFloat(this.details[i + 1].split(',').join(''));
            break;
          case '+':
            sum += parseFloat(this.details[i + 1].split(',').join(''));
            break;
          case '−':
            sum -= parseFloat(this.details[i + 1].split(',').join(''));
            break;
        }
      }
      console.log('SUM', sum);

      this.details = [];
      let length = sum.toString().split('.')[0].length;
      let num = 10 - length - 1;
      console.log('LENGTH', length);
      this.result =
        sum % 1 !== 0
          ? (
              Math.round((sum + Number.EPSILON) * Math.pow(10, num)) /
              Math.pow(10, num)
            ).toString()
          : sum.toString();
    },
  },
  mounted() {},
}).mount('#app');
