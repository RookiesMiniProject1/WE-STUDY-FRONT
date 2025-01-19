import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { ContentSection, theme } from '../styles/MainPageStyles';

const PageWrapper = styled(Box)({
  background: `linear-gradient(120deg, 
    ${theme.colors.secondary} 0%, 
    #FFFFFF 50%,
    ${theme.colors.secondary} 100%)`,
  minHeight: '100vh',
  paddingBottom: '48px',
});

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.secondary}`,
  borderRadius: '16px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 20px rgba(177, 156, 217, 0.1)',
  }
}));

const IconTypography = styled(Typography)({
  fontSize: '2.2rem',
  marginBottom: '0.8rem',
  textAlign: 'center'
});

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 4rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  marginBottom: '2rem',
  color: theme.colors.black,
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  }
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
  color: theme.colors.primary,
  marginBottom: '3rem',
  fontWeight: 700,
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: theme.colors.primary,
  marginBottom: '0.8rem',
}));

const FeatureContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.colors.black,
  whiteSpace: 'pre-line',
  lineHeight: 1.5,
}));

const MainContent = () => {
  const features = [
    {
      title: "하나의 플랫폼으로",
      content: "간편하게 스터디 뿐만 아니라\n자기계발까지 한번에",
      icon: "🎯"
    },
    {
      title: "효과적인 스터디를 위한",
      content: "멘토와 매칭까지",
      icon: "🤝"
    },
    {
      title: "다양한 스터디 그룹",
      content: "원하는 스터디를 찾아보세요",
      icon: "✨"
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MainHeading>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                스터디그룹 가입부터
              </motion.span>
              <br/>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                관리까지 한번에
              </motion.span>
            </MainHeading>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
            >
              <SubHeading>
                최초 통합 플랫폼 WESTUDY
              </SubHeading>
            </motion.div>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.9 + index * 0.2, duration: 0.8 }}
                  >
                    <StyledCard elevation={0}>
                      <CardContent>
                        <IconTypography>
                          {feature.icon}
                        </IconTypography>
                        <FeatureTitle>
                          {feature.title}
                        </FeatureTitle>
                        <FeatureContent>
                          {feature.content}
                        </FeatureContent>
                      </CardContent>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </HeroSection>
    </PageWrapper>
  );
};

export default MainContent;