import React, { FC, useEffect } from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

interface AutoFocusProps {}


const AutoFocus: FC<AutoFocusProps> = (props) => {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
};

export default AutoFocus;
