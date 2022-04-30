import { createStore } from "vuex";

export default createStore({
  state: {
    calculations: [
      { firstNumber: 0, operator: "+", secondNumber: 0, answer: 0 },
    ],
  },
  getters: {
    lastAnswer: (state) => {
      return state.calculations[state.calculations.length - 1].answer;
    },
  },
  mutations: {
    PUSH_TO_LOG(state, calculation) {
      state.calculations.push(calculation);
    },
  },
  actions: {
    calculate({ commit }, { firstNumber, operator, secondNumber }) {
      if (operator === null) {
        operator = "+";
      }

      let answer;
      switch (operator) {
        case "+":
          answer = firstNumber + secondNumber;
          break;
        case "-":
          answer = firstNumber - secondNumber;
          break;
        case "x":
          answer = firstNumber * secondNumber;
          break;
        case "/":
          answer = firstNumber / secondNumber;
          break;
      }

      if (answer !== 0 && !parseFloat(answer)) {
        console.log("Unable to calculate...");
        return Promise.reject(new Error("Not a number"));
      }

      const calc = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
        answer: answer,
      };

      console.log(calc);

      commit("PUSH_TO_LOG", calc);
    },
    saveToLog({ commit }, calculation) {
      commit("PUSH_TO_LOG", {
        ...calculation,
        id: this.state.calculations.length,
      });
    },
  },
});
