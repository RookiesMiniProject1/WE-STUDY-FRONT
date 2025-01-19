import { purple } from "@mui/material/colors";

const KanbanCreateStyles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  },
  title: {
    color: purple[900],
    marginBottom: 2,
  },
  button: {
    backgroundColor: purple[400],
    color: "#fff",
    "&:hover": {
      backgroundColor: purple[500],
    },
    borderRadius: "8px",
  },
  cancelButton: {
    borderRadius: "8px",
    borderColor: "#FF7272",
    color: "#FF7272",
    "&:hover": {
      backgroundColor: "#FFCECE",
    },
  },
  formControl: {
    marginBottom: 2,
  },
};

export default KanbanCreateStyles;