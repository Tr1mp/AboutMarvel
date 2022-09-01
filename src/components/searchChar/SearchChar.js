import { Form, Formik, Field, ErrorMessage as ErrorFormikMessage} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './searchChar.scss';
import Spinner from '../spinner/Spinner';

const SearchChar = () => {
    const {loading, error, getCharacterByName, clearError} = useMarvelService();
    const [char, setChar] = useState(null);

    const onRequest = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const ErrorMessagePrint = !error ? null :
        <div className='form__error_critical'>
            <ErrorMessage cusomStyle={{zoom: 0.5, margin: "-30px auto -50px auto"}}/>
        </div>

    const result = error || !char ? null : 
            char.length > 0 ? 
                <div className="form__wrapper">
                    <h2 className='form__seccsess'>There is! Visit <span>{char[0].name}</span> page?</h2> 
                    <Link to={`/characters/${char[0].id}`} className='button button__secondary'>
                        <div className="inner">Homepage</div>
                    </Link>
                </div>
                :
                <h2 className='form__error'>
                    The character was not found. Check the name and try again
                </h2>

    return (
        <div className="form">
            <View onRequest={onRequest} loading={loading}/>
            {result}
            {ErrorMessagePrint}
        </div>
        
    )
}

const View = ({onRequest, loading}) => {
    const btnLoadig = loading ? 
        <Spinner customStyle={{zoom: '0.5', margin: '0 auto'}}/> : 
            (<button 
                className="button button__main" 
                type="submit">
                <div className='inner'>Find</div>
            </button>)

    return (
        <Formik
            initialValues={{ name: ''}}
            onSubmit={values => onRequest(values.name)}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .required("Empety name")
            })}>
            <Form>
                <h2 htmlFor="name">Or find a character by name:</h2>
                <div className="form__wrapper">
                <Field
                    className="form__input"
                    name="name"
                        id="name"
                        type="text"
                        placeholder="Enter name"/>
                    {btnLoadig}
                </div>
                <ErrorFormikMessage className="form__error" name="name" component="div"/>
            </Form>
        </Formik>
    )
}

export default SearchChar;
