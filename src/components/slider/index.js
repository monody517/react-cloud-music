import React, { useEffect, useState } from 'react';
import {SliderContainer} from "./style";
import 'swiper/swiper-bundle.css'
import Swiper, { Pagination, Autoplay } from 'swiper'


function Slider(props) {
    const [sliderSwiper,setSliderSwiper] = React.useState(null)
    const {bannerList} = props

    React.useEffect(()=>{

    })

    return (
        <SliderContainer>
            <div className="before" />
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map(slider=>{
                            return (
                                <div className="swiper-slide" key={slider.imgUrl}>
                                    <div className="slider-nav">
                                        <img src={slider.imgUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination" />
            </div>
        </SliderContainer>
    )
}

export default React.memo(Slider)
