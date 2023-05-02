import React from "react";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import CodeIcon from '@mui/icons-material/Code';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import {AlignMenuItem, FormatTextMenuItem} from "./types";

export const alignMenuItems: AlignMenuItem[] = [
    {
        name: "Left Align",
        icon: <AlignHorizontalLeftIcon />,
        payload: "left",
    },
    {
        name: "Center Align",
        icon: <FormatAlignCenterIcon />,
        payload: "center",
    },
    {
        name: "Right Align",
        icon: <AlignHorizontalRightIcon />,
        payload: "right",
    },
    {
        name: "Justify Align",
        icon: <FormatAlignJustifyIcon />,
        payload: "justify",
    }
];

export const formatMenuItems: FormatTextMenuItem[] = [
    {
        name: "Bold",
        icon: <FormatBoldIcon />,
        payload: "bold",
    },
    {
        name: "Italic",
        icon: <FormatItalicIcon />,
        payload: "italic",
    },
    {
        name: "Strikethrough",
        icon: <StrikethroughSIcon />,
        payload: "strikethrough",
    },
    {
        name: "Underline",
        icon: <FormatUnderlinedIcon />,
        payload: "underline",
    },
    {
        name: "Code",
        icon: <CodeIcon />,
        payload: "code",
    },
    {
        name: "Highlight",
        icon: <BorderColorIcon />,
        payload: "highlight",
    },
    {
        name: "Subscript",
        icon: <SubscriptIcon />,
        payload: "subscript",
    },
    {
        name: "Superscript",
        icon: <SuperscriptIcon />,
        payload: "superscript",
    }
];