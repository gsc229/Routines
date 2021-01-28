export const selectStyles = {
  option: (styles, {isSelected }) => {
    return{
      ...styles,
      color: isSelected
      ? 'red'
      : 'black'

    }
  }
}

