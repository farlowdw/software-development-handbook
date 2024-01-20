import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';

const PythonIcon = ({ style={verticalAlign: 'sub', fontSize: 'large'}, ...props }) => <FontAwesomeIcon style={style} icon={faPython} {...props} />;

export default PythonIcon;