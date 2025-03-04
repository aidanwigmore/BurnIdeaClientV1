import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Text from '@materials/Text';

import { Size } from '../types/Size';

interface CustomTableProps {
    columns: string[];
    data: { id: string; extraData: any[], actions: React.ReactNode }[];
}

export default function CustomTable({ columns, data }: CustomTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={`column-${index}`}>
                                <Text size={Size.medium} text={column} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={`row-${row.id}`}>
                            {row.extraData.map((cell, index) => (
                                <TableCell key={`cell-${index}`}>
                                    <Text size={Size.small} text={cell} />
                                </TableCell>
                            ))}
                            <TableCell>{row.actions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
