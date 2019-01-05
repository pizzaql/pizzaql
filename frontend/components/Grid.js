import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-gap: 20px;

    label {
    grid-column: 1 / 2;
    }
 
    input {
    grid-column: 2 / 3;
    }

    button {
    grid-row: 8;
    grid-column: 1 / 3
    }
`;

export default Grid;
