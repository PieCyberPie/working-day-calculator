import { Form, Alert } from "react-bootstrap";
import "../src/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import cn from "classnames";
import { useState } from "react";

const PERIOD = 365;

const userInput = document.getElementsByClassName("submit");
let userInputLength = 0;

function App() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(true);

  function WarningMessage() {
    if (showWarningMessage) {
      return (
        <Alert
          className="warning mb-3"
          variant="info"
          onClose={() => setShowWarningMessage(false)}
          dismissible
        >
          <Alert.Heading>Be careful!</Alert.Heading>
          <p>
            The format should be in <b>x/y</b> format, everything after second{" "}
            <b>/</b> will be dismised, also letters and special signs are
            forbidden!
          </p>
        </Alert>
      );
    }
  }

  const calculate = (userInputString) => {
    const shiftTitle = document.querySelector(
      ".shift-off-container__title-shift"
    );
    const offTitle = document.querySelector(".shift-off-container__title-off");
    const shiftValue = document.querySelector(
      ".shift-off-container__value-shift"
    );
    const offValue = document.querySelector(".shift-off-container__value-off");

    let [shiftCount, offCount] = userInputString.split("/");
    [shiftCount, offCount] = [parseInt(shiftCount), parseInt(offCount)];
    let [shiftNumber, offNumber, shiftAndOffCount] = [
      0,
      0,
      shiftCount + offCount,
    ];

    console.log(`${shiftCount} ${offCount} ${shiftAndOffCount}`);
    const fullPeriod = Math.floor(PERIOD / shiftAndOffCount);
    const leftover = PERIOD - (shiftCount * fullPeriod + offCount * fullPeriod);

    console.log(`${leftover} ${fullPeriod}`);
    for (let i = 0; i < leftover; i++) {
      if (i < shiftCount) {
        shiftNumber++;
      } else {
        offNumber++;
      }
    }

    if (
      shiftCount === 0 ||
      shiftCount === "" ||
      isNaN(shiftCount) ||
      offCount === 0 ||
      offCount === "" ||
      offCount === undefined ||
      isNaN(offCount)
    ) {
      setShowWarningMessage(true);

      shiftTitle.innerHTML = "";
      offTitle.innerHTML = "";
      shiftValue.innerHTML = "";
      offValue.innerHTML = "";
    } else {
      setShowWarningMessage(false);

      shiftTitle.innerHTML = "Shifts";
      offTitle.innerHTML = "Offs";
      shiftValue.innerHTML = shiftCount * fullPeriod + shiftNumber;
      offValue.innerHTML = offCount * fullPeriod + offNumber;
    }
  };
  return (
    <>
      <div className="page-container d-flex flex-column justify-content-between">
        <div>
          <header className="header">
            <h1 className="title d-flex pt-3 pt-lg-5 justify-content-center text-center text-nowrap">
              Simple shift/off calculator
            </h1>
          </header>
          <Form className="FormInput d-flex justify-content-center">
            <Form.Group className="form-container d-flex flex-column align-items-center">
              <Form.Label className="my-2 text-center my-lg-4 d-flex flex-column align-items-center">
                Your input
                <textarea
                  type="text"
                  className={cn({
                    "my-2": true,
                    "text-center": true,
                    submit: true,
                    "submit--empty": isEmpty,
                    "submit--valid": isValid,
                    "submit--invalid": isInvalid,
                  })}
                  placeholder="5/2, 3/1, etc..."
                  rows="1"
                  cols="16"
                  maxLength="5"
                  minLength="3"
                  wrap="off"
                  autoFocus
                  onKeyDown={(key) => {
                    if (key) {
                      if (key.keyCode === 13) {
                        key.preventDefault();
                        return calculate(userInput[0].value);
                      }
                    }
                  }}
                  onKeyUp={() => {
                    userInputLength = userInput[0].value.length;
                    if (userInputLength === 0) {
                      setIsEmpty(true);
                      setIsInvalid(false);
                      setIsValid(false);
                    } else if (userInputLength === 1 || userInputLength === 2) {
                      setIsEmpty(false);
                      setIsInvalid(true);
                      setIsValid(false);
                    } else {
                      setIsEmpty(false);
                      setIsInvalid(false);
                      setIsValid(true);
                    }
                  }}
                />
                <Form.Text className="text-muted mx-4">
                  You have to write down in <b> x/y</b> format, where <b>x</b>{" "}
                  is shift and <b>y</b> is off
                </Form.Text>
              </Form.Label>
              <button
                type="button"
                className="calculate mb-5"
                onClick={() => {
                  calculate(userInput[0].value);
                }}
              >
                Calculate
              </button>
            </Form.Group>
          </Form>
          <div className="shift-off-container d-flex flex-column">
            <div className="shift-off-container__titles d-flex flex-row justify-content-evenly">
              <p
                className={cn({
                  "shift-off-container__title-shift": true,
                  "shift-off-container__title": true,
                  "text-center": true,
                  "custom-stylization": !showWarningMessage,
                })}
              ></p>
              <p
                className={cn({
                  "shift-off-container__title-off": true,
                  "shift-off-container__title": true,
                  "text-center": true,
                  "custom-stylization": !showWarningMessage,
                })}
              ></p>
            </div>
            <div className="shift-off-container__values d-flex flex-row justify-content-evenly">
              <p
                className={cn({
                  "shift-off-container__value-shift": true,
                  "shift-off-container__value": true,
                  "text-center": true,
                  "custom-stylization": !showWarningMessage,
                })}
              ></p>
              <p
                className={cn({
                  "shift-off-container__value-off": true,
                  "shift-off-container__value": true,
                  "text-center": true,
                  "custom-stylization": !showWarningMessage,
                })}
              ></p>
            </div>
          </div>
        </div>
        <div>
          <div className="warning-container d-flex justify-content-center">
            {WarningMessage()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
