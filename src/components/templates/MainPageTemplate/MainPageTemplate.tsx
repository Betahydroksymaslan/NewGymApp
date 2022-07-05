import { ReactNode } from 'react';
import {Template} from './MainPageTemplate.style';

type TemplateTypes = {
    children: ReactNode
}

const MainPageTemplate = ({children}: TemplateTypes) => {
    return (
        <Template>
            {children}
        </Template>
    );
};


export default MainPageTemplate;