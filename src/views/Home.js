import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import {Table} from 'react-bootstrap'

const formSchema = Yup.object().shape({
    "pokemon": Yup.string().typeError("Letters only!").required("required")
})

const initialValues = {
    pokemon: ''
}

export default class Home extends Component {

    constructor() {
        super();
        this.state={
            pokemon:[]
        };
    }

    handleSubmit=({pokemon})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    pokemon: this.state.pokemon.concat(data)
                }, ()=>console.log(this.state.pokemon))
            })
            .catch(error=>{console.error(error);})
    }

    render() {
        return (
            <div>
                <Formik initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={
                            (value, {resetForm})=>{
                                this.handleSubmit(value);
                                resetForm(initialValues)
                            }
                        }
                        >
                        {
                            ({errors, touched})=>(
                                <Form>
                                    <label htmlFor="pokemon" className="form-label">Pokemon</label>
                                    <Field name="pokemon" className="form-control" />
                                    {errors.pokemon && touched.pokemon ? (<div style={{color:'red'}}>{errors.pokemon}</div>):null}
                                    
                                    <button type="submit" className="btn btn-primary">Search</button>

                                </Form>
                            )
                        }

                </Formik>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Pokemon Name</th>
                            <th>Health</th>
                            <th>Attack</th>
                            <th>Defence</th>
                            <th>Shiny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pokemon.map(
                            pokemon => (
                                <tr>
                                    <td>{pokemon.forms[0].name}</td>
                                    <td>{pokemon.stats[0].base_stat}</td>
                                    <td>{pokemon.stats[1].base_stat}</td>
                                    <td>{pokemon.stats[2].base_stat}</td>
                                    <td><img src={pokemon.sprites.front_shiny}/></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

