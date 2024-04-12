'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation'
import Header from '../Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CategoryForm() {

    // Rutas
    const router = useRouter();
    const { id } = useParams();
    const pathname = usePathname();

    const esNuevo = pathname.includes('create');

    // Estado
    const [category, setCategory] = useState({
        nombre: '',
    });

    useEffect(() => {
        if (!esNuevo) {
            const categories = JSON.parse(localStorage.getItem('categories') || '[]');
            const categoriaEncontrada = categories.find(c => c.id === Number(id));
            if (categoriaEncontrada) {
                setCategory(categoriaEncontrada);
            }
        }
    }, [id, esNuevo]);

    const actualizar = (key, value) => {
        setCategory(prev => ({ ...prev, [key]: value }));
    };

    const guardarCategoria = () => {

        let categories = JSON.parse(localStorage.getItem('categories') || '[]');
        if (esNuevo) {
            const nuevoId = categories.length + 1;
            categories.push({ ...category, id: nuevoId });

            // Guardar en local storage
            localStorage.setItem('categories', JSON.stringify(categories));
        } else {
            const index = categories.findIndex(p => p.id === category.id);
            if (index !== -1) {
                categories[index] = category;
            }
        }
        localStorage.setItem('categories', JSON.stringify(categories));

        router.push('/admin/categories');
    };

    return (
        <>
            <Header title={esNuevo ? 'Nueva categoría' : 'Editar categoría'} subtitle="Gestión de categorías">
                <button
                    onClick={() => router.push('/admin/categories')}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-500/90"
                >
                    Cancelar
                </button>
            </Header>

            <div className="flex flex-col space-y-4">
                <Label>Nombre</Label>
                <Input value={category.nombre} onChange={(e) => actualizar('nombre', e.target.value)} />
                <Button onClick={guardarCategoria} className="bg-blue-700 text-white hover:bg-blue-700/90">Guardar</Button>
            </div>
        </>
    );
}


