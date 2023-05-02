import makeStyles from "@mui/styles/makeStyles";
import {grey} from "@mui/material/colors";

const useStyles = makeStyles(() => ({
    placeholder: {
        position: "absolute",
        top: "67px",
        left: "15px",
        right: "28px",
        fontSize: "15px",
        color: grey[500],
        overflow: "hidden",
        textOverflow: "ellipsis",
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        display: "inline-block",
    }
}));

export default useStyles;