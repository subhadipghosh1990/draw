import React, {useState, useEffect, useRef} from "react";
import {Box} from "react-mops";
//import ResizableRect from 'react-resizable-rotatable-draggable'
import Moveable from "react-moveable";

const Artboard = (props) => {


    let res = (event) => {
        //console.log(event);
        props.changeVal("width", event.size.width);
        props.changeVal("height", event.size.height);
        props.changeVal("coordinate", event.position)
      }
    

      let handleChangeClr = (event) =>{
        console.log(event);
      }


    return(

        <>



        <div id="all" className={props.deSellectAll ? "artBoard noSelect" : "artBoard"} style={{"minWidth": props.artboard.size.width, "minHeight": props.artboard.size.height, "transform": "scale("+props.artboard.zoom+")"}}>

                {/* {props.selectedElem} */}


                



                {props.document.elemList.map((e,i)=>{



                    return (


                            e.type === "text" ? (
                                <Box 
                                key={i}
                                isResizable
                                isDraggable 
                                
                                scale={1}
                                position={e.coordinate}
                                size={{ height: e.height, width: e.width }} 
                                onDragEnd={(event)=>props.changeVal("coordinate", event.position)}
                                onDragStart={()=>props.selectElem(i)} 
                                onResize={(event) => res(event)}
                                >

                               

                                    <div style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor": e.backgroundColor}} className="w-100 h-100 TxtHolder">


                                                <div 
                                                onDoubleClick={props.togglePanel} 
                                                className={"m-0 p-2 "+e.display} 
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
                                
                            ) : (
                                <Box 
                                key={i}
                                isResizable
                                isDraggable                                 
                                scale={1}
                                position={e.coordinate}
                                size={{ height: e.height, width: e.width }} 
                                onDragEnd={(event)=>props.changeVal("coordinate", event.position)} 
                                onDragStart={()=>props.selectElem(i)} 
                                onResize={(event) => res(event)}
                                >
                                        {/* <p>{e.src}</p>
                                        <p>{JSON.stringify(e.coordinate)}</p> */}

                                        <div style={{"overflow":"hidden", "borderRadius": e.borderRadius+"%", "backgroundColor":e.backgroundColor}} className="w-100 h-100 imgHolder">
                                            <img onDoubleClick={props.togglePanel} id={e.id} src={e.src} style={{zIndex:e.zIndex, width:"100%", opacity:e.opacity, filter: "blur("+e.filter.blur+"px) grayscale("+e.filter.grayscale+") brightness("+e.filter.brightness+") contrast("+e.filter.contrast+") sepia("+e.filter.sepia+") saturate("+e.filter.saturate+") invert("+e.filter.invert+") hue-rotate("+e.filter.hueRotate+"deg)"}} className={"w-100 h-100 "+e.display} />
                                        </div>

                                </Box>
                            )

                            



                            // 
                    )


                })}

                
            
        </div>
        
        </>
    )
}



export default Artboard;