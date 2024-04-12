import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

function CategoryTable({ categories, eliminar }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.nombre}</TableCell>
                        <TableCell className="flex space-x-2">
                            <a
                                href={`/admin/categories/${category.id}/editar`}
                                className="bg-black text-white hover:bg-black/70 px-2 py-1 h-fit rounded-md"
                            >
                                Editar
                            </a>
                            <Button
                                onClick={() => eliminar(category.id)}
                                className="bg-red-500 text-white hover:bg-red-500/70 px-2 py-1 h-fit rounded-md"
                            >
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CategoryTable;
