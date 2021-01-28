export const selectStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return{
      ...styles,
      color: isSelected
      ? 'red'
      : 'black'

    }
  }
}

