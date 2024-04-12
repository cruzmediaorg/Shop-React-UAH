'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation'
import Header from '../Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProductForm() {

    // Rutas
    const router = useRouter();
    const { id } = useParams();
    const pathname = usePathname();

    const esNuevo = pathname.includes('create');

    // Estado
    const [product, setProduct] = useState({
        nombre: '',
        codigo: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagen: ''
    });

    useEffect(() => {
        if (!esNuevo) {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const productoEncontrado = products.find(p => p.id === Number(id));
            if (productoEncontrado) {
                setProduct(productoEncontrado);
            }
        }
    }, [id, esNuevo]);

    const actualizar = (key, value) => {
        setProduct(prev => ({ ...prev, [key]: value }));
    };

    const guardarProducto = () => {

        let products = JSON.parse(localStorage.getItem('products') || '[]');
        if (esNuevo) {
            const nuevoId = products.length + 1;
            products.push({ ...product, id: nuevoId });

            // Guardar en local storage
            localStorage.setItem('products', JSON.stringify(products));
        } else {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products[index] = product;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));

        router.push('/admin/products');
    };

    return (
        <>
            <Header title={esNuevo ? 'Nuevo producto' : 'Editar producto'} subtitle="Gestión de productos">
                <button
                    onClick={() => router.push('/admin/products')}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-500/90"
                >
                    Cancelar
                </button>
            </Header>

            <div className="flex flex-col space-y-4">
                <Label>Información del producto</Label>
                <Input value={product.nombre} onChange={(e) => actualizar('nombre', e.target.value)} />
                <Label>Código</Label>
                <Input value={product.codigo} onChange={(e) => actualizar('codigo', e.target.value)} />
                <Label>Descripción</Label>
                <Input value={product.descripcion} onChange={(e) => actualizar('descripcion', e.target.value)} />
                <Label>Precio</Label>
                <Input type="number" value={product.precio} onChange={(e) => actualizar('precio', Number(e.target.value))} />
                <Label>Stock</Label>
                <Input type="number" value={product.stock} onChange={(e) => actualizar('stock', Number(e.target.value))} />
                <Label>Imagen (Ruta en el directorio assets/images)</Label>
                <Input value={product.imagen} onChange={(e) => actualizar('imagen', e.target.value)} />
                <Button onClick={guardarProducto} className="bg-blue-700 text-white hover:bg-blue-700/90">Guardar</Button>
            </div>
        </>
    );
}


