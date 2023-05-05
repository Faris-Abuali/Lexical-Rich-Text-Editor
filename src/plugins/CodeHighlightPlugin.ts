import React, { FC, useEffect } from 'react';
import {registerCodeHighlighting} from '@lexical/code';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

const CodeHighlightPlugin: FC = () => {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return registerCodeHighlighting(editor);
    }, [editor]);

    return null;
};

export default CodeHighlightPlugin;
