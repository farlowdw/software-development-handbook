import React from 'react';
import AdmonitionTypeNote from '@theme/Admonition/Type/Note';
import AdmonitionTypeTip from '@theme/Admonition/Type/Tip';
import AdmonitionTypeInfo from '@theme/Admonition/Type/Info';
import AdmonitionTypeWarning from '@theme/Admonition/Type/Warning';
import AdmonitionTypeDanger from '@theme/Admonition/Type/Danger';
import AdmonitionTypeCaution from '@theme/Admonition/Type/Caution';
import AdmonitionTypeDWF from './Type/DWF';
import AdmonitionTypeTool from './Type/Tool';
import AdmonitionTypeKey from './Type/Key';
import AdmonitionTypePerf from './Type/Perf';
import AdmonitionTypeStudy from './Type/Study';
import AdmonitionTypeIIO from './Type/IIO';
import AdmonitionTypeExtension from './Type/Extension';
const admonitionTypes = {
  note: AdmonitionTypeNote,
  tip: AdmonitionTypeTip,
  info: AdmonitionTypeInfo,
  warning: AdmonitionTypeWarning,
  danger: AdmonitionTypeDanger,
  dwf: AdmonitionTypeDWF,
  tool: AdmonitionTypeTool,
  key: AdmonitionTypeKey,
  perf: AdmonitionTypePerf,
  study: AdmonitionTypeStudy,
  iio: AdmonitionTypeIIO,
  extension: AdmonitionTypeExtension,
};
// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
const admonitionAliases = {
  secondary: (props) => <AdmonitionTypeNote title="secondary" {...props} />,
  important: (props) => <AdmonitionTypeInfo title="important" {...props} />,
  success: (props) => <AdmonitionTypeTip title="success" {...props} />,
  caution: AdmonitionTypeCaution,
};
export default {
  ...admonitionTypes,
  ...admonitionAliases,
};
