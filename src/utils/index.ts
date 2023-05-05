import {SxProps, Theme} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import {grey} from "@mui/material/colors";
import {IMenuButtonStyle} from "../types";

export const getMenuButtonStyle = ({open, isMdViewport}: IMenuButtonStyle): SxProps => ({
    color: "grey.600",
    p: "5px",
    textTransform: "none",
    ...(open && {
        "& .MuiButton-endIcon": {
            transition: "all 0.2s ease-in-out",
            transform: "rotate(180deg)",
        }
    }),
    // Remove margin from icons when viewport is less than 960px
    ...(!isMdViewport && {
        "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            m: 0,
        }
    }),
});

export const getActiveBtnStyle = (isActive: boolean): SxProps<Theme> => ({
    ...(isActive && {
        color: 'white',
        backgroundColor: blueGrey[900],
        "&:hover": {backgroundColor: blueGrey[900]},
    }),
});

export const getColorPickerPaperStyle = (): SxProps => ({
    overflow: 'visible',
    "::before": {
        content: '""',
        position: "absolute",
        top: 7,
        left: "50%",
        bgcolor: "#F6F6F6",
        transform: "translate(-50%) rotate(45deg)",
        width: 10,
        height: 10,
        zIndex: 0,
        borderLeft: `1px solid ${grey[400]}`,
        borderTop: `1px solid ${grey[400]}`,
    },
    boxShadow: 5,
    border: `1px solid ${grey[400]}`,
    mt: 1.5
});