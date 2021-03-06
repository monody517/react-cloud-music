import React,{forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import BScroll from "better-scroll"
import PropTypes from "prop-types";
import styled from'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props,ref)=>{
    const [bScroll,setBScroll] = useState();
    const scrollContaninerRef = useRef();
    const {direction,click,refresh,bounceTop,bounceBottom} = props;
    const {pullUp,pullDown,onScroll} = props;

    useEffect(()=>{
        const scroll = new BScroll(scrollContaninerRef.current,{
            scrollX:direction === 'horizontal',
            scrollY:direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            },
            mouseWheel: true
        })
        setBScroll(scroll);
        return ()=>{
            setBScroll(null)
        }
    },[])

    useEffect(()=>{
        if(refresh && bScroll){
            bScroll.refresh();
        }
    })

    useEffect (() => {
        if (!bScroll || !onScroll) return;
        bScroll.on ('scroll', (scroll) => {
            onScroll (scroll);
        })
        return () => {
            bScroll.off ('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullUp) return;
        bScroll.on ('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100){
                pullUp ();
            }
        });
        return () => {
            bScroll.off ('scrollEnd');
        }
    }, [pullUp, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDown ();
            }
        });
        return () => {
            bScroll.off ('touchEnd');
        }
    }, [pullDown, bScroll]);

    useEffect (() => {
        if (refresh && bScroll){
            bScroll.refresh ();
        }
    });

    useImperativeHandle (ref, () => ({
        refresh () {
            if (bScroll) {
                bScroll.refresh ();
                bScroll.scrollTo (0, 0);
            }
        },
        getBScroll () {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    );
})


Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
    click: true,// 是否支持点击import BScroll from "better-scroll"
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

export default Scroll;
