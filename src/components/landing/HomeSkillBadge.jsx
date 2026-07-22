import { memo } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import { SKILL_ICON_MAP, CATEGORY_COLORS } from '../about/skillConstants';

/**
 * HomeSkillBadge 컴포넌트
 *
 * Props:
 * @param {object} skill - 스킬 데이터 (id, name, level, category, icon) [Required]
 * @param {boolean} showName - 스킬 이름 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <HomeSkillBadge skill={skill} showName={false} />
 */
function HomeSkillBadge({ skill, showName = true }) {
  const IconComponent = SKILL_ICON_MAP[skill.icon] || CodeIcon;
  const color = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.default;

  return (
    <Tooltip title={`${skill.name} · ${skill.level}%`} arrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Avatar sx={{ bgcolor: 'background.default', border: `2px solid ${color}`, color, width: 48, height: 48 }}>
          <IconComponent />
        </Avatar>
        {showName && <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{skill.name}</Typography>}
      </Box>
    </Tooltip>
  );
}

export default memo(HomeSkillBadge);
