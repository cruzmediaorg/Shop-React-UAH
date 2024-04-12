interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen: string;
}

interface Category {
    id: number;
    nombre: string;
}

interface CestaItem extends Product {
    cantidad: number;
}

interface GridProductosProps {
    product: Product;
    agregar: (product: Product) => void;
}

interface CestaProps {
    productos: CestaItem[];
    total: number;
    eliminar: (product: CestaItem) => void;
    vaciar: () => void;
    comprar: () => void;
}
