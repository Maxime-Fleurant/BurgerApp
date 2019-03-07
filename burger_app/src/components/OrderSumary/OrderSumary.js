import React from "react";
import Aux from "../../hoc/Aux";


const OrderSumary = (props) => {

    const ingredientSumary = Object.keys(props.ingredients).map((objKey) => {

        return <li>{objKey} : {props.ingredients[objKey]}</li>

    });

    return (

        <Aux>

            <h3>Your Order</h3>

            <p>A delicious burger with the following ingredients :</p>

            <ul>
    
                {ingredientSumary}
                
            </ul>

            <p>Continue to checkout ? </p>

        </Aux>

    )

};


export default OrderSumary;