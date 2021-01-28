import React from 'react'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GiWeight, GiPathDistance, GiWeightLiftingDown} from 'react-icons/gi'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {BiStopwatch} from 'react-icons/bi'
import {AiOutlineNumber} from 'react-icons/ai'
import {MdPool} from 'react-icons/md'
import {FaRegHandPointLeft, FaRegHandPointRight, FaRegCalendarAlt} from 'react-icons/fa'

export const GrabberIcon = ({onClick}) => <BsGrid3X3Gap onClick={onClick} className='icon grabber-icon' />
export const TargetIcon = ({onClick}) => <FiTarget onClick={onClick} className='icon target-icon' />
export const CopyIcon = ({onClick}) =>  <FiCopy onClick={onClick} className='icon copy-icon' />
export const RemoveIcon = ({onClick}) =>  <FiMinusSquare onClick={onClick} className='icon remove-icon'/>
export const WeightIcon = ({onClick}) => <GiWeight onClick={onClick} className='icon weight-icon' />
export const DistanceIcon = ({onClick}) => <GiPathDistance onClick={onClick} className='icon distance-icon' />
export const SpeedIcon = ({onClick}) => <IoSpeedometerOutline onClick={onClick} className='icon speed-icon' />
export const TimeIcon = ({onClick}) => <BiStopwatch onClick={onClick} className='icon time-icon' />
export const HashIcon = ({onClick}) => <AiOutlineNumber onClick={onClick} className='icon hash-icon' />
export const SwimLapsIcon = ({onClick}) => <MdPool onClick={onClick} className='icon swim-laps-icon' /> 
export const RepsIcon = ({onClick}) => <GiWeightLiftingDown  onClick={onClick} className='icon reps-icon'/>
export const PointLeftIcon = ({onClick}) => <FaRegHandPointLeft  onClick={onClick} className='icon point-left-icon'/>
export const PointRightIcon= ({onClick}) => <FaRegHandPointRight onClick={onClick} className='icon point-right-icon'/>
export const CalendarIcon = ({onClick}) => <FaRegCalendarAlt  onClick={onClick} className='icon calendar-icon'/>