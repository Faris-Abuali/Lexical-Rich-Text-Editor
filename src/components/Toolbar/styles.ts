import makeStyles from "@mui/styles/makeStyles";
import {grey} from "@mui/material/colors";

const useStyles = makeStyles(() => ({
    root: {
        padding: "8px",
        borderBottom: `2px solid ${grey[300]}`,
        overflow: "auto",
    }
}));

export default useStyles;