import React, {FC, useState} from 'react';
import Compact from '@uiw/react-color-compact';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {ColorPickerProps} from "../types";

const ColorPicker: FC<ColorPickerProps> = ({title, icon, onChange}) => {
    const [hex, setHex] = useState("#fff");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    console.log(hex);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Tooltip title={title}>
                <IconButton
                    aria-haspopup={anchorEl ? "true" : undefined}
                    aria-controls={anchorEl ? "color-picker" : undefined}
                    onClick={handleClick}
                    size="small"
                >
                    <Badge variant="dot" sx={{
                        "& .MuiBadge-badge": {
                            backgroundColor: hex
                        }
                    }}>
                        {icon}
                    </Badge>
                </IconButton>
            </Tooltip>
            <Popper id="color-picker" open={open} anchorEl={anchorEl} placement="bottom" transition>
                {({TransitionProps}) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper
                                // sx={{
                                //     overflow: 'visible',
                                //     "::before": {
                                //         content: '""',
                                //         position: "absolute",
                                //         top: 7,
                                //         left: "50%",
                                //         bgcolor: "#F6F6F6",
                                //         transform: "translate(-50%) rotate(45deg)",
                                //         width: 10,
                                //         height: 10,
                                //         zIndex: 0,
                                //         borderLeft: `1px solid ${grey[400]}`,
                                //         borderTop: `1px solid ${grey[400]}`,
                                //     },
                                //     boxShadow: 5,
                                //     border: `1px solid ${grey[400]}`,
                                //     mt: 1.5
                                // }}
                            >
                                <Compact
                                    color={hex}
                                    onChange={(color) => {
                                        setHex(color.hex);
                                        onChange(color.hex);
                                        handleClose();
                                    }}
                                />
                            </Paper>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ColorPicker;
