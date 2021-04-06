import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerRegistration from '../pages/CustomerRegistration';

configure({ adapter: new Adapter() });

it('render registration page with form and table ', () => {
  const wrapper = shallow(<CustomerRegistration />);

  const dialogBtn = wrapper.find('[data-test="dialog-btn"]');
  expect(dialogBtn).toHaveLength(1);

  const table = wrapper.find('[data-test="customer-table-wrapper"]');
  expect(table).toHaveLength(1);
  // expect(table.prop.customers).toEqual([])

  const form = wrapper.find('[data-test="form-dialog"]');
  expect(form).toHaveLength(1);
});
