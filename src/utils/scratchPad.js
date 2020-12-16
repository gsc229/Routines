


const itemsFromBackend = [
  {id: uuid(), content: 'First task'},
  {id: uuid(), content: 'Second task'}
]

const itemsFromBackend2 = [
  {id: uuid(), content: 'Third task'},
  {id: uuid(), content: 'Fourth task'}
]

const columnsFromBackEnd = 
  {
    [uuid()]:{
      id: uuid(),
      name: 'Monday',
      items: itemsFromBackend
    },
    [uuid()]:{
      id: uuid(), 
      name: 'Tuesday',
      items: itemsFromBackend2
    }
  }