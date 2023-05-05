import React from 'react';
import {
    $getRoot,
    $getSelection,
    EditorState,
} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "src/components/Toolbar";
import LocalStoragePlugin from "src/plugins/LocalStoragePlugin";
import TreeViewPlugin from 'src/plugins/TreeViewPlugin';
import Stack from "@mui/material/Stack";
import Placeholder from "../components/Placeholder";
import CodeHighlightPlugin from 'src/plugins/CodeHighlightPlugin';
import {initialConfig} from "../constants";
import useStyles from "./styles";

const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
    });
}

export const RichTextEditor = () => {
    // we retrieved the content from local storage in the Editor component
    const content = localStorage.getItem(initialConfig.namespace);

    const classes = useStyles();

    return (
        <LexicalComposer
            initialConfig={{...initialConfig, editorState: content}}
        >
            <Stack className={classes.container}>
                <Toolbar editable/>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={classes.contentEditable}/>}
                    placeholder={<Placeholder className={classes.placeholder}>Enter some rich text...</Placeholder>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <CodeHighlightPlugin />
                <OnChangePlugin onChange={handleChange}/>
                <HistoryPlugin/>
                <LocalStoragePlugin namespace={initialConfig.namespace}/>
                <ListPlugin/>
                <HorizontalRulePlugin />
                <CheckListPlugin/>
            </Stack>
            {/* {false && <TreeViewPlugin />} */}
        </LexicalComposer>
    )
}

export default RichTextEditor;