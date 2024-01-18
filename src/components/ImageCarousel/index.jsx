import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

/**
 * 
 * @param {*} propertiesObj Expects the following properties: 
 *  - images: Array of objects where each object has a 'label' (image label) and 'path' property (image location)
 *  - variableHeight: Boolean to indicate whether or not height of carousel container should change to match current image height or be fixed to facilitate smoother navigation (default: false)
 *  - customWidth: specify custom width for carousel container (default: 500)
 *  - customHeight: specify custom height for carousel container (default: 'auto')
 * @returns 
 */
function SwipeableTextMobileStepper({ images, variableHeight, customWidth, customHeight }) {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;
	const { colorMode } = useColorMode();
	const muiTheme = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;
  
  const boxWidth = customWidth ? customWidth : 500;
  const imgHeight = customHeight ? customHeight : 'auto';

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<ThemeProvider theme={muiTheme}>
			<Box sx={{ maxWidth: boxWidth, flexGrow: 1 }}>
				<Paper
					square
					elevation={0}
					sx={{
						display: 'flex',
						alignItems: 'center',
						height: 50,
						pl: 2,
						bgcolor: 'background.default',
					}}>
					<Typography>{images[activeStep].label}</Typography>
				</Paper>
				<AutoPlaySwipeableViews
					autoplay={false}
          animateHeight={variableHeight}
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents>
					{images.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<Box
									component="img"
									sx={{
										height: imgHeight,
										maxWidth: '100%',
										display: 'block',
										overflow: 'scroll',
									}}
									src={step.path}
									alt={step.label}
								/>
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
				<MobileStepper
					variant="text"
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}>
							Next
							{theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)}
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}>
							{theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)}
							Back
						</Button>
					}
				/>
			</Box>
		</ThemeProvider>
	);
}

export default SwipeableTextMobileStepper;
