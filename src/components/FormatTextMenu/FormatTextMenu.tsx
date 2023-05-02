import React, {FC, MouseEvent, useState} from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import {formatMenuItems} from "src/components/constants";
import MenuItem from "@mui/material/MenuItem";
import {FORMAT_TEXT_COMMAND, TextFormatType} from "lexical";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import TextFormatIcon from '@mui/icons-material/TextFormat';
import {useMediaQuery} from "@mui/material";
import {getMenuButtonStyle} from "src/components/utils";
import {FormatTextMenuProps} from "../types";

const FormatTextMenu: FC<FormatTextMenuProps> = ({hasFormat}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isMdViewport = useMediaQuery('(min-width:960px)');

    const [editor] = useLexicalComposerContext();

    const handleClickIconButton = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "format-text-menu" : undefined}
                onClick={handleClickIconButton}
                size={isMdViewport ? "large" : "small"}
                variant="text"
                color="info"
                sx={getMenuButtonStyle({open, isMdViewport})}
                startIcon={<TextFormatIcon/>}
                endIcon={<KeyboardArrowDownIcon sx={{color: "grey.600"}}/>}
            >
                {isMdViewport ? "Format" : null}
            </Button>
            <Menu
                id="format-text-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {formatMenuItems.map((option, index) => (
                    <MenuItem
                        role="option"
                        key={index}
                        onClick={() => {
                            handleClose();
                            editor.dispatchCommand(FORMAT_TEXT_COMMAND, option.payload)
                        }}
                        selected={hasFormat[option.payload]}
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

export default FormatTextMenu;
