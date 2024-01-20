import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubIconCustom = ({ sx={verticalAlign: 'sub'}, fontSize='small', ...props }) => <GitHubIcon sx={sx} fontSize={fontSize} {...props} />;

export default GitHubIconCustom;
