import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';

/**
 * AboutContentAccordion 컴포넌트
 *
 * Props:
 * @param {Array} sections - 콘텐츠 섹션 배열 (id, title, content, showInHome) [Required]
 * @param {function} onUpdateContent - 섹션 내용 수정 시 실행할 함수, (섹션 id, 새 내용)을 인자로 받음 [Required]
 *
 * Example usage:
 * <AboutContentAccordion sections={aboutMeData.sections} onUpdateContent={updateSectionContent} />
 */
function AboutContentAccordion({ sections, onUpdateContent }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');

  const startEdit = (section) => {
    setEditingId(section.id);
    setDraft(section.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft('');
  };

  const saveEdit = (sectionId) => {
    onUpdateContent(sectionId, draft);
    setEditingId(null);
    setDraft('');
  };

  return (
    <Box sx={{ width: '100%', mt: { xs: 3, md: 4 } }}>
      {sections.map((section) => (
        <Accordion key={section.id} elevation={0} sx={{ bgcolor: 'background.paper', mb: 1.5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 600 }}>
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {editingId === section.id ? (
              <Box>
                <TextField
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  multiline
                  minRows={4}
                  fullWidth
                  sx={{ mb: 1.5 }}
                />
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button size="small" onClick={cancelEdit}>
                    취소
                  </Button>
                  <Button size="small" variant="contained" onClick={() => saveEdit(section.id)}>
                    저장
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography
                  sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.6, color: 'text.secondary' }}
                >
                  {section.content}
                </Typography>
                <Button
                  size="small"
                  startIcon={<EditIcon fontSize="small" />}
                  onClick={() => startEdit(section)}
                  sx={{ mt: 1 }}
                >
                  편집
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default AboutContentAccordion;
