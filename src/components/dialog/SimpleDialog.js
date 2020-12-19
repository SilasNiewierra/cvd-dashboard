import React from 'react';
import './SimpleDialog.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function AlertDialog(props) {

    const [slug, setSlug] = React.useState('');

    const handleChange = (event) => {
        setSlug(event.target.value);
    };

    const renderData = props.countries;

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => props.closeDialogHandler("")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Select a country"}</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label" >Country</InputLabel>
                        {renderData != null && <Select
                            className="simple-dialog"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={slug}
                            onChange={handleChange}>

                            {renderData.map(item =>
                                <MenuItem value={item.Slug} key={item.Slug}>{item.Country}</MenuItem>
                            )}
                        </Select>
                        }{
                            renderData == null &&
                            <div>Currently fetching all available countries</div>
                        }
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.closeDialogHandler("")} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => props.closeDialogHandler(slug)} color="primary" autoFocus>
                        Ok
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



