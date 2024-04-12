"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TableProducts from '@/components/Products/Table';
import { Input } from '@/components/ui/input';
import products from '../../assets/data/products.json';

const AdminProductsPage = () => {
    const [productsData, setProductsData] = useState([]);
    const [search, setSearch] = useState('');
    // const router = useRouter();

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        setProductsData(storedProducts ? JSON.parse(storedProducts) : products);
    }, []);

    useEffect(() => {

        if (search === '') {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                setProductsData(JSON.parse(storedProducts));
            }
            return;
        }
    }, [search]);

    const eliminarProducto = (id) => {
        if (!confirm('¿Estás seguro de eliminar el producto?')) {
            return;
        }
        const filteredProducts = productsData.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        setProductsData(filteredProducts);
        alert('Producto eliminado');
    };

    return (
        <div>
            <Header title="Productos" subtitle="Gestión de productos">
                <a href="/admin/products/create"
                    className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-700/90"
                >
                    Nuevo producto
                </a>
            </Header>
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto" />
            <TableProducts products={productsData} eliminar={eliminarProducto} />
        </div>
    );
};

export default AdminProductsPage;
