import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GuestbookForm from './contact/GuestbookForm';
import ContactInfoPanel from './contact/ContactInfoPanel';
import GuestbookList from './contact/GuestbookList';
import useGuestbook from '../../hooks/useGuestbook';
import ScrollReveal from '../ui/ScrollReveal';

function ContactSection() {
  const { entries, hasMore, loading, submitting, loadMore, addEntry } = useGuestbook();

  return (
    <Box
      id="contact-section"
      component="section"
      sx={{ width: '100%', bgcolor: 'primary.dark', color: 'primary.contrastText', py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            mb: 4,
            borderBottom: '3px solid var(--color-accent)',
            display: 'inline-block',
            pb: 1,
          }}
        >
          Contact
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <ScrollReveal direction="left">
              <GuestbookForm onSubmit={addEntry} isSubmitting={submitting} />
            </ScrollReveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <ScrollReveal direction="right" delay={0.1}>
              <ContactInfoPanel />
            </ScrollReveal>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ScrollReveal delay={0.2}>
              <GuestbookList
                entries={entries}
                hasMore={hasMore}
                isLoading={loading}
                onLoadMore={loadMore}
              />
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
