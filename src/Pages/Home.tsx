import React from 'react';
import {useSelector} from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import {

    selectFilter,


} from '../redux/filter/selectors';
import {setCategoryId,
    setCurrentPage} from '../redux/filter/slice';
import {fetchPizzas,  selectPizzaData} from '../redux/slices/pizzaSlice';
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {

    const dispatch = useAppDispatch();
    const {items, status} = useSelector(selectPizzaData);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

// убрали перерисовку компонента
    const onChangeCategory =React.useCallback((id: number) => {

        dispatch(setCategoryId(id));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );

        window.scrollTo(0, 0);
    };

    // Передаем сортировку в адресную строку
    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const params = {
    //             categoryId: categoryId > 0 ? categoryId : null,
    //             sortProperty: sort.sortProperty,
    //             currentPage,
    //         };
    //
    //         const queryString = qs.stringify(params, {skipNulls: true});
    //
    //         navigate(`/?${queryString}`);
    //     }
    //
    //     if (!window.location.search) {
    //
    //         dispatch(fetchPizzas({}));
    //     }
    // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // Парсим параметры при первом рендере
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params =  qs.parse(window.location.search.substring(1)) as unknown as SearchParams;
    //         const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
    //
    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: Number(params.category),
    //             currentPage: Number(params.currentPage),
    //             sort: sort ? sort : sortList[0],
    //         }));
    //     }
    //     isMounted.current = true;
    // }, []);

    const pizzas = items.map((obj: any) => (

            <PizzaBlock key={obj.id}{...obj} />

    ));
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
        ;
};

export default Home;
