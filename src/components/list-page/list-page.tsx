import React, { ChangeEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import listPageStyles from './list-page.module.css'
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./classes";
import { getRandomInt } from "../sorting-page/sorting-page";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [ind, setInd] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [addOperation, setAddOperation] = useState<boolean>(false);
  const [deleteOperation, setDeleteOperation] = useState<boolean>(false);
  const [inputValueInd, setInputValueInd] = useState<number>();
  const [buttonName, setbuttonName] = useState<string>('');

  const list = useMemo(() => new LinkedList<number>([
    getRandomInt(0, 99),
    getRandomInt(0, 99),
    getRandomInt(0, 99),
    getRandomInt(0, 99)
  ]), []);

  type TItem = {
    value: number;
    color: ElementStates;
  };

  const makeArrWithColoreSet = (arr: number[]) => {
    return arr.map(item => ({ value: item, color: ElementStates.Default }));
  };

  const [arr, setArr] = useState<TItem[]>(makeArrWithColoreSet(list.toArray()));

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInd(e.target.value);
  };

  const addIntoHead = async () => {
    if (inputValue && list.getlength() < 6) {
      setbuttonName('head')
      setLoading(true);
      setInputValueInd(0);
      setAddOperation(true);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.prepend(Number(inputValue));
      setAddOperation(false);

      const newArr = makeArrWithColoreSet(list.toArray());
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);

      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      newArr[0].color = ElementStates.Default;
      setArr(newArr);

    };
    setInputValue('');
    setLoading(false);
    setbuttonName('')
  };

  const addIntoTail = async() => {
    if (inputValue && list.getlength() < 6) {
      setbuttonName('tail')
      setLoading(true);
      setInputValueInd(list.getlength() - 1);
      setAddOperation(true);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.append(Number(inputValue));
      setAddOperation(false);

      const newArr = makeArrWithColoreSet(list.toArray());
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);

      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    };
    setInputValue('');
    setLoading(false);
    setbuttonName('');
  };

  const deleteFromTheHead = () => {
    if (list.getlength() > 0) {
      list.deleteHead();

    };
  };

  const deleteFromTheTail = () => {
    if (list.getlength() > 0) {
      list.deleteTail();

    };
  };

  const addByIndex = () => {
    if (ind && list.getlength() < 6) {
      list.addByIndex(Number(inputValue), Number(ind));
      setInputValue('');
      setInd('');

    };
  };

  const deleteByIndex = () => {
    if (list.getlength() > 0) {
      list.deleteByIndex(Number(ind));

    };
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listPageStyles.mainContainer}>
        <div className={listPageStyles.controlContainer}>
          <section className={listPageStyles.section}>
            <Input
              placeholder="Введите значение"
              maxLength={4}
              isLimitText={true}
              value={inputValue}
              onChange={onInputChange} 
              disabled={loading ? true : false}/>
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в head"
                onClick={addIntoHead}
                isLoader={buttonName === 'head' && loading} 
                disabled={inputValue === '' || loading ? true : false}
                />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в tail"
                onClick={addIntoTail}
                isLoader={buttonName === 'tail' && loading} 
                disabled={inputValue === '' || loading ? true : false}/>
            </div>
            <div className={listPageStyles.button}  >
              <Button
                text="Удалить из head"
                onClick={deleteFromTheHead}
                disabled={loading ? true : false}/>
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Удалить из tail"
                onClick={deleteFromTheTail}
                disabled={loading ? true : false}/>
            </div>
          </section>
          <section className={listPageStyles.section}>
            <div className={listPageStyles.input}>
              <Input
                placeholder="Введите индекс"
                max={5}
                min='0'
                type="number"
                value={ind}
                onChange={onIndChange}
                disabled={loading ? true : false}
              />
            </div>
            <Button
              text="Добавить по индексу"
              onClick={addByIndex}
              disabled={ind === '' || loading ? true : false}
            />
            <Button
              text="Удалить по индексу"
              onClick={deleteByIndex} 
              disabled={ind === '' || loading ? true : false}
              />
          </section>
        </div>
        <ul className={listPageStyles.circlesBox}>
          {arr.map((item, index) =>
            <li className={listPageStyles.circleCont} key={index}>
              {loading === true && addOperation === true && index === inputValueInd &&
                <div className={listPageStyles.smallCircleTop}>
                  <Circle isSmall letter={inputValue} state={ElementStates.Changing} />
                </div>}
              {loading === true && deleteOperation === true &&
                <div className={listPageStyles.smallCircleBottom}>
                  <Circle isSmall letter={inputValue} />
                </div>}
              {arr.length - 1 !== index &&
                <div className={listPageStyles.arrow}>
                  <ArrowIcon />
                </div>}
              <div className={listPageStyles.bigCircle}>
                <Circle
                  index={index}
                  head={index === 0 && !addOperation ? 'head' : ''}
                  tail={index === arr.length - 1 ? 'tail' : ''}
                  letter={item.value.toString()}
                  state={item.color}
                />
              </div>
            </li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
