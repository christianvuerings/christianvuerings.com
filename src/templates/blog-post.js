import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Bio from '../components/Bio';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Link from '../components/Link';
import SEO from '../components/seo';

const Date = styled.p`
  color: #999;
`;

const PostHeading = styled.h1`
  color: #293139;
  padding: 20px 0;
  font-size: 35px;

  @media (min-width: 700px) {
    padding: 40px 0;
    font-size: 40px;
  }
`;

const Hr = styled.hr`
  background: hsla(0, 0%, 0%, 0.2);
  border: none;
  margin: 0;
  margin-bottom: calc(1.75rem - 1px);
  padding: 0;
  height: 1px;
`;

const MarkdownStyles = styled.div`
  & a {
    color: #0a517b;
    text-decoration: none;
    border-bottom: 1px solid #0a517b;
  }
  & a:hover,
  & a:focus {
    border-bottom: 1px dashed #0a517b;
    color: #0a517b;
    text-decoration: none;
  }
  & ul {
    list-style-type: disc;
  }
  & ul,
  & ol {
    margin: 1.2em 0 1.2em 2.3em;
  }
  & p {
    margin: 1.2em 0;
  }
  & blockquote {
    font-style: italic;
    padding: 0 3em;
  }
  & pre {
    overflow: auto;
  }
`;

const NextPreviousList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
`;

const Twitter = styled(Link)`
  align-items: center;
  background-color: #1b95e0;
  border: none;
  border-radius: 4px;
  color: #fff;
  display: inline-flex;
  font-size: 13px;
  font-weight: 500;
  height: 20px;
  padding: 15px 10px;
  text-decoration: none;

  :hover,
  :focus {
    background-color: #0c7abf;
    border: none;
    color: #fff;
  }
  :active {
    box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.1);
  }

  ::before {
    background: transparent 0 0 no-repeat;
    background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
    content: ' ';
    height: 18px;
    margin-right: 8px;
    width: 18px;
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;

    const { location } = this.props;
    const completePath = `${location.origin}${location.pathname}`;
    const twitterURL = `https://twitter.com/share?original_referer=${completePath}&amp;url=${completePath}&amp;text=${post.frontmatter.title.replace(
      '&',
      '%26'
    )}&amp;via=christianvuerings`;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <PostHeading>{post.frontmatter.title}</PostHeading>
        <Date>{post.frontmatter.date}</Date>

        <MarkdownStyles>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </MarkdownStyles>

        <Box marginBottom>
          <Twitter href={twitterURL} target="_blank">
            Tweet
          </Twitter>
        </Box>

        <Hr />

        <Box marginBottom>
          <NextPreviousList>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </NextPreviousList>
        </Box>

        <Box marginBottom>
          <Bio />
        </Box>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
