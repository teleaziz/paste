import * as React from 'react';
import styled from '@emotion/styled';
import {Anchor, secureExternalLink} from '@twilio-paste/anchor';
import {Box} from '@twilio-paste/box';
import {Alert} from '@twilio-paste/alert';
import {Text} from '@twilio-paste/text';
import {SIDEBAR_WIDTH} from './constants';
import {Sidebar} from './sidebar';
import {SiteHeader} from './SiteHeader';
import {SiteMain, SiteMainInner} from './SiteMain';
import {SiteFooter} from './SiteFooter';
import {ScrollAnchorIntoView} from './ScrollAnchorIntoView';
import {useActiveSiteTheme} from '../../context/ActiveSiteThemeContext';

interface StyledSiteBodyProps {
  activeTheme: string;
}

/* Wraps the entire doc site page */
const StyledSiteBody = styled.div<StyledSiteBodyProps>`
  display: flex;
  min-width: 240px;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: ${SIDEBAR_WIDTH} 1fr;
  }
`;

const BLMAlert: React.FC = () => {
  const tweetUrl = 'https://twitter.com/twilio/status/1266444750065934337';
  return (
    <Box
      backgroundColor="colorBackgroundInverse"
      paddingLeft="space70"
      paddingRight="space70"
      paddingTop="space40"
      paddingBottom="space30"
      role="status"
      display="flex"
      justifyContent="center"
      position="sticky"
      top="0"
      zIndex="zIndex20"
    >
      <Text as="span" fontWeight="fontWeightBold" color="colorTextBrandInverse" marginRight="space30">
        Black Lives Matter.
      </Text>
      <Text
        as="a"
        href={tweetUrl}
        {...secureExternalLink(tweetUrl)}
        color="colorTextBrandInverse"
        textDecoration="underline"
        _hover={{textDecoration: 'none'}}
      >
        We stand with the Black community
      </Text>
    </Box>
  );
};

export const SiteBody: React.FC = ({children}) => {
  const {theme: activeTheme} = useActiveSiteTheme();
  return (
    <>
      <BLMAlert />
      {activeTheme === 'default' && (
        <Alert variant="warning">
          <Text as="p">
            <strong>WARNING:</strong> The Paste theme is an <em>extremely early</em> preview of future work!{' '}
            <Anchor
              href="https://docs.google.com/document/d/1H2Rj3NEmVSv0yxMBRjYOjruQllO__uj2-I_ibIoumZs/edit?usp=sharing"
              target="_blank"
            >
              Read the FAQ
            </Anchor>{' '}
            for more information.
          </Text>
        </Alert>
      )}
      <StyledSiteBody activeTheme={activeTheme}>
        <Sidebar />
        <Box height="100vh" overflow="auto">
          <SiteHeader />
          <SiteMain id="site-main">
            <ScrollAnchorIntoView />
            <SiteMainInner>{children}</SiteMainInner>
            <SiteFooter />
          </SiteMain>
        </Box>
      </StyledSiteBody>
    </>
  );
};