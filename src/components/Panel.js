import React, {useState, useRef, useEffect} from "react";
import $ from "jquery";
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import FormatAlignLeftOutlinedIcon from '@material-ui/icons/FormatAlignLeftOutlined';
import FormatAlignCenterOutlinedIcon from '@material-ui/icons/FormatAlignCenterOutlined';
import FormatAlignRightOutlinedIcon from '@material-ui/icons/FormatAlignRightOutlined';
const Panel = (props) =>{

    

    const [showSearch, setShowSearch] = useState(false);

    const [searchKewrd, searchKewrdSet] = useState("");

    const [searchList,setsearchList] = useState([]);



    let fontHolder = React.useRef();

    const [showFont, setShowFont] = useState(false);

    let fontSelect = () => {

        var ht = fontHolder.current.clientHeight;

        

        if(showFont){
            //fontHolder.current.style.height = ht;
            setShowFont(false);
        }
        else{
            //fontHolder.current.style.height = "0px";
            setShowFont(true);
        }

        $("#fontHolder").slideToggle();


    }

    let setShowSearchToggle = () => {
        if(showSearch){
            setShowSearch(false);
            setsearchList([]);
        }
        else{
            setShowSearch(true);
        }
    }


    let searchSplash = (event) => {
        event.preventDefault();

        var key = "gdOIpIL3tbCHOh9-WmHUQGK6N7qMwQXWGDnOYfdBXI0";

        axios.get("https://api.unsplash.com/search?page=2&query="+searchKewrd+"&client_id="+key)
        .then(e => {
            console.log(e.data);
            setsearchList(e.data.photos.results);
            console.log(searchList);
        })


    }


    // let htmlData = (e) => {
    //     console.log(e);
    //     props.changeVal("html", e);
    // }



    return(

        
        <div className={props.showPanel && props.selectedElem != null ? "panel showPanel": "panel"}>


        <Scrollbars style={{ width: 280, height: "calc(100vh - 50px)" }}>


        {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "text" ? (
            <div className="form-group">
            Size: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .size : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .size : 40} 
                min="0" 
                max="200" 
                step="1"  
                onChange={(event)=> props.changeVal("size", event.target.value)} 
                className="w-100 slider"
                />
            </div>
        ): null}

        {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "text" ? (

            <div className="form-group">
            LineHeight: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .lineHeight : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .lineHeight : "normal"} 
                min="0" 
                max="600" 
                step="1"  
                onChange={(event)=> props.changeVal("lineHeight", event.target.value)} 
                className="w-100 slider"
                />
            </div>

        ): null}


        {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "text" ? (

        <div className="form-group">
        Text Align: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .textAlign : null}
           
            {/* <select className="form-control" onChange={(event)=> props.changeVal("textAlign", event.target.value)} >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option> 
            </select> */}

            <br/>

            <ul className="p-0 m-0 d-flex alignList justify-content-between">
                <li onClick={()=> props.changeVal("textAlign", "left")}><FormatAlignLeftOutlinedIcon/></li>
                <li onClick={()=> props.changeVal("textAlign", "center")} className="mx-2"><FormatAlignCenterOutlinedIcon/></li>
                <li onClick={()=> props.changeVal("textAlign", "right")}><FormatAlignRightOutlinedIcon/></li>
            </ul>

        </div>

        ): null}

            
        {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "text" ? (
            <div className="form-group">
            Color: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .color : null}
                <input 
                type="color" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .color : "#555"}                   
                onChange={(event)=> props.changeVal("color", event.target.value)} 
                className="w-100 form-control" 
                />
            </div>
        ): null}


        {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem].type === "text" ? (
            <div className="form-group my-2">
            
                <ul className="m-0 p-0">
                    <li className="btn btn-success" onClick={fontSelect}>Font-family : {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem].fontFamily : null}</li>
                    <div ref={fontHolder} id="fontHolder" style={{"display":"none"}}>
                        <li onClick={()=> props.changeVal("fontFamily", "Abel")} style={{fontFamily:"Abel"}} value="Abel">Abel</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Anton")} style={{fontFamily:"Anton"}} value="Anton">Anton</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Goblin One")} style={{fontFamily:"Goblin One"}} value="Goblin One">Goblin One</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Indie Flower")} style={{fontFamily:"Indie Flower"}} value="Indie Flower">Indie Flower</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Barlow")} style={{fontFamily:"Barlow"}} value="Barlow">Barlow</li>
                        <li onClick={()=> props.changeVal("fontFamily", "KoHo")} style={{fontFamily:"KoHo"}} value="KoHo">KoHo</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Open Sans")} style={{fontFamily:"Open Sans"}} value="Open Sans">Open Sans</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Nunito Sans")} style={{fontFamily:"Nunito Sans"}} value="Nunito Sans">Nunito Sans</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Lobster")} style={{fontFamily:"Lobster"}} value="Lobster">Lobster</li>
                        <li onClick={()=> props.changeVal("fontFamily", "PT Sans Narrow")} style={{fontFamily:"PT Sans Narrow"}} value="PT Sans Narrow">PT Sans Narrow</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Poppins")} style={{fontFamily:"Poppins"}} value="Poppins">Poppins</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Oswald")} style={{fontFamily:"Oswald"}} value="Oswald">Oswald</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Montserrat")} style={{fontFamily:"Montserrat"}} value="Montserrat">Montserrat</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Pattaya")} style={{fontFamily:"Pattaya"}} value="Pattaya">Pattaya</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Shadows Into")} style={{fontFamily:"Shadows Into"}} value="Shadows Into">Shadows Into</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Quicksand")} style={{fontFamily:"Quicksand"}} value="Quicksand">Quicksand</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Roboto")} style={{fontFamily:"Roboto"}} value="Roboto">Roboto</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Roboto Condensed")} style={{fontFamily:"Roboto Condensed"}} value="Roboto Condensed">Roboto Condensed</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Ubuntu")} style={{fontFamily:"Ubuntu"}} value="Ubuntu">Ubuntu</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Raleway")} style={{fontFamily:"Raleway"}} value="Raleway">Raleway</li>
                        <li onClick={()=> props.changeVal("fontFamily", "PT Sans")} style={{fontFamily:"PT Sans"}} value="PT Sans">PT Sans</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Satisfy")} style={{fontFamily:"Satisfy"}} value="Satisfy">Satisfy</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Caveat")} style={{fontFamily:"Caveat"}} value="Caveat">Caveat</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Londrina Outline")} style={{fontFamily:"Londrina Outline"}} value="Londrina Outline">Londrina Outline</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Monoton")} style={{fontFamily:"Monoton"}} value="Monoton">Monoton</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Great Vibes")} style={{fontFamily:"Great Vibes"}} value="Great Vibes">Great Vibes</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Sacramento")} style={{fontFamily:"Sacramento"}} value="Sacramento">Sacramento</li>
                        <li onClick={()=> props.changeVal("fontFamily", "Dancing Script")} style={{fontFamily:"Dancing Script"}} value="Dancing Script">Dancing Script</li>
                    </div>
                </ul>
            </div>
        ): null}

            <div className="form-group">
            Background-color: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .backgroundColor : null}
                <input 
                type="color" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .backgroundColor : "#555"}                   
                onChange={(event)=> props.changeVal("backgroundColor", event.target.value)} 
                className="w-100 form-control"
                />
            </div>

            <div className="form-group">
                Opacity: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .opacity : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .opacity : "normal"} 
                min="0" 
                max="1" 
                step=".1"  
                onChange={(event)=> props.changeVal("opacity", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            Border-Radius: {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .borderRadius+"%" : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .borderRadius : "normal"} 
                min="0" 
                max="50" 
                step="1"  
                onChange={(event)=> props.changeVal("borderRadius", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            

            {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "text" ? (

            <div className="form-group">
                text

                <CKEditor
                    editor={ ClassicEditor } 
                    config={ {
                            toolbar: [ 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ],
                            heading: {
                                options: [
                                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' }
                                ]
                            }
                    } }
                    data={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem].html : "<p>Sample Text</p>"}
                    onReady={ editor => {
                        const data = editor.getData();
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                        props.changeVal("html", data);
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        //console.log( { data } );
                        props.changeVal("html", data);
                    } }

                    //onChange={(event, editor)=> props.changeVal("text", editor)} 

                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />




            </div>
            ): null}

            {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "img" ? (
                <div className="form-group">
                    src 
                    <input 
                    type="text" 
                    value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .src : ""} 
                    onChange={(event)=> props.changeVal("src", event.target.value)} 
                    className="w-100 form-control"
                    />


                    


                </div>
            ): null}


            {props.elemList.length && props.selectedElem != null && props.elemList[props.selectedElem] .type === "img" ? (
                <div className="form-group mt-2">
                    <button className="btn btn-outline-dark" onClick={setShowSearchToggle}>{showSearch ? "hide":"search"}</button>


                    {showSearch ? (
                        <form onSubmit={(event) => searchSplash(event)}>
                        <input className="form-control mt-2 mb-1" onChange={(event) => searchKewrdSet(event.target.value)} placeholder="search..." />
                        <button className="btn btn-success">Search</button>
                    </form>                    

                    ):null}


                    <ul className="p-0 mt-2 ml-0 searchList">                    

                    {searchList.map((im,imk)=>{
                        return (
                            <li className="w-100">
                                <img src={im.urls.small} className="w-100" onClick={()=> props.changeVal("src", im.urls.regular)} />
                            </li>
                        )
                    })}

                    </ul>
                    

                </div>
            ): null}



            <hr/>

            <div className="form-group">
                blur {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.blur : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.blur : 0} 
                min="0" 
                max="100" 
                step="1"  
                onChange={(event)=> props.changeValFilter("blur", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            brightness {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.brightness : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.brightness : 0} 
                min="0" 
                max="6" 
                step=".01"  
                onChange={(event)=> props.changeValFilter("brightness", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            grayscale {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.grayscale : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.grayscale : 0} 
                min="0" 
                max="1" 
                step=".01"  
                onChange={(event)=> props.changeValFilter("grayscale", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            contrast {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.contrast : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.contrast : 0} 
                min="0" 
                max="1" 
                step=".1"  
                onChange={(event)=> props.changeValFilter("contrast", event.target.value)} 
                className="w-100 slider"
                />
            </div>


            <div className="form-group">
            hueRotate {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.hueRotate : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.hueRotate : 0} 
                min="0" 
                max="360" 
                step="1"  
                onChange={(event)=> props.changeValFilter("hueRotate", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            sepia {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.sepia : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.sepia : 0} 
                min="0" 
                max="1" 
                step=".1"  
                onChange={(event)=> props.changeValFilter("sepia", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            <div className="form-group">
            saturate {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.saturate : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.saturate : 0} 
                min="1" 
                max="100" 
                step="1"  
                onChange={(event)=> props.changeValFilter("saturate", event.target.value)} 
                className="w-100 slider"
                />
            </div>


            <div className="form-group">
            invert {props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.invert : null}
                <input 
                type="range" 
                value={props.elemList.length  ? props.selectedElem != null && props.elemList[props.selectedElem] .filter.invert : 0} 
                min="0" 
                max="1" 
                step=".1"  
                onChange={(event)=> props.changeValFilter("invert", event.target.value)} 
                className="w-100 slider"
                />
            </div>

            
                
        </Scrollbars>


        </div>
                    
    )


}

export default Panel;