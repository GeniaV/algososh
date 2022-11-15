import { selectionSortAscending, selectionSortDescending, bubbleSortAscending, bubbleSortDescending } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const arrayWithOneElement = [{ value: 1, color: ElementStates.Default }];

const arrayWithSomeElements = [
  { value: 0, color: ElementStates.Modified },
  { value: 22, color:ElementStates.Modified },
  { value: 3, color:ElementStates.Modified },
  { value: 8, color:ElementStates.Modified },
  { value: 6, color:ElementStates.Modified }
];

const resultArrayWithSomeElementsAscending = [
    { value: 0, color: ElementStates.Modified },
    { value: 3, color:ElementStates.Modified },
    { value: 6, color:ElementStates.Modified },
    { value: 8, color:ElementStates.Modified },
    { value: 22, color:ElementStates.Modified }
];

const resultArrayWithSomeElementsDescending = [
    { value: 22, color: ElementStates.Modified },
    { value: 8, color:ElementStates.Modified },
    { value: 6, color:ElementStates.Modified },
    { value: 3, color:ElementStates.Modified },
    { value: 0, color:ElementStates.Modified }
];

const setArray = jest.fn();
const setLoader = jest.fn();

jest.setTimeout(30000);

describe("Select sort Ascending algorithm", () => {
  it("Works properly with empty array", async() => {
    await selectionSortAscending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with one element", async() => {
    await selectionSortAscending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with some elements", async() => {
    await selectionSortAscending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithSomeElementsAscending);
  });
});

describe("Select sort Descending algorithm", () => {
  it("Works properly with empty array", async() => {
    await selectionSortDescending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with one element", async() => {
    await selectionSortDescending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with some elements", async() => {
    await selectionSortDescending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithSomeElementsDescending);
  });
});

describe("Bubble sort Ascending algorithm", () => {
  it("Works properly with empty array", async() => {
    await bubbleSortAscending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with one element", async() => {
    await bubbleSortAscending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with some elements", async() => {
    await bubbleSortAscending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithSomeElementsAscending);
  });
});

describe("Buble sort Descending algorithm", () => {
  it("Works properly with empty array", async() => {
    await bubbleSortDescending([], setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with one element", async() => {
    await bubbleSortDescending(arrayWithOneElement, setArray, setLoader);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("Works properly with some elements", async() => {
    await bubbleSortDescending(arrayWithSomeElements, setArray, setLoader);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithSomeElementsDescending);
  });
});
