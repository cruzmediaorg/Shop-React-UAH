"use client";

import React, { useState, useEffect } from 'react';

const OrderPage = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Fetch data from local storage
        const storedData = localStorage.getItem('compra');
        if (storedData) {
            const compra = JSON.parse(storedData);
            setData(compra);
            setTotal(compra.reduce((acc, item) => acc + item.precio * item.cantidad, 0));
        }
    }, []);

    if (data.length > 0) {
        return (
            <div className="flex flex-col h-[100vh] max-w-screen-lg mx-auto">
                <h2 className="text-2xl font-bold mt-4">¡Órden realizada!</h2>
                <p className="mt-4">Gracias por tu compra</p>
                <p className="mt-4">En breve recibirás un email con los detalles de tu compra</p>
                <p className="mt-4">Estos son los productos que has comprado:</p>
                <div className="bg-white p-4 rounded-md mt-2 shadow-md w-full">
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {data.map(producto => (
                            <div key={producto.id} className="bg-white p-4 rounded-md justify-between shadow-md flex items-center">
                                <div className="flex items-center gap-4">
                                    <img src={`/${producto.imagen}`} alt={producto.nombre}
                                        className="w-[60px] h-[60px] rounded-md" />
                                    <div>
                                        <h3 className="text-lg font-bold">{producto.nombre}</h3>
                                        <p className="text-sm text-gray-500">{producto.descripcion}</p>
                                        <p className="text-lg font-bold mt-2 flex gap-2 items-center">
                                            <span className="text-base font-normal">{producto.cantidad} x</span> {producto.precio} €
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-2xl font-bold mt-4">Total:</h2>
                    <p className="text-2xl font-normal">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col h-[100vh] max-w-screen-lg mx-auto">
                <h2 className="text-2xl font-bold mt-4">¡No hay productos en la cesta!</h2>
                <p className="mt-4">Por favor, añade productos a la cesta para realizar una compra</p>
            </div>
        );
    }
};

export default OrderPage;
