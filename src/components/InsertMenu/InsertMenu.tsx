import React, {FC, MouseEvent, useState} from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from '@mui/icons-material/Add';
import useInsertMenu from "../../hooks/useInsertMenu";
import {getMenuButtonStyle} from "../../utils";
import {useMediaQuery} from "@mui/material";

const InsertMenu: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isMdViewport = useMediaQuery('(min-width:960px)');

    const handleClickIconButton = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const {insertMenuItems} = useInsertMenu();

    return (
        <>
            <Button
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "insert-more-menu" : undefined}
                onClick={handleClickIconButton}
                size={isMdViewport ? "large" : "small"}
                variant="text"
                color="info"
                sx={getMenuButtonStyle({open, isMdViewport})}
                startIcon={<AddIcon/>}
                endIcon={<KeyboardArrowDownIcon sx={{color: "grey.600"}}/>}
            >
                {isMdViewport ? "Insert" : null}
            </Button>
            <Menu
                id="insert-more-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {insertMenuItems.map((option, index) => (
                    <MenuItem
                        role="option"
                        key={index}
                        onClick={() => {
                            handleClose();
                            option.onClick();
                        }}
                    >
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default InsertMenu;
