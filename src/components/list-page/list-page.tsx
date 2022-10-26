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
  const [addToHeadOperation, setAddtToHeadOperation] = useState<boolean>(false);
  const [addToTailOperation, setAddtToTailOperation] = useState<boolean>(false);
  const [deleteFromtheHeadOperation, setDeleteFromTheHeadOperation] = useState<boolean>(false);
  const [deleteFromtheTailOperation, setDeleteFromtheTailOperation] = useState<boolean>(false);
  const [addByIndexOperation, setAddByIndexOperation] = useState<boolean>(false);
  const [deleteByIndexOperation, setDeleteByIndexOperation] = useState<boolean>(false);
  const [inputValueInd, setInputValueInd] = useState<number>();
  const [buttonName, setbuttonName] = useState<string>('');
  const [circleTempValue, setCircleTempValue] = useState<string>('');

  const list = useMemo(() => new LinkedList<string>([
    getRandomInt(0, 99).toString(),
    getRandomInt(0, 99).toString(),
    getRandomInt(0, 99).toString(),
    getRandomInt(0, 99).toString()
  ]), []);

  type TItem = {
    value: string;
    color: ElementStates;
  };

  const makeArrWithColoreSet = (arr: string[]) => {
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
      setbuttonName('add to head');
      setLoading(true);
      setInputValueInd(0);
      setAddtToHeadOperation(true);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.prepend(inputValue);
      setAddtToHeadOperation(false);
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

  const addIntoTail = async () => {
    if (inputValue && list.getlength() < 6) {
      setbuttonName('add to tail')
      setLoading(true);
      setInputValueInd(list.getlength() - 1);
      setAddtToTailOperation(true);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.append(inputValue);
      setAddtToTailOperation(false);
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

  const deleteFromTheHead = async () => {
    if (list.getlength() > 0) {
      const newArr = makeArrWithColoreSet(list.toArray());
      setCircleTempValue(newArr[0].value);
      setbuttonName('delete from to head');
      setLoading(true);
      setDeleteFromTheHeadOperation(true);
      setInputValueInd(0);
      newArr[0].value = '';
      setArr(newArr);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.deleteHead();
      setDeleteFromTheHeadOperation(false);
      setArr(makeArrWithColoreSet(list.toArray()));
    };
    setLoading(false);
    setbuttonName('');
  };

  const deleteFromTheTail = async () => {
    if (list.getlength() > 0) {
      const newArr = makeArrWithColoreSet(list.toArray());
      setCircleTempValue(newArr[newArr.length - 1].value);
      setbuttonName('delete from to tail');
      setLoading(true);
      setDeleteFromtheTailOperation(true);
      setInputValueInd(list.getlength() - 1);
      newArr[newArr.length - 1].value = '';
      setArr(newArr);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.deleteTail();
      setDeleteFromtheTailOperation(false);
      setArr(makeArrWithColoreSet(list.toArray()));
    };
    setLoading(false);
    setbuttonName('');
  };

  const addByIndex = async () => {
    if (Number(ind) < 5 && list.getlength() < 6) {
      setbuttonName('add by index');
      setLoading(true);
      setAddByIndexOperation(true);
      const newArr = makeArrWithColoreSet(list.toArray());
      for (let i = 0; i <= Number(ind); i++) {
        setInputValueInd(i);
        await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (i < Number(ind)) {
          newArr[i].color = ElementStates.Changing;
          setArr(newArr);
        };
      };
      setAddByIndexOperation(false);
      setInputValueInd(Number(''));
      list.addByIndex(inputValue, Number(ind));
      const finalArr = makeArrWithColoreSet(list.toArray());
      finalArr[Number(ind)].color = ElementStates.Modified;

      setArr(finalArr);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      finalArr[Number(ind)].color = ElementStates.Default;
      setArr(finalArr);
    };
    setLoading(false);
    setInputValue('');
    setInd('');
    setbuttonName('');
  };

  const deleteByIndex = async () => {
    if (Number(ind) < list.getlength() && Number(ind) < 7) {
      setbuttonName('delete by index');
      setLoading(true);
      const newArr = makeArrWithColoreSet(list.toArray());
      for (let i = 0; i <= Number(ind); i++) {
        await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      };
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setCircleTempValue(newArr[Number(ind)].value);
      newArr[Number(ind)].value = '';
      setDeleteByIndexOperation(true);
      newArr[Number(ind)].color = ElementStates.Default;
      setInputValueInd(Number(ind));
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      list.deleteByIndex(Number(ind));
      setArr(makeArrWithColoreSet(list.toArray()));
      setDeleteByIndexOperation(false);
      setLoading(false);
      setbuttonName('');
      setInd('');
    }
  };

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByIndexOperation) {
      return 'head';
    } else if (index === 0 && addByIndexOperation && inputValueInd !== 0) {
      return 'head';
    } else {
      return '';
    };
  };

  const showTail = (index: number) => {
    if (index === arr.length - 1 && !deleteFromtheTailOperation && !deleteByIndexOperation) {
      return 'tail';
    } else if (arr.length === 1) {
      return '';
    } else if (deleteByIndexOperation && index === arr.length - 1) {
      return '';
    } else {
      return '';
    }
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
              disabled={loading ? true : false} />
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в head"
                onClick={addIntoHead}
                isLoader={buttonName === 'add to head' && loading}
                disabled={inputValue === '' || loading ? true : false}
              />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в tail"
                onClick={addIntoTail}
                isLoader={buttonName === 'add to tail' && loading}
                disabled={inputValue === '' || loading ? true : false} />
            </div>
            <div className={listPageStyles.button}  >
              <Button
                text="Удалить из head"
                onClick={deleteFromTheHead}
                isLoader={buttonName === 'delete from to head' && loading}
                disabled={loading ? true : false} />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Удалить из tail"
                onClick={deleteFromTheTail}
                isLoader={buttonName === 'delete from to tail' && loading}
                disabled={loading ? true : false} />
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
              isLoader={buttonName === 'add by index' && loading}
              disabled={!inputValue || !ind || loading ? true : false}
            />
            <Button
              text="Удалить по индексу"
              onClick={deleteByIndex}
              isLoader={buttonName === 'delete by index' && loading}
              disabled={ind === '' || loading ? true : false}
            />
          </section>
        </div>
        <ul className={listPageStyles.circlesBox}>
          {arr.map((item, index) =>
            <li className={listPageStyles.circleCont} key={index}>
              {loading === true && (addToHeadOperation === true || addToTailOperation === true || addByIndexOperation === true) && index === inputValueInd &&
                <div className={listPageStyles.smallCircleTop}>
                  <Circle isSmall letter={inputValue} state={ElementStates.Changing} />
                </div>}
              {loading === true && (deleteFromtheHeadOperation === true || deleteFromtheTailOperation === true || deleteByIndexOperation === true) && index === inputValueInd &&
                <div className={listPageStyles.smallCircleBottom}>
                  <Circle isSmall letter={circleTempValue} state={ElementStates.Changing} />
                </div>}
              {arr.length - 1 !== index &&
                <div className={listPageStyles.arrow}>
                  <ArrowIcon />
                </div>}
              <div className={listPageStyles.bigCircle}>
                <Circle
                  index={index}
                  head={showHead(index)}
                  tail={showTail(index)}
                  letter={item.value}
                  state={item.color}
                />
              </div>
            </li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
