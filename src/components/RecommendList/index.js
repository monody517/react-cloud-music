import React from "react";
import {
    ListWrapper,
    ListItem,
    List
} from './style';
import {getCount} from "../../api/utils";

function RecommendList (props){
    return(
        <ListWrapper>
            <h1 className="title">推荐歌单</h1>
            <list>
                {
                    props.recommendList&&props.recommendList.map((item,index)=>{
                        return (
                            <ListItem key={item.id}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{Math.floor(item.playCount/10000)}万</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </list>
        </ListWrapper>
    )
}

export default React.memo(RecommendList)
