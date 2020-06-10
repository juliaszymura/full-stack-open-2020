import React from "react";

const Form = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onAddClick,
}) => {
  return (
    <>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input value={newName} onChange={onNameChange} />
              </td>
            </tr>
            <tr>
              <td>Number:</td>
              <td>
                <input value={newNumber} onChange={onNumberChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" onClick={onAddClick}>
          Add
        </button>
      </form>
    </>
  );
};

export default Form;
