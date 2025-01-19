const DropdownStyles = {
    button: {
      backgroundColor: "#d1c4e9", 
      color: "#4a148c", 
      "&:hover": {
        backgroundColor: "#b39ddb", 
      },
      borderRadius: "8px",
      fontWeight: "bold",
      padding: "10px 20px",
      width: "200px",
      textTransform: "none",
    },
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: "#ede7f6", 
        borderRadius: "8px",
      },
    },
    menuItem: {
      color: "#4a148c", 
      "&:hover": {
        backgroundColor: "#d1c4e9",
      },
    },
    selectedText: {
      marginTop: "16px",
      color: "#4a148c", 
    },
  };
  
  export default DropdownStyles;