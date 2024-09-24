import { CircularProgress } from "@chakra-ui/react"
import { FC } from "react"

interface Props {
    loading: boolean
}

const Loading: FC<Props> = (props) => {

    return (
        <>
            {props.loading ? 
            <div 
            className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-35 grid place-items-center">  
                <CircularProgress />
            </div> 
            : <></>}
        </>
    )
}

export default Loading