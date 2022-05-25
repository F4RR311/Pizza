

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,


}


const getToTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);
const cart = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {

                ...state.items,
                // динамическое свойство айди в квадраптных скобках
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getToTotalPrice(currentPizzaItems),
                },


            };
            //вытаскиваем все пиццы и засосвываем в один массив


            const items = Object.values(newItems).map(obj => obj.items);
            const allPizzas = [].concat.apply([], items);
            //из вытащенного массива пробегаемся по сво-ву цена и суммируем
            const totalPrice = getToTotalPrice(allPizzas);
            return {
                ...state,
                items: newItems,
                totalCount: allPizzas.length,
                totalPrice,
            };
        }

        case 'REMOVE_CART_ITEM': {
            //получили новый обьект всех пицц
            const newItems = {
                ...state.items
            };

            //записываем в пер-нную общую цену пицц
            const currentTotalPrice = newItems[action.payload].totalPrice;
            //записываем в пер-нную общее кол-во пицц приводм к числу через длину массива
            const currentTotalCount = newItems[action.payload].items.length;
            // удалияем группу пиц
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount,


            }

        }

        case 'PLUS_CART_ITEM': {
            const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]
            ]

            return {
                ...state,
                items: {

                    ...state.items,
                    [action.payload]: {
                        items: newItems,
                        totalPrice: getToTotalPrice(newItems),
                    }
                }
            }
        }
        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items;
            //  еслди в  массиве больше одной пиццы удаляем если одна  то удаление не происходит
            const newItems =  oldItems.length > 1 ? state.items[action.payload].items.slice(1): oldItems;


            return {
                ...state,
                items: {

                    ...state.items,
                    [action.payload]: {
                        items: newItems,
                        totalPrice: getToTotalPrice(newItems),
                    }
                }
            }
        }
        case 'CLEAR_CART': {
            return {
                ...state,

            }
        }
        default:
            return state;
    }

}

export default cart;