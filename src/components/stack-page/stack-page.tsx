import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackPageStyles from './stack-page.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Stack } from "./classes";

type TStackItem = {
  value: string;
  color: ElementStates;
};

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const stack = new Stack<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = async () => {
    if (inputValue) {
      stack.push(inputValue);

      stackArr.push({ value: stack.peek(), color: ElementStates.Changing });
      setInputValue('');

      setStackArr([...stackArr]);

      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      stackArr[stackArr.length - 1].color = ElementStates.Default;
      setStackArr([...stackArr]);
    };
  };

  const handleDeleteButton = async () => {
    if (stackArr.length === 1) {
      setStackArr([]);
    };

    if (stackArr) {
      stackArr[stackArr.length - 1].color = ElementStates.Changing;
      setStackArr([...stackArr]);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      stackArr.pop();
      setStackArr([...stackArr]);
    };
  };

  const handleRemoveAllButton = () => {
    setStackArr([]);
  };

  const givePosition = (index: number, arr: TStackItem[]): string => {
    if (index === arr.length - 1) {
      return 'top';
    } else {
      return '';
    };
  };

  return (
    <SolutionLayout title="Стек">
      <div className={stackPageStyles.mainContainer}>
        <div className={stackPageStyles.inputContainer}>
          <section className={stackPageStyles.inputSection}>
            <div className={stackPageStyles.input}>
              <Input maxLength={4} isLimitText={true} type="text" value={inputValue} onChange={onChange} />
            </div>
            <div className={stackPageStyles.addButton}>
              <Button text="Добавить" type='submit' onClick={handleAddButton} disabled={inputValue === ''} />
            </div>
            <div className={stackPageStyles.deleteButton}>
              <Button text="Удалить" type='submit' onClick={handleDeleteButton} disabled={!stackArr.length} />
            </div>
          </section>
          <div className={stackPageStyles.button}>
            <Button text="Очистить" type='submit' onClick={handleRemoveAllButton} disabled={!stackArr.length} />
          </div>
        </div>
        <ul className={stackPageStyles.circlesBox} >
          {stackArr && stackArr.map((item, index) =>
            <li key={index}>
              <Circle letter={item.value} state={item.color} index={index} head={givePosition(index, stackArr)} />
            </li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
