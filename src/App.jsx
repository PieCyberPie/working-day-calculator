import { Form, Alert } from "react-bootstrap";
import "../src/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import cn from "classnames";
import { useState } from "react";

let period = 365;

const userInput = document.getElementsByClassName("submit");
const periodInput = document.getElementsByClassName("custom-period-field");
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
          onClose={() => {
            const shiftTitle = document.querySelector(
              ".shift-off-container__title-shift"
            );
            const offTitle = document.querySelector(
              ".shift-off-container__title-off"
            );
            const shiftValue = document.querySelector(
              ".shift-off-container__value-shift"
            );
            const offValue = document.querySelector(
              ".shift-off-container__value-off"
            );
            setShowWarningMessage(false);
            shiftTitle.innerHTML = "Shifts";
            offTitle.innerHTML = "Offs";
            shiftValue.innerHTML = 0;
            offValue.innerHTML = 0;
          }}
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

    const fullPeriod = Math.floor(period / shiftAndOffCount);
    const leftover = period - (shiftCount * fullPeriod + offCount * fullPeriod);

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
            <h1 className="title d-flex pt-3 pt-lg-5 my-0 justify-content-center text-center text-nowrap">
              Simple shift/off calculator
            </h1>
          </header>
          <Form className="FormInput d-flex justify-content-center">
            <Form.Group className="form-container d-flex flex-column align-items-center">
              <Form.Label className="my-3 text-center my-lg-5 d-flex flex-column align-items-center">
                Your input
                <div className="d-flex flex-column align-items-center">
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
                      } else if (
                        userInputLength === 1 ||
                        userInputLength === 2
                      ) {
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
                  <textarea
                    type="text"
                    className={cn({
                      "my-2": true,
                      "text-center": true,
                      "custom-period-field": true,
                    })}
                    placeholder="Change period here, 365 is by default"
                    rows="1"
                    cols="38"
                    maxLength="10"
                    minLength="1"
                    wrap="off"
                    onKeyDown={(key) => {
                      if (key) {
                        if (key.keyCode === 13) {
                          key.preventDefault();
                        }
                        return calculate(userInput[0].value);
                      }
                    }}
                    onKeyUp={() => {
                      const customPeriod = parseInt(periodInput[0].value);
                      if (!isNaN(customPeriod)) {
                        period = customPeriod;
                      } else {
                        period = 365;
                      }
                    }}
                  />
                </div>
                <Form.Text className="text-muted mx-4">
                  You have to write down in <b> x/y</b> format, where <b>x</b>{" "}
                  is shift and <b>y</b> is off.
                  <br />
                  When changing period, you don&apos;t need to submit it, just
                  type it in and it will automatically change, only integers are
                  permitted, period should start from number, or it will take an
                  default (365) value.
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
