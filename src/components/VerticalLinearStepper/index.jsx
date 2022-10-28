import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });
const muiLightTheme = createTheme({ palette: { mode: 'light' } });

export default function VerticalLinearStepper({
	steps,
	width = '100%',
	msg = `All steps completed. You are done.`,
}) {
	const { colorMode } = useColorMode();
	const muiThemeToUse = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;
	const muiTheme = createTheme(muiThemeToUse);

	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	return (
		<ThemeProvider theme={muiTheme}>
			<Box sx={{ maxWidth: width }}>
				<Stepper
					nonLinear={true}
					activeStep={activeStep}
					orientation="vertical">
					{steps.map((step, index) => (
						<Step key={step.label}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								<StepLabel
									optional={
										index === steps.length - 1 ? (
											<Typography variant="caption">Last step</Typography>
										) : null
									}>
									{step.label}
								</StepLabel>
							</StepButton>
							<StepContent>
								<Typography>{step.description}</Typography>
								<Box sx={{ mb: 2 }}>
									<div>
										<Button
											variant="contained"
											onClick={handleNext}
											sx={{ mt: 1, mr: 1 }}>
											{index === steps.length - 1 ? 'Finish' : 'Continue'}
										</Button>
										<Button
											disabled={index === 0}
											onClick={handleBack}
											sx={{ mt: 1, mr: 1 }}>
											Back
										</Button>
									</div>
								</Box>
							</StepContent>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} sx={{ p: 3 }}>
						<Typography>{msg}</Typography>
						<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
							Reset
						</Button>
					</Paper>
				)}
			</Box>
		</ThemeProvider>
	);
}
