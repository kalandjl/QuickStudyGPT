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
            className="z-50 fixed top-0 bottom-0 right-0 left-0 bg-black opacity-35 grid place-items-center">  
                <CircularProgress isIndeterminate color='green.800' />
            </div> 
            : <></>}
        </>
    )
}

export default Loading