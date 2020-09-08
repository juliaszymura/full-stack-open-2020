// commented out parts are modifications required by exercise 6.20

import React from "react";
// import { useDispatch} from "react-redux";
import { connect } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  //
  // const Filter = () => {
  //   const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const filter = event.target.value;
    props.updateFilter(filter);
    // dispatch(updateFilter(filter));
  };

  const style = { marginBottom: 10, color: "#b795f3" };

  return (
    <div style={style}>
      Filter: <input name="filter" onChange={onChangeHandler} />
    </div>
  );
};

const mapDispatchToProps = {
  updateFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

// export default Filter;
export default ConnectedFilter;
