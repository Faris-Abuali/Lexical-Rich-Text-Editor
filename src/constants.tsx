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
import {TextFormatType} from "lexical";
import {AlignMenuItem, FormatTextMenuItem} from "./types";
import {EditorThemeClasses} from "lexical/LexicalEditor";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {LinkNode} from "@lexical/link";
import {ListItemNode, ListNode} from "@lexical/list";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {InitialConfigType} from "@lexical/react/LexicalComposer";
import {LexicalEditor} from "lexical";
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';

export const theme: EditorThemeClasses = {
    blockCursor: 'blockCursor',
    characterLimit: 'characterLimit',
    code: 'code',
    codeHighlight: {
        atrule: 'tokenAttr',
        attr: 'tokenAttr',
        boolean: 'tokenProperty',
        builtin: 'tokenSelector',
        cdata: 'tokenComment',
        char: 'tokenSelector',
        class: 'tokenFunction',
        'class-name': 'tokenFunction',
        comment: 'tokenComment',
        constant: 'tokenProperty',
        deleted: 'tokenProperty',
        doctype: 'tokenComment',
        entity: 'tokenOperator',
        function: 'tokenFunction',
        important: 'tokenVariable',
        inserted: 'tokenSelector',
        keyword: 'tokenAttr',
        namespace: 'tokenVariable',
        number: 'tokenProperty',
        operator: 'tokenOperator',
        prolog: 'tokenComment',
        property: 'tokenProperty',
        punctuation: 'tokenPunctuation',
        regex: 'tokenVariable',
        selector: 'tokenSelector',
        string: 'tokenSelector',
        symbol: 'tokenProperty',
        tag: 'tokenProperty',
        url: 'tokenOperator',
        variable: 'tokenVariable',
    },
    embedBlock: {
        base: 'embedBlock',
        focus: 'embedBlockFocus',
    },
    hashtag: 'hashtag',
    heading: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
    },
    image: 'editor-image',
    indent: 'indent',
    link: 'link',
    list: {
        listitem: 'listItem',
        listitemChecked: 'listItemChecked',
        listitemUnchecked: 'listItemUnchecked',
        nested: {
            listitem: 'nestedListItem',
        },
        olDepth: [
            'ol1',
            'ol2',
            'ol3',
            'ol4',
            'ol5',
        ],
        ul: 'ul',
    },
    ltr: 'ltr',
    mark: 'mark',
    markOverlap: 'markOverlap',
    paragraph: 'paragraph',
    quote: 'quote',
    rtl: 'rtl',
    table: 'table',
    tableAddColumns: 'tableAddColumns',
    tableAddRows: 'tableAddRows',
    tableCell: 'tableCell',
    tableCellActionButton: 'tableCellActionButton',
    tableCellActionButtonContainer:
        'tableCellActionButtonContainer',
    tableCellEditing: 'tableCellEditing',
    tableCellHeader: 'tableCellHeader',
    tableCellPrimarySelected: 'tableCellPrimarySelected',
    tableCellResizer: 'tableCellResizer',
    tableCellSelected: 'tableCellSelected',
    tableCellSortedIndicator: 'tableCellSortedIndicator',
    tableResizeRuler: 'tableCellResizeRuler',
    tableSelected: 'tableSelected',
    text: {
        bold: 'textBold',
        code: 'textCode',
        italic: 'textItalic',
        strikethrough: 'textStrikethrough',
        subscript: 'textSubscript',
        superscript: 'textSuperscript',
        underline: 'textUnderline',
        underlineStrikethrough: 'textUnderlineStrikethrough',
    },
};

export const EDITOR_NODES = [
    CodeNode,
    CodeHighlightNode,
    HeadingNode,
    // AutoLinkNode,
    LinkNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    HorizontalRuleNode,
];

/**
 * Catch any errors that occur during Lexical updates and log them
 * or throw them as needed. If you don't throw them, Lexical will
 * try to recover gracefully without losing user data.
 */
const onError = (error: Error, editor: LexicalEditor): void => {
    console.error(error);
}

export const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    nodes: EDITOR_NODES,
    onError,
    // editable: false,
};

export const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

export const initialHasFormat: Record<TextFormatType, boolean> = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
    code: false,
    highlight: false,
}

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