export const syncWeeksAndSetGroups = (currentWeeks, currentSetGroups, saveWeekChanges, saveManySetGroupChanges) => {

  currentWeeks.forEach(async (week, index) => {
    if(week.week_number !== (index + 1)){

      /* alert(week.week_number + ' !== ' + (index + 1)) */
      const updateWeekResponse = await saveWeekChanges(week._id, {week_number: (index + 1)})

      if(updateWeekResponse.success){
        const saveManySgsResponse = await saveManySetGroupChanges({query: {week: week._id}, changes: {week_number: (index + 1)}})
        console.log({saveManySgsResponse})
      }
    }
  })


}