import React from "react";

const PersonRow = ({ person, onDeleteClick }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={onDeleteClick(person)}>Delete</button>
      </td>
    </tr>
  );
};

export default PersonRow;
