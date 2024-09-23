import React from 'react';
import configData from './config'; // Assuming you have this config file

const domain = typeof window !== 'undefined' ? window.location.hostname : '';

const fetchContent = async () => {
  try {
    let server;
    
    if (domain === 'walmartvriddhi.org' || domain === 'www.walmartvriddhi.org') {
      server = `${configData.LIVE_SERVER}`;
    } else if (domain === 'staging.walmartvriddhi.org') {
      server = `${configData.STAG_SERVER}`;
    } else {
      server = `${configData.STAG_SERVER}`;
    }

    // Fetching or further operations can be done here if needed

  } catch (error) {
    console.error('Error fetching content:', error);
  }
};

export default fetchContent;
