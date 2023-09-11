import React from 'react'
import { JOB_STATUS } from '../../../utils/constants';
interface Select{
  name: string;
  labelText: string;
  list: string[];
  defaultValue: string;
}
const FormRowSelect = ({ name, labelText, list, defaultValue = "" }: Select) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default FormRowSelect