const initialState = {
    balance: 10000,
    interestRate: 6.25,
    payment: 175,
    modifier: 5,
};

// Actions
const KEY_SET = 'amortization-calc/KEY_SET';
const KEY_CLEAR = 'amortization-calc/KEY_CLEAR';

// Action Creators
export const setBalance = (balance) => ({
    type: KEY_SET,
    keyName: 'balance',
    keyValue: balance,
});
export const clearBalance = () => ({ type: KEY_CLEAR, keyName: 'balance' });

export const setInterest = (interest) => ({
    type: KEY_SET,
    keyName: 'interestRate',
    keyValue: interest,
});
export const clearInterest = () => ({
    type: KEY_CLEAR,
    keyName: 'interestRate',
});

export const setPayment = (payment) => ({
    type: KEY_SET,
    keyName: 'payment',
    keyValue: payment,
});
export const clearPayment = () => ({ type: KEY_CLEAR, keyName: 'payment' });

export const setModifier = (modifier) => ({
    type: KEY_SET,
    keyName: 'modifier',
    keyValue: modifier,
});
export const clearModifier = () => ({ type: KEY_CLEAR, keyName: 'modifier' });

// Reducer Functions
const setKey = (state, keyName, keyValue) =>
    Object.assign({}, state, { [keyName]: +keyValue });
// ^^ this is a fine hack considering we only take numbers. could be an issue later
const clearKey = (state, keyName) => Object.assign({}, state, { keyName: 0 });

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case KEY_SET:
            return setKey(state, action.keyName, action.keyValue);
        case KEY_CLEAR:
            return clearKey(state, action.keyName);
        default:
            return state;
    }
};
