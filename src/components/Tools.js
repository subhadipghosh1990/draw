import React from "react";

//new doc
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
//resize
import AspectRatioOutlinedIcon from '@material-ui/icons/AspectRatioOutlined';
//delete
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
//text
import TextFormatOutlinedIcon from '@material-ui/icons/TextFormatOutlined';
//image
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
//save
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
//reset
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
//print
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
//drawer
import DragIndicatorOutlinedIcon from '@material-ui/icons/DragIndicatorOutlined';
//shape
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

//circle
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const Tools = (props) => {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


// newDoc={this.state.newDoc}
    return(
        <div className="tools">

            <button className="btn" onClick={props.toggleshowInit}>
                <InsertDriveFileOutlinedIcon/>
            </button>

            {props.artboard.init ? (
                <>             

                <div className="spclPane">
                    <button className="btn" onClick={props.newText}>
                        <TextFormatOutlinedIcon/>
                    </button>

                    <button className="btn" onClick={()=>props.newImg("https://images.unsplash.com/photo-1504270997636-07ddfbd48945?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMzY4Nzl8MHwxfHNlYXJjaHwxNnx8ZGlnaXRhbHx8MHx8fHwxNjIzMDk0ODcz&ixlib=rb-1.2.1&q=85")}>
                        <ImageOutlinedIcon/>
                    </button>


                    <button className="btn">
                        <CheckBoxOutlineBlankOutlinedIcon/>
                    </button>

                    <button className="btn">
                        <FiberManualRecordOutlinedIcon/>
                    </button>
                </div>

                <button className={props.showPanel ? "btn text-info" :"btn"} onClick={props.togglePanel}>
                    <DragIndicatorOutlinedIcon/>
                </button>

                <button className="btn text-danger" onClick={props.deleteElem}>
                    <DeleteForeverOutlinedIcon/>
                </button>

                <button className="btn" onClick={props.save}>
                    <SaveOutlinedIcon/>
                </button>

                <button className="btn" onClick={props.print}>
                    <PrintOutlinedIcon/>
                </button>
                
                </>
            ) : null}         
            
            

            

            {/* <button className="btn" className="" onClick={props.resetAll}><RotateLeftOutlinedIcon/></button> */}
            
        </div>
    )
}

export default Tools;