import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AboutBasicInfoCard from '../components/about/AboutBasicInfoCard';
import AboutContentAccordion from '../components/about/AboutContentAccordion';
import SkillsSection from '../components/about/SkillsSection';
import { usePortfolio } from '../context/PortfolioContext';

function AboutMe() {
  const { aboutMeData, availableSkills, updateSectionContent, addSkill, updateSkillLevel } = usePortfolio();

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        <AboutBasicInfoCard basicInfo={aboutMeData.basicInfo} />
        <AboutContentAccordion sections={aboutMeData.sections} onUpdateContent={updateSectionContent} />
        <SkillsSection
          skills={aboutMeData.skills}
          availableSkills={availableSkills}
          onAddSkill={addSkill}
          onUpdateLevel={updateSkillLevel}
        />
      </Container>
    </Box>
  );
}

export default AboutMe;
