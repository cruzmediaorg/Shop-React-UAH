'use client';
import { useRouter } from 'next/router'

const NavBar = () => {


    const routes = [
        { path: '/', name: 'Tienda' },
        { path: '/admin/products', name: 'Gestionar productos' },
        { path: '/admin/categories', name: 'Gestionar categorías' },
    ];

    const resetStorage = () => {
        localStorage.removeItem('products');
        localStorage.removeItem('categories');
        localStorage.removeItem('compra');
        alert('Se ha reiniciado el storage');
    };

    return (
        <nav className="border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src='https://upload.wikimedia.org/wikipedia/donate/thumb/f/fd/Amazon-logo-white.svg/1024px-Amazon-logo-white.svg.png' className="h-8" alt="Amazon" />
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        {routes.map(route => (
                            <li key={route.path}>
                                <a
                                    href={route.path}
                                    className="bg-white px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                                >
                                    {route.name}
                                </a>
                            </li>
                        ))}
                        <button
                            onClick={resetStorage}
                            className="bg-green-300 px-3 py-1 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white"
                        >
                            Reiniciar storage
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

