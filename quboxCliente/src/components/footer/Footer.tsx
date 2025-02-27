export const Footer = () => {
    return (
        <footer className="bg-qbox/20 p-6">
            <h1 className="text-2xl font-bold">QBOX</h1>
            <p className="text-[#4D525F] text-sm">QBOX - Entrena para vos, entrena para la vida.</p>
            <div className="flex justify-between mt-4">
                <div className="flex flex-col gap-4">
                    <h2 className="gap-5 text-lg font-bold">Short Links</h2>
                    <a href={""} className="text-[#4D525F] text-sm">Intagram</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">Other pages</h2>
                    <a href={""} className="text-[#4D525F] text-sm">Terms & conditions</a>
                </div>
            </div>
            <hr className="my-3 text-[#E7E7E8] h-2"/>
            <div className="flex flex-col items-center gap-3 mb-5">
            <p className="text-[#4D525F] text-sm font-light">qbox.com</p>
            <p className="text-[#4D525F] text-sm font-light">{Date.now()} © QBOX. All rights reserved.</p>
            </div>
        </footer>
    )
}