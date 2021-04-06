import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormDialog from '../components/FormDialog';

configure({ adapter: new Adapter() });

it('render text inputs ', () => {
  const wrapper = shallow(
    <FormDialog
      open={true}
      handleClose={() => false}
      handleChange={() => console.log('change')}
      handleSubmit={() => console.log('submit')}
      user={{
        city: '',
        email: '',
        fullName: '',
        houseNumber: '',
        id: 0,
        latitude: undefined,
        longitude: undefined,
        street: '',
        zipCode: '',
      }}
    />
  );

  const nameInput = wrapper.find('#name');
  expect(nameInput).toHaveLength(1);

  const emailInput = wrapper.find('#email');
  expect(emailInput).toHaveLength(1);

  const cityInput = wrapper.find('#city');
  expect(cityInput).toHaveLength(1);

  const streetInput = wrapper.find('#street');
  expect(streetInput).toHaveLength(1);

  const houseInput = wrapper.find('#house-number');
  expect(houseInput).toHaveLength(1);

  const zipCodeInput = wrapper.find('#zip-code');
  expect(zipCodeInput).toHaveLength(1);

  const submitButton = wrapper.find('#submit-btn');
  expect(submitButton).toHaveLength(1);
  expect(submitButton.prop('type')).toEqual('submit');
  expect(submitButton.text()).toEqual('Save');
});
