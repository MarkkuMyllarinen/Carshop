import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Newcar(props) {
    const [open, setOpen] = React.useState(false);

    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addCar = () => {
        props.savecar(car);
        handleClose();
    };


    const handleOnChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    };
    return (
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add new car
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleOnChange(e)}
                        label="Brand"
                        fullWidth
                    /> <TextField
                    margin="dense"
                    value={car.model}
                    name="model"
                    onChange={e => handleOnChange(e)}
                    label="Model"
                    fullWidth
                /> <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={e => handleOnChange(e)}
                    label="Color"
                    fullWidth
                /> <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={e => handleOnChange(e)}
                    label="Fuel"
                    fullWidth
                /> <TextField
                    margin="dense"
                    name="year"
                    value={car.year}
                    onChange={e => handleOnChange(e)}
                    label="Year"
                    fullWidth
                /> <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={e => handleOnChange(e)}
                    label="Price"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addCar} color="primary">
                        Add new car
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
