import styled from 'styled-components';

const Container = styled.div`
	margin: auto;
	width: 60%;
	padding-top: 5vw;
	padding-bottom: 5vw;

	@media (min-width: 320px) and (max-width: 480px) {
		width: 80%;
	}
`;

export default Container;
