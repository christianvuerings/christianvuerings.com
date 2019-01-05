import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Link from './Link';

const BioContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50px 1fr;
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <BioContainer>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
            />
            <div>
              Personal blog by{' '}
              <Link to={`https://twitter.com/${social.twitter}`}>{author}</Link>
              <br />I love to share interesting ideas.
            </div>
          </BioContainer>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-picture.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
