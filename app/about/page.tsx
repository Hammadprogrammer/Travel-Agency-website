import React from 'react'
import HeaderSection from '@/page-layout/about/almullim/almullim'
import WhoWeAreSection from '@/page-layout/about/WhoWeAreSection/WhoWeAreSection'
import CoreValuesSection from '@/page-layout/about/CoreValuesSection/CoreValuesSection'
import VideoSlider from '@/page-layout/about/video/video'

const page = () => {
  return (
    <div>
<HeaderSection/>
<WhoWeAreSection/>
<VideoSlider/>
<CoreValuesSection/>
    </div>
  )
}

export default page
