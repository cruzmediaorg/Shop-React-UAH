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

function ProductTable({ products, eliminar }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <img
                                src={`/${product.imagen}`}
                                alt={product.nombre}
                                className="w-[50px] h-[50px] rounded-md"
                            />
                        </TableCell>
                        <TableCell>{product.nombre}</TableCell>
                        <TableCell>{product.codigo}</TableCell>
                        <TableCell>{product.descripcion}</TableCell>
                        <TableCell>{product.precio}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell className="flex space-x-2">
                            <a
                                href={`/admin/products/${product.id}/editar`}
                                className="bg-black text-white hover:bg-black/70 px-2 py-1 h-fit rounded-md"
                            >
                                Editar
                            </a>
                            <Button
                                onClick={() => eliminar(product.id)}
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

export default ProductTable;
