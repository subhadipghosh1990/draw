import React from "react";
// import {Box} from "react-mops";



import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import Airtable from "airtable";

//tools
import Tools from "./components/Tools";
import Artboard from "./components/Artboard";
import Panel from './components/Panel';


import axios from "axios";

//css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './assets/css/style.css';

import KeyboardEventHandler from 'react-keyboard-event-handler';

class App extends React.Component{

  constructor() {
    super();

    this.state={
      appName : "Draw 2.0",

      elemMove:true,
      elemResize:false,

      artboard:{
        name:"",
        init:false,
        zoom:.55,
        size:{"width":794,"height":1122}
      },
      showInit:false,
      customSize:false,
      showPanel:false,
      deSellectAll:false,

      saveInfo:{
        saved:false,
        id:""
      },

      document:{
        elemList:[]
      },

      selectedElem:0

    }


    this.box = React.createRef();

  }

  componentDidMount(){


    let th = this;

    let base = new Airtable({apiKey:"key0GBc0hIfaEXkGi"}).base("appe06JEGY6wtNIAk");


    if(localStorage.getItem("id")){


      // var all = new FormData();

      var artboard = this.state.artboard;
      var document = this.state.document;
      var saveInfo = this.state.saveInfo;


    base('Arts').find(localStorage.getItem("id"), function(err, record) {
        if (err) { console.error(err); return; }
        console.log('Retrieved', record.fields);

        artboard.name = JSON.parse(record.fields.name);
        document.elemList = JSON.parse(record.fields.des);
        artboard.size = JSON.parse(record.fields.size);
        artboard.init = true;
        saveInfo.saved = true;
        saveInfo.id = JSON.parse(record.fields.id);

        if(document.elemList.length){
          th.setState({
            artboard:artboard,
            document:document,
            saveInfo:saveInfo  
          }, () => {
            th.deselectAll();
          })
        }
        
    });

    

    }
  }

  selectElem = (e) => {
    this.setState({
      selectedElem:e,
      deSellectAll:false
    })
  }


  changeVal = (e, val) => {

    console.log(this.state.selectedElem, val);

    var document = this.state.document;
    //selectedElem

    document.elemList[this.state.selectedElem][e] = val;

    this.setState({
      document:document
    })


  }


  changeValFilter = (e, val) => {


    var document = this.state.document;
    //selectedElem

    document.elemList[this.state.selectedElem].filter[e] = val;

    console.log(document.elemList[this.state.selectedElem].filter);

    this.setState({
      document:document
    })


  }  

  


  newText = () => {

    var document = this.state.document;
    var elem = {
      id:"txt"+document.elemList.length,
      type:"text",

      size:40,
      lineHeight:60, 
      textAlign:"left",
      fontFamily:"Arial",
      color:"#555",
      opacity:"1",
      fontFamily:"",
      width:400,
      height:90,
      text:"Sample Text",
      html:"<p>Sample Text</p>",
      display:"d-block",
      src:"",
      zIndex:document.elemList.length,
      backgroundColor:"none",
      border:"none",
      borderRadius:0,
      position:"translate(0px, 0px)",
      coordinate:{x:200, y:200},
      rotation: {x: 0, y: 0, z: 0},
      top:0,
      left:0,
      filter:{
        blur:0, 
        grayscale:0, 
        brightness:1, 
        contrast:1,
        hueRotate:0,
        sepia:0,
        saturate:1, 
        invert:0
      }
    }

    document.elemList.push(elem);

    this.setState({
      document:document
    }, () => {
      console.log(this.state.document);
    })

  }

  newImg = (e) => {

    var document = this.state.document;
    var elem = {
      id:"img"+document.elemList.length,
      type:"img",
      size:40,
      lineHeight:60, 
      textAlign:"left",
      fontFamily:"Arial",
      color:"#555",
      opacity:"1",
      fontFamily:"",
      width:400,
      height:600,
      text:"",
      display:"d-block",
      src:e,
      zIndex:document.elemList.length,
      backgroundColor:"none",
      border:"none",
      borderRadius:0,
      position:"translate(0px, 0px)",
      coordinate:{x:200, y:200},
      rotation: {x: 0, y: 0, z: 0},
      top:0,
      left:0,
      filter:{
        blur:0, 
        grayscale:0, 
        brightness:1, 
        contrast:1,
        hueRotate:0,
        sepia:0,
        saturate:1, 
        invert:0
      }
    }

    document.elemList.push(elem);

    this.setState({
      document:document
    }, () => {
      console.log(this.state.document);
    })

  }


