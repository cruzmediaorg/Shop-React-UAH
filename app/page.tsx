"use client";
import React, { useState, useEffect } from 'react';
import GridProductos from './(components)/gridproductos';
import Cesta from './(components)/cesta';
import products from './assets/data/products.json';
import categories from './assets/data/categories.json';

const TiendaPage = () => {

  // Estados
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [search, setSearch] = useState('');
  const [cesta, setCesta] = useState<CestaItem[]>([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedCategories = localStorage.getItem('categories');

    if (storedProducts) {
      setProductsData(JSON.parse(storedProducts));
    } else {
      console.log('No hay productos en el storage');
      localStorage.setItem('products', JSON.stringify(products));
      setProductsData(products);
    }

    if (storedCategories) {
      setCategoriesData(JSON.parse(storedCategories));
    } else {
      console.log('No hay categorías en el storage');
      localStorage.setItem('categories', JSON.stringify(categories));
      setCategoriesData(categories);
    }



  }, []);

  useEffect(() => {
    // Filtrado de productos por nombre
    if (search !== '') {
      const filteredProducts = productsData.filter(product =>
        product.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setProductsData(filteredProducts);
    } else {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProductsData(JSON.parse(storedProducts));
      }
    }

  }, [search]);

  useEffect(() => {
    // Filtrado de productos por categoría
    if (categoria !== '') {
      const filteredProducts = productsData.filter(product =>
        product.categoria.toLowerCase().includes(categoria.toLowerCase())
      );
      setProductsData(filteredProducts);
    } else {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProductsData(JSON.parse(storedProducts));
      }
    }
  }, [categoria]);

  useEffect(() => {
    // Cálculo del total de la cesta
    const newTotal = cesta.reduce((acc, product) => acc + product.precio * product.cantidad, 0);
    setTotal(newTotal);
  }, [cesta]);


  // Funciones
  const agregarProducto = (product: Product) => {
    if (product.stock === 0) {
      alert('Se ha agotado el stock de este producto');
      return;
    }

    const productIndex = cesta.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      setCesta(cesta.map(item => {
        if (item.id === product.id) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      }
      ));

      const productDataIndex = productsData.findIndex(item => item.id === product.id);
      productsData[productDataIndex].stock--;
      return;
    } else {
      setCesta([...cesta, { ...product, cantidad: 1 }]);

      const productDataIndex = productsData.findIndex(item => item.id === product.id);
      productsData[productDataIndex].stock--;
    }


  };

  const eliminarProducto = (product: Product) => {
    const productIndex = cesta.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      if (cesta[productIndex].cantidad === 1) {
        setCesta(cesta.filter(item => item.id !== product.id));
      } else {
        setCesta(cesta.map(item => {
          if (item.id === product.id) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        }));
      }

      const productDataIndex = productsData.findIndex(item => item.id === product.id);
      productsData[productDataIndex].stock++;
    }


  };

  const vaciarCarrito = () => {
    // Devuelve el stock de los productos
    cesta.forEach(product => {
      const productDataIndex = productsData.findIndex(item => item.id === product.id);
      productsData[productDataIndex].stock += product.cantidad;
    });

    setCesta([]);
  };

  const comprarProductos = () => {

    console.log('Comprando productos', cesta);
    console.log('Total:', total);
    console.log('productos con stock', productsData)

    localStorage.setItem('products', JSON.stringify(productsData));

    if (localStorage.getItem('compra')) {
      localStorage.removeItem('compra');
    }

    localStorage.setItem('compra', JSON.stringify(cesta));
    setCesta([]);

    setTimeout(() => {
      window.location.href = '/orden';
    }, 400);

  };

  return (
    <div className="flex h-[90vh]">
      <div className="w-1/2 mx-auto p-5 overflow-y-scroll">
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categoriesData.map(category => (
            <option key={category.id} value={category.nombre}>
              {category.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900 mt-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar producto"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {productsData.length ? (
            productsData.map(product => (
              <GridProductos
                key={product.id}
                product={product}
                agregar={agregarProducto}
              />
            ))
          ) : (
            <p className="text-center mt-12">No hay productos</p>
          )}
        </div>
      </div>
      <div className="w-1/2 mx-auto h-[90vh] bg-gray-50 border-l-2 p-5">
        <h2 className="text-2xl font-bold">Cesta de la compra</h2>
        <Cesta
          productos={cesta}
          total={total}
          eliminar={eliminarProducto}
          vaciar={vaciarCarrito}
          comprar={comprarProductos}
        />
      </div>
    </div>
  );
};

export default TiendaPage;
