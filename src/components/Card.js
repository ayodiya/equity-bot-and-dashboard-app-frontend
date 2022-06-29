import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'

const CardComponent = ({ icon, title, content, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color='textSecondary'
              gutterBottom
              variant='overline'
            >
              {title}
            </Typography>
            <Typography
              color='textPrimary'
              variant='h4'
            >
              {content}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardComponent
