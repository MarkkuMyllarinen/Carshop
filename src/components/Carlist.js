import React from "react";
import ReactTable from "react-table-v6";
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Newcar from "./Newcar";
import Editcar from "./Editcar";

function Carlist() {

    const [cars, setCars] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    function getCars() {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(responseData => responseData.json())
            .then(
                data => setCars(data._embedded.cars)
            )
            .catch(err => console.error(err))
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => getCars())
            .catch(err => console.log(err))
    };

    const updateCar = (car, link) => {
        fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(res => getCars())
            .catch(err => console.log(err))
    };


    function deleteCar(link) {
        console.log(link)

        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
                .then(_ => getCars())
                .then(_ => handleClick())
                .catch(err => console.error(err))

        }


    }

    const columns = [{
        Header: 'Brand',
        accessor: 'brand' // String-based value accessors!
    }, {
        Header: 'Model',
        accessor: 'model',
    }, {
        Header: 'Color',
        accessor: 'color',
    }, {
        Header: 'Fuel',
        accessor: 'fuel',
    }, {
        Header: 'Year',
        accessor: 'year',
    }, {
        Header: 'Price',
        accessor: 'price',
    }, {
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => (<Editcar updateCar={updateCar} car={row.original}/>)
    }, {
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => (<Button color="secondary" size="small"
                              onClick={() => deleteCar(row.original._links.self.href)}>Delete</Button>)
    }]


    React.useEffect(() => {
        getCars();
    }, []);


    return (
        <div>
            <Newcar savecar={saveCar}/>
            <ReactTable
                data={cars}
                filterable={true}
                columns={columns}
            />
            <Snackbar open={open} autoHideDuration={6000} severity="success" message="Card deleted!"
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Auto poistettu!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Carlist;

