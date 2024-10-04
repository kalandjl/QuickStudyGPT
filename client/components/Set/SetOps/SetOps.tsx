import { FC, useEffect } from "react";
import { DeleteIcon } from "../../../app/icons";
import { FolderIcon } from "../../../app/icons";

interface Props {

}

const SetOps: FC<Props> = (props: Props) => {

    return (
        <>
            <div className="bg-emerald-500"></div>
            <div className="flex gap-5" id="ops-container">
                {/* List of options, mapped into elements to avoid redundancy */}
                {
                [
                   { "jsx": <>
                        <DeleteIcon />
                        <p>
                            Delete
                        </p>
                    </>,
                    "color": "red",
                    "weight": 500
                    },
                    { "jsx": <>
                        <FolderIcon />
                        <p>
                            Add to folder
                        </p>
                    </>,
                    "color": "emerald",
                    "weight": 500
                    },
                ].map((x, i) => (
                    <div className={`
                    mt-2 ml-2
                    transition ease-in-out
                    hover:scale-110 hover:bg-${x.color}-${(x.weight + 200).toString()} hover:cursor-pointer
                    flex gap-2 px-4 py-2 rounded-lg bg-${x.color}-${x.weight.toString()} font-bold text-white`}>
                        {x.jsx}
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default SetOps