const taskButtonStyle = {
    width:'100px',
    height:'34px',
    border:'none',
    borderRadius:'4px',
    fontSize:'20px',
    color:'white'
}

//sort button styling
const formStyling = {
    minWidth: 160,
    width:'100%',
    height: '40px',
    background: 'rgba(245,245,245,.2)',
    border: "solid 1px #77777721",
    boxShadow: "-2px 2px 4px -2px rgba(0,0,0,0.1)",
    "&.MuiFormControl-root":{
        borderRadius: '4px',
    },
    '.MuiOutlinedInput-notchedOutline':{
        border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline':{
        border: 'none'
    },
    '.MuiInputBase-root':{
        height: "100%",
        color:"rgba(87, 87, 87, 0.87)",
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontWeight: 600,
    },
    '.MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
        border: 'none'
    },
}
const labelStyling = {
    width:"100%",
    height:'100%',
    display:'flex',
    justifyContent:'center',
    fontSize:'14px',
    fontWeight: 600,
    "&.MuiFormLabel-filled":{
        opacity: 0,
    },
}
const selectStyling = {
    ".MuiSelect-select": {
        minHeight: 0,
        height: '32px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        border: 'solid 1px transparent',
        '&.MuiOutlinedInput-input':{
            padding:0,
        },
    }
}
const menuItemStyling = {
    '&.MuiMenuItem-root':{
        minWidth:'100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize:'14px',
        color:'rgba(87, 87, 87, 0.87)'
    }
}

export {
    taskButtonStyle,
    formStyling,
    labelStyling,
    selectStyling,
    menuItemStyling
}