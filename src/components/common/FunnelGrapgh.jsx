import React, { useEffect } from 'react';
import funnelGraph from 'funnel-graph-js';
import { useWidth } from '../../customHooks/useWidth';

const FunnelGraph = ({ containerId, data }) => {
  const getFunnelWidth = useWidth('funnel-graph');

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';

    const graph = new funnelGraph({
      container: `#${containerId}`,
      gradientDirection: 'horizontal',
      data: data,
      displayPercent: false,
      direction: 'Horizontal',
      width: getFunnelWidth,
      height: 350,
      subLabelValue: 'values',
    });

    graph.draw();

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [containerId, data, getFunnelWidth]);

  return <div id={containerId} className='funnel-wrapper' />;
};

export default FunnelGraph;
