import React from 'react';

type CategoriesPropsType = {
    value: number;
    onChangeCategory: (i: number) => void;

}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const Categories: React.FC<CategoriesPropsType> = ({value, onChangeCategory}) => {


    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Categories;
