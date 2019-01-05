import styled from 'styled-components';

const GridDrop = styled.div`
    display: grid;
    grid-template-rows: 30px 1fr;
    grid-gap: 20px;
    justify-content: center;

    label {
    grid-row: 1 /2;
    }
 
    select {
    grid-column: 2;
    }
`;

export default GridDrop;
