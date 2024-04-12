import React from 'react';

const ProductCard = ({ product, agregar }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between">
            <div className="zoom-container">
                <div>
                    <img
                        src={`/${product.imagen}`}
                        alt={product.name}
                        className="w-full h-[200px] object-contain hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <h3 className="text-lg font-bold mt-2">{product.nombre}</h3>
                <p className="text-sm text-gray-500">{product.descripcion}</p>
                <p className="text-lg font-bold mt-2">{product.precio} €</p>
                <p className="text-sm text-gray-500">Cantidad en existencia: {product.stock}</p>
            </div>
            <button
                onClick={() => agregar(product)}
                className="bg-blue-500 text-white hover:bg-blue-700 w-full p-2 mt-2 rounded-md"
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductCard;
