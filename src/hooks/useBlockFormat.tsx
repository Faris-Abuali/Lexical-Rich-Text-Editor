import {ReactElement} from "react";
import {$createParagraphNode, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection} from "lexical";
import {$setBlocksType_experimental} from "@lexical/selection";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {
    $createHeadingNode,
    $createQuoteNode,
    HeadingTagType,
} from '@lexical/rich-text';
import {blockTypeToBlockName} from "src/constants";
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';
import NotesIcon from '@mui/icons-material/Notes';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import {$createCodeNode} from "@lexical/code";
import {UseBlockFormatProps} from "../types";

const useBlockFormat = (props: UseBlockFormatProps) => {
    const {blockType} = props;
    const [editor] = useLexicalComposerContext();

    const formatParagraph = () => {
        if (blockType !== 'paragraph') {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    DEPRECATED_$isGridSelection(selection)
                )
                    $setBlocksType_experimental(selection, () => $createParagraphNode());
            });
        }
    };

    const formatHeading = (headingSize: HeadingTagType) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    DEPRECATED_$isGridSelection(selection)
                ) {
                    $setBlocksType_experimental(selection, () =>
                        $createHeadingNode(headingSize),
                    );
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            console.log('formatBulletList');
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            console.log('removeBulletList');
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };


    const formatCheckList = () => {
        console.log(blockType);
        if (blockType !== 'check') {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    DEPRECATED_$isGridSelection(selection)
                ) {
                    $setBlocksType_experimental(selection, () => $createQuoteNode());
                }
            });
        }
    };

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                let selection = $getSelection();

                if (
                    $isRangeSelection(selection) ||
                    DEPRECATED_$isGridSelection(selection)
                ) {
                    if (selection.isCollapsed()) {
                        $setBlocksType_experimental(selection, () => $createCodeNode());
                    } else {
                        const textContent = selection.getTextContent();
                        const codeNode = $createCodeNode();
                        selection.insertNodes([codeNode]);
                        selection = $getSelection();
                        if ($isRangeSelection(selection))
                            selection.insertRawText(textContent);
                    }
                }
            });
        }
    };

    interface Block {
        name: string;
        blockType: keyof typeof blockTypeToBlockName;
        icon: ReactElement<any>;
        // onClick?: MouseEventHandler<HTMLButtonElement>;
        onClick: () => void;
    }

    const blocks: Block[] = [
        {
            name: 'Normal',
            blockType: 'paragraph',
            icon: <NotesIcon/>,
            onClick: formatParagraph,
        },
        {
            name: 'Heading 1',
            blockType: 'h1',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h1")
        },
        {
            name: 'Heading 2',
            blockType: 'h2',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h2")
        },
        {
            name: 'Heading 3',
            blockType: 'h3',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h3")
        },
        {
            name: 'Heading 4',
            blockType: 'h4',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h4")
        },
        {
            name: 'Heading 5',
            blockType: 'h5',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h5")
        },
        {
            name: 'Heading 6',
            blockType: 'h6',
            icon: <TitleIcon/>,
            onClick: () => formatHeading("h6")
        },
        {
            name: 'Bulleted List',
            blockType: 'bullet',
            icon: <FormatListBulletedIcon/>,
            onClick: formatBulletList,
        },
        {
            name: 'Numbered List',
            blockType: 'number',
            icon: <FormatListNumberedOutlinedIcon/>,
            onClick: formatNumberedList,
        },
        {
            name: 'Check List',
            blockType: 'check',
            icon: <CheckBoxOutlinedIcon/>,
            onClick: formatCheckList,
        },
        {
            name: "Quote",
            blockType: 'quote',
            icon: <FormatQuoteOutlinedIcon/>,
            onClick: formatQuote,
        },
        {
            name: "Code Block",
            blockType: 'code',
            icon: <CodeOutlinedIcon/>,
            onClick: formatCode
        },
    ];

    return {
        blocks,
        formatParagraph,
        formatHeading,
        formatBulletList,
        formatCheckList,
        formatNumberedList,
        formatQuote,
        formatCode,
    };
};

export default useBlockFormat;
