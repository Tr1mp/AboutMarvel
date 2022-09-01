import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";

const SetContent = (action, Component, data, link = null) => {
    const findProcess = {
    'waiting': <Skeleton/>,
    'loading': <Spinner/>,
    'loaded': <Component data={data} link={link}/>,
    'error': <ErrorMessage/>
    }
    return findProcess[action];
}

export default SetContent;