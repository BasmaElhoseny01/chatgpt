import React from 'react'
import { BoxContainer } from './styles'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function PasswordRules(props) {
    const { valid } = props
    return (
        <BoxContainer>
            <Typography variant='p'>
                Your password must contain:
            </Typography>
            {/* <ListCustom>
                <li>At least 8 characters</li>
            </ListCustom> */}

            <List>
                <ListItem disablePadding>
                    <ListItemIcon>
                        {valid ? <DoneRoundedIcon /> : <PriorityHighRoundedIcon />}
                    </ListItemIcon>
                    <ListItemText primary="At least 8 characters" />

                </ListItem>
            </List>
        </BoxContainer>

    )
}

export default PasswordRules