import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {localWritingCreateSetGroupData, clearCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {clearCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'

const SetTypeExplanation = ({
  type,
  localWritingCreateSetGroupData,
  clearCreateSetGroupData,
  clearCurrentExerciseSets,
  currentStep
}) => {

  const [hide, setHide] = useState(false)

  useEffect(() => {
    if(currentStep === 'choose-type'){
      setHide(false)
    }
  }, [currentStep])

  const typeExplanation = {
    "Manual": "Manually create a set group by adding sets one by one",
    "Straight": "Straight sets means doing exercises in the traditional way. Performing all sets of each exercise one after another with short rests in between. Straight sets are used to apply maximum adaptive response for the trained muscles.",
    "Super": "In super sets you perform exercise sets one immediately after another, only resting the length of time required for taking the position of the next exercise. Super sets are useful because they allow you to do more work in less time. Furthermore, less rest time means higher intensity.",
    "Super - Antagonist": "A superset in which you alternate opposing (antagonist) muscle groups, for example leg curls and leg extension, or biceps curls and triceps extensions", 
    "Super - Compound": "A superset in which you alternate between two exercises for the same muscle group, for example seated dips and triceps extensions", 
    "Super - Tri": "A superset using three exercises for the same muscle group with little rest in between.", 
    "Super - Giant": "A superset with 4 or more exercises of one muscle group", 
    "Circuit": "Circuit sets involve performing all workout exercises in succession, only resting the length of time required for taking the position of the next exercise. Circuits reduce workout time, are great for increasing stamina and physical conditioning and can add variety to your workouts.", 
    "Pyramid": "Pyramid sets start with high reps and lighter weight. Each set radually increasing weight loads while reducing reps. For example do barbell upright rows with 12 reps at 30 kg, and then 10 reps at 35 kg, finally 8 reps at 40 kg.  Pyramid sets allow for gradual increase in intensity and are good warming up your muscles at the begining of a workout.",
    "Drop": "In drop sets you reduce weight lifted after each set when fatigue sets in. For example, you do bench press with 50 kg, and when you fatigue and can’t do any more reps, you reduce weight - usually by 10% - each set until you finish your sets. This strategy increases muscle endurance and allows for more reps to be done while consuming every last bit of muscle strength.",
    "Stripping": "Similar to drop sets, except that spotters reduce the weights for you, completely eliminating rest between sets.",
    "Rest - Pause": "Rest-pause sets allow you to do more reps with the same weight to increase muscle endurance. In this you do a set to failure, rest for about 10 seconds, and then do another set, rest, and so on for a total of 3 to 4 rest-pause cycles. These short rest-pauses help in restoring ATPs in muscles, and partially flushing accumulated lactic acid.",
    "Pre-Exhaustion": "Pre exhaustion is a strategy in which you exhaust the targeted muscle with isolate exercise first, and then perform a compound exercises. Each progressive set incorporates additional muscles to aid the work of the muscle under focus. For example, do lying dumbbell fly (which is a chest isolate exercise) and then perform bench press (which works chest and triceps)."
  }

  const handleTypeChoiceClick = () => {
    clearCurrentExerciseSets()
    clearCreateSetGroupData()
    localWritingCreateSetGroupData('currentStep', 'choose-exercise')
  }

  return (
      <div className='type-explanation-and-use-btn'>

        <div className={`title-and-content ${hide && 'hide'}`}>
          <h3 className='type-title'>
            {type} {type !== "Manual" && 'Set Group'}
          </h3>
          {typeExplanation[type]}
        </div>

        {currentStep !== 'choose-type' && 
        <span 
        className={hide ? 'span-on-hide' : 'span-on-show'} 
        onClick={() => setHide(!hide)}>
          {hide ? 'show description' : 'hide description'}
        </span>}

        {currentStep === "choose-type" &&
        <Button
        disabled={currentStep !== 'choose-type'}
        onClick={handleTypeChoiceClick}
        className='use-set-type-btn'>
          Use {type} Sets
        </Button>}

      </div>
  )
}
const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData,
  clearCurrentExerciseSets,
  clearCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTypeExplanation)
