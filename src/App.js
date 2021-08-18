
import './App.css';
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const bearer_token ="Bearer xKl0aI5pFHhDbHBJchLfBY8v8HNjZBB-GIDAZIOTeUc.c7G45Ws76rr-_SSBagAP8a_9A8fyVchKdBd9v9NdmwE"
const url = "http://3d4327f34765.ngrok.io/api/v0.0.1/pastries";

const useStyles = makeStyles((theme) => ({

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function App() {
  const classes = useStyles();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [imageurl, setimageurl] = useState();
  const [nextbatch, setNextbatch] = useState();
  const [inventory, setInventory] = useState();
  const [pastrys, setPastrys] = useState();



  useEffect( () => {
     getpastry()
  }, []);
  






const addpastry = (e)=> {
  e.preventDefault();
  
  fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': bearer_token,
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name":name,
    "description":description,
    "image":imageurl,
    "nextbatch":new Date(nextbatch).toISOString(),
    "inventory":inventory
  })})
  .then(res => res.json()) 
  .then(res => console.log(res.message))

  setName("")
  setDescription("")
  setimageurl("")
  setNextbatch("")
  setInventory("")
}




const getpastry = async ()=> {
  fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': bearer_token,
        'Content-Type': 'application/json'
  }})
    .then(res => res.json()) 
    .then(res => setPastrys(res))
}



const deletepastry = (id) => {

  console.log(url+"/"+id);
  fetch(url+"/"+id, {
    method: 'delete',
    headers: {
      'Authorization': bearer_token,
      'Content-Type': 'application/json'
}})
   .then(res => res.json()) 
   .then(res => console.log(res.message))

}



  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
      <form className={classes.form}  onSubmit = {addpastry}  >
          <TextField
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 30, minLength: 1 }}
            required
            fullWidth
            value={name}
            onInput={ e=>setName(e.target.value)}
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
           <TextField
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 100, minLength: 1 }}
            required
            fullWidth
            value={description}
            onInput={ e=>setDescription(e.target.value)}
            id="description"
            label="Description"
            name="description"
            autoFocus
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={imageurl}
            onInput={ e=>setimageurl(e.target.value)}
            id="image"
            label="Image URL"
            name="image"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="datetime-local"
            placeholder="yyyy-mm-dd"
            onInput={ e=>setNextbatch(e.target.value)}
            value={nextbatch}
            required
            fullWidth
            name="nextbatch"
            id="nextbatch"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number" step="any"
            onInput={ e=>setInventory(e.target.value)}
            value={inventory}
            id="inventory"
            label="Inventory"
            name="inventory"
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
          </form>

          
          <table>
          <tbody>
  <tr>
    <th>name</th>
    <th>description</th>
    <th>image</th>
    <th>nextbatch</th>
    <th>inventory</th>
    <th>delete</th>
  </tr>
  {pastrys ? pastrys.map( pastry => (
          <tr key={pastry.id}>
            <td>{pastry.name}</td>
            <td>{pastry.description}</td>
            <td>{pastry.image}</td>
            <td>{pastry.nextbatch}</td>
            <td>{pastry.inventory}</td>
            <td> 
        
               <Button
                    onClick={()=>deletepastry(pastry.id)}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Delete
                  </Button></td>
          </tr>
          )) 
    : <></>   }
  </tbody>
  <tfoot></tfoot>
</table>


      </Container>
    </div>
  );
}

export default App;
