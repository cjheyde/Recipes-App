import React, { useState } from 'react';
// import { propTypes } from 'prop-types';
// import { useHistory } from 'react-router-dom';

function Drinks() {
  const { filteredPlanets } = useContext(PlanetsContext);
  // console.log(filteredPlanets);

  return (
    <div>
      
          {filteredPlanets !== undefined && filteredPlanets.map((planetData, index) => (
            <PlanetInformation key={ index } planetData={ planetData } />
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default Drinks;
