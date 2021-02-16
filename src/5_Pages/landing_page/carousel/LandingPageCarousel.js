import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const LandingPageCarousel = () => {
  return (
    <Carousel>

    <Carousel.Item interval={35000}>
      <img
      
      className="d-block w-100" 
      src='./images/create-exercise-1.gif'
      alt='Create Routine' />
      <Carousel.Caption>
        <h4>Create Exercises</h4>
        <p>
          Make sure you are performing the exercise correctly every time.
          Save an iframe from a YouTube video for your instructions. 
        </p>
      </Carousel.Caption>
    </Carousel.Item>

      <Carousel.Item interval={12000}>
        <img
        className="d-block w-100" 
        src='./images/create-routine-1.gif'
        alt='Create Routine' />
        <Carousel.Caption>
          <h4>Create Routine</h4>
          <p>
            Easily create new routines. Choose the muscle group, 
            intensity and even color code your routine for easy execution.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={30000}>
        <img
        className="d-block w-100" 
        src='./images/create-routine-3.gif'
        alt='Create Routine' />
        <Carousel.Caption>
          <h4>Create Sets and Targets</h4>
          <p>
            Choose a set group type and automatically create multiple sets complete with targets
            such as weight, reps, time, distance or laps. 
            You can even choose to increment or decrement targets across sets.
            Later you'll see how close you came to your goals.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={14000}>
        <img
        
        className="d-block w-100" 
        src='./images/create-routine-2.gif'
        alt='Create Routine' />
        <Carousel.Caption>
          <h4>Manage Schedule</h4>
          <p>
            Drag and drop your set groups wherever you want in your schedule. 
            You can duplicate your set to the same day or another day and week. 
            You can even duplicate entire weeks as well!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={18000}>
        <img
        
        className="d-block w-100" 
        src='./images/execute-routine-1.gif'
        alt='Create Routine' />
        <Carousel.Caption>
          <h4>Log Your Exercises</h4>
          <p>
            Alright. Time for the workout. 
            Cycle through each set and track your progress during your workout. 
            Need a refresher on how to perform the exercise? No problem. Just hit that instruction button!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={25000}>
        <img
        
        className="d-block w-100" 
        src='./images/view-stats-1.gif'
        alt='Create Routine' />
        <Carousel.Caption>
          <h4>View Your Stats</h4>
          <p>
            View your progress over time. See your efforts broken down by muscle group. 
            Checkout weekly totals on your targets and see how you measured up to your goals!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  )
}

export default LandingPageCarousel
