import { ACTIONS } from "./actions/action-types";

export default function OperationButton({ dispatch, operation }) {
	return (
		<button
			onClick={() =>
				dispatch({
					type: ACTIONS.CHOOSE_OPERATION,
					payload: { operation },
				})
			}
		>
			{operation}
		</button>
	);
}
