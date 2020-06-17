import React from "react";
import PersonRow from "./PersonRow";

const PersonsTable = ({ persons, onDeleteClick }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter((person) => person.visible)
          .map((person) => (
            <PersonRow
              key={person.id}
              person={person}
              onDeleteClick={onDeleteClick}
            />
          ))}
      </tbody>
    </table>
  );
};

export default PersonsTable;
