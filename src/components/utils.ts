import {SxProps, Theme} from "@mui/material";
import {blueGrey} from "@mui/material/colors";

interface IMenuButtonStyle {
    open: boolean;
    isMdViewport: boolean;
}

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