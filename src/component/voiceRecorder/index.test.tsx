import { create } from 'react-test-renderer';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import VoiceRecorder from '.';


describe('record component', () => {
    const renderComponent = () => create(<VoiceRecorder  />);

    it('should render VoiceRecorder component', () => {
        const component = renderComponent().toJSON();
        expect(component).toMatchSnapshot()
    });
    it('should fire record button',() => {
        const { getByTestId } = render(<VoiceRecorder />);
        const record = getByTestId('record');
        expect(record).toBeInTheDocument()
        expect(record).toBeTruthy()
        fireEvent.click(record);
        waitForElementToBeRemoved(record)
    });
    
});
