import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ResourceModel from '../../components/ResourceModel/ResourceModel';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class ResourceForm extends React.Component {
  constructor(){
    super();
    this.state = {
      finished: false,
      stepIndex: 0,
      access: '',
      name: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: ''
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<ResourceModel getLabel={this.handleInputChange} />);
      case 1:
        return 'Set resource settings';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Add new resource</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select resource settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Resource model</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ResourceForm;
