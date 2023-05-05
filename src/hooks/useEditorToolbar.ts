import {useCallback, useEffect, useState} from "react";
import {$isRootOrShadowRoot, NodeKey, $isTextNode, TextFormatType} from "lexical";
import {
    mergeRegister,
    $findMatchingParent,
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
} from "@lexical/utils";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getRoot, $getSelection, $isParagraphNode, $isRangeSelection} from "lexical";
import {blockTypeToBlockName, initialHasFormat} from "src/constants";
import {$isListNode, ListNode} from "@lexical/list";
import {$isDecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';
import {$selectAll} from '@lexical/selection';
import {$isHeadingNode} from '@lexical/rich-text';
import {$isCodeNode, CODE_LANGUAGE_MAP} from '@lexical/code';
import getSelectedNode from "../utils/getSelectedNode";


const useEditorToolbar = () => {

    const [editor] = useLexicalComposerContext();

    const [hasFormat, setHasFormat] = useState<Record<TextFormatType, boolean>>(initialHasFormat);
    const [isEditorEmpty, setIsEditorEmpty] = useState(false);
    const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
    const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
    const [codeLanguage, setCodeLanguage] = useState<string>("");
    const [isLink, setIsLink] = useState(false);


    // This function runs every time the editor state changes.
    const updateToolbar = useCallback(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            let element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : $findMatchingParent(anchorNode, (e) => {
                        const parent = e.getParent();
                        return parent !== null && $isRootOrShadowRoot(parent);
                    });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            // Update text format
            setHasFormat({
                bold: selection.hasFormat('bold'),
                italic: selection.hasFormat('italic'),
                underline: selection.hasFormat('underline'),
                strikethrough: selection.hasFormat('strikethrough'),
                subscript: selection.hasFormat('subscript'),
                superscript: selection.hasFormat('superscript'),
                code: selection.hasFormat('code'),
                highlight: selection.hasFormat('highlight'),
            });

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(
                        anchorNode,
                        ListNode,
                    );
                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName);
                    }
                    if ($isCodeNode(element)) {
                        const language =
                            element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
                        setCodeLanguage(
                            language ? CODE_LANGUAGE_MAP[language] || language : '',
                        );
                        return;
                    }
                }
            }
        }
        // Check if editor is empty
        checkIfEditorIsEmpty();
    }, [editor]);

    const checkIfEditorIsEmpty = useCallback(() => {
        const root = $getRoot();
        const children = root.getChildren();

        // setIsEditorEmpty(Boolean(children.length));

        if (children.length > 1) {
            setIsEditorEmpty(false);
            return;
        }

        if ($isParagraphNode(children[0])) {
            setIsEditorEmpty(children[0].getChildren().length === 0);
        } else {
            setIsEditorEmpty(false);
        }
    }, [editor]);

    const insertLink = useCallback(() => {
        if (!isLink) {
            console.log("TOGGLE_LINK_COMMAND");
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    const insertHorizontalRule = () => {
        editor.dispatchCommand(
            INSERT_HORIZONTAL_RULE_COMMAND,
            undefined,
        );
    }

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                // The latest EditorState can be found as `editorState`.
                // To read the contents of the EditorState, use the following API:
                editorState.read(() => {
                    // Just like editor.update(), .read() expects a closure where you can use
                    // the $ prefixed helper functions.
                    updateToolbar();
                });
            }),
        );
    }, [updateToolbar, editor]);

    const clearFormatting = useCallback(() => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $selectAll(selection);
                selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                        node.setFormat(0);
                        node.setStyle('');
                        $getNearestBlockElementAncestorOrThrow(node).setFormat('');
                    }
                    if ($isDecoratorBlockNode(node)) {
                        node.setFormat('');
                    }
                });
            }
        });
    }, [editor]);

    return {
        hasFormat,
        isEditorEmpty,
        blockType,
        insertLink,
        insertHorizontalRule,
        clearFormatting,
    };
};

export default useEditorToolbar;
