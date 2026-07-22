import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';
import { SKILL_ICON_MAP, CATEGORY_COLORS } from './skillConstants';

/**
 * SkillCard 컴포넌트
 *
 * Props:
 * @param {object} skill - 스킬 데이터 (id, name, level, category, icon, description) [Required]
 * @param {function} onUpdateLevel - 숙련도 변경 시 실행할 함수, (스킬 id, 새 level)을 인자로 받음 [Optional]
 *
 * Example usage:
 * <SkillCard skill={skill} onUpdateLevel={updateSkillLevel} />
 */
function SkillCard({ skill, onUpdateLevel }) {
  const { id, name, level, category, icon, description } = skill;
  const [displayLevel, setDisplayLevel] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draftLevel, setDraftLevel] = useState(level);
  const IconComponent = SKILL_ICON_MAP[icon] || CodeIcon;
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  useEffect(() => {
    const timer = setTimeout(() => setDisplayLevel(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  useEffect(() => {
    setDraftLevel(level);
  }, [level]);

  const handleCommitLevel = (event, value) => {
    onUpdateLevel(id, value);
    setIsEditing(false);
  };

  return (
    <Tooltip title={description} arrow placement="top">
      <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 2, height: '100%' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconComponent sx={{ color, fontSize: '1.5rem' }} />
              <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>{name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{level}%</Typography>
              {onUpdateLevel && (
                <IconButton size="small" onClick={() => setIsEditing((prev) => !prev)}>
                  <EditIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              )}
            </Box>
          </Box>
          {isEditing ? (
            <Slider
              size="small"
              value={draftLevel}
              min={0}
              max={100}
              onChange={(event, value) => setDraftLevel(value)}
              onChangeCommitted={handleCommitLevel}
              sx={{ color }}
            />
          ) : (
            <LinearProgress
              variant="determinate"
              value={displayLevel}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 4,
                  transition: 'transform 1s ease-in-out',
                },
              }}
            />
          )}
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default memo(SkillCard);
