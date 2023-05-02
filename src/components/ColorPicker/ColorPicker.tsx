import React, {FC, useState} from 'react';
import {CompactPicker} from 'react-color';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {ColorPickerProps} from "../types";

const ColorPicker: FC<ColorPickerProps> = ({title, icon, onChange}) => {
    const [hex, setHex] = useState("#fff");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "color-picker" : undefined}
                onClick={handleClick}
                size="small"
                title={title}
            >
                <Badge variant="dot" sx={{
                    "& .MuiBadge-badge": {
                        backgroundColor: hex
                    }
                }}>
                    {icon}
                </Badge>
            </IconButton>
            <Popper id="color-picker" open={open} anchorEl={anchorEl} placement="bottom" transition>
                {({TransitionProps}) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper
                                // sx={getColorPickerPaperStyle()}
                            >
                                <CompactPicker
                                    color={hex}
                                    onChange={(color) => {
                                        setHex(color.hex);
                                        onChange(color.hex);
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
