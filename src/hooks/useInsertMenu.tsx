import React from "react";
import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import {INSERT_HORIZONTAL_RULE_COMMAND} from "@lexical/react/LexicalHorizontalRuleNode";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

const useInsertMenu = () => {
    const [editor] = useLexicalComposerContext();

    const insertMenuItems = [
        {
            name: "Horizontal Rule",
            icon: <BorderHorizontalIcon/>,
            onClick: () => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined,)
        }
    ]

  return {
      insertMenuItems
  };
};

export default useInsertMenu;
