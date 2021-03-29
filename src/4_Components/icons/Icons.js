import React from 'react'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap, BsEye} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GiWeight, GiPathDistance, GiWeightLiftingDown, GiWeightLiftingUp, GiCheckMark} from 'react-icons/gi'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {BiStopwatch} from 'react-icons/bi'
import {AiOutlineNumber} from 'react-icons/ai'
import {MdPool} from 'react-icons/md'
import {FaRegHandPointLeft, FaRegHandPointRight, FaRegCalendarAlt} from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr'

export const GrabberIcon = ({onClick, styles={}}) => <BsGrid3X3Gap style={styles} onClick={onClick} className='icon grabber-icon' />
export const EyeIcon = ({onClick, styles={}}) => <BsEye style={styles} onClick={onClick} className='icon eye-icon' />
export const TargetIcon = ({onClick, styles={}}) => <FiTarget style={styles} onClick={onClick} className='icon target-icon' />
export const CopyIcon = ({onClick, styles={}}) =>  <FiCopy style={styles} onClick={onClick} className='icon copy-icon' />
export const RemoveIcon = ({onClick, styles={}}) =>  <FiMinusSquare style={styles} onClick={onClick} className='icon remove-icon'/>
export const WeightIcon = ({onClick, styles={}}) => <GiWeight style={styles} onClick={onClick} className='icon weight-icon' />
export const DistanceIcon = ({onClick, styles={}}) => <GiPathDistance style={styles} onClick={onClick} className='icon distance-icon' />
export const SpeedIcon = ({onClick, styles={}}) => <IoSpeedometerOutline style={styles} onClick={onClick} className='icon speed-icon' />
export const TimeIcon = ({onClick, styles={}}) => <BiStopwatch style={styles} onClick={onClick} className='icon time-icon' />
export const HashIcon = ({onClick, styles={}}) => <AiOutlineNumber style={styles} onClick={onClick} className='icon hash-icon' />
export const SwimLapsIcon = ({onClick, styles={}}) => <MdPool style={styles} onClick={onClick} className='icon swim-laps-icon' /> 
export const RepsIcon = ({onClick, styles={}}) => <GiWeightLiftingDown  style={styles} onClick={onClick} className='icon reps-icon'/>
export const WeightLiftUpIcon = ({onClick, styles={}}) => <GiWeightLiftingUp  style={styles} onClick={onClick} className='icon weight-lift-up-icon'/>
export const PointLeftIcon = ({onClick, styles={}}) => <FaRegHandPointLeft  style={styles} onClick={onClick} className='icon point-left-icon'/>
export const PointRightIcon= ({onClick, styles={}}) => <FaRegHandPointRight style={styles} onClick={onClick} className='icon point-right-icon'/>
export const CalendarIcon = ({onClick, styles={}}) => <FaRegCalendarAlt  style={styles} onClick={onClick} className='icon calendar-icon'/>
export const LogOutIcon = ({onClick, styles={}}) => <IoLogOutOutline  style={styles} onClick={onClick} className='icon log-out-icon'/>
export const Check = ({onClick, styles={}}) => <GiCheckMark  style={styles} onClick={onClick} className='icon check-icon'/>
export const CloseX = ({onClick, styles={}}) => <GrClose  style={styles} onClick={onClick} className='icon close-x-icon'/>