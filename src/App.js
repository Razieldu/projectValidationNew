import { Component } from "react";
import styled from "styled-components";
import "./App.css";

const NumberDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
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
  font-size: 30px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => {
    let inputIsOk = props.inputIsFull; //四個input都已經輸入
    let buttonIsClicked = props.buttonClicked;//按鈕是否被點擊
    if (!inputIsOk && !buttonIsClicked) {
      return "transparent";
    } else if (inputIsOk && buttonIsClicked) {
      return "blue";
    } else if (inputIsOk && !buttonIsClicked) {
      return "red";
    }
  }};
  padding:10px 30px;
  border-radius:20px;
  border: 3px solid ;
  font-size:20px;
  color:grey

`;

const numGenerator = () => {  ///生成四個隨機數字的陣列
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
      validationList: [], ///驗證碼陣列
      inputList: [],   ///input輸入的陣列
      checkList: [],   ///上面兩陣列進行比對,一樣為true,不一樣為false
      buttonClicked: false, 
      wrongInfoWindow: false, ///控制驗證碼錯誤提示是否出現
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
  componentDidUpdate() {}
  resetNum = () => {  ///重新生成驗證碼
    this.setState((prev) => {
      return {
        validationList: numGenerator(),
        inputList: [],
        checkList: [],
        buttonClicked: false,
        wrongInfoWindow:false
      };
    });
  };
  inputChangeAndCheck = (index, event) => { ///監控input輸入數字並與驗證碼進行比對
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
        inputList: tempInput,
        checkList: tempCheck,
      };
    });
  };

  submitHandler = (event) => { ///表單提交
    event.preventDefault();
    if (this.state.inputList.length !== 4) return;
    this.setState((prev) => {
      return { ...prev,  wrongInfoWindow: true, buttonClicked: true };
    });
    if (this.state.checkList.every((each) => each === true)) {
      setTimeout(() => {
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
    let buttonCanClicked = this.state.checkList.length === 4; ///確認四個input都有輸入
    let inputStatusCheck =
      buttonCanClicked && this.state.checkList.some((each) => each === false); ///四個input都有輸入,並驗證是否有其一為false
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
          <p>如果驗證碼不清晰,&nbsp;&nbsp;&nbsp;&nbsp;請點擊<span onClick={this.resetNum} style={{cursor: "pointer", color: "blue", fontSize: "30px",}}>這裡</span>更新</p>
          <StyledButton
            onClick={this.buttonClickHandler}
            inputIsFull={buttonCanClicked} ///確認四個input都有輸入
            buttonClicked={this.state.buttonClicked}
            disabled={!buttonCanClicked}
          >
           免費試玩
          </StyledButton>
        </form>
        <a href="https://www.google.com/" style={{textDecoration:"none"}}  target="new">商務聯繫 > ></a>
        {inputStatusCheck && this.state.wrongInfoWindow && <p>驗證碼錯誤</p>}
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
