import React,{useState,useEffect} from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IStackProps, Stack } from 'office-ui-fabric-react/lib/Stack';
const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

  const tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };
const LoadingSpinner = () => (
    <div>
      <Stack tokens={tokens.sectionStack} style={{alignItems:"center",marginTop:300}}>
      
      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        
    
        <Spinner label="Logging In... Please Wait" ariaLive="assertive" labelPosition="right" />
      </Stack>
    </Stack>
    </div>
  );

  export default LoadingSpinner;