  toggleshowInit = () => {
    this.setState({
      showInit:!this.state.showInit
    })
  }

  togglecustomSize = () => {
    this.setState({
      customSize:!this.state.customSize
    }, () => {
      console.log(this.state.customSize);
    })
  }

  
  setName = (event) => {
    var artboard = this.state.artboard;
    artboard.name = event.target.value;
    this.setState({
      artboard:artboard
    })
  }


  setSize = (event) => {


    if(event.target.value){
      var styleArr =[
      
        {
          width: 1123,
          height: 1588
        },
        {
          width: 794,
          height: 1122
        },
        {
          width: 560,
          height: 794
        },
        {
          width: 1920,
          height: 1080
        }
      ];
  
  
      var artboard = this.state.artboard;
      artboard.size = styleArr[event.target.value];
      this.setState({
        artboard:artboard
      })
    }
    else{
      var styleArr =[
      
        {
          width: 1123,
          height: 1588
        },
        {
          width: 794,
          height: 1122
        },
        {
          width: 560,
          height: 794
        },
        {
          width: 1920,
          height: 1080
        }
      ];
  
  
      var artboard = this.state.artboard;
      artboard.size = styleArr[1];
      this.setState({
        artboard:artboard
      })
    }

    
  }
  

  initArt = (event) => {
    event.preventDefault();

    var artboard = this.state.artboard;

    artboard.init = true;

    this.setState({
      showInit:false,
      artboard:artboard
    })
  }


  setWidth = (e) => {
    console.log(e);

    var artboard = this.state.artboard;
    artboard.size.width = Number(e);;

    this.setState({
      artboard:artboard
    })

  }

  setHeight = (e) => {
    
    var artboard = this.state.artboard;
    artboard.size.height = Number(e);

    this.setState({
      artboard:artboard
    }, () => {
      console.log(this.state.artboard)
    })
  }

  printableToggle = () => {
    var artboard = this.state.artboard;

    
    if(artboard.zoom === 1){
      artboard.zoom = .5;
    }
    else{
      artboard.zoom = 1;
    }

    this.setState({
      selectedElem:0,
      artboard:artboard
    })
  }


