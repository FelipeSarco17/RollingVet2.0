import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewSlider = ({reviews}) => {
  
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
          seccionReviews.scrollLeft -= 1700;
        }
    
      }
  
    return (
    <div className='flex items-center justify-center w-[300px] gap-3'>
          <button onClick={left_mover} className=''>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
            </svg>
          </button>

          <div id='seccionReviews' className='flex xl:w-[1700px] overflow-x-auto scroll-smooth'>

            {
              reviews.map((review, index) => {
                return (
                  <ReviewCard className="" key={`review${index}`} review={review} />
                )

              })
            }
          </div>
          <button onClick={right_mover} className='reviewsArrows'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
  )
}

export default ReviewSlider