const KanbanBoardViewStyles = {
    container: {
      backgroundColor: "#FFF3FF", 
      border: "1px solid #B19CD9", 
      borderRadius: "15px",
      padding: 2,
      marginBottom: 2,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
      cursor: "pointer",
      transition: "transform 0.2s, background-color 0.2s",

    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
    },
    headerButton: {
      marginRight: "10px",
    },
    backButton: {
        color: "#4a148c", 
        "&:hover": {
          backgroundColor: "#d1c4e9", 
        },
      },
      addButton: {
        color: "#4a148c", 
        "&:hover": {
          backgroundColor: "#B19CD9", 
        },
        borderRadius: "8px",
      },

    headerTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#4a148c", 
    },
    boardContainer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "5px",
    },
    column: {
        flex: 1,
        margin: "0 8px",
        padding: "5px",
        backgroundColor: "white", 
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
        heigit: "3px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",  
        alignItems: "center", 
        textAlign: "center", 
      },
    columnTitle: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#4a148c",
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      margin: '15px',
    },
    itemBox: {
      backgroundColor: '#f3e8ff',
      border: '1px solid #d3bce9',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
    },
    itemTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#6a0572',
      marginBottom: '5px',
    },
    itemDescription: {
      fontSize: '14px',
      color: '#4a4a4a',
      marginBottom: '10px',
    },
    priority: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    highPriority: {
      color: 'red', 
      fontWeight: 'bold',
    },
    mediumPriority: {
      color: 'orange', 
      fontWeight: 'bold',
    },
    lowPriority: {
      color: 'green', 
      fontWeight: 'bold',
    }
  };

  export default KanbanBoardViewStyles