import styled from 'styled-components';

const GridTime = styled.div`
    display: grid;
    width: 100px;
    grid-template-columns: 250px 1fr;
    grid-gap: 20px;

    label {
    grid-column: 1;
    }
 
    select {
    grid-column: 2;
    }
`;

export default GridTime;
