import React, { useEffect, useState } from 'react';
import {SliderContainer} from "./style";
import 'swiper/swiper-bundle.css'
import Swiper, { Pagination, Autoplay } from 'swiper'

Swiper.use([Pagination, Autoplay])


function Slider(props) {
    const [sliderSwiper,setSliderSwiper] = React.useState(null)
    const {bannerList} = props

    React.useEffect(()=>{
        if(bannerList&&bannerList.length && !sliderSwiper){
            let newSliderSwiper = new Swiper(".slider-container",{
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {el:'.swiper-pagination'},
            })
            setSliderSwiper(newSliderSwiper)
        }
    },[bannerList&&bannerList.length,sliderSwiper])

    return (
        <SliderContainer>
            <div className="before" />
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList&&bannerList.map((slider,index)=>{
                            return (
                                <div className="swiper-slide" key={index}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    )
}

export default React.memo(Slider)
