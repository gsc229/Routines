export const customStyles = {
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    backgroundColor: isSelected ? 'var(--routine-red)' : 'white' ,
    borderBottom: '1px dashed var(--routine-red)',
    color: isSelected ? 'white' : 'var(--routine-red)',
    padding: 10,
    fontWeight: 'bold',
    cursor: 'pointer'
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    color: 'var(--routine-red)'
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'var(--routine-red)',
      color: 'white'
    }
  },
  multiValueLabel: (styles) => {
    return{
      ...styles,
      color: 'white'
    }
  },
  multiValueRemove: (styles) => {
    return{
      ...styles,
      backgroundColor: 'var(--routine-red)',
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
    return { ...provided, opacity, transition, color: 'var(--routine-red)' }
  }
}