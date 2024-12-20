import React from 'react'
import ReviewCard from './ReviewCard'
import leftArrow from "../assets/leftArrow.svg"
import rightArrow from "../assets/rightArrow.svg"
import { reviews } from '../utils/dataArrays'

const ReviewSlider = ({ reviews }) => {

  const right_mover = () => {

    let seccionReviews = document.querySelector("#seccionReviews");
    let mobile = (window.innerWidth < 768)

    if (mobile) {
      seccionReviews.scrollLeft += 245;
    }
    else {
      seccionReviews.scrollLeft += 1700;
    }

  }

  const left_mover = () => {
    let seccionReviews = document.querySelector("#seccionReviews");
    let mobile = (window.innerWidth < 768)


    if (mobile) {
      seccionReviews.scrollLeft -= 245;
    }
    else {
      seccionReviews.scrollLeft -= 200;
    }

  }

  return (
    <div className='flex items-center justify-center gap-3 w-full'>
      <button onClick={left_mover} className=''>
        <img src={leftArrow} alt="leftArrow" />
      </button>

      <div id='seccionReviews' className='flex gap-6 overflow-x-auto w-3/4'>

        {
          reviews.map((review,index)=>{
            return <ReviewCard review={review} key={index}/>
          })
        }

      </div>

      <button onClick={right_mover} className='reviewsArrows'>
        <img src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  )
}

export default ReviewSlider