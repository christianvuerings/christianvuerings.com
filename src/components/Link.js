import React from 'react';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

const StyledGatsbyLink = styled(GatsbyLink)`
  color: #0a517b;
  text-decoration: none;
  border-bottom: 1px solid #0a517b;

  :hover,
  :focus {
    border-bottom: 1px dashed #0a517b;
    color: #0a517b;
    text-decoration: none;
  }
`;

const RegularLink = styled.a`
  color: #0a517b;
  text-decoration: none;
  border-bottom: 1px solid #0a517b;

  :hover,
  :focus {
    border-bottom: 1px dashed #0a517b;
    color: #0a517b;
    text-decoration: none;
  }
`;

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <StyledGatsbyLink to={to} activeClassName={activeClassName} {...other}>
        {children}
      </StyledGatsbyLink>
    );
  }
  return (
    <RegularLink href={to} {...other}>
      {children}
    </RegularLink>
  );
};

export default Link;
