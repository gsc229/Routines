import React from 'react'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GiWeight, GiPathDistance} from 'react-icons/gi'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {BiStopwatch} from 'react-icons/bi'
import {AiOutlineNumber} from 'react-icons/ai'
import {MdPool} from 'react-icons/md'

export const GrabberIcon = () => <BsGrid3X3Gap className='icon grabber-icon' />
export const TargetIcon = () => <FiTarget className='icon target-icon' />
export const CopyIcon = () =>  <FiCopy className='icon copy-icon' />
export const RemoveIcon = () =>  <FiMinusSquare className='icon remove-icon'/>
export const WeightIcon = () => <GiWeight className='icon weight-icon' />
export const DistanceIcon = () => <GiPathDistance className='icon distance-icon' />
export const SpeedIcon = () => <IoSpeedometerOutline className='icon speed-icon' />
export const TimeIcon = () => <BiStopwatch className='icon time-icon' />
export const HashIcon = () => <AiOutlineNumber className='icon hash-icon' />
export const SwimLapsIcon = () => <MdPool className='icon swim-laps-icon' /> 