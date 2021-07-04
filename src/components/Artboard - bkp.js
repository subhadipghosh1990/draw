import React, {useState, useEffect, useRef} from "react";
import {Box} from "react-mops";
import { Scrollbars } from 'react-custom-scrollbars-2';
import $ from "jquery";

const Artboard = (props) => {



    let res = (event) => {
        //console.log("width: "+this.box.current.style.width+ " height :"+this.box.current.style.height);
        props.changeVal("width", event.size.width);
        props.changeVal("height", event.size.height);
      }
    
      let dragPos = (event) => {
        //position
        //console.log(this.box.current.style.transform);
        props.changeVal("top", event.position.x);
        props.changeVal("left", event.position.y);
        
        
      }


    return(


        <div id="all" className={props.deSellectAll ? "artBoard noSelect" : "artBoard"} style={{"width": props.artboard.size.width, "height": props.artboard.size.height, "transform": "scale("+props.artboard.zoom+")"}}>


                {props.document.elemList.map((e,i)=>{



                    return (


                            e.type === "text" ? (
                                <div className={e.display} key={i}>

                                    <div className={props.selectedElem === i ? "unit selected" : "unit"} onClick={()=> props.selectElem(i)}>
                                        <Box isResizable isDraggable scale={1} position={{ x: e.top, y: e.left }}
                                            onResize={(event) => res(event)} onDrag={(event)=>dragPos(event)}
                                        >

                                            
                                                <div style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor": e.backgroundColor}} className="w-100 h-100">
                                                <p onDoubleClick={props.togglePanel} className={"m-0 p-0 "+e.display} style={{
                                                        color:e.color, 
                                                        fontSize:e.size+"px", 
                                                        opacity:e.opacity,
                                                        width:e.width, 
                                                        height:e.height, 
                                                        textAlign:e.textAlign, 
                                                        lineHeight: e.lineHeight+"px",
                                                        fontFamily:e.fontFamily, 
                                                        zIndex:e.zIndex, 
                                                        backgroundColor:e.backgroundColor, 
                                                        border:e.border , //hue-rotate("+e.filter.hueRotate+"deg)  saturate(+"e.filter.saturate"+)
                                                        filter: "blur("+e.filter.blur+"px) grayscale("+e.filter.grayscale+") brightness("+e.filter.brightness+") invert("+e.filter.invert+") contrast("+e.filter.contrast+") sepia("+e.filter.sepia+") saturate("+e.filter.saturate+") hue-rotate("+e.filter.hueRotate+"deg)"
                                                        
                                                        }}>{e.text}</p>
                                                </div>
                                            
                                        </Box>
                                    </div>

                                </div>
                            ) : (
                                <div className={e.display} key={i}>
                                <div className={props.selectedElem === i ? "unit selected" : "unit"} onClick={()=> props.selectElem(i)}>
                                    <Box
                                        isResizable
                                        isRotatable
                                        isDraggable
                                        scale={1}
                                        position={{ x: e.top, y: e.left }}
                                        size={{ height: e.height, width: e.width }}
                                        onResize={(event) => res(event)} onDrag={(event)=>dragPos(event)}
                                    >
                                        <div style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor":e.backgroundColor}} className="w-100 h-100">
                                        <img onDoubleClick={props.togglePanel} id={e.id} src={e.src} style={{zIndex:e.zIndex, width:"100%", opacity:e.opacity, filter: "blur("+e.filter.blur+"px) grayscale("+e.filter.grayscale+") brightness("+e.filter.brightness+") contrast("+e.filter.contrast+") sepia("+e.filter.sepia+") saturate("+e.filter.saturate+") invert("+e.filter.invert+") hue-rotate("+e.filter.hueRotate+"deg)"}} className={"w-100 h-100 "+e.display} />
                                        </div>
                                            
                                    </Box>
                                </div>
                                </div>
                            )

                            



                            // 
                    )


                })}

                
            
        </div>
        
    
    )
}



export default Artboard;