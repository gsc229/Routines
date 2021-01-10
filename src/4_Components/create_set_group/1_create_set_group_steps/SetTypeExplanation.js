import React, {useState} from 'react'
import {connect} from 'react-redux'
import {writingCreateSetGroupData, clearChosenExercises, clearCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'

const SetTypeExplanation = ({
  type,
  writingCreateSetGroupData,
  clearCreateSetGroupData,
  clearChosenExercises,
  currentStep
}) => {

  const [hide, setHide] = useState(false)

  const typeExplanation = {
    "Manual": "Manually create a set group by adding sets one by one",
    "Straight": "Straight sets means doing exercises in the old fashion way, performing all sets of each exercise one after another with rest in between. This system is used to apply maximum adaptive response for the trained muscles.",
    "Super": "In super sets you perform exercise set immediately after another exercise set, with no rest in between, only that required for taking the position of the second exercise. Super sets allow you to perform more work in less time, they are especially useful if you have short time to spend in training, plus they can be used as a mean to increase training intensity due to less rest time.",
    "Super - Antagonist": "In this set type, you alternate opposing (antagonist) muscle group exercises (such as leg curls and leg extension, or biceps curl and triceps extension for example)", 
    "Super - Compound": "In this type of set you alternate between two exercises for the same muscle group (such as seated dips and triceps extension)", 
    "Super - Tri": "Using this type of sets, you do three exercises for the same muscle group with little rest in between.", 
    "Super - Giant": "If you perform 4 or more exercises of one muscle group this is called giant set.", 
    "Circuit": "Circuit sets involve performing all workout exercises in succession with short rest in between, only that required for taking the new position. Circuits reduce workout time, and are great to increase stamina, muscle strength and muscle conditioning.", 
    "Pyramid": "When doing pyramid sets, you start your body part session with high reps and lighter weight, and then gradually increasing weight loads and reducing reps. (For example you do barbell upright row with 12 reps holding 30 kg, and then doing 10 reps with 35 kg, after those 8 reps 40 kg).  Pyramid sets allow for gradual increase in intensity (difficulty) and warm up of muscles as you go through your workout.",
    "Drop": "In drop sets you reduce weight lifted after each set when fatigue sets in, for example you do bench press with 50 kg, and when you fatigue and can’t do any more reps, you reduce weigh usually by 10% and so on until you finish your sets. This way increases muscle endurance and allows for more reps to be done, while consuming your muscle strength to the last drop.",
    "Stripping": "Similar to drop sets, except that spotters reduce the weights for you, and hence no rest at all between sets.",
    "Rest - Pause": "Rest-pause sets allow you to do more reps with the same weight to increase muscle endurance. In this you do a set to failure, rest for about 10 seconds, and then do another set, rest, and so on for a total of 3 to 4 rest-pause circles. These short rest-pauses help in restoring ATPs in muscles, and partially flushing accumulated lactic acid.",
    "Pre-Exhaustion": "As the name implies; in pre-exhaustion technique you exhaust the targeted muscle with isolate exercise first, and then you perform a compound exercises. Each progressive set incorporates additional muscles to aid the work of the muscle under focus. For example, do lying dumbbell fly (which is a chest isolate exercise) and then perform bench press (which works chest and triceps)."
  }

  const handleTypeClick = () => {
    clearChosenExercises()
    clearCreateSetGroupData()
    writingCreateSetGroupData('currentStep', 'choose-exercise')
  }

  return (
      <div className='type-explanation-and-use-btn'>

        <span className={hide ? 'span-on-hide' : 'span-on-show'} onClick={() => setHide(!hide)}>{hide ? 'show description' : 'hide description'}</span>

        <div className={`title-and-content ${hide && 'hide'}`}>
          <h2>{type} {type !== "Manual" && 'Set Group'}</h2>
          {typeExplanation[type]}
        </div>
        {currentStep === "choose-type" &&
        <Button
        disabled={currentStep !== 'choose-type'}
        onClick={handleTypeClick}
        className='use-set-type-btn'>Use {type} Sets</Button>}
      </div>
  )
}
const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  writingCreateSetGroupData,
  clearChosenExercises,
  clearCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTypeExplanation)
