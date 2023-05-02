import {DebouncedFunctionType} from "../types";

/** To help debounce the action of syncing editor's content changes to the external store. Usually, this would be the piece that updates your remote database
 * @see https://konstantinmuenster.medium.com/how-to-build-a-text-editor-with-lexical-and-react-27204c186d0f
 */
const debounce = <F extends DebouncedFunctionType>(
    fn: F,
    delay: number
) => {
    let timeoutID: number | undefined;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    } as F;
}

// debounce(() => console.log("FaRIS"), 1000);

export default debounce;

/**
 *     const debouncedSaveContent = debounce(saveContent, 500);
 *
 *     useEffect(() => {
 *         return editor.registerUpdateListener(
 *             ({ editorState, dirtyElements, dirtyLeaves }) => {
 *                 // Don't update if nothing changed
 *                 if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;
 *
 *                 const serializedState = JSON.stringify(editorState);
 *                 debouncedSaveContent(serializedState);
 *             }
 *         );
 */