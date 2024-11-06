import { Description } from "@headlessui/react";

export default function ErrorSimple({title, description}) {
    return (
        <div className="text-center dark:text-white">
          <h1 className="font-bold mt-12 text-4xl dark:text-white">{title}</h1>
          <p className="text-lg mt-6 dark:white">{description}</p>
          <a href="/" className="underline text-blue-600 hover:text-blue-800 text-lg mt-4 dark:text-blue-200">Volver a inicio</a>
        </div>
        )
}