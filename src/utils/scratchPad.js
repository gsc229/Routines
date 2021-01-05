


/* const itemsFromBackend = [
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
  } */


  const datesArray = [
    {week_number: 1, week_of_year: null, week_start_date: null, year: null, _id: "5fd6eb71b0321644dc6bf08a", created_at: '2021-01-05T06:19:19.952Z'},
    {week_number: 2, week_of_year: null, week_start_date: null, year: null, _id: "5fd6f194c973a448585b0ebd", created_at: '2021-01-05T06:19:19.952Z'},
    {week_number: 3, week_of_year: null, week_start_date: null, year: null, _id: "5ff402a02e36156d904e5d19", created_at: '2021-01-05T06:09:36.299Z'},
    {week_number: 4, week_of_year: null, week_start_date: null, year: null, _id: "5ff402a42e36156d904e5d1a", created_at: '2021-01-05T06:09:40.187Z'},
    {week_number: 5, week_of_year: null, week_start_date: null, year: null, _id: "5ff402a72e36156d904e5d1b", created_at: '2021-01-05T06:09:43.277Z'},
    {week_number: 6, week_of_year: null, week_start_date: null, year: null, _id: "5ff402a92e36156d904e5d1c", created_at: '2021-01-05T06:09:45.686Z'}
]

console.log(new Date(datesArray[0].created_at).getTime(), new Date(datesArray[1].created_at).getTime())
console.log(Date.now())
console.log(Date.now())
/* console.log(datesArray.sort((a, b) => new Date(a.created_at ) - new Date(b.created_at)))
console.log(datesArray[0].created_at - datesArray[5].created_at)
const dates2 = [new Date('01/05/2021'), new Date('01/08/2021'), new Date('01/06/2021'),new Date('01/07/2021')]
console.log(dates2.sort((a, b) => a - b)) */