import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/OrderSumary/OrderSumary";


const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat  : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese: 0,
            meat  : 0
        },
        totalPrice: 4,
        purchasable : false,
        purchasing : false
    };

    purchaseHandler = () => {

        this.setState({ purchasing:true });

    };

    updatePurchaseState = (updatedIngredients) => {

        const ingredientprice = Object.values(updatedIngredients).reduce((prev, curr) => curr + prev , 0);
        this.setState({purchasable: ingredientprice > 0});

    };
    
    addIngredientHandler = (type) =>{

        const updatedCount       = this.state.ingredients[type] + 1;
        const newPrice           = this.state.totalPrice + INGREDIENT_PRICES[type];
        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updatedCount;

        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{

        if (this.state.ingredients[type] > 0) {

            const updatedCount       = this.state.ingredients[type] - 1;
            const newPrice           = this.state.totalPrice - INGREDIENT_PRICES[type];
            const updatedIngredients = {...this.state.ingredients};

            updatedIngredients[type] = updatedCount;

            this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
            this.updatePurchaseState(updatedIngredients);

        }

    }

    render () {

        const disableInfo = {...this.state.ingredients};

        for (let key in disableInfo) {

            disableInfo[key] = disableInfo[key] <= 0;

        }

        return (

            <Aux>

                <Modal>

                    <OrderSumary 
                        ingredients = {this.state.ingredients}/>

                </Modal>

                <Burger ingredients = {this.state.ingredients}/>

                <BuildControls 
                    ingredientAdded   = {this.addIngredientHandler}
                    ingredientremoved = {this.removeIngredientHandler}
                    disableInfo       = {disableInfo}
                    totalPrice        = {this.state.totalPrice}
                    purchasable       = {this.state.purchasable}
                />

            </Aux>

        );

    };

}

export default BurgerBuilder;