import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 30em));
    grid-gap: .5rem;
`;

export default Grid;
