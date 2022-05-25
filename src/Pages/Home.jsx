import React from "react";
import {Categories, SortPopup, PizzaBlock, LoadingBlock} from "../Components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from '../redux/actions/filters'
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";

const categoriesItems = ['Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'];

const sortItems = [
    {name: 'Популярности', type: 'popular', order: 'desc'},
    {name: 'Цена', type: 'price', order: 'asc'},
    {name: 'Алфавит', type: 'name', order: 'asc'}
];

function Home() {


    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);

    //console.log(cartItems);
    React.useEffect(() => {

        dispatch(fetchPizzas(sortBy, category));


    }, [sortBy, category]);


    const onSelectCategory = React.useCallback((index) => {

        dispatch(setCategory(index));
    }, [])


    const onClickSortType = React.useCallback((type) => {

        dispatch(setSortBy(type));
    }, [])


    const handleAddPizzaToCart = (obj) => {

        dispatch(addPizzaToCart(obj));
    }

    return (


        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category}
                            onClickCategory={onSelectCategory}
                            items={categoriesItems}/>


                <SortPopup activeSortType={sortBy.type}
                           items={sortItems}
                           onClickSortType={onClickSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {isLoaded ? items.map((obj) => (<PizzaBlock
                        onClickAddPizza={handleAddPizzaToCart}
                        key={obj.id}
                        addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                        {...obj}/>))
                    : Array(12).fill(0)
                        .map((_, index) => <LoadingBlock key={index}/>)}


            </div>
        </div>


    )

}

export default Home;