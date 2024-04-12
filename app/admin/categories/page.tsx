"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TableCategories from '@/components/Categories/Table';
import { Input } from '@/components/ui/input';
import categories from '../../assets/data/categories.json';

const AdminCategoriesPage = () => {
    const [categoriesData, setcategoriesData] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        setcategoriesData(storedCategories ? JSON.parse(storedCategories) : categories);
    }, []);

    useEffect(() => {
        if (search === '') {
            const storedCategories = localStorage.getItem('categories');
            if (storedCategories) {
                setcategoriesData(JSON.parse(storedCategories));
            }
            return;
        }
    }, [search]);

    const eliminarCategoria = (id) => {
        if (!confirm('¿Estás seguro de eliminar el categoría?')) {
            return;
        }
        const filteredCategories = categoriesData.filter(category => category.id !== id);
        localStorage.setItem('categories', JSON.stringify(filteredCategories));
        setcategoriesData(filteredCategories);
        alert('Categoria eliminada');
    };

    return (
        <div>
            <Header title="Categorias" subtitle="Gestión de categorías">
                <a href="/admin/categories/create"
                    className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-700/90"
                >
                    Nuevo categoría
                </a>
            </Header>
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar categoría" />
            <TableCategories categories={categoriesData} eliminar={eliminarCategoria} />
        </div>
    );
};

export default AdminCategoriesPage;
