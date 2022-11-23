import { Component } from "react";
import styled from "styled-components";
import "./App.css";

const NumberDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 20vh;
  font-style: italic;
  font-size: 40px;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const StyledInput = styled.input`
  width: 50px;
  height: 50px;
  border-radius: 20%;
  text-align: center;
  font-size: 20px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => {
    let inputIsOk = props.inputIsFull;
    let buttonIsClicked = props.buttonClicked;
    if (!inputIsOk && !buttonIsClicked) {
      return "grey";
    } else if (inputIsOk && buttonIsClicked) {
      return "blue";
    } else if (inputIsOk && !buttonIsClicked) {
      return "red";
    }
  }};
`;

const numGenerator = () => {
  let numsList = [];
  for (let i = 1; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * 9);
    numsList.push(randomNum);
  }
  return numsList;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      validationList: [],
      inputList: [],
      checkList: [],
      buttonClicked: false,
      showInfo: false,
    };
  }

  componentDidMount() {
    this.setState((prev) => {
      return {
        ...prev,
        validationList: [...numGenerator()],
      };
    });
  }
  componentDidUpdate(preProps, preState) {}
  resetNum = () => {
    this.setState((prev) => {
      return {
        validationList: numGenerator(),
        inputList: [],
        checkList: [],
        buttonClicked: false,
        showInfo:false
      };
    });
  };
  inputChangeAndCheck = (index, event) => {
    this.setState((prev) => {
      let tempInput = [...this.state.inputList];
      let tempCheck = [...this.state.checkList];
      tempInput[index] = event.target.value;
      if (tempInput[index] == this.state.validationList[index]) {
        tempCheck[index] = true;
      } else {
        tempCheck[index] = false;
      }
      return {
        ...prev,
        inputList: [...tempInput],
        checkList: [...tempCheck],
      };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.inputList.length !== 4) return;
    this.setState((prev) => {
      return { ...prev, showInfo: true, buttonClicked: true };
    });
    if (this.state.checkList.every((each) => each === true)) {
      setTimeout(() => {
        console.log(...this.state.inputList);
        this.resetNum();
      }, 500);
    } else {
      setTimeout(() => {
        this.resetNum();
        console.log("refresh");
      }, 500);
    }
  };
  render() {
    let buttonCanClicked = this.state.checkList.length === 4;
    let inputIsCheckedOk =
      buttonCanClicked && this.state.checkList.some((each) => each === false);
    return (
      <div className="App">
        <form onSubmit={this.submitHandler}>
          <NumberDiv>
            {this.state.validationList.map((num, index) => (
              <label key={index}>{num}</label>
            ))}
          </NumberDiv>
          <InputDiv>
            {this.state.validationList.map((each, index) => (
              <StyledInput
                value={
                  this.state.inputList[index] ? this.state.inputList[index] : ""
                }
                maxLength="1"
                type="text"
                onChange={this.inputChangeAndCheck.bind(null, index)}
                key={index}
              />
            ))}
          </InputDiv>
          <StyledButton
            inputIsFull={buttonCanClicked}
            buttonClicked={this.state.buttonClicked}
            onClick={this.buttonClickHandler}
            disabled={!buttonCanClicked}
          >
            免費體驗
          </StyledButton>
        </form>
        {inputIsCheckedOk && this.state.showInfo && <p>驗證碼錯誤</p>}
        <button onClick={this.resetNum}>重置驗證碼</button>
        <br />
        {`${this.state.inputList[0]}`}
        {`${this.state.inputList[1]}`}
        {`${this.state.inputList[2]}`}
        {`${this.state.inputList[3]}`}
        {`${this.state.checkList[0]}`}
        {`${this.state.checkList[1]}`}
        {`${this.state.checkList[2]}`}
        {`${this.state.checkList[3]}`}
        <br></br>
        {`${buttonCanClicked}`}
      </div>
    );
  }
}

export default App;
