import { ElementStates } from '../../types/element-states';
import { swap, reverse } from './string';

const testPrevArr = [
    { value: 'a', color: ElementStates.Default },
    { value: 'b', color: ElementStates.Default },
    { value: 'c', color: ElementStates.Default }
];

const testNewArr = [
    { value: 'c', color: ElementStates.Default },
    { value: 'b', color: ElementStates.Default },
    { value: 'a', color: ElementStates.Default }
];

describe('Swap function', () => {
    it("Works properly", () => {
        expect(swap(testPrevArr, 0, 2)).toEqual(testNewArr);
    });
});

const setStringArr = jest.fn();
const setLoader = jest.fn();

describe('String reverse function', () => {
    it("Reverses a string with an even number of characters properly", async () => {
        const string = 'hell';
        const reverseString = 'lleh';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setStringArr, setLoader );
        expect(setStringArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Reverses a string with an odd number of characters properly", async () => {
        const string = 'hello';
        const reverseString = 'olleh';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setStringArr, setLoader);
        expect(setStringArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Reverses a string with one character properly", async () => {
        const string = 'h';
        const reverseString = 'h';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setStringArr, setLoader);
        expect(setStringArr).toHaveBeenLastCalledWith(reverseString.split('').map((value => ({ value, color: ElementStates.Modified }))));
    });

    it("Reverses a empty string properly", async () => {
        const string = '';
        await reverse(string.split('').map((value => ({ value, color: ElementStates.Default }))), setStringArr, setLoader);
        expect(setStringArr).toHaveBeenCalledTimes(0);
    });
});