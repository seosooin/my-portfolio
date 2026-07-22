import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SkillCard from './SkillCard';
import { CATEGORY_ORDER } from './skillConstants';

/**
 * SkillsSection 컴포넌트
 *
 * Props:
 * @param {Array} skills - 표시할 스킬 배열 (id, name, level, category, icon, description) [Required]
 * @param {Array} availableSkills - 추가로 등록 가능한 스킬 배열 [Required]
 * @param {function} onAddSkill - 스킬 추가 시 실행할 함수, 추가할 스킬 객체를 인자로 받음 [Required]
 * @param {function} onUpdateLevel - 숙련도 변경 시 실행할 함수, (스킬 id, 새 level)을 인자로 받음 [Optional]
 *
 * Example usage:
 * <SkillsSection skills={skillsData} availableSkills={availableSkills} onAddSkill={handleAddSkill} onUpdateLevel={updateSkillLevel} />
 */
function SkillsSection({ skills, availableSkills, onAddSkill, onUpdateLevel }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = [
    ...CATEGORY_ORDER.filter((category) => groupedSkills[category]),
    ...Object.keys(groupedSkills).filter((category) => !CATEGORY_ORDER.includes(category)),
  ];

  const handleAddSkill = (skill) => {
    onAddSkill(skill);
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ width: '100%', mt: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, fontWeight: 700 }}>
          Skills
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          disabled={availableSkills.length === 0}
          onClick={() => setIsDialogOpen(true)}
        >
          스킬 추가
        </Button>
      </Box>

      {categories.map((category) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.secondary', mb: 1.5 }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {groupedSkills[category].map((skill) => (
              <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <SkillCard skill={skill} onUpdateLevel={onUpdateLevel} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>스킬 추가</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>추가할 기술을 선택해주세요.</DialogContentText>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {availableSkills.map((skill) => (
              <Chip key={skill.id} label={skill.name} onClick={() => handleAddSkill(skill)} clickable />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SkillsSection;