  print = () => {

    var artboard = this.state.artboard;

    artboard.zoom = "1";

    this.setState({
      selectedElem:0,
      artboard:artboard
    })


    var node = document.getElementById('all');

    htmlToImage.toPng(node)
      .then(function (dataUrl) {

        var a = document.createElement("a");
        a.href=dataUrl;
        a.download = "1.png";
        a.click();

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  
  deselectAll = () => {
    this.setState({
      deSellectAll:true,
      showPanel:false,
    })
  }

  togglePanel = () => {
    this.setState({
      showPanel:!this.state.showPanel
    })
  }





  deleteElem=()=>{

    var document = this.state.document;
    var selectedElem = this.state.selectedElem;

    if(selectedElem !=null && document.elemList.length){
      document.elemList[this.state.selectedElem].display = "d-none";
    }
    else{
      alert("no elem selected");
    }

    this.setState({
      document:document
    }, () => {
      console.log(this.state.document.elemList);
    })

  }



   save = () => {

    // var this.state.document.elemList = [];
    //   this.state.document.elemList.map((e)=>{
    //     if(e.display != "d-none" ){

    //       this.state.document.elemList.push(e);

    //     }
    //   });

    let base = new Airtable({apiKey:"key0GBc0hIfaEXkGi"}).base("appe06JEGY6wtNIAk");


    if(localStorage.getItem("id")){

      
      var id = Math.random();    


      base('Arts').update([
        {
          "id": localStorage.getItem("id"),
          "fields": {
            "id": JSON.stringify(id),
            "name": JSON.stringify(this.state.artboard.name),
            "des": JSON.stringify(this.state.document.elemList),
            "size": JSON.stringify(this.state.artboard.size),
            "artid": JSON.stringify("artid"+id)
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        alert("updated");
        // records.forEach(function(record) {
        //   console.log(record.get('size'));
        // });
      });

    }
    else{

      


      var id = Math.random();

      base('Arts').create([
        {
          "fields": {
            "id": JSON.stringify(id),
            "name": JSON.stringify(this.state.artboard.name),
            "des": JSON.stringify(this.state.document.elemList),
            "size": JSON.stringify(this.state.artboard.size),
            "artid": JSON.stringify("artid"+id)
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          alert("saved");
          console.log(record.getId());
          localStorage.setItem("id", record.getId());
        });
      });

    }

 }

 changeZoom = (e) => {
   var artboard = this.state.artboard;

   artboard.zoom = e;
   this.setState({
    artboard:artboard
   })

 }


 reset = () =>{
   localStorage.clear();
 }

 

  render(){
    return(
      <>


        {/* <div>
          <KeyboardEventHandler
            handleKeys={['ctrl+a', 'b', 'c']}
            onKeyEvent={(key, e) => console.log(`do something upon keydown event of ${key}`)} />
        </div> */}


          <KeyboardEventHandler
            handleKeys={['shift+n']}
            onKeyEvent={this.toggleshowInit} 
          />

          <KeyboardEventHandler
            handleKeys={['shift+p']}
            onKeyEvent={this.printableToggle} 
          />

          <KeyboardEventHandler
            handleKeys={['shift+f7']}
            onKeyEvent={this.togglePanel} 
          />


          <KeyboardEventHandler
            handleKeys={['del']}
            onKeyEvent={this.deleteElem} 
          />


        

        

        <div className="outerCover" onClick={this.deselectAll}>

        </div>


        <div className={this.state.showInit ? "initMenu" : "d-none"}>

            <form className="w-100" onSubmit={(event)=> this.initArt(event)}>

              <div className="form-group mb-2">

                <label><small>Name</small></label>
                <input className="form-control" placeholder="name" required onChange={(event) => this.setName(event)} value={this.state.artboard.name}/>

              </div>

              <div className="form-group mb-2">
                <label htmlFor="cstmWid" ><small>Custom Width</small></label> <div className="d-inline-block px-1"></div>
                <input id="cstmWid" type="checkbox" onChange={this.togglecustomSize}/>

              </div>


              {this.state.customSize ? (
                <div className="form-group mb-2 container-fluid">
                  
                  <div className="row">
                    <div className="col-12 p-0">
                    <label><small>Custom Size</small></label>
                      <input type="number" value={this.state.artboard.size.width} className="form-control mb-2" placeholder="width" required onChange={(event) => this.setWidth(event.target.value)} required/>
                      <input type="number" value={this.state.artboard.size.height} className="form-control" placeholder="height" required onChange={(event) => this.setHeight(event.target.value)} required/>
                    </div>
                  </div>

              </div>
              ) : (
                <div className="form-group mb-2">
                <label><small>Sizes</small></label>
                <select className="form-control" required onChange={(event) => this.setSize(event)}>
                    <option>Select Size</option>
                    <option value="0">A3</option>
                    <option value="1">A4</option>
                    <option value="2">A5</option>
                    <option value="3">Web</option>
                </select>

              </div>
              )}
              

              <div className="form-group mb-2">
                
                <button className="btn btn-success">Initialize</button>

              </div>

            </form>

        </div>

        <Tools 
            artboard={this.state.artboard} 
            newText={this.newText} 
            newImg={this.newImg} 
            toggleshowInit={this.toggleshowInit} 
            print={this.print} 
            togglePanel={this.togglePanel} 
            showPanel={this.state.showPanel} 
            deleteElem={this.deleteElem} 
            save={this.save}
        />

        {this.state.artboard.init ? (

          <>
          <div className="outerLayer" style={{"width": this.state.artboard.width/2}}></div>
          <Artboard 
              document={this.state.document} 
              artboard={this.state.artboard} 
              selectElem={this.selectElem} 
              selectedElem={this.state.selectedElem} 
              deselectAll={this.deselectAll} 
              togglePanel={this.togglePanel} 
              changeVal={this.changeVal} 
              deSellectAll={this.state.deSellectAll} 
          />     
          </>   
          

        ) : null}


        <Panel 
          showPanel={this.state.showPanel} 
          elemList={this.state.document.elemList} 
          selectedElem={this.state.selectedElem} 
          changeVal={this.changeVal} 
          changeValFilter={this.changeValFilter}
        />


      {this.state.artboard.init ? (
        <>

        <div className="form-group" style={{zIndex:9999999999, position:"fixed", bottom:"50px", left:"50px"}}>
          <label className="pb-2 d-block text-right">Zoom: <b>{this.state.artboard.zoom}</b></label>
          <input  className="form-control slider"
          value={this.state.artboard.zoom}
          min=".3" 
          max="1" 
          step=".01"
          onChange={(event)=>this.changeZoom(event.target.value)} 
          type="range" 
          width="100%"
          />
        </div>


        <button style={{"zIndex":9999999999, "position":"fixed", "left":"50px", "bottom":"100px"}} className="btn btn-danger" onClick={this.reset}>Reset</button>


        </>
        
        ) : null}
        
      </>
    )
  }


}


export default App;