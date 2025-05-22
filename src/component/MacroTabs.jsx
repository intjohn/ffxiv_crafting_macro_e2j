import React, { useState, useCallback, memo } from 'react';
import { TabContext, TabList, Tab, TabPanel, Box } from 'MuiBarrel';
import CopyField from './CopyField';

const MacroTabs = ({ en, jp, fr, de }) => {
  const [value, setValue] = useState('1');
  const handleChange = useCallback((_event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Box component="section">
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="Choose Macro in preferred language"
        >
          <Tab label="EN" value="1" />
          <Tab label="JP" value="2" />
          <Tab label="FR" value="3" />
          <Tab label="DE" value="4" />
        </TabList>
        <TabPanel value="1">
          <CopyField content={en} />
        </TabPanel>
        <TabPanel value="2">
          <CopyField content={jp} />
        </TabPanel>
        <TabPanel value="3">
          <CopyField content={fr} />
        </TabPanel>
        <TabPanel value="4">
          <CopyField content={de} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default memo(MacroTabs);
