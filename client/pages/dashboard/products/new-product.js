import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewProductPage = () => {
    // State ของ Product
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [weigthAccept, setWeightAccept] = useState("");

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isGift, setIsGift] = useState(false);
    const [giftDetail, setGiftDetail] = useState("");
    const [isOnSale, setIsOnSale] = useState(false);

    function handleUploadImage(e) {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setImages((old) => [...old, file]);

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    function removeImage(index) {
        const filteredImagesPreview = imagesPreview.filter(
            (_, idx) => idx !== index
        );
        setImagesPreview(filteredImagesPreview);

        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>สร้างสินค้า - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">สร้างสินค้า</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างสินค้า */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="property-main"
                    className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                >
                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            ข้อมูลทั่วไป
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รหัสสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={productId}
                                    onChange={(e) =>
                                        setProductId(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-1">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ราคาปกติ
                                </label>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-1">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ราคาที่ลดแล้ว
                                </label>
                                <input
                                    type="text"
                                    value={salePrice}
                                    onChange={(e) =>
                                        setSalePrice(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    หมวดหมู่
                                </label>
                                <select className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            รายละเอียด
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รายละเอียด
                                </label>
                                <ReactQuill
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความกว้าง
                                </label>
                                <input
                                    type="text"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความยาว
                                </label>
                                <input
                                    type="text"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความสูง
                                </label>
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    น้ำหนักที่รับได้
                                </label>
                                <input
                                    type="text"
                                    value={weigthAccept}
                                    onChange={(e) =>
                                        setWeightAccept(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            รูปภาพ
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-600">
                                            คลิ๊กเพื่ออัพโหลดรูปภาพ
                                        </span>
                                    </span>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        accept=".jpeg, .jpg, .png"
                                        multiple
                                        onChange={handleUploadImage}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {imagesPreview?.length > 0 && (
                                <div className="col-span-12">
                                    <h3 className="text-base md:text-lg font-medium leading-6">
                                        Preview
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 mb-4">
                                        <span className="font-semibold">
                                            {images.length}
                                        </span>{" "}
                                        file(s)
                                    </p>

                                    <hr className="w-full mb-4" />

                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 overflow-hidden">
                                        {imagesPreview?.map((image, i) => (
                                            <div
                                                key={i}
                                                className="w-full aspect-square relative flex items-center rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    alt={"preview_image"}
                                                    src={
                                                        image.url
                                                            ? image.url
                                                            : image
                                                    }
                                                    draggable="false"
                                                    fill
                                                    className="select-none object-cover"
                                                />
                                                <div className="flex absolute top-1 right-1 z-[1]">
                                                    <button
                                                        onClick={() =>
                                                            removeImage(i)
                                                        }
                                                        className="bg-white text-red-600 transition-all border border-transparent hover:border-red-600 rounded-lg p-1"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="w-4 h-4 md:w-5 md:h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="w-full" />
                </div>
            </section>
        </Layout>
    );
};

export default NewProductPage;
