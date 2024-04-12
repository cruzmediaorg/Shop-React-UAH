const Header = (
    { title, subtitle, children }
) => {
    return (<div className="border-b mb-4 py-4 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">
                {title}
            </h2>
            <p className="text-gray-500" v-if="subtitle">
                {subtitle}
            </p>
        </div>
        <div>
            {children}
        </div>
    </div>);
}

export default Header;