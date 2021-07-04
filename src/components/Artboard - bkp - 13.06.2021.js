import React, {useState, useEffect, useRef} from "react";
import {Box} from "react-mops";
import { Scrollbars } from 'react-custom-scrollbars-2';
import $ from "jquery";


import Draggable from 'react-draggable';

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

      let posUp = (event, ref) => {
        var ref = $("#"+ref);
        props.changeVal("position", ref[0].style.transform);        
      }


    return(


        <div id="all" className={props.deSellectAll ? "artBoard noSelect" : "artBoard"} style={{"minWidth": props.artboard.size.width, "minHeight": props.artboard.size.height, "transform": "scale("+props.artboard.zoom+")"}}>


                {props.document.elemList.map((e,i)=>{



                    return (


                            e.type === "text" ? (
                                <div className={e.display} key={i}>


                                <Draggable
                                axis="both"
                                handle=".TxtHolder"
                                defaultPosition={{ x: Number(e.position.split(',')[0].replace("translate(", "").replace("px", "")), y: Number(e.position.replace("translate(", "").replace(")", "").split(",").pop().replace(" ", "").replace("px", "")) }}
                                position={null}
                                grid={[1, 1]}
                                scale={1}
                                //onStart={this.handleStart}
                                onDrag={(event) => posUp(event, "drg"+i)}
                                //onStop={this.handleStop}
                                >


                                    <div id={"drg"+i} className={props.selectedElem === i ? "unit selected" : "unit"} onClick={()=> props.selectElem(i)}>
                                        <Box 
                                        isResizable 
                                        size={{ height: e.height, width: e.width }}
                                        scale={1}                                         
                                        onResize={(event) => res(event)}                                         
                                        >

                                            
                                                <div style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor": e.backgroundColor}} className="w-100 h-100 TxtHolder">

                                                    
                                                {/* <p onDoubleClick={props.togglePanel} className={"m-0 p-0 "+e.display} style={{
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
                                                        
                                                        }}
                                                        >
                                                            {e.text}
                                                        </p> */}


                                                <div 
                                                onDoubleClick={props.togglePanel} 
                                                className={"m-0 p-0 "+e.display} 
                                                style={{
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
                                                    
                                                    }}
                                                dangerouslySetInnerHTML={{__html: e.html}}></div>

                                                </div>
                                            
                                        </Box>
                                    </div>
                                    </Draggable>

                                </div>
                            ) : (
                                <div className={e.display} key={i}>

                                <Draggable
                                axis="both"
                                handle=".imgHolder"
                                defaultPosition={{ x: Number(e.position.split(',')[0].replace("translate(", "").replace("px", "")), y: Number(e.position.replace("translate(", "").replace(")", "").split(",").pop().replace(" ", "").replace("px", "")) }}
                                position={null}
                                grid={[1, 1]}
                                scale={1}
                                //onStart={this.handleStart}
                                onDrag={(event) => posUp(event, "drg"+i)}
                                //onStop={this.handleStop}
                                >

                                <div style={{"width":e.width, "height":e.height}} id={"drg"+i} className={props.selectedElem === i ? "unit selected" : "unit"} onClick={()=> props.selectElem(i)}>                               

                                    <Box
                                        isResizable
                                        scale={1}
                                        onResize={(event) => res(event)} 
                                        size={{ height: e.height, width: e.width }}
                                    >
                                        <div onDoubleClick={props.togglePanel} style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor":e.backgroundColor}} className="w-100 h-100 imgHolder">
                                        <img src={e.src} style={{zIndex:e.zIndex, width:"100%", opacity:e.opacity, filter: "blur("+e.filter.blur+"px) grayscale("+e.filter.grayscale+") brightness("+e.filter.brightness+") contrast("+e.filter.contrast+") sepia("+e.filter.sepia+") saturate("+e.filter.saturate+") invert("+e.filter.invert+") hue-rotate("+e.filter.hueRotate+"deg)"}} className={"w-100 h-100 "+e.display} />
                                        </div>
                                            
                                    </Box>
                                </div>

                                </Draggable>
                                </div>
                            )

                            



                            // 
                    )


                })}

                
            
        </div>
        
    
    )
}



export default Artboard;