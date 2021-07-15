import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {DistanceIcon, WeightIcon, TimeIcon, SwimLapsIcon, RepsIcon} from '../../icons/Icons'

const TargetIcons = ({exerciseSet}) => {

  const {target_reps, target_weight, target_time, target_distance, target_laps} = exerciseSet

  const noTargets = !target_reps && !target_weight && !target_time && !target_distance && !target_laps
    
    return(
      <div className="target-icons-container">
        {target_weight > 0 && 

        <OverlayTrigger overlay={<ToolTip>Weight {target_weight}</ToolTip>}>
          <div className='icon-and-number'>
            <WeightIcon />
            <span>{target_weight}</span>
          </div>
        </OverlayTrigger>
        } 
        {target_reps > 0 && 
        <OverlayTrigger overlay={<ToolTip>Reps</ToolTip>}>
          <div className='icon-and-number'>
            <RepsIcon /><span>{target_reps}</span>
          </div>
        </OverlayTrigger>}
        {target_time > 0 && 
        <OverlayTrigger overlay={<ToolTip>Time</ToolTip>}>
          <div className='icon-and-number'>
            <TimeIcon /><span>{target_time}</span>
          </div>
        </OverlayTrigger>
        }
        {target_distance > 0 && 
        <OverlayTrigger overlay={<ToolTip>Distance</ToolTip>}>
          <div className='icon-and-number'>
            <DistanceIcon /><span>{target_distance}</span>
          </div>
        </OverlayTrigger>
        }
        {target_laps > 0 && 
        <OverlayTrigger overlay={<ToolTip>Laps</ToolTip>}>
          <div className='icon-and-number'>
            <SwimLapsIcon /><span>{target_laps}</span>
          </div>
        </OverlayTrigger>
        }
        {noTargets > 0 && 
        <span className='no-targets-span'>
          No targets set
        </span>
        }
      </div>
    )
}

export default TargetIcons
