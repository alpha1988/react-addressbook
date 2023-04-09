import './root.css';
import {Outlet} from 'react-router-dom';
import {Container} from "react-bootstrap";

export const Root = () => {
    return (
        <Container className='container'>
            <Outlet/>
        </Container>
    );
}