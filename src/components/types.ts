import React, {ReactElement} from "react";
import {SvgIconProps} from "@mui/material/SvgIcon";
import {ElementFormatType, TextFormatType} from "lexical";
import {blockTypeToBlockName} from "@r365/constants";

export interface AlignMenuItem {
    name: string;
    icon: ReactElement<SvgIconProps>,
    payload: ElementFormatType
}

export interface FormatTextMenuItem {
    name: string;
    icon: ReactElement<SvgIconProps>,
    payload: TextFormatType
}

export interface ToolbarProps {
    editable: boolean;
}

export interface FormatTextMenuProps {
    hasFormat: Record<TextFormatType, boolean>;
}

export interface ColorPickerProps {
    title: string;
    onChange: (color: string) => void;
    icon?: React.ReactElement<SvgIconProps>;
}

export interface BlockFormatMenuProps {
    blockType: keyof typeof blockTypeToBlockName;
}

export interface PlaceholderProps {
    className?: string;
    children?: React.ReactNode;
}