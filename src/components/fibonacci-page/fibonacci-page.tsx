import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import fibonacciPageStyles from './fibonacci-page.module.css';
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [buttonDisabled, setbuttonDisabled] = useState<boolean>(true);
  const [arrItemFibonacci, setArrItemFibonacci] = useState<Array<number>>();

  const showVisualization = async (inputValue: string) => {
    setLoader(true);
    const arr = getFibonacciNumbers(Number(inputValue));
    for (let i = 0; i < arr.length; i++) {
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setArrItemFibonacci(arr.slice(0, i + 1));
    };
    setLoader(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arrFromInput = e.target.value.split('');

    if (arrFromInput.length > 2 || Number(arrFromInput[0]) === 0) {
      setbuttonDisabled(true);
    } else if (Number(arrFromInput[0]) >= 2 && arrFromInput.length === 2) {
      setbuttonDisabled(true);
    } else {
      setInputValue(e.target.value);
      setbuttonDisabled(false);
      if (e.target.value === '') {
        setbuttonDisabled(true);
      }
    }
  };

  const handleButton = (e: SyntheticEvent) => {
    if (inputValue) showVisualization(inputValue);
  };

  const justifyStyle = arrItemFibonacci && arrItemFibonacci.length < 10 ?
    { justifyContent: 'center' } : { justifyContent: 'flex-start' };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciPageStyles.mainContainer}>
        <div className={fibonacciPageStyles.inputContainer}>
          <div className={fibonacciPageStyles.input}>
            <Input max={19} isLimitText={true} type="number" min={1} onChange={onChange} />
          </div>
          <div className={fibonacciPageStyles.button}>
            <Button text="Рассчитать" onClick={handleButton} disabled={buttonDisabled} isLoader={loader} />
          </div>
        </div>
        {arrItemFibonacci?.length &&
          <ul className={fibonacciPageStyles.circlesBox} style={justifyStyle}>
            {arrItemFibonacci.map((item, i) =>
              <li key={i}>
                <Circle index={i} letter={item.toString()} />
              </li>)}
          </ul>}
      </div>
    </SolutionLayout>
  );
};