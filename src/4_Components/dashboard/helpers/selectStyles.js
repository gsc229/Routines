export const customStyles = (routineColor) => {
  return {
  option: (provided, { isDisabled, isFocused, isSelected, data }) => ({
    backgroundColor: isSelected ? routineColor || 'var(--routine-red)' : 'white' ,
    borderBottom: `1px dashed ${routineColor || 'var(--routine-red)'}`,
    color: isSelected ? 'white' : data.selectedColor || 'var(--routine-red)',
    padding: 10,
    fontWeight: 'bold',
    cursor: 'pointer'
  }),
  control: (provided, isFocused) => ({
    ...provided,
    width: '100%',
    color: routineColor || 'var(--routine-red)',
    border: isFocused ? 'var(--russian-green)' : `2px solid ${ routineColor || 'var(--routine-red)'}`
  }),
  multiValue: (styles, {data}) => {
    console.log({styles, data})
    return {
      ...styles,
      backgroundColor: data.selectedColor || 'var(--routine-red)',
      color: 'white'
    }
  },
  multiValueLabel: (styles) => {
    return{
      ...styles,
      color: 'white'
    }
  },
  multiValueRemove: (styles, {data}) => {
    return{
      ...styles,
      backgroundColor: data.selectedColor || 'var(--routine-red)',
      color: 'white',
      borderRadius: 0,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'var(--gold-fusion)',
        color: 'white'
      }
    }
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color: routineColor || 'var(--routine-red)' }
  }
}
}