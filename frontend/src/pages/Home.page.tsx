import React, {useEffect, useState} from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import axios from "axios";
import {IProduct} from "../interfaces/product.interface";

export default function HomePage() {
    const [products, setProducts] = useState([] as IProduct[]);

    useEffect(() => {
        if(products.length === 0) {
            axios.get('/products').then((result) => {
                setProducts(result.data as IProduct[]);
            });
        }
    })

    return (
        <Container component="main">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}