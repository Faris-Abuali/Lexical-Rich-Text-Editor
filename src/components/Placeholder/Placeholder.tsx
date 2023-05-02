import React, {FC} from 'react';
import Box from '@mui/material/Box';
import {PlaceholderProps} from "../types";

const Placeholder: FC<PlaceholderProps> = ({className, children,}) => {

    return (
        <Box className={className}>{children}</Box>
    );
};

export default Placeholder;
