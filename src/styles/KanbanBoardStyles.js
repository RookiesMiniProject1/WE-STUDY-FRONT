export const kanbanBoardStyles = {
    container: {
        backgroundColor: "#f5f5f5", 
        border: "1px solid #B19CD9", 
        borderRadius: "15px", 
        padding: 2,
        marginBottom: 2,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.2s",
        "&:hover": {
          backgroundColor: "#D8BFD8", 
          transform: "scale(1.02)",
        },
      },
      title: {
        fontWeight: "bold",
        color: "#4a148c", 
        marginBottom: 1,
      },
      description: {
        color: "#6A5ACD", 
        marginBottom: 2,
      },
      button: {
        backgroundColor: "#FF6666",
        "&:hover": {
          backgroundColor: "#FF3333", 
        },
      },
  };
  
