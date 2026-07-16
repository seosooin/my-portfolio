import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const INITIAL_FORM = { name: '', message: '', email: '', phone: '' };

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼. 이름/메시지는 필수, 이메일/전화번호는 선택 입력이다.
 *
 * Props:
 * @param {function} onSubmit - 폼 제출 시 실행할 함수(값 객체를 인자로 받아 boolean 성공 여부를 반환) [Required]
 * @param {boolean} isSubmitting - 제출 진행 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookForm onSubmit={addEntry} isSubmitting={submitting} />
 */
function GuestbookForm({ onSubmit, isSubmitting = false }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: '이름과 메시지를 입력해주세요.' });
      return;
    }

    const success = await onSubmit(form);

    if (success) {
      setForm(INITIAL_FORM);
      setStatus({ type: 'success', text: '방명록이 등록되었습니다. 감사합니다!' });
    } else {
      setStatus({ type: 'error', text: '등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderRadius: 3,
        p: { xs: 1, md: 2 },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, mb: 2 }}
        >
          방명록 남기기
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="이름"
            value={form.name}
            onChange={handleChange('name')}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="메시지"
            value={form.message}
            onChange={handleChange('message')}
            required
            fullWidth
            multiline
            minRows={3}
            size="small"
          />
          <TextField
            label="이메일 (선택, 비공개)"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
            size="small"
          />
          <TextField
            label="전화번호 (선택, 비공개)"
            value={form.phone}
            onChange={handleChange('phone')}
            fullWidth
            size="small"
          />

          {status && <Alert severity={status.type}>{status.text}</Alert>}

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'var(--color-accent)',
              '&:hover': { bgcolor: 'var(--color-accent)', opacity: 0.9 },
            }}
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GuestbookForm;
