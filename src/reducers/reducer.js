import { ACTIONS } from "../actions/action-types";
import evaluate from "../functions/evaluate";

export default function calcReducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOperand: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === "0" && state.currentOperand === "0") return state;
			if (payload.digit === "." && state.currentOperand.includes("."))
				return state;
			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${payload.digit}`,
			};
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.CHOOSE_OPERATION:
			// To check if you choose an operation and no operand has been typed
			if (state.currentOperand == null && state.previousOperand == null)
				return state;
			// To overwrite an operation
			if (state.currentOperand == null) {
				return {
					...state,
					operation: payload.operation,
				};
			}
			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				};
			}
			return {
				...state,
				previousOperand: evaluate(state),
				operation: payload.operation,
				currentOperand: null,
			};
		case ACTIONS.EVALUATE:
			// 1st check if we have all our value states complete, if not return state
			if (
				state.operation == null ||
				state.previousOperand == null ||
				state.currentOperand == null
			) {
				return state;
			}
			return {
				...state,
				overwrite: true,
				previousOperand: null,
				operation: null,
				currentOperand: evaluate(state),
			};
		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				};
			}
			if (state.currentOperand == null) return state;
			if (state.currentOperand.length === 1) {
				return { ...state, currentOperand: null };
			}
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
		default:
			return state;
	}
}
