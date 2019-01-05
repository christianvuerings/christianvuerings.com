import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img {
    border: 0;
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
  }
  
  html {
    height: 100%;
  }

  body {
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    height: 100%;
    line-height: 1.6;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    color: white;
    background: none;
    font-family: Consolas,Menlo,Monaco,source-code-pro,Courier New,monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    overflow: auto;
    padding: 1em;
  }

  pre[class*="language-"]::-moz-selection {
    /* Firefox */
    background: hsl(207, 4%, 16%);
  }

  pre[class*="language-"]::selection {
    /* Safari */
    background: hsl(207, 4%, 16%);
  }

  /* Text Selection colour */
  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    border-radius: .3em;
    background: rgba(255,229,100,0.2);
    color: #1a1a1a;
    padding: .15em .2em .05em;
    white-space: normal;
  }

  .token.attr-name {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.comment {
    color: rgb(99, 119, 119);
  }

  .token.string,
  .token.url {
    color: rgb(173, 219, 103);
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: rgb(130, 170, 255);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: 'italic';
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #ffa7c4;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    background-color: hsla(207, 95%, 15%, 1);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #ffa7c4;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    border-radius: 10px;
    background: #16191d;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .gatsby-highlight pre[class*="language-"] {
    float: left;
    min-width: 100%;
  }
`;

const VisuallyHidden = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const DarkContainer = styled.div`
  background-color: #293139;
`;

const Heading = styled.h1`
  font-size: 20px;
  margin: 0 auto;
  max-width: 780px;
`;

const HeaderLink = styled(Link)`
  border: none;
  color: #fff;
  display: block;
  padding: 5px 20px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  margin: 0 auto;
  max-width: 780px;
`;

const FooterList = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
`;

const FooterLink = styled.a`
  border: none;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #fff;

  :focus,
  :hover {
    border-bottom: 1px dashed #fff;
  }
`;

const FooterItem = styled.li`
  align-items: center;
  display: flex;
  padding: 10px;

  &:not(:last-child) {
    ::after {
      content: '/';
      color: rgba(255, 255, 255, 0.3);
      margin-left: 20px;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  margin: 0 auto 25px;
  max-width: 780px;
  padding: 0 20px;
`;

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;

    const footerLinks = [
      {
        href: 'https://twitter.com/christianvuer',
        title: `Christian's twitter page`,
        text: 'Twitter',
      },
      {
        href: 'https://github.com/christianvuerings',
        title: `Have a peek at Christian's github repositories`,
        text: 'GitHub',
      },
      {
        href: 'https://www.linkedin.com/in/christianvuerings',
        title: `Contact Christian for business enquiries`,
        text: 'LinkedIn',
      },
    ];

    return (
      <React.Fragment>
        <GlobalStyle />
        <Main>
          <DarkContainer>
            <Heading>
              <HeaderLink to={`/`}>{title}</HeaderLink>
            </Heading>
          </DarkContainer>
          <Content>{children}</Content>
          <DarkContainer>
            <Footer>
              <div className="vcard">
                <VisuallyHidden>
                  <h2>Contact details</h2>
                </VisuallyHidden>
                <FooterList>
                  {footerLinks.map(({ href, title, text }) => (
                    <FooterItem key={href}>
                      <FooterLink href={href} title={title} target="_blank">
                        {text}
                      </FooterLink>
                    </FooterItem>
                  ))}
                </FooterList>
              </div>
            </Footer>
          </DarkContainer>
        </Main>
      </React.Fragment>
    );
  }
}

export default Layout;
