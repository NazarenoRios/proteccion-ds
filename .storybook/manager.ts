import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/manager-api';

const ADDON_ID = 'figma';
const PANEL_ID = `${ADDON_ID}/panel`;

const FigmaPanel = () => {
  const figmaUrl = useParameter('figma', null);

  if (!figmaUrl) {
    return React.createElement('div', {
      style: { padding: '20px', textAlign: 'center', color: '#999' }
    }, [
      React.createElement('p', { key: 'msg1' }, 'No Figma design linked for this story'),
      React.createElement('p', {
        key: 'msg2',
        style: { fontSize: '12px', marginTop: '10px' }
      }, [
        'Add a ',
        React.createElement('code', { key: 'code' }, 'figma'),
        ' parameter to your story to display the design'
      ])
    ]);
  }

  // Convert Figma URL to embed URL with better options
  let embedUrl = figmaUrl;

  // If it's a regular Figma URL, convert it to embed format
  if (figmaUrl.includes('figma.com/design') || figmaUrl.includes('figma.com/file')) {
    // Extract file ID and node ID from URL
    const urlMatch = figmaUrl.match(/figma\.com\/(design|file)\/([^/]+)/);
    const nodeMatch = figmaUrl.match(/node-id=([^&]+)/);

    if (urlMatch) {
      const fileId = urlMatch[2];
      const nodeId = nodeMatch ? nodeMatch[1] : '';

      // Use embed URL with better parameters for viewing
      embedUrl = `https://www.figma.com/embed?embed_host=storybook&url=https://www.figma.com/file/${fileId}`;

      if (nodeId) {
        // Add node-id and enable scaling/chrome for better viewing
        embedUrl += `?node-id=${nodeId}&scaling=min-zoom&hide-ui=0`;
      }
    }
  }

  return React.createElement('div', {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }
  }, [
    React.createElement('iframe', {
      key: 'figma-iframe',
      src: embedUrl,
      style: {
        border: 'none',
        width: '100%',
        height: '100%',
        display: 'block',
        margin: 0,
        padding: 0
      },
      allowFullScreen: true,
      title: 'Figma Design'
    })
  ]);
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Figma',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => React.createElement(AddonPanel, {
      active: active || false
    }, React.createElement(FigmaPanel)),
  });
});
