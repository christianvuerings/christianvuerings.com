import styled from 'styled-components';

const BASE_POINT = 25;

const transformValue = value => (value === true ? 1 : value);
const convert = value =>
  value ? `${BASE_POINT * transformValue(value)}px` : null;

const Box = styled.div`
  margin-bottom: ${props => convert(props.marginBottom)};
  margin-top: ${props => convert(props.marginBottom)};
`;

export default Box;
