const Navbar = () => {
    return(
        <div className="flex justify-between p-4 border-2 border-amber-700">
            <div className="p-2 border-amber-300 border-2">
                <p>Logo + Name</p>
            </div>
            <div className="flex w-2/3 justify-center p-2 gap-4 border-amber-300 border-2">
                <p className="border-red-400 border-2 w-1/3">Tab1</p>
                <p className="border-red-400 border-2 w-1/3">Tab2</p>
            </div>
        </div>

    )
}

export default Navbar;