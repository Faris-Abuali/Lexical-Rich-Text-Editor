import {useCallback} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";


const useColorPicker = () => {
    const [editor] = useLexicalComposerContext();

    const applyStyleText = useCallback(
        (styles: Record<string, string>) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, styles);
                }
            });
        },
        [editor],
    );

    const onFontColorSelect = useCallback(
        (value: string) => {
            applyStyleText({color: value});
        },
        [applyStyleText],
    );

    const onBgColorSelect = useCallback(
        (value: string) => {
            applyStyleText({'background-color': value});
        },
        [applyStyleText],
    );

    return {
        onFontColorSelect,
        onBgColorSelect,
    };
};

export default useColorPicker;
