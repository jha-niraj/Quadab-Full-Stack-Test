const ProductDetails = () => {
    return (
        <div>
            <section className="bg-gray-200 py-12 md:py-20 lg:py-24">
                <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                        <img
                            src="/placeholder.svg"
                            alt="Product Image"
                            width={600}
                            height={600}
                            className="w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Acme Wireless Headphones</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                            Experience immersive audio with our premium wireless headphones. Crafted for comfort and designed for
                            superior sound quality.
                        </p>
                        <button size="lg" className="w-full text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to Cart</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetails;