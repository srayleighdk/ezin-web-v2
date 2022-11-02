import React, { memo } from 'react';

const Separator = ({ width = '100%', height = '100%' }) => {
  return <div style={{ width, height }} />;
};

export default memo(Separator);
