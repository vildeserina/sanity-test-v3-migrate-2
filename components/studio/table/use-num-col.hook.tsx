import React, {
  FormEvent,
  FormEventHandler,
  forwardRef,
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react"

function numColReducer(state, action) {
  if (action?.type === "input") {
    return {
      ...state,
      [action.name]: action.value,
    }
  }

  if (action?.type === "update_calculation") {
    return {
      ...state,
      calculation: {
        ...state.calculation,
        [action.name]: action.value,
        _type: "calculation",
      },
    }
  }

  if (action?.type === "new_state") {
    return action?.value
  }

  if (action?.type === "reset") {
    return initialState
  }
}

const initialState = {
  suffix: "",
  prefix: "",
  calculation: {
    toBeSummed: false,
    title: "Totalt",
    _type: "calculation",
  },
}

export function useNumCol() {
  const [state, dispatch] = useReducer(numColReducer, initialState)

  const updatePrefix: FormEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: "input",
      name: "prefix",
      value: e?.currentTarget?.value ?? "",
    })
  }

  const updateSuffix: FormEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: "input",
      name: "suffix",
      value: e?.currentTarget?.value ?? "",
    })
  }

  const updateToBeSummed = (toBeSummed: boolean) => {
    dispatch({
      type: "update_calculation",
      name: "toBeSummed",
      value: toBeSummed ?? false,
    })
  }

  const updateSumTitle: FormEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: "update_calculation",
      name: "title",
      value: e?.currentTarget?.value ?? "",
    })
  }

  const resetNumColState = () => {
    dispatch({
      type: "reset",
    })
  }

  const updateState = (currentState) => {
    dispatch({
      type: "new_state",
      value: currentState,
    })
  }

  const numColState = state

  const numColActions = {
    updatePrefix,
    updateSuffix,
    resetNumColState,
    updateToBeSummed,
    updateSumTitle,
    updateState,
  }

  return { numColState, numColActions, resetNumColState }
}
